const STORAGE_KEY = "warehouse-inventory-v2";
const SLOT_COUNT = 8;

const starterData = {
  users: [
    { id: "u-admin", name: "管理员", role: "admin", rackIds: [] },
    { id: "u-wendy", name: "Wendy", role: "editor", rackIds: ["rack-1-b1", "rack-2-a1"] },
    { id: "u-hai", name: "Hai", role: "editor", rackIds: ["rack-2-b1", "rack-3-c1"] },
    { id: "u-viewer", name: "仓库查看", role: "viewer", rackIds: [] }
  ],
  salesPeople: ["Wendy", "Hai", "Abby"],
  fieldOptions: {
    android: ["Linux", "安卓12", "安卓13", "安卓14"],
    storage: ["无", "4+64", "6+128", "8+128"]
  },
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
let pendingMovement = null;
let inventoryPage = 1;

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
  data.salesPeople = data.salesPeople || ["Wendy", "Hai", "Abby"];
  data.fieldOptions = data.fieldOptions || { android: [], storage: [] };
  ["android", "storage"].forEach((field) => {
    const fromProducts = data.products.map((product) => product[field]).filter(Boolean);
    data.fieldOptions[field] = [...new Set([...(data.fieldOptions[field] || []), ...fromProducts])].sort();
  });
  data.users = data.users.map((user) => ({
    ...user,
    rackIds: user.rackIds || user.shelfIds || []
  }));
  data.products = data.products.map((product) => ({
    ...product,
    slotId: product.slotId || `${product.shelfId || data.shelves[0]?.id}:1`
  }));
  data.movements = data.movements.map((movement) => ({
    ...movement,
    stockBefore: movement.stockBefore ?? null,
    stockAfter: movement.stockAfter ?? null
  }));
  return data;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
  renderSalesPeople();
  renderFieldOptions();
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
  fillAnalyticsRackSelect();
  fillSlotSelect($("#inventoryShelf"), $("#inventoryShelf").value || "all", true);
  fillSlotSelect($("#productShelf"), $("#productShelf").value || defaultSlotId(), false);
  fillSystemSelect();
}

function fillAnalyticsRackSelect() {
  const select = $("#analyticsRack");
  if (!select) return;
  const selected = select.value || "all";
  const roomId = $("#analyticsRoom").value || "all";
  const racks = state.shelves.filter((rack) => roomId === "all" || rack.roomId === roomId);
  select.innerHTML = `<option value="all">全部大货架</option>` + racks.map((rack) => `<option value="${rack.id}">${rack.code}</option>`).join("");
  select.value = selected === "all" || racks.some((rack) => rack.id === selected) ? selected : "all";
}

function fillSystemSelect() {
  const select = $("#inventorySystem");
  if (!select) return;
  const selected = select.value || "all";
  const systems = [...new Set([...(state.fieldOptions.android || []), ...state.products.map((product) => product.android || "未填")])].sort();
  select.innerHTML = `<option value="all">全部系统</option>` + systems.map((system) => `<option value="${system}">${system}</option>`).join("");
  select.value = systems.includes(selected) || selected === "all" ? selected : "all";
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
        ${lastSlotPulse?.slotId === slot.id ? `
          <div class="slot-flow-overlay ${lastSlotPulse.type === "in" ? "flow-in" : "flow-out"}">
            <strong>${lastSlotPulse.type === "in" ? "入库" : "出库"} ${lastSlotPulse.type === "in" ? "+" : "-"}${lastSlotPulse.qty}</strong>
            <span>${lastSlotPulse.beforeStock} → ${lastSlotPulse.afterStock}</span>
          </div>
        ` : ""}
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
  const system = $("#inventorySystem")?.value || "all";
  const stockStatus = $("#inventoryStock")?.value || "all";
  const pageSize = Number($("#inventoryPageSize")?.value || 20);
  const products = state.products.filter((product) => {
    const rack = productRack(product);
    const slot = productSlot(product);
    const matchesRoom = roomId === "all" || rack?.roomId === roomId;
    const matchesSlot = slotId === "all" || product.slotId === slotId;
    const matchesSystem = system === "all" || (product.android || "未填") === system;
    const matchesStock = stockStatus === "all" || (stockStatus === "low" && product.stock > 0 && product.stock <= 2) || (stockStatus === "empty" && product.stock <= 0);
    const matchesQuery = !query || [product.vehicle, product.model, product.note, product.android, product.storage, rack?.code, slot?.label].join(" ").toLowerCase().includes(query);
    return matchesRoom && matchesSlot && matchesSystem && matchesStock && matchesQuery;
  });
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  inventoryPage = Math.min(Math.max(1, inventoryPage), totalPages);
  const pageProducts = products.slice((inventoryPage - 1) * pageSize, inventoryPage * pageSize);
  $("#inventoryPageInfo").textContent = `第 ${inventoryPage} / ${totalPages} 页 · 共 ${products.length} 款`;
  $("#prevInventoryPage").disabled = inventoryPage <= 1;
  $("#nextInventoryPage").disabled = inventoryPage >= totalPages;
  $("#inventoryTable").innerHTML = pageProducts.map((product, index) => {
    const slot = productSlot(product);
    const editable = canEditProduct(product);
    return `
      <tr>
        <td>${(inventoryPage - 1) * pageSize + index + 1}</td>
        <td><input class="table-edit" data-product-field="${product.id}:vehicle" value="${escapeAttr(product.vehicle)}" ${editable ? "" : "disabled"}></td>
        <td><input class="table-edit strong-edit" data-product-field="${product.id}:model" value="${escapeAttr(product.model)}" ${editable ? "" : "disabled"}></td>
        <td>${product.image ? `<img class="product-thumb" src="${product.image}" alt="${product.vehicle}">` : `<span class="placeholder-thumb">图片</span>`}</td>
        <td>${comboCell(product, "android", "", editable)}</td>
        <td>${comboCell(product, "storage", "", editable)}</td>
        <td><select class="table-edit" data-product-field="${product.id}:slotId" ${editable ? "" : "disabled"}>${slotOptions(product.slotId)}</select></td>
        <td><input class="table-edit" data-product-field="${product.id}:note" value="${escapeAttr(product.note || "")}" ${editable ? "" : "disabled"}></td>
        <td>${movementTotal(product.id, "in")}</td>
        <td>${movementTotal(product.id, "out")}</td>
        <td><input class="table-edit stock-edit ${product.stock <= 0 ? "heat-empty" : product.stock <= 2 ? "heat-low" : "heat-good"}" type="number" min="0" data-product-field="${product.id}:stock" value="${product.stock}" ${editable ? "" : "disabled"}></td>
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

function slotOptions(selectedSlotId) {
  return state.shelves.flatMap((rack) => rackSlots(rack).map((slot) => {
    return `<option value="${slot.id}" ${slot.id === selectedSlotId ? "selected" : ""}>${slot.label}</option>`;
  })).join("");
}

function comboCell(product, field, extraClass, editable) {
  const value = product[field] || "";
  return `<input class="table-edit combo-input ${extraClass}" data-combo-source="${field}" data-product-field="${product.id}:${field}" value="${escapeAttr(value)}" autocomplete="off" ${editable ? "" : "disabled"}>`;
}

function fieldLabel(field) {
  return { model: "型号", android: "系统版本", storage: "储存配置" }[field] || field;
}

function renderMovementForm() {
  const selectedProductId = $("#movementProduct").value;
  $("#movementProduct").innerHTML = state.products.map((product) => {
    const slot = productSlot(product);
    return `<option value="${product.id}">${product.model} · ${product.vehicle} · ${slot?.label || "未分配"} · 库存 ${product.stock}</option>`;
  }).join("");
  if (selectedProductId && state.products.some((product) => product.id === selectedProductId)) {
    $("#movementProduct").value = selectedProductId;
  }
  updateMovementPreview();
}

function selectedMovementProduct() {
  return state.products.find((product) => product.id === $("#movementProduct").value);
}

function updateMovementPreview() {
  const product = selectedMovementProduct();
  const type = $("#movementType").value;
  const qty = Math.max(1, Number($("#movementQty").value || 1));
  const isOut = type === "out";
  $("#movementSalesRow").classList.toggle("hidden", !isOut);
  $("#movementSalesPerson").required = isOut;
  $("#movementSubmitButton").textContent = isOut ? "预览并确认出库" : "预览并确认入库";
  if (!product) {
    $("#movementPreview").innerHTML = `<p class="empty-state">请选择产品。</p>`;
    return;
  }
  const slot = productSlot(product);
  const afterStock = isOut ? product.stock - qty : product.stock + qty;
  const invalidOut = isOut && afterStock < 0;
  $("#movementPreview").innerHTML = `
    <div class="preview-product">
      <strong>${product.vehicle}</strong>
      <span>${product.model} · ${slot?.label || "未分配货位"} · ${product.android || "未填"} · ${product.storage || "无"}</span>
    </div>
    <div class="preview-stock ${invalidOut ? "invalid" : ""}">
      <div><span>当前库存</span><strong>${product.stock}</strong></div>
      <div class="stock-arrow">→</div>
      <div><span>${isOut ? "出库后" : "入库后"}</span><strong>${afterStock}</strong></div>
    </div>
    ${invalidOut ? `<p class="preview-warning">库存不足，请调整出库数量。</p>` : ""}
  `;
}

function renderRecords() {
  const query = $("#recordSearch").value.trim().toLowerCase();
  const typeFilter = $("#recordTypeFilter")?.value || "all";
  const salesFilter = $("#recordSalesFilter")?.value || "all";
  const records = [...state.movements].sort((a, b) => b.at.localeCompare(a.at)).filter((record) => {
    const product = state.products.find((item) => item.id === record.productId);
    const user = state.users.find((item) => item.id === record.userId);
    const slot = product ? productSlot(product) : null;
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    const matchesSales = salesFilter === "all" || record.salesPerson === salesFilter;
    const matchesQuery = !query || [product?.vehicle, product?.model, user?.name, record.note, record.salesPerson, slot?.label].join(" ").toLowerCase().includes(query);
    return matchesType && matchesSales && matchesQuery;
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
          <span>${slot?.label || "未分配"} · ${user?.name || "未知人员"} · ${formatDateTime(record.at)}${record.stockBefore !== null ? ` · 库存 ${record.stockBefore}→${record.stockAfter}` : ""}${record.salesPerson ? ` · 销售：${record.salesPerson}` : ""} · ${record.note || "无备注"}</span>
        </div>
        <strong>${record.qty}</strong>
      </article>
    `;
  }).join("") || `<p class="empty-state">暂无记录。</p>`;
}

function renderAnalytics() {
  const days = Number($("#analyticsDays").value || 30);
  const roomId = $("#analyticsRoom").value || "all";
  const rackId = $("#analyticsRack").value || "all";
  const from = new Date();
  from.setDate(from.getDate() - days + 1);
  from.setHours(0, 0, 0, 0);
  const scopedProducts = state.products.filter((product) => {
    const rack = productRack(product);
    return (roomId === "all" || rack?.roomId === roomId) && (rackId === "all" || rack?.id === rackId);
  });
  const productIds = new Set(scopedProducts.map((product) => product.id));
  const records = state.movements.filter((movement) => productIds.has(movement.productId) && new Date(movement.at) >= from);
  renderSalesBars(records);
  renderOutboundStockBars(scopedProducts, records);
  renderInboundTimeline(records);
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

function renderOutboundStockBars(products, records) {
  const outboundProductIds = new Set(records.filter((record) => record.type === "out").map((record) => record.productId));
  const rows = products
    .filter((product) => outboundProductIds.has(product.id))
    .map((product) => {
      const latestOut = records
        .filter((record) => record.productId === product.id && record.type === "out")
        .sort((a, b) => b.at.localeCompare(a.at))[0];
      return { product, latestOut };
    })
    .sort((a, b) => b.latestOut.at.localeCompare(a.latestOut.at))
    .slice(0, 12);
  const max = Math.max(1, ...rows.map((row) => row.product.stock));
  $("#outboundStockBars").innerHTML = rows.map(({ product, latestOut }) => `
    <div class="bar-row">
      <span title="${product.vehicle}">${product.model}</span>
      <div class="bar-track"><div class="bar-fill version-fill" style="width: ${(product.stock / max) * 100}%"></div></div>
      <strong title="最近出库 ${latestOut.qty}，${formatDateTime(latestOut.at)}">${product.stock}</strong>
    </div>
  `).join("") || `<p class="empty-state">当前筛选条件下暂无出库后的库存数据。</p>`;
}

function renderInboundTimeline(records) {
  const rows = records
    .filter((record) => record.type === "in")
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 18);
  $("#inboundTimeline").innerHTML = rows.map((record) => {
    const product = state.products.find((item) => item.id === record.productId);
    const slot = product ? productSlot(product) : null;
    const before = record.stockBefore ?? "未知";
    const after = record.stockAfter ?? "未知";
    return `
      <article class="timeline-item">
        <time>${formatDateTime(record.at)}</time>
        <div>
          <strong>${product?.vehicle || "已删除产品"}</strong>
          <span>${product?.model || ""} · ${slot?.label || "未分配"} · 入库 ${record.qty} · 库存 ${before} → ${after}</span>
        </div>
      </article>
    `;
  }).join("") || `<p class="empty-state">当前筛选周期内暂无入库批次。</p>`;
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

function renderSalesPeople() {
  const selectedSales = $("#recordSalesFilter")?.value || "all";
  if ($("#recordSalesFilter")) {
    $("#recordSalesFilter").innerHTML = `<option value="all">全部销售</option>` + state.salesPeople.map((name) => `<option value="${escapeAttr(name)}">${name}</option>`).join("");
    $("#recordSalesFilter").value = selectedSales === "all" || state.salesPeople.includes(selectedSales) ? selectedSales : "all";
  }
  $("#salesPeopleList").innerHTML = state.salesPeople.map((name) => `
    <span class="sales-pill">${name}</span>
  `).join("") || `<p class="empty-state">暂无销售人员。</p>`;
}

function renderFieldOptions() {
  const labels = { android: "系统版本", storage: "储存配置" };
  $("#fieldOptionList").innerHTML = Object.entries(labels).map(([field, label]) => `
    <section class="field-option-group">
      <h4>${label}</h4>
      <div>
        ${(state.fieldOptions[field] || []).map((value) => `
          <button class="option-pill" type="button" data-option-field="${field}" data-option-value="${escapeAttr(value)}" title="删除 ${escapeAttr(value)}">
            ${value}<span>×</span>
          </button>
        `).join("") || `<p class="empty-state">暂无选项。表格中输入后会自动添加。</p>`}
      </div>
    </section>
  `).join("");
}

function addFieldOption(field, value) {
  const trimmed = String(value || "").trim();
  if (!trimmed || !state.fieldOptions[field]) return;
  if (!state.fieldOptions[field].some((option) => option.toLowerCase() === trimmed.toLowerCase())) {
    state.fieldOptions[field].push(trimmed);
    state.fieldOptions[field].sort((a, b) => a.localeCompare(b));
  }
}

function comboOptions(source) {
  if (source === "sales") return state.salesPeople;
  return state.fieldOptions[source] || [];
}

function showComboDropdown(input) {
  const source = input.dataset.comboSource;
  const options = comboOptions(source);
  const dropdown = $("#comboDropdown");
  if (!source || !options.length || input.disabled) {
    hideComboDropdown();
    return;
  }
  dropdown.dataset.targetId = input.id || "";
  dropdown.dataset.targetField = input.dataset.productField || "";
  dropdown.innerHTML = options.map((value) => `<button type="button" data-combo-value="${escapeAttr(value)}">${value}</button>`).join("");
  const rect = input.getBoundingClientRect();
  dropdown.style.left = `${rect.left + window.scrollX}px`;
  dropdown.style.top = `${rect.bottom + window.scrollY + 4}px`;
  dropdown.style.width = `${rect.width}px`;
  dropdown.classList.add("show");
}

function hideComboDropdown() {
  $("#comboDropdown").classList.remove("show");
}

function applyComboValue(value) {
  const dropdown = $("#comboDropdown");
  const target = dropdown.dataset.targetField
    ? $(`[data-product-field="${dropdown.dataset.targetField}"]`)
    : $(`#${dropdown.dataset.targetId}`);
  if (!target) return;
  target.value = value;
  target.dispatchEvent(new Event("change", { bubbles: true }));
  hideComboDropdown();
}

function addSalesPerson(name) {
  const trimmed = name.trim();
  if (!trimmed) return "";
  const existing = state.salesPeople.find((person) => person.toLowerCase() === trimmed.toLowerCase());
  if (existing) return existing;
  state.salesPeople.push(trimmed);
  state.salesPeople.sort((a, b) => a.localeCompare(b));
  return trimmed;
}

function resolveSalesPerson(input) {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const exact = state.salesPeople.find((person) => person.toLowerCase() === trimmed.toLowerCase());
  if (exact) return exact;
  const fuzzy = state.salesPeople.find((person) => isSimilarName(person, trimmed));
  if (fuzzy && confirm(`销售人员「${trimmed}」和已有销售「${fuzzy}」很接近，是否使用已有销售「${fuzzy}」？`)) {
    return fuzzy;
  }
  return addSalesPerson(trimmed);
}

function isSimilarName(a, b) {
  const left = normalizeName(a);
  const right = normalizeName(b);
  if (!left || !right) return false;
  if (left.includes(right) || right.includes(left)) return true;
  return levenshtein(left, right) <= 2;
}

function normalizeName(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
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

function addMovement({ productId, type, qty, at, note, source = "manual", salesPerson = "" }) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return alert("产品不存在。");
  if (!canEditProduct(product)) return alert("当前人员没有这个大货架的编辑权限。");
  if (type === "out" && product.stock < qty) return alert("库存不足，不能出库。");
  const beforeStock = product.stock;
  const afterStock = type === "in" ? beforeStock + qty : beforeStock - qty;
  const movement = { productId, type, qty, at, note, salesPerson, beforeStock, afterStock, source };
  if (source === "form") {
    commitMovement(movement);
    return;
  }
  pendingMovement = movement;
  openMovementConfirm();
}

function openMovementConfirm() {
  if (!pendingMovement) return;
  const product = state.products.find((item) => item.id === pendingMovement.productId);
  const slot = product ? productSlot(product) : null;
  const user = activeUser();
  const isOut = pendingMovement.type === "out";
  $("#movementConfirmTitle").textContent = isOut ? "确认出库" : "确认入库";
  $("#movementConfirmSummary").innerHTML = `
    <dl>
      <div><dt>产品</dt><dd>${product?.vehicle || ""}</dd></div>
      <div><dt>型号</dt><dd>${product?.model || ""}</dd></div>
      <div><dt>货位</dt><dd>${slot?.label || "未分配"}</dd></div>
      <div><dt>数量</dt><dd>${isOut ? "-" : "+"}${pendingMovement.qty}</dd></div>
      <div><dt>日期</dt><dd>${formatDateTime(pendingMovement.at)}</dd></div>
      <div><dt>操作人</dt><dd>${user.name}</dd></div>
      ${isOut ? `<div><dt>销售人员</dt><dd>${pendingMovement.salesPerson || "待填写"}</dd></div>` : ""}
    </dl>
  `;
  $("#confirmBeforeStock").textContent = pendingMovement.beforeStock;
  $("#confirmAfterStock").textContent = pendingMovement.afterStock;
  $("#confirmNote").value = pendingMovement.note || "";
  $("#confirmSalesPerson").value = pendingMovement.salesPerson || "";
  $("#salesField").classList.toggle("hidden", !isOut);
  $("#confirmSalesPerson").required = isOut;
  $("#movementConfirmDialog").showModal();
}

function commitMovement({ productId, type, qty, at, note, salesPerson, source, beforeStock, afterStock }) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return alert("产品不存在。");
  product.stock += type === "in" ? qty : -qty;
  state.movements.push({ id: uid("m"), productId, type, qty, at, note, salesPerson, stockBefore: beforeStock, stockAfter: afterStock, userId: state.activeUserId });
  lastSlotPulse = { slotId: product.slotId, productId, type, qty, beforeStock, afterStock };
  showMovementToast({ product, type, qty });
  clearTimeout(pulseTimer);
  pulseTimer = setTimeout(() => {
    lastSlotPulse = null;
    renderMap();
    if ($("#rackDialog").open) renderRackDialog();
  }, 2300);
  if (source === "form") {
    $("#movementQty").value = 1;
    $("#movementNote").value = "";
    $("#movementSalesPerson").value = "";
    $("#movementTime").value = todayInputValue();
    updateMovementPreview();
  }
  render();
}

function showMovementToast({ product, type, qty }) {
  const toast = $("#movementToast");
  const slot = productSlot(product);
  toast.className = `movement-toast ${type === "in" ? "toast-in" : "toast-out"}`;
  toast.innerHTML = `
    <div class="toast-mark">${type === "in" ? "入" : "出"}</div>
    <div class="toast-content">
      <strong>${type === "in" ? "入库成功" : "出库成功"} <span>${type === "in" ? "+" : "-"}${qty}</span></strong>
      <p>${product.vehicle}</p>
      <small>${slot?.label || "未分配货位"} · 当前库存 ${product.stock}</small>
    </div>
  `;
  toast.classList.remove("show");
  window.requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(showMovementToast.timer);
  showMovementToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function adjustFromSlot(productId, type) {
  const input = $(`[data-slot-qty="${productId}"]`);
  const qty = Math.max(1, Number(input?.value || 1));
  addMovement({
    productId,
    type,
    qty,
    at: todayInputValue(),
    note: type === "out" ? "仓库图示直接出库" : "仓库图示直接入库",
    source: "slot"
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
  const comboOption = event.target.closest("[data-combo-value]");
  if (comboOption) {
    applyComboValue(comboOption.dataset.comboValue);
    return;
  }

  const comboInput = event.target.closest(".combo-input");
  if (comboInput) {
    showComboDropdown(comboInput);
  } else if (!event.target.closest("#comboDropdown")) {
    hideComboDropdown();
  }

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

["mapProductFilter", "inventorySearch", "inventoryRoom", "inventoryShelf", "inventorySystem", "inventoryStock", "inventoryPageSize", "recordSearch", "recordTypeFilter", "recordSalesFilter", "analyticsDays", "analyticsRoom", "analyticsRack"].forEach((id) => {
  $(`#${id}`).addEventListener("input", () => {
    if (id === "inventoryRoom") fillSlotSelect($("#inventoryShelf"), "all", true);
    if (id === "analyticsRoom") fillAnalyticsRackSelect();
    if (id.startsWith("inventory")) inventoryPage = 1;
    render();
  });
});

$("#prevInventoryPage").addEventListener("click", () => {
  inventoryPage -= 1;
  renderInventory();
});

$("#nextInventoryPage").addEventListener("click", () => {
  inventoryPage += 1;
  renderInventory();
});

$("#inventoryTable").addEventListener("change", (event) => {
  const input = event.target.closest("[data-product-field]");
  if (!input) return;
  updateProductField(input);
});

$("#inventoryTable").addEventListener("blur", (event) => {
  const input = event.target.closest("[data-product-field]");
  if (!input || input.tagName === "SELECT") return;
  updateProductField(input);
}, true);

document.addEventListener("focusin", (event) => {
  const input = event.target.closest(".combo-input");
  if (input) showComboDropdown(input);
});

window.addEventListener("resize", hideComboDropdown);
window.addEventListener("scroll", hideComboDropdown, true);

function updateProductField(input) {
  const [productId, field] = input.dataset.productField.split(":");
  const product = state.products.find((item) => item.id === productId);
  if (!product || !canEditProduct(product)) return;
  if (field === "slotId" && !canEditRack(input.value.split(":")[0])) {
    alert("当前人员没有目标大货架的编辑权限。");
    renderInventory();
    return;
  }
  const value = field === "stock" ? Math.max(0, Number(input.value || 0)) : input.value.trim();
  product[field] = value;
  if (["android", "storage"].includes(field)) addFieldOption(field, value);
  render();
}

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
  addFieldOption("android", payload.android);
  addFieldOption("storage", payload.storage);
  $("#productDialog").close();
  render();
});

$("#movementForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const type = $("#movementType").value;
  const salesPerson = type === "out" ? resolveSalesPerson($("#movementSalesPerson").value) : "";
  if (type === "out" && !salesPerson) {
    alert("出库需要填写销售人员。");
    $("#movementSalesPerson").focus();
    return;
  }
  addMovement({
    productId: $("#movementProduct").value,
    type,
    qty: Number($("#movementQty").value),
    at: $("#movementTime").value,
    note: $("#movementNote").value.trim(),
    source: "form",
    salesPerson
  });
});

["movementType", "movementProduct", "movementQty"].forEach((id) => {
  $(`#${id}`).addEventListener("input", updateMovementPreview);
});

$("#movementConfirmForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!pendingMovement) return;
  const salesPerson = pendingMovement.type === "out" ? resolveSalesPerson($("#confirmSalesPerson").value) : "";
  if (pendingMovement.type === "out" && !salesPerson) {
    alert("出库需要填写对应销售。");
    return;
  }
  commitMovement({
    ...pendingMovement,
    note: $("#confirmNote").value.trim(),
    salesPerson
  });
  pendingMovement = null;
  $("#movementConfirmDialog").close();
});

$("#cancelMovementConfirm").addEventListener("click", () => {
  pendingMovement = null;
  $("#movementConfirmDialog").close();
});

$("#movementConfirmDialog").addEventListener("close", () => {
  if (!$("#movementConfirmDialog").returnValue) pendingMovement = null;
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

$("#salesForm").addEventListener("submit", (event) => {
  event.preventDefault();
  addSalesPerson($("#salesName").value);
  $("#salesName").value = "";
  render();
});

$("#fieldOptionList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-option-field]");
  if (!button) return;
  const { optionField, optionValue } = button.dataset;
  state.fieldOptions[optionField] = (state.fieldOptions[optionField] || []).filter((value) => value !== optionValue);
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
