const FEISHU_API = "https://open.feishu.cn/open-apis";

let tokenCache = {
  value: "",
  expiresAt: 0
};

export default async function handler(request, response) {
  try {
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      return json(response, 405, { message: "Method Not Allowed" });
    }

    const config = getConfig();
    if (!config.configured) {
      return json(response, 200, {
        configured: false,
        missing: config.missing,
        message: `缺少环境变量：${config.missing.join(", ")}`
      });
    }

    const tables = await listTables(config);
    return json(response, 200, {
      configured: true,
      appTokenPrefix: `${config.appToken.slice(0, 6)}...`,
      expected: {
        rooms: process.env.FEISHU_TABLE_ROOMS || "",
        racks: process.env.FEISHU_TABLE_RACKS || "",
        products: process.env.FEISHU_TABLE_PRODUCTS || "",
        movements: process.env.FEISHU_TABLE_MOVEMENTS || "",
        users: process.env.FEISHU_TABLE_USERS || "",
        user_rack_permissions: process.env.FEISHU_TABLE_USER_RACK_PERMISSIONS || "",
        sales_people: process.env.FEISHU_TABLE_SALES_PEOPLE || "",
        field_options: process.env.FEISHU_TABLE_FIELD_OPTIONS || ""
      },
      actualTables: tables.map((table) => ({
        name: table.name || table.revision || "",
        table_id: table.table_id || table.id || ""
      })),
      message: "请确认 expected 里的 table id 能在 actualTables 中找到。"
    });
  } catch (error) {
    return json(response, 500, {
      configured: false,
      message: error.message || "Feishu debug failed"
    });
  }
}

function getConfig() {
  const missing = [];
  if (!process.env.FEISHU_APP_ID) missing.push("FEISHU_APP_ID");
  if (!process.env.FEISHU_APP_SECRET) missing.push("FEISHU_APP_SECRET");
  if (!process.env.FEISHU_APP_TOKEN) missing.push("FEISHU_APP_TOKEN");
  return {
    configured: missing.length === 0,
    missing,
    appId: process.env.FEISHU_APP_ID,
    appSecret: process.env.FEISHU_APP_SECRET,
    appToken: process.env.FEISHU_APP_TOKEN
  };
}

async function getTenantAccessToken(config) {
  if (tokenCache.value && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.value;
  const response = await fetch(`${FEISHU_API}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: config.appId,
      app_secret: config.appSecret
    })
  });
  const payload = await response.json();
  if (!response.ok || payload.code !== 0) {
    throw new Error(payload.msg || "获取飞书 tenant_access_token 失败");
  }
  tokenCache = {
    value: payload.tenant_access_token,
    expiresAt: Date.now() + Math.max(1, Number(payload.expire || 7200) - 120) * 1000
  };
  return tokenCache.value;
}

async function feishuRequest(config, path) {
  const token = await getTenantAccessToken(config);
  const response = await fetch(`${FEISHU_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.code !== 0) {
    throw new Error(payload.msg || `飞书接口请求失败：${path}`);
  }
  return payload.data || {};
}

async function listTables(config) {
  const tables = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({ page_size: "100" });
    if (pageToken) params.set("page_token", pageToken);
    const data = await feishuRequest(config, `/bitable/v1/apps/${config.appToken}/tables?${params.toString()}`);
    tables.push(...(data.items || []));
    pageToken = data.page_token || "";
  } while (pageToken);
  return tables;
}

function json(response, status, payload) {
  response.status(status).json(payload);
}
