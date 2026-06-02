# 公司库存管理网站

这是公司内部使用的库存管理网站。当前版本已经升级为 Vite + Vue 项目，现有仓库图示、库存表格、出入库、图表分析、人员权限等功能继续保留。

## 当前技术状态

- 前端框架：Vite + Vue 3
- 当前数据源：优先连接飞书多维表格；未配置飞书时使用浏览器 `localStorage` 兜底
- 当前 API：`api/warehouse.js`
- 当前数据 composable：`src/composables/useWarehouseData.js`
- 当前 Vue 运行组件：`src/components/WarehouseRuntime.vue`
- 当前业务入口：`app.js`，已接入远程数据层，后续继续拆页面组件
- Vue 入口：`src/main.js`
- 样式文件：`styles.css`

说明：当前已经完成 Vite + Vue 工程化、飞书数据源选择、API 层和数据 composable。现有页面 DOM 与交互主体仍由 `app.js` 驱动，避免一次性重写导致已调好的仓库图示、表格、出入库流程丢功能。后续可以继续把仓库图示、库存表格、出入库、权限配置拆成独立 Vue 组件。

## 本地运行

需要先安装 Node.js，建议使用 Node.js 18 或更高版本。

第一次运行先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认地址：

```text

```http://localhost:5173

打包正式版本：

```bash
npm run build
```

预览打包结果：

```bash
npm run preview
```

如果要在本地同时测试 Vercel API 和飞书环境变量，建议安装并使用 Vercel CLI：

```bash
npm install -g vercel
vercel dev
```

只运行 `npm run dev` 时，前端页面可以正常打开；但 `/api/warehouse` 这种 Vercel Serverless API 不会由普通 Vite dev server 处理，页面会自动回退到 `localStorage`。

## 已包含功能

- 房间1、房间2、房间3、房间4
- 仓库房间与大货架图示页面
- 大货架拖拽布局编辑
- 每个大货架自动分为 8 个货位，例如 `B1-1` 到 `B1-8`
- 大货架详情弹窗，可查看每个货位中的多款产品
- 仓库图示内可直接入库、出库、编辑产品
- 仓库图示出入库需要弹窗确认
- 出入库完成后在对应货位展示动画反馈
- 产品库存表格管理、筛选、分页、行内编辑
- 系统版本、储存配置可输入并从下拉项选择
- 出入库登记，默认当前时间，可手动修改
- 出库可选择或输入销售人员，并自动维护销售人员列表
- 最近出入库记录筛选
- 入库/出库数量可查看明细
- 图表分析支持按房间和大货架筛选
- 按人员分配大货架编辑权限
- JSON 数据导出

## 推荐后续路线

如果只是继续调整页面交互，可以继续在当前 Vite + Vue 项目上优化。

如果要多人同时使用、数据联通、避免每台电脑数据不同，建议优先做数据库版本。对国内公司内部几个人使用，我建议先用下面两种方案之一：

### 方案 A：飞书多维表格 + Vercel API

适合：想保留飞书表格管理感、人数少、上线快。

优点：

- 配置最快
- 数据可以继续在飞书里查看
- 不需要自己维护数据库服务器
- 对几个人内部使用够轻

注意：

- Vercel 在国内访问有时会慢
- 飞书 API 有调用限制
- 权限和审计要在前端/API 里补充

### 方案 B：Supabase / PostgreSQL + Vercel

适合：后续想做正式系统、数据结构更稳定、查询统计更强。

优点：

- 数据库能力完整
- 更适合库存记录、权限、审计、统计
- 后续可以接登录、图片上传、Excel 导入导出

注意：

- 国内访问也要实测
- 需要配置数据库连接和表结构

## 如果继续使用飞书，需要配置

飞书版本建议用“飞书自建应用 + 多维表格”的方式。前端通过 Vercel API 或本地 API 访问飞书，多维表格作为数据源。

本地开发时，在项目根目录新建 `.env.local`。部署到 Vercel 时，在 Vercel 后台添加同名环境变量。

当前项目已经实现：

- `GET /api/warehouse`：读取飞书多维表格，组装成前端库存 state
- `PUT /api/warehouse`：把前端库存 state 拆分并保存到多张飞书多维表
- 飞书未配置时：页面自动使用本地 `localStorage`
- 飞书表为空时：页面保持当前本地数据，并把当前数据作为初始数据同步到飞书
- 页面右上角会显示当前数据状态，例如“本地缓存”“正在读取飞书”“飞书数据已同步”

### 环境变量明细

| 变量名 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- |
| `FEISHU_APP_ID` | 是 | `cli_xxxxxxxxxxxxx` | 飞书自建应用的 App ID |
| `FEISHU_APP_SECRET` | 是 | `xxxxxxxxxxxxxxxx` | 飞书自建应用的 App Secret，只能放后端或 Vercel 环境变量，不能写进前端代码 |
| `FEISHU_APP_TOKEN` | 是 | `basxxxxxxxxxxxxx` | 飞书多维表格 App Token，也就是这一整个多维表格应用的 token |
| `FEISHU_TABLE_ROOMS` | 是 | `tblxxxxxxxxxxxxx` | `rooms` 房间表的 table id |
| `FEISHU_TABLE_RACKS` | 是 | `tblxxxxxxxxxxxxx` | `racks` 大货架表的 table id |
| `FEISHU_TABLE_PRODUCTS` | 是 | `tblxxxxxxxxxxxxx` | `products` 产品表的 table id |
| `FEISHU_TABLE_MOVEMENTS` | 是 | `tblxxxxxxxxxxxxx` | `movements` 出入库记录表的 table id |
| `FEISHU_TABLE_USERS` | 是 | `tblxxxxxxxxxxxxx` | `users` 人员表的 table id |
| `FEISHU_TABLE_USER_RACK_PERMISSIONS` | 建议 | `tblxxxxxxxxxxxxx` | `user_rack_permissions` 人员货架权限表的 table id |
| `FEISHU_TABLE_SALES_PEOPLE` | 建议 | `tblxxxxxxxxxxxxx` | `sales_people` 销售人员表的 table id |
| `FEISHU_TABLE_FIELD_OPTIONS` | 建议 | `tblxxxxxxxxxxxxx` | `field_options` 下拉项配置表的 table id |
| `FEISHU_WEBHOOK_SECRET` | 可选 | `任意随机字符串` | 如果后续做飞书事件回调，用于校验请求来源 |
| `APP_ADMIN_TOKEN` | 可选 | `任意随机字符串` | 如果临时没有登录系统，可作为内部 API 的简单保护 token |

`.env.local` 示例：

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

APP_ADMIN_TOKEN=change-this-to-a-random-string
```

### 这些值在哪里找

| 配置项 | 获取位置 |
| --- | --- |
| `FEISHU_APP_ID` / `FEISHU_APP_SECRET` | 飞书开放平台 -> 开发者后台 -> 企业自建应用 -> 凭证与基础信息 |
| `FEISHU_APP_TOKEN` | 打开飞书多维表格，通常可以从多维表格链接或 API 文档示例中看到 `base/app_token` |
| `FEISHU_TABLE_*` | 打开对应数据表，通常可以从表格链接、开发者工具请求或多维表格 API 示例中看到 `table_id` |
| 飞书应用权限 | 飞书开放平台 -> 应用权限，至少需要多维表格的读取和写入权限 |
| 应用可见范围 | 飞书开放平台 -> 版本管理与发布，让公司内使用人员有权限访问 |

注意：飞书的 `App Secret` 不能放在浏览器端。后面接数据时，要通过 Vercel API、本地 Node API 或其他后端去请求飞书。

## 飞书多维表明细

字段名建议直接使用下面的英文名。这样 API 对接时稳定，不会因为中文字段重名或改名导致代码难维护。中文显示名可以在飞书里备注，或者直接把字段名设为英文。

### `rooms` 房间表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `room-1` | 系统内部房间 ID |
| `name` | 文本 | 是 | `房间1` | 页面显示名称 |
| `note` | 多行文本 | 否 | `主库存区` | 房间说明 |
| `sort_order` | 数字 | 否 | `1` | 页面排序 |
| `created_at` | 日期时间 | 否 | `2026-06-02 10:00` | 创建时间 |
| `updated_at` | 日期时间 | 否 | `2026-06-02 10:00` | 更新时间 |

### `racks` 大货架表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `rack-1-b1` | 系统内部大货架 ID |
| `room_id` | 文本 | 是 | `room-1` | 所属房间 ID |
| `code` | 文本 | 是 | `B1` | 大货架编号 |
| `name` | 文本 | 否 | `B1 大货架` | 大货架名称，页面可只显示编号 |
| `x` | 数字 | 是 | `8` | 仓库图示中的横向位置，百分比 |
| `y` | 数字 | 是 | `16` | 仓库图示中的纵向位置，百分比 |
| `w` | 数字 | 是 | `25` | 仓库图示中的宽度，百分比 |
| `h` | 数字 | 是 | `27` | 仓库图示中的高度，百分比 |
| `slot_count` | 数字 | 否 | `8` | 默认 8 个货位 |
| `note` | 多行文本 | 否 | `主货架` | 备注 |
| `created_at` | 日期时间 | 否 | `2026-06-02 10:00` | 创建时间 |
| `updated_at` | 日期时间 | 否 | `2026-06-02 10:00` | 更新时间 |

货位不一定要单独建表，因为当前规则固定为每个大货架 8 个货位。系统可以根据 `rack_id` 自动生成：

| 货位序号 | 页面标签 | 层位说明 |
| --- | --- | --- |
| `1` | `B1-1` | 第1层左 |
| `2` | `B1-2` | 第1层右 |
| `3` | `B1-3` | 第2层左 |
| `4` | `B1-4` | 第2层右 |
| `5` | `B1-5` | 第3层左 |
| `6` | `B1-6` | 第3层右 |
| `7` | `B1-7` | 第4层左 |
| `8` | `B1-8` | 第4层右 |

如果以后每个大货架的货位数量不固定，再增加 `slots` 表。

### `products` 产品表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `p-10001` | 系统内部产品 ID |
| `vehicle` | 文本 | 是 | `4Runner 2010-2022` | 车型 / 产品名称 |
| `model` | 文本 | 是 | `WE-8103` | 型号，只做输入，不做下拉 |
| `image` | URL / 附件 | 否 | `https://...` | 图片地址或图片附件 |
| `system_version` | 单选 / 文本 | 否 | `安卓12` | 当前页面里的“系统版本” |
| `storage` | 单选 / 文本 | 否 | `6+128` | 储存配置 |
| `rack_id` | 文本 | 是 | `rack-1-b1` | 所属大货架 ID |
| `slot_no` | 数字 | 是 | `8` | 货位序号，1 到 8 |
| `slot_label` | 文本 | 否 | `B1-8` | 冗余显示字段，方便飞书里直接看 |
| `stock` | 数字 | 是 | `6` | 当前库存 |
| `low_stock_threshold` | 数字 | 否 | `2` | 低库存阈值，不填时前端可默认 2 |
| `note` | 多行文本 | 否 | `亮黑` | 备注 |
| `created_at` | 日期时间 | 否 | `2026-06-02 10:00` | 创建时间 |
| `updated_at` | 日期时间 | 否 | `2026-06-02 10:00` | 更新时间 |

建议：`system_version` 和 `storage` 可以先用文本字段，系统下拉项从 `field_options` 表维护。这样既能输入新值，又能下拉选择已有值。

### `movements` 出入库记录表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `m-10001` | 系统内部记录 ID |
| `product_id` | 文本 | 是 | `p-10001` | 产品 ID |
| `type` | 单选 | 是 | `in` / `out` | `in` 入库，`out` 出库 |
| `qty` | 数字 | 是 | `1` | 出入库数量，统一存正数 |
| `at` | 日期时间 | 是 | `2026-06-02 16:15` | 出入库时间，可手动编辑 |
| `user_id` | 文本 | 是 | `u-admin` | 操作人 ID |
| `user_name` | 文本 | 否 | `管理员` | 操作人显示名，冗余字段 |
| `sales_person` | 文本 | 出库必填 | `Wendy` | 出库销售人员，入库可为空 |
| `stock_before` | 数字 | 是 | `100` | 操作前库存 |
| `stock_after` | 数字 | 是 | `99` | 操作后库存 |
| `source` | 单选 / 文本 | 否 | `form` / `slot` | 来源：出入库页面或仓库图示 |
| `note` | 多行文本 | 否 | `仓库图示直接出库` | 备注 |
| `created_at` | 日期时间 | 否 | `2026-06-02 16:15` | 记录创建时间 |

这个表是最重要的审计表。不要只改 `products.stock`，每次入库/出库都必须新增一条 `movements` 记录，这样才能看清“今天入库前是多少、入库后是多少、什么时间入库了多少”。

### `users` 人员表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `u-wendy` | 系统内部人员 ID |
| `name` | 文本 | 是 | `Wendy` | 人员姓名 |
| `role` | 单选 | 是 | `admin` / `editor` / `viewer` | 管理员、仓库编辑、只读查看 |
| `active` | 复选框 | 否 | 勾选 | 是否启用 |
| `created_at` | 日期时间 | 否 | `2026-06-02 10:00` | 创建时间 |
| `updated_at` | 日期时间 | 否 | `2026-06-02 10:00` | 更新时间 |

### `user_rack_permissions` 人员货架权限表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `urp-10001` | 权限记录 ID |
| `user_id` | 文本 | 是 | `u-wendy` | 人员 ID |
| `rack_id` | 文本 | 是 | `rack-1-b1` | 可编辑的大货架 ID |
| `can_edit` | 复选框 | 是 | 勾选 | 是否可编辑 |

管理员 `admin` 可以不写权限记录，默认拥有全部权限。

### `sales_people` 销售人员表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `sales-wendy` | 销售人员 ID |
| `name` | 文本 | 是 | `Wendy` | 销售人员名称 |
| `active` | 复选框 | 否 | 勾选 | 是否启用 |
| `created_at` | 日期时间 | 否 | `2026-06-02 10:00` | 创建时间 |

出库时如果输入了新销售人员，系统可以自动新增到这张表。相似名称识别也基于这张表。

### `field_options` 下拉项配置表

| 字段名 | 飞书字段类型 | 必填 | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | 文本 | 是 | `opt-android-12` | 选项 ID |
| `field` | 单选 / 文本 | 是 | `system_version` | 字段名，目前建议支持 `system_version`、`storage` |
| `value` | 文本 | 是 | `安卓12` | 下拉选项值 |
| `active` | 复选框 | 否 | 勾选 | 是否启用 |
| `sort_order` | 数字 | 否 | `1` | 排序 |

当前不建议给“型号”建下拉项，因为你已经明确型号只需要输入。

## 如果改成数据库版本，需要配置

建议 `.env`：

```env
DATABASE_URL=你的数据库连接字符串
AUTH_SECRET=用于登录会话的随机密钥
UPLOAD_TOKEN=图片上传或文件接口密钥
```

建议数据库表：

- `rooms`
- `racks`
- `slots`
- `products`
- `movements`
- `users`
- `user_rack_permissions`
- `sales_people`
- `field_options`

其中 `movements` 表必须保存 `stock_before` 和 `stock_after`，这样才能直观看到某个商品每次入库前后库存变化。

## 部署到 Vercel

### 1. 上传代码到 GitHub

Vercel 最推荐从 GitHub 导入项目，所以先确认代码已经推到 GitHub 仓库。

常用流程：

```bash
git add .
git commit -m "Setup Vite Vue inventory project"
git push origin main
```

如果你已经有仓库，例如当前项目的远程仓库，就直接推到对应分支即可。

### 2. 在 Vercel 导入项目

进入 Vercel 后台：

```text
Add New -> Project -> Import Git Repository
```

选择这个库存管理项目所在的 GitHub 仓库。

如果 Vercel 没有看到你的 GitHub 仓库，需要先在 GitHub 授权 Vercel 访问这个仓库。

### 3. Project Settings 基础配置

导入项目时，Vercel 会自动识别 Vite。建议检查这些配置：

| 配置项 | 推荐值 | 说明 |
| --- | --- | --- |
| `Framework Preset` | `Vite` | 项目是 Vite 前端应用 |
| `Root Directory` | `./` | 如果仓库根目录就是本项目，保持默认；如果项目在子目录，选择对应目录 |
| `Install Command` | `npm install` | 安装依赖 |
| `Build Command` | `npm run build` | 执行 Vite 打包 |
| `Output Directory` | `dist` | Vite 默认打包输出目录 |
| `Development Command` | `npm run dev` | 本地开发命令，Vercel 一般不会用它部署 |
| `Node.js Version` | `18.x` 或 `20.x` | 建议用 Node.js 18 以上 |

当前项目如果直接从 `d:\MLS\warehouse\inventory-site` 这一层作为仓库根目录部署，`Root Directory` 就不用改。

### 4. 环境变量配置

如果只是当前纯前端 `localStorage` 版本，不配置环境变量也可以部署。

如果要连接飞书多维表格，需要在 Vercel 项目里配置环境变量：

```text
Project -> Settings -> Environment Variables
```

逐项添加 README 前面列出的变量，例如：

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
APP_ADMIN_TOKEN=change-this-to-a-random-string
```

添加时建议选择这些环境：

| Environment | 是否添加 | 说明 |
| --- | --- | --- |
| `Production` | 是 | 正式访问地址使用 |
| `Preview` | 是 | 每次 PR 或非正式分支预览使用 |
| `Development` | 可选 | Vercel CLI 本地开发时使用 |

注意：`FEISHU_APP_SECRET` 不允许写进前端代码，也不要提交到 GitHub。只能放在 Vercel Environment Variables 或本地 `.env.local`。

### 5. 部署

配置完成后点击：

```text
Deploy
```

部署成功后，Vercel 会生成一个地址，例如：

```text
https://mls-inventory-site.vercel.app
```

以后每次推送到 `main` 分支，Vercel 会自动重新部署正式版本。

### 6. 国内访问注意

Vercel 在国内访问速度不一定稳定。公司内部使用时建议实测：

- 公司网络能否稳定打开 Vercel 域名
- 手机热点和公司宽带是否都能访问
- 飞书 API 请求是否会因为网络慢导致超时

如果访问不稳定，有三个替代方案：

- 继续用 Vercel 做前端，但 API 部署到国内服务器
- 整个项目部署到国内服务器，例如阿里云、腾讯云、公司内网服务器
- 前端静态文件放国内 CDN，数据 API 单独部署

### 7. 自定义域名

如果公司有自己的域名，可以在：

```text
Project -> Settings -> Domains
```

添加域名，例如：

```text
inventory.your-company.com
```

然后按 Vercel 提示到域名服务商那里添加 DNS 记录。

### 8. 更新部署

修改代码后：

```bash
git add .
git commit -m "Update inventory site"
git push origin main
```

Vercel 会自动开始新的部署。

如果部署失败，到：

```text
Project -> Deployments -> 失败的部署 -> View Build Logs
```

查看失败原因。这个项目最常见需要检查的是：

- `npm install` 是否成功
- `npm run build` 是否成功
- 环境变量是否缺失
- `Root Directory` 是否选错

## 后续开发建议

已经完成：

- 数据源确定为飞书多维表格
- 增加了 API 层：`api/warehouse.js`
- 增加了远程数据 composable：`src/composables/useWarehouseData.js`
- `localStorage` 已改成兜底缓存，飞书配置成功后会远程读取和保存
- 新增 Vue 运行组件：`src/components/WarehouseRuntime.vue`

建议下一步按这个顺序继续做：

1. 配好飞书应用和多维表环境变量，在 Vercel 上做一次真实读写测试
2. 把 `app.js` 里的仓库图示拆成 Vue 组件
3. 把库存表格拆成 Vue 组件
4. 把出入库和确认弹窗拆成 Vue 组件
5. 增加登录和真实用户权限
6. 增加 Excel 导入、图片上传、操作审计

这样改最稳：先把数据联通，再逐步重构页面。
