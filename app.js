const STORAGE_KEY = "warehouse-inventory-v1";

const colors = ["#2563eb", "#16a34a", "#ea580c", "#0891b2", "#7c3aed", "#dc2626"];

const starterData = {
  users: [
    { id: "u-admin", name: "管理员", role: "admin", shelfIds: [] },
    { id: "u-wendy", name: "Wendy", role: "editor", shelfIds: ["s-a2", "s-a4", "s-b8"] },
    { id: "u-hai", name: "Hai", role: "editor", shelfIds: ["s-b2", "s-b7", "s-c2"] },
    { id: "u-viewer", name: "仓库查看", role: "viewer", shelfIds: [] }
  ],
  activeUserId: "u-admin",
  rooms: [
    { id: "r-a", name: "A 区房间", note: "仪表产品与直播间备货" },
    { id: "r-b", name: "B 区房间", note: "主机与解码盒" },
    { id: "r-c", name: "C 区房间", note: "屏幕与面板" }
  ],
  shelves: [
    { id: "s-a2", roomId: "r-a", code: "A-2", name: "A2 货架", x: 8, y: 17, w: 22, h: 17 },
    { id: "s-a4", roomId: "r-a", code: "A-4", name: "A4 货架", x: 35, y: 18, w: 24, h: 18 },
    { id: "s-a6", roomId: "r-a", code: "A-6", name: "A6 货架", x: 65, y: 18, w: 24, h: 18 },
    { id: "s-b2", roomId: "r-b", code: "B-2", name: "B2 货架", x: 10, y: 17, w: 23, h: 18 },
    { id: "s-b7", roomId: "r-b", code: "B-7", name: "B7 货架", x: 39, y: 17, w: 22, h: 18 },
    { id: "s-b8", roomId: "r-b", code: "B-8", name: "B8 货架", x: 68, y: 16, w: 22, h: 19 },
    { id: "s-c2", roomId: "r-c", code: "C2-2", name: "C2 货架", x: 14, y: 18, w: 24, h: 18 },
    { id: "s-c5", roomId: "r-c", code: "C2-5", name: "C5 货架", x: 45, y: 20, w: 22, h: 17 },
    { id: "s-c6", roomId: "r-c", code: "C2-6", name: "C6 货架", x: 69, y: 46, w: 22, h: 18 }
  ],
  products: [
    { id: "p-1", vehicle: "GMC 索罗德仪表 14-18", model: "JT5-1370", image: "", android: "Linux", storage: "无", shelfId: "s-a2", note: "一台在直播间", stock: 8 },
    { id: "p-2", vehicle: "凯迪拉克凯雷德 07-14", model: "JT5-1508", image: "", android: "Linux", storage: "无", shelfId: "s-a2", note: "一台在直播间", stock: 13 },
    { id: "p-3", vehicle: "福特 F150 仪表 15-21", model: "JT5-1397", image: "", android: "Linux", storage: "无", shelfId: "s-a6", note: "直播样机", stock: 10 },
    { id: "p-4", vehicle: "BMW E65/E66", model: "JT5-1303", image: "", android: "Linux", storage: "无", shelfId: "s-a4", note: "", stock: 3 },
    { id: "p-5", vehicle: "4Runner 2010-2022", model: "WE-8103", image: "", android: "安卓12", storage: "6+128", shelfId: "s-b8", note: "亮黑", stock: 5 },
    { id: "p-6", vehicle: "Tacoma 2016-2022", model: "WE-8106A", image: "", android: "安卓12", storage: "4+64", shelfId: "s-b7", note: "枪色+电镀银", stock: 1 },
    { id: "p-7", vehicle: "Grand Cherokee 2014-2022", model: "WE-8504", image: "", android: "安卓14", storage: "8+128", shelfId: "s-b8", note: "", stock: 30 },
    { id: "p-8", vehicle: "14-20 GX", model: "16GXSI", image: "", android: "Linux", storage: "", shelfId: "s-b2", note: "", stock: 100 },
    { id: "p-9", vehicle: "玛莎拉蒂 GT 2007-2020", model: "10.4 1024*768", image: "", android: "安卓13", storage: "6+128", shelfId: "s-c2", note: "黑色", stock: 2 },
    { id: "p-10", vehicle: "保时捷卡宴 PCM3.0/3.1", model: "12.3 1920*720", image: "", android: "安卓12", storage: "8+128", shelfId: "s-c6", note: "", stock: 6 },
    { id: "p-11", vehicle: "GX460 10-16", model: "10.25 1920*720", image: "", android: "安卓12", storage: "4+64", shelfId: "s-c2", note: "", stock: 1 }
  ],
  movements: [
    { id: "m-1", productId: "p-8", type: "in", qty: 67, at: "2026-05-14T10:00", userId: "u-admin", note: "0514 入库" },
    { id: "m-2", productId: "p-8", type: "out", qty: 17, at: "2026-05-27T16:20", userId: "u-wendy", note: "订单出库" },
    { id: "m-3", productId: "p-5", type: "in", qty: 5, at: "2026-05-07T09:30", userId: "u-hai", note: "0507 入库" },
    { id: "m-4", productId: "p-6", type: "out", qty: 2, at: "2026-05-20T14:10", userId: "u-hai", note: "样品出库" },
    { id: "m-5", productId: "p-3", type: "in", qty: 11, at: "2026-05-05T11:40", userId: "u-admin", note: "05 前入库" },
    { id: "m-6", productId: "p-10", type: "out", qty: 3, at: "2026-05-28T17:20", userId: "u-wendy", note: "客户订单" }
  ]
};

let state = loadState();
let activeView = "map";
let activeRoomId = state.rooms[0]?.id;
let selectedShelfId = state.shelves.find((shelf) => shelf.roomId === activeRoomId)?.id;
let editMap = false;
let dragState = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(starterData);
  try {
    const parsed = JSON.parse(saved);
    return parsed.rooms && parsed.shelves && parsed.products ? parsed : structuredClone(starterData);
  } catch {
    return structuredClone(starterData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function activeUser() {
  return state.users.find((user) => user.id === state.activeUserId) || state.users[0];
}

function productShelf(product) {
  return state.shelves.find((shelf) => shelf.id === product.shelfId);
}

function shelfProducts(shelfId) {
  return state.products.filter((product) => product.shelfId === shelfId);
}

function productMovements(productId) {
  return state.movements.filter((movement) => movement.productId === productId);
}

function movementTotal(productId, type) {
  return productMovements(productId)
    .filter((movement) => movement.type === type)
    .reduce((sum, movement) => sum + movement.qty, 0);
}

function canEditShelf(shelfId) {
  const user = activeUser();
  return user.role === "admin" || (user.role === "editor" && user.shelfIds.includes(shelfId));
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", { hour12: false });
}

function todayInputValue() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function render() {
  saveState();
  renderUsers();
  renderStats();
  renderFilters();
  renderMap();
  renderInventory();
  renderMovementForm();
  renderRecords();
  renderAnalytics();
  renderPermissions();
  $("#permissionHint").textContent = permissionText();
}

function renderUsers() {
  const select = $("#activeUser");
  select.innerHTML = state.users
    .map((user) => `<option value="${user.id}" ${user.id === state.activeUserId ? "selected" : ""}>${user.name} · ${roleName(user.role)}</option>`)
    .join("");
}

function roleName(role) {
  return { admin: "管理员", editor: "编辑", viewer: "只读" }[role] || role;
}

function permissionText() {
  const user = activeUser();
  if (user.role === "admin") return "管理员可以编辑全部房间、货架、产品与记录。";
  if (user.role === "viewer") return "当前账号为只读查看，不能保存出入库或修改产品。";
  const shelves = state.shelves.filter((shelf) => user.shelfIds.includes(shelf.id)).map((shelf) => shelf.code);
  return `可编辑货架：${shelves.join("、") || "暂无"}`;
}

function renderStats() {
  $("#statStock").textContent = state.products.reduce((sum, product) => sum + product.stock, 0);
  $("#statShelves").textContent = state.shelves.length;
  const today = new Date().toISOString().slice(0, 10);
  $("#statOutToday").textContent = state.movements
    .filter((movement) => movement.type === "out" && movement.at.slice(0, 10) === today)
    .reduce((sum, movement) => sum + movement.qty, 0);
  $("#statLowStock").textContent = state.products.filter((product) => product.stock <= 2).length;
}

function renderFilters() {
  fillRoomSelect($("#roomSelect"), activeRoomId, false);
  fillRoomSelect($("#inventoryRoom"), $("#inventoryRoom").value || "all", true);
  fillRoomSelect($("#analyticsRoom"), $("#analyticsRoom").value || "all", true);
  fillShelfSelect($("#inventoryShelf"), $("#inventoryShelf").value || "all", true);
  fillShelfSelect($("#productShelf"), $("#productShelf").value || selectedShelfId, false);
}

function fillRoomSelect(select, selected, includeAll) {
  const all = includeAll ? `<option value="all">全部房间</option>` : "";
  select.innerHTML = all + state.rooms.map((room) => `<option value="${room.id}">${room.name}</option>`).join("");
  select.value = selected && [...select.options].some((option) => option.value === selected) ? selected : select.options[0]?.value;
}

function fillShelfSelect(select, selected, includeAll) {
  const roomFilter = $("#inventoryRoom")?.value;
  const shelves = includeAll && roomFilter && roomFilter !== "all"
    ? state.shelves.filter((shelf) => shelf.roomId === roomFilter)
    : state.shelves;
  const all = includeAll ? `<option value="all">全部货架</option>` : "";
  select.innerHTML = all + shelves.map((shelf) => `<option value="${shelf.id}">${shelf.code} · ${shelf.name}</option>`).join("");
  select.value = selected && [...select.options].some((option) => option.value === selected) ? selected : select.options[0]?.value;
}

function renderMap() {
  const map = $("#warehouseMap");
  const room = state.rooms.find((item) => item.id === activeRoomId) || state.rooms[0];
  const query = $("#mapProductFilter").value.trim().toLowerCase();
  const shelves = state.shelves.filter((shelf) => shelf.roomId === room.id);
  map.innerHTML = `<div class="map-room-title">${room.name}<br><small>${room.note || ""}</small></div>`;
  shelves.forEach((shelf) => {
    const products = shelfProducts(shelf.id);
    const visible = !query || shelf.code.toLowerCase().includes(query) || products.some((product) => {
      return [product.vehicle, product.model, product.note].join(" ").toLowerCase().includes(query);
    });
    if (!visible) return;
    const stock = products.reduce((sum, product) => sum + product.stock, 0);
    const node = document.createElement("button");
    node.type = "button";
    node.className = `shelf-node ${editMap ? "can-drag" : ""} ${selectedShelfId === shelf.id ? "selected" : ""}`;
    node.dataset.shelfId = shelf.id;
    node.style.left = `${shelf.x}%`;
    node.style.top = `${shelf.y}%`;
    node.style.width = `${shelf.w}%`;
    node.style.height = `${shelf.h}%`;
    node.innerHTML = `
      <div class="shelf-head"><span>${shelf.code}</span><span>${products.length} 款</span></div>
      <div class="shelf-body">${shelf.name}<br>库存 <strong class="${stock <= 0 ? "heat-empty" : stock <= 5 ? "heat-low" : "heat-good"}">${stock}</strong></div>
      <div class="shelf-foot"><span>${canEditShelf(shelf.id) ? "可编辑" : "只读"}</span><span>${editMap ? "拖拽" : "查看"}</span></div>
    `;
    map.appendChild(node);
  });
  renderInspector();
}

function renderInspector() {
  const shelf = state.shelves.find((item) => item.id === selectedShelfId);
  const title = $("#inspectorTitle");
  const body = $("#inspectorBody");
  if (!shelf) {
    title.textContent = "选择一个货架";
    body.innerHTML = `<p class="empty-state">点击图中的货架，可以查看货架结构、产品库存和最近出入库情况。</p>`;
    return;
  }
  const products = shelfProducts(shelf.id);
  title.textContent = `${shelf.code} · ${shelf.name}`;
  if (!products.length) {
    body.innerHTML = `<p class="empty-state">这个货架暂时没有产品。可以在库存表格里新增产品并分配到此货架。</p>`;
    return;
  }
  body.innerHTML = products.map((product) => {
    const recent = productMovements(product.id).sort((a, b) => b.at.localeCompare(a.at))[0];
    return `
      <div class="mini-product">
        <strong>${product.vehicle}</strong>
        <span class="tag">${product.model}</span>
        <span class="tag green">${product.android || "未填"}</span>
        <p>库存：<strong>${product.stock}</strong>，配置：${product.storage || "未填"}</p>
        <p>${recent ? `最近：${recent.type === "in" ? "入库" : "出库"} ${recent.qty} 件 · ${formatDateTime(recent.at)}` : "暂无出入库记录"}</p>
      </div>
    `;
  }).join("");
}

function renderInventory() {
  const query = $("#inventorySearch").value.trim().toLowerCase();
  const roomId = $("#inventoryRoom").value || "all";
  const shelfId = $("#inventoryShelf").value || "all";
  const products = state.products.filter((product) => {
    const shelf = productShelf(product);
    if (!shelf) return false;
    const matchesRoom = roomId === "all" || shelf.roomId === roomId;
    const matchesShelf = shelfId === "all" || shelf.id === shelfId;
    const matchesQuery = !query || [product.vehicle, product.model, product.note, product.android, product.storage, shelf.code].join(" ").toLowerCase().includes(query);
    return matchesRoom && matchesShelf && matchesQuery;
  });
  $("#inventoryTable").innerHTML = products.map((product, index) => {
    const shelf = productShelf(product);
    const editable = canEditShelf(product.shelfId);
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${product.vehicle}</td>
        <td><strong>${product.model}</strong></td>
        <td>${product.image ? `<img class="product-thumb" src="${product.image}" alt="${product.vehicle}">` : `<span class="placeholder-thumb">图片</span>`}</td>
        <td><span class="tag ${product.android.includes("14") ? "orange" : "green"}">${product.android || "未填"}</span></td>
        <td><span class="tag cyan">${product.storage || "无"}</span></td>
        <td><span class="tag">${shelf?.code || "未分配"}</span></td>
        <td>${product.note || ""}</td>
        <td>${movementTotal(product.id, "in")}</td>
        <td>${movementTotal(product.id, "out")}</td>
        <td><strong class="${product.stock <= 0 ? "heat-empty" : product.stock <= 2 ? "heat-low" : "heat-good"}">${product.stock}</strong></td>
        <td>
          <div class="row-actions">
            <button type="button" data-edit-product="${product.id}" ${editable ? "" : "disabled"}>编辑</button>
            <button type="button" data-quick-out="${product.id}" ${editable && product.stock > 0 ? "" : "disabled"}>出库</button>
          </div>
        </td>
      </tr>
    `;
  }).join("") || `<tr><td colspan="12" class="empty-state">没有匹配的产品。</td></tr>`;
}

function renderMovementForm() {
  $("#movementProduct").innerHTML = state.products.map((product) => {
    const shelf = productShelf(product);
    return `<option value="${product.id}">${product.model} · ${product.vehicle} · ${shelf?.code || "未分配"} · 库存 ${product.stock}</option>`;
  }).join("");
}

function renderRecords() {
  const query = $("#recordSearch").value.trim().toLowerCase();
  const records = [...state.movements].sort((a, b) => b.at.localeCompare(a.at)).filter((record) => {
    const product = state.products.find((item) => item.id === record.productId);
    const user = state.users.find((item) => item.id === record.userId);
    return !query || [product?.vehicle, product?.model, user?.name, record.note].join(" ").toLowerCase().includes(query);
  });
  $("#recordList").innerHTML = records.map((record) => {
    const product = state.products.find((item) => item.id === record.productId);
    const user = state.users.find((item) => item.id === record.userId);
    return `
      <article class="record-item">
        <span class="record-type ${record.type}">${record.type === "in" ? "入库" : "出库"}</span>
        <div class="record-main">
          <strong>${product?.model || "已删除产品"} · ${product?.vehicle || ""}</strong>
          <span>${user?.name || "未知人员"} · ${formatDateTime(record.at)} · ${record.note || "无备注"}</span>
        </div>
        <strong>${record.qty}</strong>
      </article>
    `;
  }).join("") || `<p class="empty-state">暂无记录。</p>`;
}

function renderAnalytics() {
  const days = Number($("#analyticsDays").value || 30);
  const roomId = $("#analyticsRoom").value || "all";
  const from = new Date();
  from.setDate(from.getDate() - days + 1);
  from.setHours(0, 0, 0, 0);
  const scopedProducts = state.products.filter((product) => {
    const shelf = productShelf(product);
    return roomId === "all" || shelf?.roomId === roomId;
  });
  const productIds = new Set(scopedProducts.map((product) => product.id));
  const records = state.movements.filter((movement) => {
    return productIds.has(movement.productId) && new Date(movement.at) >= from;
  });
  renderSalesBars(records);
  renderStockDonut(scopedProducts);
  renderTrend(records, days);
}

function renderSalesBars(records) {
  const totals = {};
  records.filter((record) => record.type === "out").forEach((record) => {
    totals[record.productId] = (totals[record.productId] || 0) + record.qty;
  });
  const rows = Object.entries(totals)
    .map(([productId, qty]) => ({ product: state.products.find((item) => item.id === productId), qty }))
    .filter((row) => row.product)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 8);
  const max = Math.max(1, ...rows.map((row) => row.qty));
  $("#salesBars").innerHTML = rows.map((row) => `
    <div class="bar-row">
      <span title="${row.product.vehicle}">${row.product.model}</span>
      <div class="bar-track"><div class="bar-fill" style="width: ${(row.qty / max) * 100}%"></div></div>
      <strong>${row.qty}</strong>
    </div>
  `).join("") || `<p class="empty-state">当前筛选条件下暂无出库数据。</p>`;
}

function renderStockDonut(products) {
  const byRoom = {};
  products.forEach((product) => {
    const shelf = productShelf(product);
    const room = state.rooms.find((item) => item.id === shelf?.roomId);
    const name = room?.name || "未分配";
    byRoom[name] = (byRoom[name] || 0) + product.stock;
  });
  const entries = Object.entries(byRoom).filter(([, value]) => value > 0);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  let cursor = 0;
  const segments = entries.map(([name, value], index) => {
    const start = cursor;
    const deg = total ? (value / total) * 360 : 360;
    cursor += deg;
    return `${colors[index % colors.length]} ${start}deg ${cursor}deg`;
  });
  $("#stockDonut").style.background = segments.length ? `conic-gradient(${segments.join(", ")})` : "#e2e8f0";
  $("#donutLegend").innerHTML = entries.map(([name, value], index) => `
    <div class="legend-item">
      <span class="legend-color" style="background:${colors[index % colors.length]}"></span>
      <span>${name}</span>
      <strong>${value}</strong>
    </div>
  `).join("") || `<p class="empty-state">暂无库存。</p>`;
}

function renderTrend(records, days) {
  const buckets = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    buckets.push({ key, label: `${date.getMonth() + 1}/${date.getDate()}`, in: 0, out: 0 });
  }
  records.forEach((record) => {
    const key = new Date(record.at).toISOString().slice(0, 10);
    const bucket = buckets.find((item) => item.key === key);
    if (bucket) bucket[record.type] += record.qty;
  });
  const max = Math.max(1, ...buckets.flatMap((bucket) => [bucket.in, bucket.out]));
  const visibleBuckets = days > 30 ? buckets.filter((_, index) => index % 3 === 0) : buckets;
  $("#dailyTrend").innerHTML = visibleBuckets.map((bucket) => `
    <div class="trend-day" title="${bucket.label} 入库 ${bucket.in} / 出库 ${bucket.out}">
      <div class="trend-bars">
        <div class="trend-in" style="height:${Math.max(3, (bucket.in / max) * 205)}px"></div>
        <div class="trend-out" style="height:${Math.max(3, (bucket.out / max) * 205)}px"></div>
      </div>
      <span class="trend-label">${bucket.label}</span>
    </div>
  `).join("");
}

function renderPermissions() {
  const shelves = state.shelves;
  $("#userPermissionList").innerHTML = state.users.map((user) => `
    <article class="user-card">
      <div class="user-card-head">
        <strong>${user.name}</strong>
        <span class="tag ${user.role === "admin" ? "orange" : user.role === "viewer" ? "red" : "green"}">${roleName(user.role)}</span>
      </div>
      <div class="permission-grid">
        ${shelves.map((shelf) => `
          <label>
            <input type="checkbox" data-user-shelf="${user.id}:${shelf.id}" ${user.role === "admin" || user.shelfIds.includes(shelf.id) ? "checked" : ""} ${user.role === "admin" ? "disabled" : ""}>
            ${shelf.code}
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");
}

function setActiveView(view) {
  activeView = view;
  $$(".nav-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
  $$(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `view-${view}`));
  $("#viewTitle").textContent = {
    map: "仓库图示",
    inventory: "库存表格",
    movement: "出入库",
    analytics: "图表分析",
    permissions: "人员权限"
  }[view];
}

function openProductDialog(productId) {
  const product = state.products.find((item) => item.id === productId);
  $("#productDialogTitle").textContent = product ? "编辑产品" : "新增产品";
  $("#productId").value = product?.id || "";
  $("#productVehicle").value = product?.vehicle || "";
  $("#productModel").value = product?.model || "";
  $("#productImage").value = product?.image || "";
  $("#productAndroid").value = product?.android || "";
  $("#productStorage").value = product?.storage || "";
  $("#productShelf").value = product?.shelfId || selectedShelfId || state.shelves[0]?.id;
  $("#productStock").value = product?.stock ?? 0;
  $("#productNote").value = product?.note || "";
  $("#productDialog").showModal();
}

function addMovement({ productId, type, qty, at, note }) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return alert("产品不存在。");
  if (!canEditShelf(product.shelfId)) return alert("当前人员没有这个货架的编辑权限。");
  if (type === "out" && product.stock < qty) return alert("库存不足，不能出库。");
  product.stock += type === "in" ? qty : -qty;
  state.movements.push({ id: uid("m"), productId, type, qty, at, note, userId: state.activeUserId });
  render();
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `warehouse-inventory-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest(".nav-tab");
  if (tab) setActiveView(tab.dataset.view);

  const shelfNode = event.target.closest(".shelf-node");
  if (shelfNode && !dragState) {
    selectedShelfId = shelfNode.dataset.shelfId;
    renderMap();
  }

  const editProduct = event.target.closest("[data-edit-product]");
  if (editProduct) openProductDialog(editProduct.dataset.editProduct);

  const quickOut = event.target.closest("[data-quick-out]");
  if (quickOut) {
    const product = state.products.find((item) => item.id === quickOut.dataset.quickOut);
    $("#movementType").value = "out";
    $("#movementProduct").value = product.id;
    $("#movementQty").value = 1;
    $("#movementTime").value = todayInputValue();
    setActiveView("movement");
  }
});

$("#activeUser").addEventListener("change", (event) => {
  state.activeUserId = event.target.value;
  render();
});

$("#roomSelect").addEventListener("change", (event) => {
  activeRoomId = event.target.value;
  selectedShelfId = state.shelves.find((shelf) => shelf.roomId === activeRoomId)?.id;
  render();
});

$("#toggleEditMap").addEventListener("click", () => {
  editMap = !editMap;
  $("#toggleEditMap").textContent = editMap ? "完成编辑" : "编辑布局";
  renderMap();
});

$("#addShelf").addEventListener("click", () => {
  const roomShelves = state.shelves.filter((shelf) => shelf.roomId === activeRoomId);
  const code = prompt("请输入货架号，例如 A-7");
  if (!code) return;
  const shelf = {
    id: uid("s"),
    roomId: activeRoomId,
    code,
    name: `${code} 货架`,
    x: 12 + (roomShelves.length % 3) * 26,
    y: 42 + Math.floor(roomShelves.length / 3) * 18,
    w: 22,
    h: 16
  };
  state.shelves.push(shelf);
  selectedShelfId = shelf.id;
  render();
});

$("#warehouseMap").addEventListener("pointerdown", (event) => {
  const node = event.target.closest(".shelf-node");
  if (!node || !editMap) return;
  const shelf = state.shelves.find((item) => item.id === node.dataset.shelfId);
  if (!shelf) return;
  node.setPointerCapture(event.pointerId);
  const rect = $("#warehouseMap").getBoundingClientRect();
  dragState = {
    shelf,
    node,
    rect,
    startX: event.clientX,
    startY: event.clientY,
    originalX: shelf.x,
    originalY: shelf.y
  };
  node.classList.add("dragging");
});

$("#warehouseMap").addEventListener("pointermove", (event) => {
  if (!dragState) return;
  const dx = ((event.clientX - dragState.startX) / dragState.rect.width) * 100;
  const dy = ((event.clientY - dragState.startY) / dragState.rect.height) * 100;
  const maxX = 100 - dragState.shelf.w;
  const maxY = 100 - dragState.shelf.h;
  dragState.shelf.x = Math.max(0, Math.min(maxX, dragState.originalX + dx));
  dragState.shelf.y = Math.max(9, Math.min(maxY, dragState.originalY + dy));
  dragState.node.style.left = `${dragState.shelf.x}%`;
  dragState.node.style.top = `${dragState.shelf.y}%`;
});

$("#warehouseMap").addEventListener("pointerup", () => {
  if (!dragState) return;
  dragState.node.classList.remove("dragging");
  selectedShelfId = dragState.shelf.id;
  dragState = null;
  render();
});

["mapProductFilter", "inventorySearch", "inventoryRoom", "inventoryShelf", "recordSearch", "analyticsDays", "analyticsRoom"].forEach((id) => {
  $(`#${id}`).addEventListener("input", () => {
    if (id === "inventoryRoom") fillShelfSelect($("#inventoryShelf"), "all", true);
    render();
  });
});

$("#addProduct").addEventListener("click", () => openProductDialog());
$("#cancelProduct").addEventListener("click", () => $("#productDialog").close());

$("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = $("#productId").value;
  const shelfId = $("#productShelf").value;
  if (!canEditShelf(shelfId)) return alert("当前人员没有这个货架的编辑权限。");
  const payload = {
    vehicle: $("#productVehicle").value.trim(),
    model: $("#productModel").value.trim(),
    image: $("#productImage").value.trim(),
    android: $("#productAndroid").value.trim(),
    storage: $("#productStorage").value.trim(),
    shelfId,
    stock: Number($("#productStock").value || 0),
    note: $("#productNote").value.trim()
  };
  if (id) {
    const product = state.products.find((item) => item.id === id);
    Object.assign(product, payload);
  } else {
    state.products.push({ id: uid("p"), ...payload });
  }
  $("#productDialog").close();
  render();
});

$("#movementForm").addEventListener("submit", (event) => {
  event.preventDefault();
  addMovement({
    productId: $("#movementProduct").value,
    type: $("#movementType").value,
    qty: Number($("#movementQty").value),
    at: $("#movementTime").value,
    note: $("#movementNote").value.trim()
  });
  $("#movementQty").value = 1;
  $("#movementNote").value = "";
  $("#movementTime").value = todayInputValue();
});

$("#userForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.users.push({
    id: uid("u"),
    name: $("#userName").value.trim(),
    role: $("#userRole").value,
    shelfIds: []
  });
  $("#userName").value = "";
  render();
});

$("#userPermissionList").addEventListener("change", (event) => {
  const box = event.target.closest("[data-user-shelf]");
  if (!box) return;
  const [userId, shelfId] = box.dataset.userShelf.split(":");
  const user = state.users.find((item) => item.id === userId);
  if (!user || user.role === "admin") return;
  if (box.checked && !user.shelfIds.includes(shelfId)) user.shelfIds.push(shelfId);
  if (!box.checked) user.shelfIds = user.shelfIds.filter((id) => id !== shelfId);
  render();
});

$("#resetDemo").addEventListener("click", () => {
  if (!confirm("确认恢复示例数据？当前浏览器里的修改会被覆盖。")) return;
  state = structuredClone(starterData);
  activeRoomId = state.rooms[0].id;
  selectedShelfId = state.shelves.find((shelf) => shelf.roomId === activeRoomId)?.id;
  render();
});

$("#exportJson").addEventListener("click", downloadJson);

$("#movementTime").value = todayInputValue();
setActiveView(activeView);
render();
