const REMOTE_ENDPOINT = "/api/warehouse";

export function createWarehouseDataSource({ normalizeState, onStatus }) {
  let remoteWritable = false;
  let saveTimer = null;
  let lastRemotePayload = "";

  function setStatus(status) {
    onStatus?.(status);
  }

  async function loadRemote() {
    setStatus({ mode: "loading", message: "正在读取飞书" });
    try {
      const response = await fetch(REMOTE_ENDPOINT, {
        method: "GET",
        headers: { Accept: "application/json" }
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.configured) {
        remoteWritable = false;
        setStatus({ mode: "error", message: payload.message || "飞书未配置或接口不可用" });
        return null;
      }
      if (payload.empty || !payload.state) {
        remoteWritable = false;
        setStatus({ mode: "error", message: payload.message || "飞书表为空，请先导入数据" });
        return null;
      }
      remoteWritable = true;
      lastRemotePayload = JSON.stringify(payload.state);
      setStatus({ mode: "remote", message: "飞书数据已连接" });
      return normalizeState(payload.state);
    } catch (error) {
      remoteWritable = false;
      setStatus({ mode: "error", message: `飞书读取失败：${error.message}` });
      return null;
    }
  }

  function save(state) {
    if (!remoteWritable) {
      setStatus({ mode: "error", message: "飞书未连接，无法保存" });
      return;
    }
    const nextPayload = JSON.stringify(state);
    if (nextPayload === lastRemotePayload) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveRemote(state, nextPayload), 550);
  }

  async function saveRemote(state, serializedState = JSON.stringify(state)) {
    setStatus({ mode: "saving", message: "正在同步飞书" });
    try {
      const response = await fetch(REMOTE_ENDPOINT, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ state })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || "保存失败");
      lastRemotePayload = serializedState;
      setStatus({ mode: "remote", message: "飞书数据已同步" });
    } catch (error) {
      setStatus({ mode: "error", message: `飞书同步失败：${error.message}` });
    }
  }

  return {
    loadRemote,
    save
  };
}
