# MANIFEST · AI 后端安全审议材料包

- 导出时间：2026-11-11 12:29 CST（Asia/Shanghai）
- 导出人：项目维护者（单人）
- 工作目录：`/workspace`
- 仓库 HEAD：`689de18`（2026-11-11 11:25:34 +0800）
- 包内不含任何真实 API Key、令牌、密码或私钥。

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

> 包内 `appendix-drafts-NOT-DEPLOYED/` 是**从未运行的本地草稿**，不是实例导出，不能当作“已配置”的证据。这是按审议要求主动标注的，不是遗漏。

## 文件清单

| 编号 | 文件 | 来源 | 导出时间 | 状态 | 脱敏字段 |
|---|---|---|---|---|---|
| ① | `01-channels.md` | 本地整理 | 12:29 | 【未实现】+ 草稿说明 | 无 |
| ① | `appendix-drafts-NOT-DEPLOYED/channels.json` | `deploy/new-api/channels.json` | 12:29 | 【草稿·未部署】 | 渠道 key 未填；无真实密钥 |
| ② | `02-caddy.md` | 本地整理 | 12:29 | 【未实现】+ 草稿说明 | `NEWAPI_TOKEN` 为变量名，无值 |
| ② | `appendix-drafts-NOT-DEPLOYED/Caddyfile` | `deploy/new-api/Caddyfile` | 12:29 | 【草稿·未部署】 | 无 |
| ③ | `03-tokens.md` | 本地整理 | 12:29 | 【未实现】 | 无 |
| ④ | `04-newapi-runtime.md` | 本地整理 | 12:29 | 【未实现】 | 默认密码文字 `root/123456`（非真实密码） |
| ⑤ | `05-zhipu-console.md` | 对话记录 | 12:29 | 【做过但无法导出·说明原因】 | 无 key |
| ⑥ | `06-benchmark.md` | 对话记录 | 12:29 | 【做过但无法导出·说明原因】 | 无 key |
| ⑦ | `07-artifacts.md` | 本地校验 | 12:29 | 【已存在·附原文】+【未实现】 | 无 |
| ⑧ | `08-keys.md` | 对话记录 | 12:29 | 【未实现】 | 仅前缀/长度/形态，无完整值 |
| ⑨ | `09-frontend-limits.md` | `study-loop/index.html` | 12:29 | 【未实现】+【已存在·附原文】 | 无 |
| ⑩ | `10-app.md` | 本地检索 | 12:29 | 【未实现】 | 无 |
| A | `11-scripts.md` | 本地整理 | 12:29 | 【已存在·附原文】 | 无 |
| A | `11-scripts/start.sh` | `deploy/new-api/start.sh` | 12:29 | 【已存在·附原文】 | 无 |
| A | `11-scripts/smoke.sh` | `deploy/new-api/smoke.sh` | 12:29 | 【已存在·附原文】 | 无 |
| A | `11-scripts/run-output.txt` | 实际执行输出 | 12:29 | 【已存在·附原文】 | 无 |
| B | `12-logs.md` | 本地整理 | 12:29 | 【未实现】 | 无 |
| C | `13-repo-hygiene.md` | 本地整理 | 12:29 | 【未实现】+【已存在·附原文】 | 无 |
| C | `13-gitignore.txt` | 仓库根 `.gitignore` | 12:29 | 【已存在·附原文】 | 无 |
| D | `14-ports-relay.md` | 本地整理 | 12:29 | 【已存在·附原文】 | 无 |
| D | `14-ports.txt` | `ss -lntp` 原始输出 | 12:29 | 【已存在·附原文】 | 无 |
| E | `15-doc-version.md` | 本地整理 | 12:29 | 【已存在·附原文】 | 无 |
| E | `15-doc-version/ai-backend-security-plan-v1.md` | git `0510ebe` | 12:29 | 【已存在·附原文】 | 无 key |
| E | `15-doc-version/ai-backend-security-plan-v2.md` | 当前工作文件 | 12:29 | 【已存在·附原文】 | 无 key |
| E | `15-doc-version/v1-to-v2.diff` | git diff | 12:29 | 【已存在·附原文】 | 无 key |
| — | `appendix-drafts-NOT-DEPLOYED/docker-compose.yml` | `deploy/new-api/docker-compose.yml` | 12:29 | 【草稿·未部署】 | 环境变量名，无值 |
| — | `06-appendix-fake-ai-server.mjs` | `exports/dev/fake-ai-server.mjs` | 12:29 | 【已存在·附原文】 | 无 key |

## 未放进包里的东西

| 项目 | 原因 |
|---|---|
| 送审 HTML（5.7 MB） | 体积大；原文在 `/workspace/exports/mnk-study-loop-with-bgm.html`，MD5 已列在 ⑦ |
| bgm 音频（20.3 MiB） | 与安全审议无关；文件名/大小/时长已列在 ⑦ |
| 真实 key / 令牌 / 密码 | 按审议要求脱敏，包内不出现完整值 |
| 线上产物 | 不存在，无法提供 |

## 关于“脱敏”的说明

- K1 只保留前缀 `078cbc22`、总长 49、形态“32 位十六进制 + `.` + 16 位字母数字”。
- K2 只保留前缀 `sk-Lr5Q`、总长 51、形态“`sk-` + 48 位字母数字”。
- K3/K4/K5 未生成或未设置，因此没有值。
- 包内所有 `{$...}` 都是环境变量名，不是真实值。

## 复核命令

```bash
# 包内不应出现完整 key
grep -rnE 'sk-[A-Za-z0-9]{30,}|[0-9a-f]{32}\.[A-Za-z0-9]{16,}' . || echo "OK: 无完整密钥"

# 送审 HTML 与本地文件同一性
md5sum /workspace/study-loop/index.html /workspace/exports/mnk-study-loop-with-bgm.html
```
