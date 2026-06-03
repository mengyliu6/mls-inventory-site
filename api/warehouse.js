const FEISHU_API = "https://open.feishu.cn/open-apis";
const REQUIRED_TABLES = ["ROOMS", "RACKS", "PRODUCTS", "MOVEMENTS", "USERS"];
const TABLE_LABELS = {
  ROOMS: "rooms",
  RACKS: "racks",
  PRODUCTS: "products",
  MOVEMENTS: "movements",
  USERS: "users",
  USER_RACK_PERMISSIONS: "user_rack_permissions",
  SALES_PEOPLE: "sales_people",
  FIELD_OPTIONS: "field_options"
};

let tokenCache = {
  value: "",
  expiresAt: 0
};

export default async function handler(request, response) {
  try {
    if (request.method === "GET") {
      return json(response, 200, await readWarehouseState());
    }
    if (request.method === "PUT") {
      const body = await readBody(request);
      return json(response, 200, await writeWarehouseState(body.state));
    }
    response.setHeader("Allow", "GET, PUT");
    return json(response, 405, { message: "Method Not Allowed" });
  } catch (error) {
    return json(response, 500, { message: error.message || "Server Error" });
  }
}

async function readWarehouseState() {
  const config = getConfig();
  if (!config.configured) {
    return {
      configured: false,
      message: config.message,
      state: null
    };
  }

  const [rooms, racks, products, movements, users, permissions, salesPeople, fieldOptions] = await Promise.all([
    listTableRecords(config, "ROOMS"),
    listTableRecords(config, "RACKS"),
    listTableRecords(config, "PRODUCTS"),
    listTableRecords(config, "MOVEMENTS"),
    listTableRecords(config, "USERS"),
    config.tables.USER_RACK_PERMISSIONS ? listTableRecords(config, "USER_RACK_PERMISSIONS") : [],
    config.tables.SALES_PEOPLE ? listTableRecords(config, "SALES_PEOPLE") : [],
    config.tables.FIELD_OPTIONS ? listTableRecords(config, "FIELD_OPTIONS") : []
  ]);

  const state = composeState({ rooms, racks, products, movements, users, permissions, salesPeople, fieldOptions });
  const empty = !state.rooms.length && !state.shelves.length && !state.products.length && !state.movements.length;

  return {
    configured: true,
    empty,
    message: empty ? "飞书表暂无数据，请先导入数据" : "飞书数据读取成功",
    state: empty ? null : state
  };
}

async function writeWarehouseState(state) {
  const config = getConfig();
  if (!config.configured) {
    return {
      configured: false,
      saved: false,
      message: config.message
    };
  }
  if (!state || !Array.isArray(state.rooms) || !Array.isArray(state.products)) {
    return {
      configured: true,
      saved: false,
      message: "缺少有效的库存数据"
    };
  }

  await upsertTableRecords(config, "ROOMS", state.rooms, roomFields);
  await upsertTableRecords(config, "RACKS", state.shelves || [], rackFields);
  await upsertTableRecords(config, "PRODUCTS", state.products || [], productFields);
  await upsertTableRecords(config, "MOVEMENTS", state.movements || [], movementFields);
  await upsertTableRecords(config, "USERS", state.users || [], userFields);

  if (config.tables.USER_RACK_PERMISSIONS) {
    const permissions = (state.users || []).flatMap((user) =>
      (user.rackIds || []).map((rackId) => ({
        id: `${user.id}:${rackId}`,
        userId: user.id,
        rackId,
        canEdit: true
      }))
    );
    await upsertTableRecords(config, "USER_RACK_PERMISSIONS", permissions, permissionFields);
  }

  if (config.tables.SALES_PEOPLE) {
    const salesPeople = (state.salesPeople || []).map((name) => ({
      id: `sales-${slug(name)}`,
      name,
      active: true
    }));
    await upsertTableRecords(config, "SALES_PEOPLE", salesPeople, salesPersonFields);
  }

  if (config.tables.FIELD_OPTIONS) {
    const options = Object.entries(state.fieldOptions || {}).flatMap(([field, values]) =>
      (values || []).map((value, index) => ({
        id: `opt-${field}-${slug(value)}`,
        field: field === "android" ? "system_version" : field,
        value,
        active: true,
        sortOrder: index + 1
      }))
    );
    await upsertTableRecords(config, "FIELD_OPTIONS", options, fieldOptionFields);
  }

  return {
    configured: true,
    saved: true,
    message: "飞书数据保存成功"
  };
}

function getConfig() {
  const tables = {
    ROOMS: process.env.FEISHU_TABLE_ROOMS,
    RACKS: process.env.FEISHU_TABLE_RACKS,
    PRODUCTS: process.env.FEISHU_TABLE_PRODUCTS,
    MOVEMENTS: process.env.FEISHU_TABLE_MOVEMENTS,
    USERS: process.env.FEISHU_TABLE_USERS,
    USER_RACK_PERMISSIONS: process.env.FEISHU_TABLE_USER_RACK_PERMISSIONS,
    SALES_PEOPLE: process.env.FEISHU_TABLE_SALES_PEOPLE,
    FIELD_OPTIONS: process.env.FEISHU_TABLE_FIELD_OPTIONS
  };
  const missing = [];
  if (!process.env.FEISHU_APP_ID) missing.push("FEISHU_APP_ID");
  if (!process.env.FEISHU_APP_SECRET) missing.push("FEISHU_APP_SECRET");
  if (!process.env.FEISHU_APP_TOKEN) missing.push("FEISHU_APP_TOKEN");
  REQUIRED_TABLES.forEach((key) => {
    if (!tables[key]) missing.push(`FEISHU_TABLE_${key}`);
  });

  return {
    configured: missing.length === 0,
    message: missing.length ? `缺少环境变量：${missing.join(", ")}` : "",
    appId: process.env.FEISHU_APP_ID,
    appSecret: process.env.FEISHU_APP_SECRET,
    appToken: process.env.FEISHU_APP_TOKEN,
    tables
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

async function feishuRequest(config, path, options = {}) {
  const token = await getTenantAccessToken(config);
  const response = await fetch(`${FEISHU_API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.code !== 0) {
    throw new Error(payload.msg || `飞书接口请求失败：${path}`);
  }
  return payload.data || {};
}

async function listRecords(config, tableId) {
  const records = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({ page_size: "500" });
    if (pageToken) params.set("page_token", pageToken);
    const data = await feishuRequest(
      config,
      `/bitable/v1/apps/${config.appToken}/tables/${tableId}/records?${params.toString()}`
    );
    records.push(...(data.items || []));
    pageToken = data.page_token || "";
  } while (pageToken);
  return records;
}

async function listTableRecords(config, tableKey) {
  try {
    return await listRecords(config, config.tables[tableKey]);
  } catch (error) {
    throw new Error(formatTableError("读取", tableKey, config.tables[tableKey], error));
  }
}

async function upsertTableRecords(config, tableKey, rows, toFields) {
  try {
    return await upsertRecords(config, config.tables[tableKey], rows, toFields);
  } catch (error) {
    throw new Error(formatTableError("保存", tableKey, config.tables[tableKey], error));
  }
}

function formatTableError(action, tableKey, tableId, error) {
  const label = TABLE_LABELS[tableKey] || tableKey;
  const envName = `FEISHU_TABLE_${tableKey}`;
  const detail = error?.message || String(error);
  const hint = detail.includes("NOTEXIST")
    ? `请检查 ${envName}=${tableId || "未配置"} 是否属于当前 FEISHU_APP_TOKEN 对应的多维表，并确认飞书应用有权限访问。`
    : `请检查 ${envName}、FEISHU_APP_TOKEN 和飞书应用权限。`;
  return `${action} ${label} 表失败：${detail}。${hint}`;
}

async function upsertRecords(config, tableId, rows, toFields) {
  const existingRecords = await listRecords(config, tableId);
  const existingById = new Map(existingRecords.map((record) => [readField(record.fields, "id"), record.record_id]).filter(([id]) => id));
  for (const row of rows) {
    const fields = toFields(row);
    if (!fields.id) continue;
    const recordId = existingById.get(fields.id);
    if (recordId) {
      await feishuRequest(config, `/bitable/v1/apps/${config.appToken}/tables/${tableId}/records/${recordId}`, {
        method: "PUT",
        body: JSON.stringify({ fields })
      });
    } else {
      await feishuRequest(config, `/bitable/v1/apps/${config.appToken}/tables/${tableId}/records`, {
        method: "POST",
        body: JSON.stringify({ fields })
      });
    }
  }
}

function composeState({ rooms, racks, products, movements, users, permissions, salesPeople, fieldOptions }) {
  const permissionMap = new Map();
  permissions.forEach((record) => {
    const userId = readField(record.fields, "user_id");
    const rackId = readField(record.fields, "rack_id");
    const canEdit = readBool(record.fields, "can_edit", true);
    if (!userId || !rackId || !canEdit) return;
    if (!permissionMap.has(userId)) permissionMap.set(userId, []);
    permissionMap.get(userId).push(rackId);
  });

  const mappedUsers = users.map((record) => {
    const id = readField(record.fields, "id");
    return {
      id,
      name: readField(record.fields, "name"),
      role: readField(record.fields, "role") || "viewer",
      rackIds: permissionMap.get(id) || splitList(readField(record.fields, "rack_ids"))
    };
  }).filter((user) => user.id && user.name);

  const mappedMovements = movements.map((record) => ({
    id: readField(record.fields, "id"),
    productId: readField(record.fields, "product_id"),
    type: readField(record.fields, "type"),
    qty: readNumber(record.fields, "qty"),
    at: readDate(record.fields, "at"),
    userId: readField(record.fields, "user_id"),
    salesPerson: readField(record.fields, "sales_person"),
    stockBefore: readNullableNumber(record.fields, "stock_before"),
    stockAfter: readNullableNumber(record.fields, "stock_after"),
    note: readField(record.fields, "note")
  })).filter((movement) => movement.id && movement.productId);

  const mappedSalesPeople = salesPeople.map((record) => readField(record.fields, "name")).filter(Boolean);
  const salesFromMovements = mappedMovements.map((movement) => movement.salesPerson).filter(Boolean);

  const options = { android: [], storage: [] };
  fieldOptions.forEach((record) => {
    const field = readField(record.fields, "field");
    const value = readField(record.fields, "value");
    if (!value) return;
    const key = field === "system_version" ? "android" : field;
    if (!options[key]) options[key] = [];
    options[key].push(value);
  });

  const mappedProducts = products.map((record) => {
    const rackId = readField(record.fields, "rack_id");
    const slotNo = readNumber(record.fields, "slot_no") || 1;
    return {
      id: readField(record.fields, "id"),
      vehicle: readField(record.fields, "vehicle"),
      model: readField(record.fields, "model"),
      image: readField(record.fields, "image"),
      android: readField(record.fields, "system_version"),
      storage: readField(record.fields, "storage"),
      slotId: `${rackId}:${slotNo}`,
      note: readField(record.fields, "note"),
      stock: readNumber(record.fields, "stock")
    };
  }).filter((product) => product.id && product.vehicle);

  ["android", "storage"].forEach((key) => {
    options[key] = unique([...(options[key] || []), ...mappedProducts.map((product) => product[key]).filter(Boolean)]);
  });

  return {
    activeUserId: mappedUsers[0]?.id || "u-admin",
    rooms: rooms.map((record) => ({
      id: readField(record.fields, "id"),
      name: readField(record.fields, "name"),
      note: readField(record.fields, "note")
    })).filter((room) => room.id && room.name),
    shelves: racks.map((record) => ({
      id: readField(record.fields, "id"),
      roomId: readField(record.fields, "room_id"),
      code: readField(record.fields, "code"),
      name: readField(record.fields, "name"),
      x: readNumber(record.fields, "x"),
      y: readNumber(record.fields, "y"),
      w: readNumber(record.fields, "w"),
      h: readNumber(record.fields, "h")
    })).filter((rack) => rack.id && rack.roomId && rack.code),
    products: mappedProducts,
    movements: mappedMovements,
    users: mappedUsers,
    salesPeople: unique([...mappedSalesPeople, ...salesFromMovements]),
    fieldOptions: options
  };
}

function roomFields(room) {
  return {
    id: room.id,
    name: room.name,
    note: room.note || "",
    updated_at: Date.now()
  };
}

function rackFields(rack) {
  return {
    id: rack.id,
    room_id: rack.roomId,
    code: rack.code,
    name: rack.name || `${rack.code} 大货架`,
    x: Number(rack.x || 0),
    y: Number(rack.y || 0),
    w: Number(rack.w || 24),
    h: Number(rack.h || 26),
    slot_count: 8,
    updated_at: Date.now()
  };
}

function productFields(product) {
  const [rackId, slotNo = "1"] = String(product.slotId || "").split(":");
  return {
    id: product.id,
    vehicle: product.vehicle,
    model: product.model,
    image: product.image || "",
    system_version: product.android || "",
    storage: product.storage || "",
    rack_id: rackId || "",
    slot_no: Number(slotNo),
    slot_label: "",
    stock: Number(product.stock || 0),
    note: product.note || "",
    updated_at: Date.now()
  };
}

function movementFields(movement) {
  return {
    id: movement.id,
    product_id: movement.productId,
    type: movement.type,
    qty: Number(movement.qty || 0),
    at: dateMs(movement.at),
    user_id: movement.userId || "",
    user_name: "",
    sales_person: movement.salesPerson || "",
    stock_before: movement.stockBefore ?? "",
    stock_after: movement.stockAfter ?? "",
    source: movement.source || "",
    note: movement.note || "",
    created_at: dateMs(movement.at)
  };
}

function userFields(user) {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    active: true,
    rack_ids: (user.rackIds || []).join(","),
    updated_at: Date.now()
  };
}

function permissionFields(permission) {
  return {
    id: permission.id,
    user_id: permission.userId,
    rack_id: permission.rackId,
    can_edit: Boolean(permission.canEdit)
  };
}

function salesPersonFields(person) {
  return {
    id: person.id,
    name: person.name,
    active: Boolean(person.active),
    created_at: Date.now()
  };
}

function fieldOptionFields(option) {
  return {
    id: option.id,
    field: option.field,
    value: option.value,
    active: Boolean(option.active),
    sort_order: Number(option.sortOrder || 0)
  };
}

function readField(fields, name) {
  const value = fields?.[name];
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "string") return item;
      return item?.text || item?.name || item?.link || item?.url || "";
    }).join("");
  }
  if (typeof value === "object") return value.text || value.name || value.link || value.url || "";
  return String(value);
}

function readNumber(fields, name) {
  const value = Number(readField(fields, name));
  return Number.isFinite(value) ? value : 0;
}

function readNullableNumber(fields, name) {
  const raw = readField(fields, name);
  if (raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function readBool(fields, name, fallback = false) {
  const value = fields?.[name];
  if (typeof value === "boolean") return value;
  if (value === null || value === undefined || value === "") return fallback;
  return ["true", "1", "yes", "是"].includes(String(value).toLowerCase());
}

function readDate(fields, name) {
  const value = fields?.[name];
  if (typeof value === "number") return new Date(value).toISOString().slice(0, 16);
  return readField(fields, name);
}

function dateMs(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? Date.now() : date.getTime();
}

function splitList(value) {
  return String(value || "").split(/[,\n，、]/).map((item) => item.trim()).filter(Boolean);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function slug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "");
}

function json(response, status, payload) {
  response.status(status).json(payload);
}

async function readBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}
