const REMOTE_ENDPOINT = "/api/warehouse";

export function createWarehouseDataSource({ storageKey, starterData, normalizeState, onStatus }) {
  let remoteWritable = false;
  let saveTimer = null;
  let lastRemotePayload = "";

  function clone(value) {
    return typeof structuredClone === "function"
      ? structuredClone(value)
      : JSON.parse(JSON.stringify(value));
  }

  function setStatus(status) {
    onStatus?.(status);
  }

  function loadLocal() {
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
      setStatus({ mode: "local", message: "本地示例数据" });
      return clone(starterData);
    }
    try {
      const parsed = JSON.parse(saved);
      if (!parsed.rooms || !parsed.shelves || !parsed.products) throw new Error("invalid local state");
      setStatus({ mode: "local", message: "本地缓存" });
      return normalizeState(parsed);
    } catch {
      setStatus({ mode: "local", message: "本地示例数据" });
      return clone(starterData);
    }
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
        setStatus({
          mode: "local",
          message: payload.message || "未配置飞书，使用本地缓存"
        });
        return null;
      }
      if (payload.empty && !payload.state) {
        remoteWritable = true;
        setStatus({ mode: "remote", message: payload.message || "飞书表为空，准备同步本地数据" });
        return { __remoteEmpty: true };
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

  function saveLocal(state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function save(state) {
    saveLocal(state);
    if (!remoteWritable) return;
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
    loadLocal,
    loadRemote,
    save
  };
}
