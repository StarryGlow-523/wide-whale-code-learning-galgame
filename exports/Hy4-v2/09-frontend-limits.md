# ⑨ 前端限额、网关 RPM、超时与回落

状态：【未实现】（每日限额、网关 RPM）＋【已存在·附原文】（超时与回落代码）。

## 前端每日限额

- **未实现**。全文检索 `每日` / `daily` / `quota` 命中 0 次；`limit` 仅命中 `historyLimit` 两处（HTML 4709、4734 行），全文无任何按日计数或配额校验逻辑（`rpm` 的命中来自 base64 图片数据，不是限流代码）。
- 没有按用户计数、没有按日重置、没有本地或服务端配额校验。

## 网关 RPM 20

- **未配置**。`channels.json` 草稿里没有任何 RPM 字段；`Caddyfile` 里没有 rate limit；new-api 未部署。
- 也就是说，“全局 RPM 20”目前只写在方案文档里。

## 超时

- 位置：`study-loop/index.html` 第 4753 行（计时器），值在第 4708 行。
- 值：`AI_CONFIG.timeout = 10000`（10 s，配置块第 4703-4712 行）。
- 机制：`AbortController`（第 4752 行）+ `setTimeout` 到点 `abort()`。

## 失败回落

- 位置：`study-loop/index.html` 第 4820-4834 行。
- 触发条件：`aiReply()` 抛错（HTTP 非 2xx、超时、空回复、JSON 解析失败）或返回空。
- 行为：`console.warn` 后等 650–1150 ms，调用 `localReply(t)` 返回本地答案，并标记 `window.__lastAI.source = "local"`。

## 额外发现（与密钥有关）

- 第 4722-4727 行 `setAI()` 会把整个 `AI_CONFIG`（包含 `apiKey` 字段）写入 `localStorage["mnk_ai"]`。
- 默认 `apiKey` 为空字符串（第 4706 行）；只有第 4751 行在非空时才加 `Authorization`。
- 这意味着：如果有人在浏览器控制台调用 `setAI({apiKey:"..."})`，key 会以明文存在该用户本机 localStorage。它是“用户自己的 BYOK”，不是服务端密钥；但页面没有任何提示或清理入口。
