# ② Caddyfile 全文

状态：【未实现】——Caddy 从未部署，Caddyfile 是本地草稿，未被任何 Caddy 进程加载过。

## 草稿全文

原始文件名：`Caddyfile`，全文见 `appendix-drafts-NOT-DEPLOYED/Caddyfile`（内容与 `deploy/new-api/Caddyfile` 完全一致）。

## 你问的字段

| 项目 | 草稿里的实际写法 | 状态 |
|---|---|---|
| `header_up` 注入的变量 | `Authorization "Bearer {$NEWAPI_TOKEN}"` | 草稿；`NEWAPI_TOKEN` 在 `.env` 中不存在（`.env` 本身不存在） |
| CORS | `Access-Control-Allow-Origin "{$ALLOW_ORIGIN}"`，预检返回 204 | 草稿；`ALLOW_ORIGIN` 未填 |
| 日志 | 未配置 access log；只有 `encode zstd gzip` | 未配置 |
| 是否反代 `/console` | 不反代；`@admin` 匹配 `/console* /panel* /api/*`（`/api/status` 除外）并返回 403 | 草稿 |
| 缓存规则 | 无 `Cache-Control`、无 `expires`、无 CDN 配置 | 未配置 |
| 限流 | 无 rate limit 配置 | 未配置 |

## 真实运行状态

- 没有 Caddy 进程，没有 80/443 监听（`14-ports.txt`）。
- 没有 TLS 证书，没有 ACME 账号。
- 因此以上内容全部是“计划写法”，不是“线上行为”。
