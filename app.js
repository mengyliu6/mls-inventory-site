const STORAGE_KEY = "warehouse-inventory-v2";
const SLOT_COUNT = 8;
const colors = ["#2563eb", "#16a34a", "#ea580c", "#0891b2", "#7c3aed", "#dc2626"];

const starterData = {
  users: [
    { id: "u-admin", name: "管理员", role: "admin", rackIds: [] },
    { id: "u-wendy", name: "Wendy", role: "editor", rackIds: ["rack-1-b1", "rack-2-a1"] },
    { id: "u-hai", name: "Hai", role: "editor", rackIds: ["rack-2-b1", "rack-3-c1"] },
    { id: "u-viewer", name: "仓库查看", role: "viewer", rackIds: [] }
  ],
  activeUserId: "u-admin",
  rooms: [
    { id: "room-1", name: "房间1", note: "主库存区" },
    { id: "room-2", name: "房间2", note: "仪表与主机区" },
    { id: "room-3", name: "房间3", note: "屏幕与面板区" },
    { id: "room-4", name: "房间4", note: "备货与临时周转区" }
  ],
  shelves: [
    { id: "rack-1-b1", roomId: "room-1", code: "B1", name: "B1 大货架", x: 8, y: 16, w: 25, h: 27 },
    { id: "rack-1-b2", roomId: "room-1", code: "B2", name: "B2 大货架", x: 39, y: 16, w: 25, h: 27 },
    { id: "rack-1-b3", roomId: "room-1", code: "B3", name: "B3 大货架", x: 70, y: 16, w: 22, h: 27 },
    { id: "rack-2-a1", roomId: "room-2", code: "A1", name: "A1 大货架", x: 8, y: 18, w: 26, h: 28 },
    { id: "rack-2-a2", roomId: "room-2", code: "A2", name: "A2 大货架", x: 40, y: 18, w: 26, h: 28 },
    { id: "rack-2-b1", roomId: "room-2", code: "B1", name: "B1 大货架", x: 70, y: 18, w: 22, h: 28 },
    { id: "rack-3-c1", roomId: "room-3", code: "C1", name: "C1 大货架", x: 10, y: 20, w: 26, h: 30 },
    { id: "rack-3-c2", roomId: "room-3", code: "C2", name: "C2 大货架", x: 44, y: 20, w: 26, h: 30 },
    { id: "rack-4-d1", roomId: "room-4", code: "D1", name: "D1 大货架", x: 12, y: 18, w: 28, h: 30 },
    { id: "rack-4-d2", roomId: "room-4", code: "D2", name: "D2 大货架", x: 52, y: 18, w: 28, h: 30 }
  ],
  products: [
    { id: "p-1", vehicle: "GMC 索罗德仪表 14-18", model: "JT5-1370", image: "", android: "Linux", storage: "无", slotId: "rack-2-a1:2", note: "一台在直播间", stock: 8 },
    { id: "p-2", vehicle: "凯迪拉克凯雷德 07-14", model: "JT5-1508", image: "", android: "Linux", storage: "无", slotId: "rack-2-a1:4", note: "一台在直播间", stock: 13 },
    { id: "p-3", vehicle: "福特 F150 仪表 15-21", model: "JT5-1397", image: "", android: "Linux", storage: "无", slotId: "rack-2-a2:6", note: "直播样机", stock: 10 },
    { id: "p-4", vehicle: "BMW E65/E66", model: "JT5-1303", image: "", android: "Linux", storage: "无", slotId: "rack-2-b1:3", note: "", stock: 3 },
    { id: "p-5", vehicle: "4Runner 2010-2022", model: "WE-8103", image: "", android: "安卓12", storage: "6+128", slotId: "rack-1-b1:8", note: "亮黑", stock: 5 },
    { id: "p-6", vehicle: "Tacoma 2016-2022", model: "WE-8106A", image: "", android: "安卓12", storage: "4+64", slotId: "rack-1-b1:7", note: "枪色+电镀银", stock: 1 },
    { id: "p-7", vehicle: "Grand Cherokee 2014-2022", model: "WE-8504", image: "", android: "安卓14", storage: "8+128", slotId: "rack-1-b2:8", note: "", stock: 30 },
    { id: "p-8", vehicle: "14-20 GX", model: "16GXSI", image: "", android: "Linux", storage: "", slotId: "rack-1-b1:1", note: "", stock: 100 },
    { id: "p-9", vehicle: "玛莎拉蒂 GT 2007-2020", model: "10.4 1024*768", image: "", android: "安卓13", storage: "6+128", slotId: "rack-3-c1:2", note: "黑色", stock: 2 },
    { id: "p-10", vehicle: "保时捷卡宴 PCM3.0/3.1", model: "12.3 1920*720", image: "", android: "安卓12", storage: "8+128", slotId: "rack-3-c2:6", note: "", stock: 6 },
    { id: "p-11", vehicle: "GX460 10-16", model: "10.25 1920*720", image: "", android: "安卓12", storage: "4+64", slotId: "rack-3-c1:2", note: "", stock: 1 }
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
let selectedRackId = state.shelves.find((rack) => rack.roomId === activeRoomId)?.id;
let openedRackId = null;
let editMap = false;
let dragState = null;
let lastSlotPulse = null;
let pulseTimer = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(starterData);
  try {
    const parsed = JSON.parse(saved);
    return parsed.rooms && parsed.shelves && parsed.products ? normalizeState(parsed) : structuredClone(starterData);
  } catch {
    return structuredClone(starterData);
  }
}

function normalizeState(data) {
  data.users = data.users.map((user) => ({
    ...user,
    rackIds: user.rackIds || user.shelfIds || []
  }));
  data.products = data.products.map((product) => ({
    ...product,
    slotId: product.slotId || `${product.shelfId || data.shelves[0]?.id}:1`
  }));
  return data;
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

function rackSlots(rack) {
  return Array.from({ length: SLOT_COUNT }, (_, index) => {
    const number = index + 1;
    const level = Math.floor(index / 2) + 1;
    const side = index % 2 === 0 ? "左" : "右";
    return {
      id: `${rack.id}:${number}`,
      label: `${rack.code}-${number}`,
      level,
      side
    };
  });
}

function productRack(product) {
  const rackId = product.slotId?.split(":")[0];
  return state.shelves.find((rack) => rack.id === rackId);
}

function productSlot(product) {
  const rack = productRack(product);
  if (!rack) return null;
  return rackSlots(rack).find((slot) => slot.id === product.slotId);
}

function rackProducts(rackId) {
  return state.products.filter((product) => product.slotId?.startsWith(`${rackId}:`));
}

function slotProducts(slotId) {
  return state.products.filter((product) => product.slotId === slotId);
}

function productMovements(productId) {
  return state.movements.filter((movement) => movement.productId === productId);
}

function movementTotal(productId, type) {
  return productMovements(productId)
    .filter((movement) => movement.type === type)
    .reduce((sum, movement) => sum + movement.qty, 0);
}

function canEditRack(rackId) {
  const user = activeUser();
  return user.role === "admin" || (user.role === "editor" && user.rackIds.includes(rackId));
}

function canEditProduct(product) {
  return canEditRack(productRack(product)?.id);
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
  if ($("#rackDialog").open) renderRackDialog();
}

function renderUsers() {
  $("#activeUser").innerHTML = state.users
    .map((user) => `<option value="${user.id}" ${user.id === state.activeUserId ? "selected" : ""}>${user.name} · ${roleName(user.role)}</option>`)
    .join("");
}

function roleName(role) {
  return { admin: "管理员", editor: "编辑", viewer: "只读" }[role] || role;
}

function permissionText() {
  const user = activeUser();
  if (user.role === "admin") return "管理员可以编辑全部房间、大货架、货位、产品与记录。";
  if (user.role === "viewer") return "当前账号为只读查看，不能保存出入库或修改产品。";
  const racks = state.shelves.filter((rack) => user.rackIds.includes(rack.id)).map((rack) => rack.code);
  return `可编辑大货架：${racks.join("、") || "暂无"}`;
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
  fillSlotSelect($("#inventoryShelf"), $("#inventoryShelf").value || "all", true);
  fillSlotSelect($("#productShelf"), $("#productShelf").value || defaultSlotId(), false);
}

function fillRoomSelect(select, selected, includeAll) {
  const all = includeAll ? `<option value="all">全部房间</option>` : "";
  select.innerHTML = all + state.rooms.map((room) => `<option value="${room.id}">${room.name}</option>`).join("");
  select.value = selected && [...select.options].some((option) => option.value === selected) ? selected : select.options[0]?.value;
}

function fillSlotSelect(select, selected, includeAll) {
  const roomFilter = $("#inventoryRoom")?.value;
  const racks = includeAll && roomFilter && roomFilter !== "all"
    ? state.shelves.filter((rack) => rack.roomId === roomFilter)
    : state.shelves;
  const options = racks.flatMap((rack) => rackSlots(rack).map((slot) => ({ rack, slot })));
  const all = includeAll ? `<option value="all">全部货位</option>` : "";
  select.innerHTML = all + options.map(({ slot }) => `<option value="${slot.id}">${slot.label} · 第${slot.level}层${slot.side}</option>`).join("");
  select.value = selected && [...select.options].some((option) => option.value === selected) ? selected : select.options[0]?.value;
}

function defaultSlotId() {
  const rack = state.shelves.find((item) => item.id === selectedRackId) || state.shelves[0];
  return rack ? rackSlots(rack)[0].id : "";
}

function renderMap() {
  const map = $("#warehouseMap");
  const room = state.rooms.find((item) => item.id === activeRoomId) || state.rooms[0];
  const query = $("#mapProductFilter").value.trim().toLowerCase();
  const racks = state.shelves.filter((rack) => rack.roomId === room.id);
  map.innerHTML = `<div class="map-room-title">${room.name}<br><small>${room.note || ""}</small></div>`;
  racks.forEach((rack) => {
    const products = rackProducts(rack.id);
    const visible = !query || rack.code.toLowerCase().includes(query) || products.some((product) => {
      const slot = productSlot(product);
      return [product.vehicle, product.model, product.note, slot?.label].join(" ").toLowerCase().includes(query);
    });
    if (!visible) return;
    const stock = products.reduce((sum, product) => sum + product.stock, 0);
    const occupied = rackSlots(rack).filter((slot) => slotProducts(slot.id).length).length;
    const node = document.createElement("button");
    node.type = "button";
    node.className = `shelf-node ${editMap ? "can-drag" : ""} ${selectedRackId === rack.id ? "selected" : ""}`;
    node.dataset.rackId = rack.id;
    node.style.left = `${rack.x}%`;
    node.style.top = `${rack.y}%`;
    node.style.width = `${rack.w}%`;
    node.style.height = `${rack.h}%`;
    const previewProducts = products.slice(0, 4);
    const moreCount = Math.max(0, products.length - previewProducts.length);
    node.innerHTML = `
      <div class="shelf-head"><span>${rack.code}</span><span>${occupied}/8 货位</span></div>
      <div class="shelf-body">
        ${previewProducts.length ? `
          <div class="rack-product-preview">
            ${previewProducts.map((product) => `<span title="${product.vehicle}">${product.vehicle}<strong>${product.stock}</strong></span>`).join("")}
            ${moreCount ? `<em>还有 ${moreCount} 款</em>` : ""}
          </div>
        ` : `<span class="empty-rack">暂无产品</span>`}
      </div>
      <div class="shelf-foot"><span>${canEditRack(rack.id) ? "可编辑" : "只读"}</span><span>${editMap ? "拖拽" : "点开"}</span></div>
    `;
    map.appendChild(node);
  });
  renderInspector();
}

function renderInspector() {
  const rack = state.shelves.find((item) => item.id === selectedRackId);
  const title = $("#inspectorTitle");
  const body = $("#inspectorBody");
  if (!rack) {
    title.textContent = "选择一个大货架";
    body.innerHTML = `<p class="empty-state">点击图中的大货架，可以查看 8 个货位、产品库存和最近出入库情况。</p>`;
    return;
  }
  const products = rackProducts(rack.id);
  const stock = products.reduce((sum, product) => sum + product.stock, 0);
  title.textContent = `${rack.code}`;
  body.innerHTML = `
    <div class="mini-product">
      <strong>大货架结构</strong>
      <p>上下四层、左右两列，共 8 个货位：${rack.code}-1 到 ${rack.code}-8。</p>
      <p>当前产品 ${products.length} 款，总库存 ${stock}。</p>
      <button class="primary-button" type="button" data-open-rack="${rack.id}">打开货位详情</button>
    </div>
    ${rackSlots(rack).map((slot) => {
      const slotStock = slotProducts(slot.id).reduce((sum, product) => sum + product.stock, 0);
      return `<div class="mini-product"><strong>${slot.label}</strong><p>第${slot.level}层${slot.side} · ${slotProducts(slot.id).length} 款产品 · 库存 ${slotStock}</p></div>`;
    }).join("")}
  `;
}

function renderRackDialog() {
  const rack = state.shelves.find((item) => item.id === openedRackId);
  if (!rack) return;
  const products = rackProducts(rack.id);
  $("#rackDialogTitle").textContent = rack.code;
  $("#rackDialogMeta").textContent = `上下四层、左右两列，共 8 个货位；当前 ${products.length} 款产品，总库存 ${products.reduce((sum, product) => sum + product.stock, 0)}`;
  $("#rackSlotGrid").innerHTML = rackSlots(rack).map((slot) => {
    const list = slotProducts(slot.id);
    return `
      <section class="slot-card ${lastSlotPulse?.slotId === slot.id ? `slot-pulse ${lastSlotPulse.type === "in" ? "pulse-in" : "pulse-out"}` : ""}">
        <h4><span>${slot.label}</span><span class="tag">第${slot.level}层${slot.side}</span></h4>
        ${lastSlotPulse?.slotId === slot.id ? `<div class="slot-pulse-badge">${lastSlotPulse.type === "in" ? "入库" : "出库"} ${lastSlotPulse.type === "in" ? "+" : "-"}${lastSlotPulse.qty}</div>` : ""}
        <div class="slot-products">
          ${list.map((product) => `
            <article class="slot-product ${lastSlotPulse?.productId === product.id ? "product-flash" : ""}">
              <div>
                <strong>${product.vehicle}</strong>
                <small>${product.model} · 库存 <b>${product.stock}</b></small>
              </div>
              <div class="slot-product-actions">
                <input type="number" min="1" value="1" data-slot-qty="${product.id}" aria-label="数量">
                <button type="button" data-slot-action="in" data-product-id="${product.id}" ${canEditProduct(product) ? "" : "disabled"}>入库</button>
                <button type="button" data-slot-action="out" data-product-id="${product.id}" ${canEditProduct(product) && product.stock > 0 ? "" : "disabled"}>出库</button>
                <button type="button" data-edit-product="${product.id}" ${canEditProduct(product) ? "" : "disabled"}>编辑</button>
              </div>
            </article>
          `).join("") || `<p class="empty-state">暂无产品，可在库存表格中新增并分配到 ${slot.label}。</p>`}
        </div>
      </section>
    `;
  }).join("");
}

function renderInventory() {
  const query = $("#inventorySearch").value.trim().toLowerCase();
  const roomId = $("#inventoryRoom").value || "all";
  const slotId = $("#inventoryShelf").value || "all";
  const products = state.products.filter((product) => {
    const rack = productRack(product);
    const slot = productSlot(product);
    const matchesRoom = roomId === "all" || rack?.roomId === roomId;
    const matchesSlot = slotId === "all" || product.slotId === slotId;
    const matchesQuery = !query || [product.vehicle, product.model, product.note, product.android, product.storage, rack?.code, slot?.label].join(" ").toLowerCase().includes(query);
    return matchesRoom && matchesSlot && matchesQuery;
  });
  $("#inventoryTable").innerHTML = products.map((product, index) => {
    const slot = productSlot(product);
    const editable = canEditProduct(product);
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${product.vehicle}</td>
        <td><strong>${product.model}</strong></td>
        <td>${product.image ? `<img class="product-thumb" src="${product.image}" alt="${product.vehicle}">` : `<span class="placeholder-thumb">图片</span>`}</td>
        <td><span class="tag ${product.android.includes("14") ? "orange" : "green"}">${product.android || "未填"}</span></td>
        <td><span class="tag cyan">${product.storage || "无"}</span></td>
        <td><span class="tag">${slot?.label || "未分配"}</span></td>
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
    const slot = productSlot(product);
    return `<option value="${product.id}">${product.model} · ${product.vehicle} · ${slot?.label || "未分配"} · 库存 ${product.stock}</option>`;
  }).join("");
}

function renderRecords() {
  const query = $("#recordSearch").value.trim().toLowerCase();
  const records = [...state.movements].sort((a, b) => b.at.localeCompare(a.at)).filter((record) => {
    const product = state.products.find((item) => item.id === record.productId);
    const user = state.users.find((item) => item.id === record.userId);
    const slot = product ? productSlot(product) : null;
    return !query || [product?.vehicle, product?.model, user?.name, record.note, slot?.label].join(" ").toLowerCase().includes(query);
  });
  $("#recordList").innerHTML = records.map((record) => {
    const product = state.products.find((item) => item.id === record.productId);
    const user = state.users.find((item) => item.id === record.userId);
    const slot = product ? productSlot(product) : null;
    return `
      <article class="record-item">
        <span class="record-type ${record.type}">${record.type === "in" ? "入库" : "出库"}</span>
        <div class="record-main">
          <strong>${product?.model || "已删除产品"} · ${product?.vehicle || ""}</strong>
          <span>${slot?.label || "未分配"} · ${user?.name || "未知人员"} · ${formatDateTime(record.at)} · ${record.note || "无备注"}</span>
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
    const rack = productRack(product);
    return roomId === "all" || rack?.roomId === roomId;
  });
  const productIds = new Set(scopedProducts.map((product) => product.id));
  const records = state.movements.filter((movement) => productIds.has(movement.productId) && new Date(movement.at) >= from);
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
    const rack = productRack(product);
    const room = state.rooms.find((item) => item.id === rack?.roomId);
    const name = room?.name || "未分配";
    byRoom[name] = (byRoom[name] || 0) + product.stock;
  });
  const entries = Object.entries(byRoom).filter(([, value]) => value > 0);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  let cursor = 0;
  const segments = entries.map(([, value], index) => {
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
  $("#userPermissionList").innerHTML = state.users.map((user) => `
    <article class="user-card">
      <div class="user-card-head">
        <strong>${user.name}</strong>
        <span class="tag ${user.role === "admin" ? "orange" : user.role === "viewer" ? "red" : "green"}">${roleName(user.role)}</span>
      </div>
      <div class="permission-grid">
        ${state.shelves.map((rack) => `
          <label>
            <input type="checkbox" data-user-rack="${user.id}:${rack.id}" ${user.role === "admin" || user.rackIds.includes(rack.id) ? "checked" : ""} ${user.role === "admin" ? "disabled" : ""}>
            ${rack.code}
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

function openRackDialog(rackId) {
  openedRackId = rackId;
  renderRackDialog();
  $("#rackDialog").showModal();
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
  $("#productShelf").value = product?.slotId || defaultSlotId();
  $("#productStock").value = product?.stock ?? 0;
  $("#productNote").value = product?.note || "";
  $("#productDialog").showModal();
}

function addMovement({ productId, type, qty, at, note }) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return alert("产品不存在。");
  if (!canEditProduct(product)) return alert("当前人员没有这个大货架的编辑权限。");
  if (type === "out" && product.stock < qty) return alert("库存不足，不能出库。");
  product.stock += type === "in" ? qty : -qty;
  state.movements.push({ id: uid("m"), productId, type, qty, at, note, userId: state.activeUserId });
  lastSlotPulse = { slotId: product.slotId, productId, type, qty };
  clearTimeout(pulseTimer);
  pulseTimer = setTimeout(() => {
    lastSlotPulse = null;
    renderMap();
    if ($("#rackDialog").open) renderRackDialog();
  }, 1400);
  render();
}

function adjustFromSlot(productId, type) {
  const input = $(`[data-slot-qty="${productId}"]`);
  const qty = Math.max(1, Number(input?.value || 1));
  addMovement({
    productId,
    type,
    qty,
    at: todayInputValue(),
    note: "仓库图示直接操作"
  });
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

  const rackNode = event.target.closest(".shelf-node");
  if (rackNode && !dragState) {
    selectedRackId = rackNode.dataset.rackId;
    renderMap();
    if (!editMap) openRackDialog(selectedRackId);
  }

  const openRack = event.target.closest("[data-open-rack]");
  if (openRack) openRackDialog(openRack.dataset.openRack);

  const editProduct = event.target.closest("[data-edit-product]");
  if (editProduct) {
    if ($("#rackDialog").open) $("#rackDialog").close();
    openProductDialog(editProduct.dataset.editProduct);
  }

  const slotAction = event.target.closest("[data-slot-action]");
  if (slotAction) {
    adjustFromSlot(slotAction.dataset.productId, slotAction.dataset.slotAction);
    return;
  }

  const quickOut = event.target.closest("[data-quick-out]");
  if (quickOut) {
    const productId = quickOut.dataset.quickOut || quickOut.dataset.slotOut;
    const product = state.products.find((item) => item.id === productId);
    $("#movementType").value = "out";
    $("#movementProduct").value = product.id;
    $("#movementQty").value = 1;
    $("#movementTime").value = todayInputValue();
    setActiveView("movement");
    if ($("#rackDialog").open) $("#rackDialog").close();
  }
});

$("#activeUser").addEventListener("change", (event) => {
  state.activeUserId = event.target.value;
  render();
});

$("#roomSelect").addEventListener("change", (event) => {
  activeRoomId = event.target.value;
  selectedRackId = state.shelves.find((rack) => rack.roomId === activeRoomId)?.id;
  render();
});

$("#toggleEditMap").addEventListener("click", () => {
  editMap = !editMap;
  $("#toggleEditMap").textContent = editMap ? "完成编辑" : "编辑布局";
  renderMap();
});

$("#addShelf").addEventListener("click", () => {
  const roomRacks = state.shelves.filter((rack) => rack.roomId === activeRoomId);
  const code = prompt("请输入大货架编号，例如 B4");
  if (!code) return;
  const rack = {
    id: uid("rack"),
    roomId: activeRoomId,
    code,
    name: `${code} 大货架`,
    x: 10 + (roomRacks.length % 3) * 30,
    y: 48 + Math.floor(roomRacks.length / 3) * 20,
    w: 24,
    h: 26
  };
  state.shelves.push(rack);
  selectedRackId = rack.id;
  render();
});

$("#warehouseMap").addEventListener("pointerdown", (event) => {
  const node = event.target.closest(".shelf-node");
  if (!node || !editMap) return;
  const rack = state.shelves.find((item) => item.id === node.dataset.rackId);
  if (!rack) return;
  node.setPointerCapture(event.pointerId);
  const rect = $("#warehouseMap").getBoundingClientRect();
  dragState = {
    rack,
    node,
    rect,
    startX: event.clientX,
    startY: event.clientY,
    originalX: rack.x,
    originalY: rack.y
  };
  node.classList.add("dragging");
});

$("#warehouseMap").addEventListener("pointermove", (event) => {
  if (!dragState) return;
  const dx = ((event.clientX - dragState.startX) / dragState.rect.width) * 100;
  const dy = ((event.clientY - dragState.startY) / dragState.rect.height) * 100;
  const maxX = 100 - dragState.rack.w;
  const maxY = 100 - dragState.rack.h;
  dragState.rack.x = Math.max(0, Math.min(maxX, dragState.originalX + dx));
  dragState.rack.y = Math.max(9, Math.min(maxY, dragState.originalY + dy));
  dragState.node.style.left = `${dragState.rack.x}%`;
  dragState.node.style.top = `${dragState.rack.y}%`;
});

$("#warehouseMap").addEventListener("pointerup", () => {
  if (!dragState) return;
  dragState.node.classList.remove("dragging");
  selectedRackId = dragState.rack.id;
  dragState = null;
  render();
});

["mapProductFilter", "inventorySearch", "inventoryRoom", "inventoryShelf", "recordSearch", "analyticsDays", "analyticsRoom"].forEach((id) => {
  $(`#${id}`).addEventListener("input", () => {
    if (id === "inventoryRoom") fillSlotSelect($("#inventoryShelf"), "all", true);
    render();
  });
});

$("#addProduct").addEventListener("click", () => openProductDialog());
$("#cancelProduct").addEventListener("click", () => $("#productDialog").close());
$("#closeRackDialog").addEventListener("click", () => $("#rackDialog").close());

$("#productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = $("#productId").value;
  const slotId = $("#productShelf").value;
  const rackId = slotId.split(":")[0];
  if (!canEditRack(rackId)) return alert("当前人员没有这个大货架的编辑权限。");
  const payload = {
    vehicle: $("#productVehicle").value.trim(),
    model: $("#productModel").value.trim(),
    image: $("#productImage").value.trim(),
    android: $("#productAndroid").value.trim(),
    storage: $("#productStorage").value.trim(),
    slotId,
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
    rackIds: []
  });
  $("#userName").value = "";
  render();
});

$("#userPermissionList").addEventListener("change", (event) => {
  const box = event.target.closest("[data-user-rack]");
  if (!box) return;
  const [userId, rackId] = box.dataset.userRack.split(":");
  const user = state.users.find((item) => item.id === userId);
  if (!user || user.role === "admin") return;
  if (box.checked && !user.rackIds.includes(rackId)) user.rackIds.push(rackId);
  if (!box.checked) user.rackIds = user.rackIds.filter((id) => id !== rackId);
  render();
});

$("#resetDemo").addEventListener("click", () => {
  if (!confirm("确认恢复示例数据？当前浏览器里的修改会被覆盖。")) return;
  state = structuredClone(starterData);
  activeRoomId = state.rooms[0].id;
  selectedRackId = state.shelves.find((rack) => rack.roomId === activeRoomId)?.id;
  render();
});

$("#exportJson").addEventListener("click", downloadJson);

$("#movementTime").value = todayInputValue();
setActiveView(activeView);
render();
