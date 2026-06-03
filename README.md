# 公司库存管理网站

当前项目已改为 **Vite + Vue + Vercel API + 飞书多维表格**。数据只从飞书读取并保存到飞书，不再使用浏览器本地数据兜底。

## 当前结构

- 前端入口：`src/main.js`
- Vue 运行组件：`src/components/WarehouseRuntime.vue`
- 数据层：`src/composables/useWarehouseData.js`
- 飞书 API：`api/warehouse.js`
- 飞书导入表格：`feishu-tables/`

## 飞书表格

先在一个飞书多维表应用中创建这些表，字段名保持英文：

- `rooms`
- `racks`
- `products`
- `movements`
- `users`
- `user_rack_permissions`
- `sales_people`
- `field_options`

可直接导入的 CSV 在：

[feishu-tables](</d:/MLS/warehouse/inventory-site/feishu-tables>)

建议导入顺序：

1. `rooms.csv`
2. `racks.csv`
3. `products.csv`
4. `users.csv`
5. `user_rack_permissions.csv`
6. `sales_people.csv`
7. `field_options.csv`
8. `movements.csv`

## 环境变量

本地测试时在项目根目录新建 `.env.local`。Vercel 部署时在 `Project -> Settings -> Environment Variables` 添加同名变量。

```env
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxx
FEISHU_APP_TOKEN=basxxxxxxxxxxxxx

FEISHU_TABLE_ROOMS=tblxxxxxxxxxxxxx
FEISHU_TABLE_RACKS=tblxxxxxxxxxxxxx
FEISHU_TABLE_PRODUCTS=tblxxxxxxxxxxxxx
FEISHU_TABLE_MOVEMENTS=tblxxxxxxxxxxxxx
FEISHU_TABLE_USERS=tblxxxxxxxxxxxxx
FEISHU_TABLE_USER_RACK_PERMISSIONS=tblxxxxxxxxxxxxx
FEISHU_TABLE_SALES_PEOPLE=tblxxxxxxxxxxxxx
FEISHU_TABLE_FIELD_OPTIONS=tblxxxxxxxxxxxxx
```

获取位置：

| 配置 | 位置 |
| --- | --- |
| `FEISHU_APP_ID` | 飞书开放平台 -> 企业自建应用 -> 凭证与基础信息 |
| `FEISHU_APP_SECRET` | 飞书开放平台 -> 企业自建应用 -> 凭证与基础信息 |
| `FEISHU_APP_TOKEN` | 多维表格应用 token |
| `FEISHU_TABLE_*` | 对应多维表数据表的 table id |

飞书应用权限至少需要多维表格读取、写入权限。`FEISHU_APP_SECRET` 只能放 `.env.local` 或 Vercel 环境变量，不要写进前端代码。

## 本地测试飞书数据

不要用 `npm run dev` 测飞书数据，因为普通 Vite dev server 不会运行 `api/warehouse.js`。

用 Vercel CLI 测：

```bash
npm install
npm install -g vercel
vercel dev
```

打开 Vercel CLI 输出的地址，通常是：

```text
http://localhost:3000
```

页面右上角应显示：

```text
飞书数据已连接
```

如果显示错误，直接访问：

```text
http://localhost:3000/api/warehouse
```

正常时应返回：

```json
{
  "configured": true,
  "empty": false,
  "message": "飞书数据读取成功",
  "state": {
    "rooms": [],
    "shelves": [],
    "products": [],
    "movements": []
  }
}
```

这里的 `rooms/products` 等数组应有数据。如果 `empty: true`，说明飞书表还没导入数据或 table id 配错。

如果返回 `NOTEXIST`，先访问调试接口：

```text
http://localhost:3000/api/feishu-debug
```

这个接口会返回两块关键数据：

- `expected`：当前环境变量里配置的 `FEISHU_TABLE_*`
- `actualTables`：当前 `FEISHU_APP_TOKEN` 下飞书实际能看到的表

确认 `expected.rooms` 的值能在 `actualTables[].table_id` 中找到。如果找不到，说明 `FEISHU_TABLE_ROOMS` 或 `FEISHU_APP_TOKEN` 填错，或者飞书应用没有权限访问这个多维表。

## 测试是否真的读取飞书

1. 在飞书 `products` 表里改一个产品的 `stock` 数量。
2. 回到网站，点右上角 `重新读取飞书`。
3. 库存表格里对应产品的库存应同步变化。
4. 在网站里做一次入库或出库。
5. 回飞书 `products` 表和 `movements` 表查看：
   - `products.stock` 应变化
   - `movements` 应新增一条记录
   - `stock_before` / `stock_after` 应正确记录操作前后库存

## Vercel 部署

Vercel 项目设置：

| 配置项 | 值 |
| --- | --- |
| `Framework Preset` | `Vite` |
| `Install Command` | `npm install` |
| `Build Command` | `npm run build` |
| `Output Directory` | `dist` |
| `Node.js Version` | `18.x` 或 `20.x` |

部署后必须在 Vercel 环境变量中配置所有 `FEISHU_*`。配置完成后需要重新部署一次。

## 常见问题

### 页面一直显示飞书未连接

检查：

- 是否用 `vercel dev`，而不是 `npm run dev`
- `.env.local` 是否在项目根目录
- 变量名是否完全一致
- 飞书应用是否已开通多维表读取和写入权限
- 飞书应用是否已发布或允许当前企业使用

### `/api/warehouse` 返回缺少环境变量

说明 `.env.local` 或 Vercel Environment Variables 没配置完整。

### `/api/warehouse` 返回飞书表为空

检查：

- CSV 是否已导入对应飞书表
- `FEISHU_TABLE_*` 是否填的是正确 table id
- 字段名是否保持英文，例如 `id`、`room_id`、`stock_before`

### 网站能读不能写

检查飞书应用是否有多维表格写入权限，并重新发布应用。
