# MANIFEST · AI 接入层 L10 修复交付

- 导出时间：2026-11-11 13:48 CST（Asia/Shanghai）
- 工作目录：`/workspace`
- 范围：只覆盖前端 AI 接入层（原 4699–4773 行区域）的修复与送审产物
- 本包不含任何真实 API Key、令牌、密码或私钥

## 1. 产物清单

| # | 文件 | 角色 | 大小 | 总行数 | MD5 | SHA256 |
|---|---|---|---|---|---|---|
| 1 | `/workspace/study-loop/index.html` | 修改后的源文件（就地写回） | 5,938,788 B | 7,436 | `08d8de7419d3478b12140daa5c7e6863` | `2e739a50514136d4a86ba5d48b1f784fe2fcfb50df111397e130b5066397b347` |
| 2 | `/workspace/exports/mnk-study-loop-with-bgm.html` | 送审副本（与 #1 逐字节一致） | 5,938,788 B | 7,436 | `08d8de7419d3478b12140daa5c7e6863` | `2e739a50514136d4a86ba5d48b1f784fe2fcfb50df111397e130b5066397b347` |
| 3 | `/workspace/exports/mnk-study-loop-with-bgm.zip` | 可运行包（HTML + 4 首 bgm） | 25,335,589 B（解压后 27,289,746 B） | — | — | `81fdc40d56f0fc3052da69066d85174c99c2699258f63baeee72083585cf4771` |

zip 内容：

```text
index.html        5,938,788 B
bgm/轻松.mp3      5,530,368 B
bgm/节拍.mp3      4,762,227 B
bgm/冥想.mp3      7,809,149 B
bgm/愉悦.mp3      3,249,214 B
```

## 2. 改动位置（当前文件行号）

| 锚点 | 行号 |
|---|---|
| AI 区块起点 | 4699 |
| `const AI_CONFIG` / `Object.freeze` | 4703 |
| `baseUrl` 定义 / 使用 | 4705 / 4725 |
| `window.aiSetMode` | 4711 |
| `var r = await fetch(` | 4735 |
| `body: JSON.stringify`（`model: "mnk-chat"`） | 4738 |
| `window.aiReply` | 4752 |
| `localReply` 定义 / 回落调用 | 4754 / 4811 |

## 3. 修复内容

1. 删除 `apiKey` 字段与任何 `Authorization` / `Bearer` 注入分支，前端不再具备携带凭据的能力。
2. 删除从 localStorage 读取任意键覆盖配置的加载段与 `setAI` 写入/持久化，移除 `window.setAI` / `window.AI_CONFIG`。
3. 配置对象改为 `const` + `Object.freeze`；运行时不能新增或改写字段。
4. `baseUrl` 固定为同源相对路径 `/v1/chat/completions`，相对路径补齐逻辑只作用于该常量。
5. 请求体 `model` 写死为 `"mnk-chat"`，不再使用 `AI_CONFIG.model || "default"`。
6. 保留 `aiOn()`、`aiHistory()`、`aiReply()`、`window.aiReply`、10 秒超时、`max_tokens: 400`、system 提示词、`window.__lastAI` 与本地回落。
7. 模式只保留 `local` / `proxy`，通过 `window.aiSetMode("local")` 手动切回本地回答。

## 4. 自检结果（真实输出）

```text
$ grep -nE 'apiKey|Authorization|Bearer|window\.setAI|mnk_ai|byok|AI_CONFIG\.[A-Za-z]+[[:space:]]*=' study-loop/index.html
NO_MATCH

$ grep -nE 'baseUrl|model:|Object\.freeze|mnk-chat|/v1/chat/completions' study-loop/index.html
4703:const AI_CONFIG = Object.freeze({
4705:  baseUrl: "/v1/chat/completions",
4725:  var url = AI_CONFIG.baseUrl;
4738:      body: JSON.stringify({ model: "mnk-chat", messages: msgs, max_tokens: 400, temperature: 0.6 }),

改前（本工作区 HEAD）：7,433 行 / 5,938,635 B / MD5 7616c67a5d19f50fc8bcaddcbcbf2e20
改后（当前文件）    ：7,436 行 / 5,938,788 B / MD5 08d8de7419d3478b12140daa5c7e6863
CR 数量：改前 0，改后 0；LF 数量：7,433 → 7,436（新增 3 行，换行风格未变）
data:(audio|video)：改前 1，改后 1
```

单测（从 HTML 抽取 AI 区块后在 vm 中执行）：

```text
frozen=true
baseUrl=/v1/chat/completions
hasApiKey=false
URL=/v1/chat/completions
AUTH=NONE
MODEL=mnk-chat
proxy=ok
local=null
back=true
```

密钥扫描：

```text
$ grep -rlE '[0-9a-f]{32}\.[A-Za-z0-9]{16,}|sk-[A-Za-z0-9]{30,}' --exclude-dir=.git study-loop deploy exports/mnk-study-loop-with-bgm.html
none

$ unzip -p exports/Hy4-v2.zip | grep -cE '<完整密钥形态>'
0
$ unzip -p exports/Hy4-final.zip | grep -cE '<完整密钥形态>'
0
```

## 5. 基线差异说明

提示词给出的送审 HTML 为 5,939,520 字节 / 7,457 行；本工作区实际文件为本清单第 1 项的 5,938,788 字节 / 7,436 行。差异 885 字节 / 24 行在本轮修复之前已存在，本轮只改 AI 区块，未触碰其余字节。

## 6. 本包未包含 / 未验证

- 未部署 new-api / Caddy，未生成渠道或令牌导出。
- 未修改 `.env`、`Caddyfile`、`channels.json`、`start.sh`、`smoke.sh`（本轮边界）。
- 未轮换或删除任何上游 key。
- 未产出 App 包，未做 App 包体扫描。
- 未进行公网托管、缓存规则与真机验证。
