# MANIFEST · AI 后端安全审议材料包（Hy4-final）

- 导出时间：2026-11-11 13:05 CST（Asia/Shanghai）
- 工作目录：`/workspace`
- 仓库 HEAD：`689de18`（2026-11-11 11:25:34 +0800）
- 本包只含本轮改动过的 3 个文件；01–15 号 `.md` 在前三批，未重复、未改动
- 包内不含任何真实 API Key、令牌、密码或私钥，也不含其前缀

## 先看这里：哪些是“真的”，哪些“没做”

| 项目 | 真实状态 |
|---|---|
| new-api 部署 | **未部署**（沙箱无 docker，无 3000 端口） |
| Caddy 部署 | **未部署**（无 80/443，无证书） |
| 渠道 / 令牌 | **未创建**（无实例，无导出） |
| 线上站点 | **未上线**（无公网地址，无 Pages 证据） |
| 后端日志 | **不存在**（服务从未启动） |
| 每日限额 / 网关 RPM | **未实现 / 未配置** |
| Capacitor / manifest / SW | **未实现** |
| K1/K2 key 轮换 | **未轮换、未删除** |
| §6 的 44%/69%/97% 原始记录 | **未保存**，数字不可复核 |

> `appendix-drafts-NOT-DEPLOYED/` 三个文件是**草稿·从未运行、不能当作已配置证据**：`channels.json`、`Caddyfile`、`docker-compose.yml`。它们全文已内嵌在前三批的 01 / 02 / 04 号 `.md` 中，状态见下表。

## 12 项交付状态

| 编号 | 原始相对路径 | 实际交付状态 |
|---|---|---|
| A1 | `appendix-drafts-NOT-DEPLOYED/channels.json` | 【内容已内嵌于 01-channels.md 第 27–78 行】 |
| A2 | `appendix-drafts-NOT-DEPLOYED/Caddyfile` | 【内容已内嵌于 02-caddy.md 第 11–56 行】 |
| A3 | `appendix-drafts-NOT-DEPLOYED/docker-compose.yml` | 【内容已内嵌于 04-newapi-runtime.md 第 30–80 行】 |
| B1 | `11-scripts/start.sh` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 2–37 行】 |
| B2 | `11-scripts/smoke.sh` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 45–68 行】 |
| B3 | `11-scripts/run-output.txt` | 【内容已内嵌于 11-scripts.md 第 12–24 行】 |
| C1 | `13-gitignore.txt` | 【内容已内嵌于 13-repo-hygiene.md 第 25–77 行】 |
| C2 | `14-ports.txt` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 76–100 行】 |
| C3 | `06-appendix-fake-ai-server.mjs` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 938–1058 行】 |
| C4 | `15-doc-version/v1-to-v2.diff` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 561–930 行】 |
| D1 | `15-doc-version/ai-backend-security-plan-v1.md` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 108–334 行】 |
| D2 | `15-doc-version/ai-backend-security-plan-v2.md` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 342–552 行】 |

本轮 12 项均非“不存在·无法导出”。

## 本包文件

| 文件 | 作用 |
|---|---|
| `MANIFEST.md` | 本文件；12 项状态与 `DELIVERY-NOTES.md` 一致 |
| `DELIVERY-NOTES.md` | 状态更正记录、7 项全文位置、自检 |
| `APPENDIX-FULLTEXT.md` | 7 项原件全文的交付容器，不是原件 |

## 关于“脱敏”的说明

- K1：前缀省略，只保留总长 49、形态“32 位十六进制 + `.` + 16 位字母数字”、原本有值。
- K2：前缀省略，只保留总长 51、形态“`sk-` + 48 位字母数字”、原本有值。
- K3/K4/K5 未生成或未设置，因此没有值。
- 包内所有 `{$...}` 都是环境变量名，不是真实值。

## 复核命令

```bash
# 包内不应出现完整 key
grep -rnE 'sk-[A-Za-z0-9]{30,}|[0-9a-f]{32}\.[A-Za-z0-9]{16,}' . || echo "OK: 无完整密钥"

# 送审 HTML 与本地文件同一性
md5sum /workspace/study-loop/index.html /workspace/exports/mnk-study-loop-with-bgm.html
```
