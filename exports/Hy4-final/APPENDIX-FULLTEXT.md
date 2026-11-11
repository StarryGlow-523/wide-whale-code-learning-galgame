<!-- APPENDIX: 11-scripts/start.sh -->
```bash
#!/usr/bin/env bash
# 一键启动 new-api + Caddy
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "已生成 .env，请先填写 DOMAIN / ALLOW_ORIGIN / NEWAPI_TOKEN / SESSION_SECRET 再运行。"
  exit 1
fi

mkdir -p data site

echo "==> 拉取镜像"
docker compose pull

echo "==> 启动"
docker compose up -d

echo "==> 等待 new-api 就绪"
for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:3000/api/status >/dev/null 2>&1; then
    echo "new-api 已就绪：http://127.0.0.1:3000"
    break
  fi
  sleep 2
  [ "$i" = "30" ] && { echo "启动超时，查看日志：docker compose logs --tail=50 new-api"; exit 1; }
done

echo
echo "下一步："
echo "  1) 本机建隧道：ssh -L 3000:127.0.0.1:3000 user@这台服务器"
echo "  2) 浏览器打开：http://127.0.0.1:3000  初始账号 root / 123456（立刻改密码）"
echo "  3) 添加渠道 → 创建令牌 → 把 sk- 填进 .env 的 NEWAPI_TOKEN → docker compose up -d 重启"
```

- 原文件名：start.sh
- 总行数：34
- 来源：deploy/new-api/start.sh（工作区副本 11-scripts/start.sh）
- 是否逐字原文：是

<!-- APPENDIX: 11-scripts/smoke.sh -->
```bash
#!/usr/bin/env bash
# 冒烟测试：验证 Caddy 注入令牌后，/v1 接口可用
set -euo pipefail
cd "$(dirname "$0")"
set -a; . ./.env; set +a

echo "== 1. 服务状态 =="
curl -fsS "http://127.0.0.1:3000/api/status" | head -c 300; echo

echo "== 2. 经 Caddy 拉模型列表（前端不传 key）=="
curl -fsS "https://${DOMAIN}/v1/models" \
  -H "Origin: ${ALLOW_ORIGIN}" | head -c 500; echo

echo "== 3. 经 Caddy 真实问答 =="
curl -fsS "https://${DOMAIN}/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Origin: ${ALLOW_ORIGIN}" \
  -d '{"model":"mnk-chat","messages":[{"role":"user","content":"只回答两个字：可以"}],"max_tokens":16}' \
  | head -c 800; echo

echo "== 4. 管理面板应被拒绝 =="
curl -s -o /dev/null -w "console -> %{http_code}\n" "https://${DOMAIN}/console"
```

- 原文件名：smoke.sh
- 总行数：22
- 来源：deploy/new-api/smoke.sh（工作区副本 11-scripts/smoke.sh）
- 是否逐字原文：是

<!-- APPENDIX: 14-ports.txt -->
```text
$ ss -lntp
State  Recv-Q Send-Q Local Address:Port  Peer Address:PortProcess                                   
LISTEN 0      0            0.0.0.0:19091      0.0.0.0:*    users:(("agent-tool-host",pid=835,fd=24))
LISTEN 0      0            0.0.0.0:9003       0.0.0.0:*    users:(("agent-tool-host",pid=835,fd=25))
LISTEN 0      0          127.0.0.1:9222       0.0.0.0:*                                             
LISTEN 0      0            0.0.0.0:9090       0.0.0.0:*                                             
LISTEN 0      0            0.0.0.0:9092       0.0.0.0:*                                             
LISTEN 0      0          127.0.0.1:9002       0.0.0.0:*    users:(("agent-tool-host",pid=835,fd=26))
LISTEN 0      0          127.0.0.1:5900       0.0.0.0:*                                             
LISTEN 0      0          127.0.0.1:51008      0.0.0.0:*                                             
LISTEN 0      0          127.0.0.1:18080      0.0.0.0:*                                             
LISTEN 0      0          127.0.0.1:18081      0.0.0.0:*                                             
LISTEN 0      0                  *:16000            *:*    users:(("agent-tool-host",pid=835,fd=23))
LISTEN 0      0                  *:19090            *:*                                             
LISTEN 0      0                  *:9001             *:*    users:(("agent-tool-host",pid=835,fd=21))
LISTEN 0      0                  *:9000             *:*    users:(("agent-tool-host",pid=835,fd=27))
LISTEN 0      0                  *:8999             *:*    users:(("agent-tool-host",pid=835,fd=28))
LISTEN 0      0                  *:13080            *:*                                             
LISTEN 0      0                  *:9091             *:*                                             
LISTEN 0      0                  *:8088             *:*                                             
LISTEN 0      0                  *:40005            *:*                                             
LISTEN 0      0                  *:80               *:*    users:(("agent-tool-host",pid=835,fd=22))
LISTEN 0      0              [::1]:5900             *:*                                             
```

- 原文件名：14-ports.txt
- 总行数：23
- 来源：2026-11-11 12:29 CST 执行 `ss -lntp` 的原始输出
- 是否逐字原文：是

<!-- APPENDIX: 15-doc-version/ai-backend-security-plan-v1.md -->
````markdown
# Mnk Study Loop · AI 后端安全方案（送审版）

> 版本：v1 · 2026-11-11
> 用途：交给独立模型做安全审议，重点回答「会不会泄露密钥」
> 不含任何真实密钥，文中 `xxx` 均为占位

---

## 0. 一句话结论（供审议者先看）

**密钥不会进入前端产物。** 浏览器 / App 包内零密钥，所有密钥只存在于服务器侧的三个位置（`.env`、new-api 数据库、Caddy 配置）。真正的泄露风险不在前端，而在：**①管理面板公网暴露 ②上游是明文 HTTP ③数据库文件明文存 key ④日志记录用户内容**。

---

## 1. 目标与边界

| 项 | 内容 |
|---|---|
| 现有资产 | 单文件 HTML 学习应用 `/workspace/study-loop/index.html`（含翻卡、关卡、错题本、好感度） |
| 新增能力 | 站内 AI 问答（聊天面板），问题交给大模型回答 |
| 用户规模 | 预期 ≤50 人同时在线，日请求 ≤1000 |
| 部署形态 | 静态站（CDN）+ 反向代理 + 模型网关 + 上游模型 |
| 远期形态 | 同一份 HTML 打包为 App（PWA 优先，必要时 Capacitor） |
| 明确不做 | 用户注册体系、支付、聊天记录上云 |

---

## 2. 架构

```text
┌─────────────┐   HTTPS    ┌──────────┐   HTTP(内网)  ┌──────────┐   HTTPS   ┌────────┐
│ 浏览器 / App │ ─────────▶ │  Caddy   │ ────────────▶ │ new-api  │ ────────▶ │ 智谱    │
│ (零密钥)     │            │ 反代+TLS │               │ 网关     │           └────────┘
└─────────────┘            │ 注入令牌 │               │ 存上游key│   HTTP    ┌────────┐
                           └──────────┘               │          │ ────────▶ │Gemini中转│
                                                      └──────────┘           └────────┘
```

- 静态页与 API 同域：`https://<domain>/` 与 `https://<domain>/v1/*`
- 前端只调 `/v1/chat/completions`，**从不携带任何密钥**
- Caddy 在反代时注入 `Authorization: Bearer <NEWAPI_TOKEN>`，并做 Origin 白名单
- new-api 负责多渠道、优先级、重试、额度统计
- 上游两家：智谱 `glm-4.7-flash`（免费，主）、第三方 Gemini 中转（备）

---

## 3. 凭据清单与存放位置（审议重点）

先分清两类，不要混为一谈：

- **业务密钥（2 个）**：你去平台申请的 API Key，只有这两个。
- **系统凭据（3 个）**：系统自身需要的东西，不是去平台申请的，但泄露同样有后果。

### 3.1 业务密钥（仅 2 个）

| # | 密钥 | 存放位置 | 明文? | 谁能读到 | 泄露途径 |
|---|---|---|---|---|---|
| K1 | 智谱 API Key（`glm-4.7-flash`） | new-api 数据库「渠道」表 | **是**（面板掩码显示） | DB 文件、管理面板 | DB 文件被下载 / 面板被登录 |
| K2 | Gemini 中转 Key | new-api 数据库「渠道」表 | **是** | 同上 | 同上 |

**关键事实：K1/K2 在 new-api 数据库中是明文存储的**，面板上的 `sk-****` 只是 UI 掩码。因此「数据库文件 == 两个上游 key 全泄」，这是本项目最大的单点。

### 3.2 系统凭据（3 个，非申请所得）

| # | 凭据 | 用途 | 存放位置 | 明文? | 泄露后果 |
|---|---|---|---|---|---|
| K3 | NEWAPI_TOKEN | 前端→网关的转发令牌，由 Caddy 注入 | 服务器 `.env` | 是 | 别人可无偿调用你的 AI 额度 |
| K4 | 管理员密码 | 登录 new-api 面板 | DB（哈希存储） | 否 | 面板被登录 → 读到 K1/K2 |
| K5 | TLS 私钥 | HTTPS 证书私钥 | Caddy 数据卷 | 是 | 可冒充你的域名 |

**结论：会被“泄露”的对象是 K1-K5 共 5 项，但其中只有 K1、K2 是你申请的大模型 API Key。**

**前端产物中存在的密钥数量：0。**

---

## 4. 密钥流向验证（如何证明不泄露）

审议者可按下表逐项验证：

| 验证项 | 方法 | 期望结果 |
|---|---|---|
| HTML 无密钥 | `grep -Ei "sk-|apikey|secret|token" index.html` | 无命中（除 UI 文案） |
| 前端请求头 | 浏览器 F12 → Network → 任意 `/v1/*` 请求 | 请求头无 Authorization 上游 key |
| 页面源码 | `view-source:` | 无 key 字面量 |
| App 包 | `unzip app.apk && grep -r "sk-"` | 无命中 |
| Caddy 注入 | 直接 curl 带 Origin 请求 | 200；不带白名单 Origin → 403 |
| 直连 new-api 端口 | 从公网访问 `:3000` | 应**不可达**（仅监听 127.0.0.1 或防火墙拦截） |
| 管理面板 | 公网访问 `/console` | 403/404 或需额外认证 |

---

## 5. 威胁模型与缓解

| # | 威胁 | 影响 | 严重度 | 现状 | 缓解措施 |
|---|---|---|---|---|---|
| T1 | 管理面板弱口令被爆破 | 全部 key 可读、可改 | 🔴 高 | 默认 root/123456 | 强密码 + 改默认路径 + 仅内网/IP 白名单 |
| T2 | 数据库文件泄露 | K1/K2 明文外泄 | 🔴 高 | 无加密 | 卷权限 600、备份加密、不上传网盘 |
| T3 | `.env` 进 git | K3 泄露 → 盗刷 | 🔴 高 | 未确认 | `.gitignore` + 提交前扫描 |
| T4 | 上游 Gemini 为 **明文 HTTP** | 中间人可截获 K2、读取用户问题 | 🟠 中高 | 存在 | 换 HTTPS 中转；或限制该渠道只在家里/固定 IP 使用 |
| T5 | CORS 过宽（`*`） | 任意站盗用你的 API | 🟠 中 | 已收紧为白名单 | 保持白名单，App 方案见 §7 |
| T6 | 无用户级限流 | 单人刷爆额度 | 🟠 中 | 仅全局 | 设备令牌 + 每人每日 10-15 条 |
| T7 | 日志记录 prompt | 用户内容落盘 | 🟡 中 | 未确认 | 关闭请求体日志，只留元数据 |
| T8 | 反向代理暴露 admin 端口 | 绕过 Caddy 直连 | 🟡 中 | 需确认 | 只绑 127.0.0.1，公网只开 443 |
| T9 | App 被反编译 | 若含密钥则全泄 | 🟡 中 | 设计为零密钥 | 包内不放 key；证书固定 |
| T10 | 用户输入隐私内容 | 数据出境/第三方可见 | 🟡 中 | 存在 | 明示免责声明；限制输入长度；不落盘 |

---

## 6. 转 App 的方案与影响（审议重点之二）

| 方案 | 密钥风险 | 密钥是否进包 | 说明 |
|---|---|---|---|
| **PWA**（推荐先做） | 最低 | 否 | 加 manifest + service worker，可“添加到主屏幕”，无需上架、无需改打包链路 |
| **Capacitor**（要上架再做） | 低 | 否 | WebView 加载远程 URL 或本地静态资源，API 仍走 `https://<domain>/v1` |
| Tauri | 低 | 否 | 体积小，但需要 Rust 工具链，学习成本高 |

### 转 App 带来的唯一实质变化：Origin

- 浏览器：`Origin: https://<domain>`
- Capacitor：`Origin: capacitor://localhost` 或 `https://localhost`
- PWA：仍是 `https://<domain>`

**不能用“把 App 的 Origin 加进白名单”来解决**——那等于允许任何人伪装该 Origin。

推荐做法（**设备令牌机制**）：

```text
App 首次启动
  └─ POST /api/device-token  { deviceId }
       └─ 服务端校验 + 签发 JWT（24h，绑定 deviceId + 每日额度）
  └─ 后续请求  Authorization: Bearer <JWT>
       └─ Caddy 校验 JWT，再注入 NEWAPI_TOKEN
```

这样：

- App 包内仍然零密钥；
- 即使被反编译，攻击者也只能拿到“自己的”设备令牌，受每日额度限制；
- 浏览器端仍走 Origin 白名单，不需要令牌。

### 上架前提（务必写进计划）

- ICP 备案（域名）
- **App 备案**（工信部要求，2023 年起）
- 隐私政策 + 权限最小化（不申请通讯录/位置等）
- 内容安全：生成式 AI 面向公众需评估合规路径

---

## 7. 分阶段实施计划

### P0 上线前必须完成（不做不上线）

| # | 事项 | 验收 |
|---|---|---|
| 1 | 管理面板改强密码（≥16 位随机） | 弱口令无法登录 |
| 2 | new-api 仅监听 `127.0.0.1:3000` | 公网 `:3000` 不可达 |
| 3 | `.gitignore` 覆盖 `.env`、`*.db`、`*.log` | `git status` 无敏感文件 |
| 4 | CORS 白名单只含正式域名 | 其他 Origin 返回 403 |
| 5 | 关闭请求体日志 | 日志中无 prompt 内容 |
| 6 | 智谱 / Gemini key 轮换（旧 key 曾在对话中明文出现） | 旧 key 失效 |
| 7 | 全站 HTTPS（Caddy 自动证书） | http 301 → https |
| 8 | 每人每日上限 10-15 条 | 超限返回明确文案 |
| 9 | 前端任何位置无 key | §4 全表通过 |

### P1 上线后一周内

| # | 事项 |
|---|---|
| 10 | 设备令牌（JWT）机制，替代纯 Origin 校验 |
| 11 | 高频问题缓存（命中直接回，减少上游调用） |
| 12 | 8s/10s 分级超时 + 失败降级到本地回答 |
| 13 | 备份：DB 加密备份，落盘权限 600 |
| 14 | 监控：每日请求量、429 率、失败率 |

### P2 体验优化

| # | 事项 |
|---|---|
| 15 | 晚高峰策略（20:00-23:00 直接优先备用渠道） |
| 16 | 补第三家免费渠道（讯飞 Lite，待领取免费包） |
| 17 | 回答长度硬限制（≤150 字），系统提示词约束范围 |

### P3 转 App

| # | 事项 |
|---|---|
| 18 | 先做 PWA（manifest + SW + 图标），验证安装体验 |
| 19 | 若需上架：Capacitor 打包 + 证书固定 + 关闭 WebView 调试 |
| 20 | App 备案 + 隐私政策 |

---

## 8. 明确不做（降低风险面）

- 不在前端做任何加密/拆分/混淆密钥（无效且误导）
- 不注册多账号薅额度
- 不把用户聊天记录上传服务器
- 不在 App 包内硬编码任何 token
- 不开放公开注册（避免陌生人消耗额度）

---

## 9. 给审议模型的问题清单

请逐条回答并给出严重度：

1. 前端产物中是否存在任何密钥？依据是什么？
2. 上述 5 个密钥位置中，哪个最可能先泄露？为什么？
3. `T1`（管理面板）与 `T4`（明文上游 HTTP）哪个更应优先处理？
4. 设备令牌方案（§6）能否在不泄露密钥的前提下支持 App？有无更优解？
5. new-api 明文存 key 这一设计，是否需要用「自行加密存储 + 启动时解密」来替代？
6. 50 人规模下，是否值得引入 WAF / Turnstile？成本与收益如何？
7. 面向公众提供生成式 AI 服务，在境内需要哪些合规动作？本项目当前形态是否触碰红线？
8. 是否存在本方案未覆盖的攻击面？

---

## 10. 附：当前运行态快照

- new-api 已在本机 Windows 启动，面板显示：请求次数 0、消耗额度 0、令牌数 1
- 渠道：智谱（优先级 1）+ Gemini 中转（优先级 9）
- 免费渠道不计费，面板“剩余额度 $0.00”属正常现象
- 尚未完成：公网反代、HTTPS、面板改密、日志关闭、每日限额
````

- 原文件名：ai-backend-security-plan-v1.md
- 总行数：225
- 来源：git 0510ebe:exports/ai-backend-security-plan.md
- 是否逐字原文：是

<!-- APPENDIX: 15-doc-version/ai-backend-security-plan-v2.md -->
````markdown
# Mnk Study Loop · AI 后端与密钥方案（送审版 v2）

> 版本：v2 · 2026-11-11
> 用途：交给独立模型审议，重点回答三件事：
> 1）会不会把密钥泄露给前端 / App 用户；
> 2）能不能保证只调用免费模型、永远不产生费用；
> 3）这套方案转成 App 后是否还成立。
> 文中不含真实密钥，`xxx` 均为占位。

---

## 0. 结论先行

1. **前端产物里没有任何密钥。** 浏览器和 App 包内密钥数量为 0，所有密钥只在服务器侧。
2. **「只用免费模型」不能靠 key 保证。** 智谱的 API Key 是**账户级**的，同一把 key 既能调免费的 `glm-4.7-flash`，也能调付费的 `glm-4.7`。所谓免费指模型，不指 key。因此必须在**网关层做模型白名单**，让付费模型在网关里根本不存在。
3. 只要做到「网关只暴露 1 个虚拟模型名 `mnk-chat` → 只映射到 `glm-4.7-flash`」，即使前端被篡改、用户伪造请求，也无法让上游调用付费模型。
4. 真正需要盯的风险不是前端，而是：new-api 数据库明文存上游 key、管理面板暴露公网、Gemini 上游是明文 HTTP、以及**曾在聊天里明文出现过的两把 key 必须轮换**。

---

## 1. 资产与边界

| 项 | 内容 |
|---|---|
| 前端 | 单文件 HTML `/workspace/study-loop/index.html`（约 5.9 MB，含 20 关题库、95 张翻卡、AI 聊天、曲库） |
| AI 能力 | 站内聊天答疑，调用 `/v1/chat/completions` |
| 用户规模 | ≤50 人同时在线，日请求 ≤1000 |
| 部署 | 静态站 + Caddy + new-api + 两家上游 |
| 远期 | 同一份 HTML 打包成 App（PWA 优先，必要时 Capacitor） |
| 不做 | 用户注册、支付、聊天记录上云 |

---

## 2. 架构

```text
┌──────────────┐  HTTPS   ┌────────────┐  HTTP(内网)  ┌──────────┐  HTTPS  ┌──────────┐
│ 浏览器 / App  │ ───────▶ │   Caddy    │ ───────────▶ │ new-api  │ ──────▶ │ 智谱      │
│ 零密钥        │          │ TLS+注入令牌│              │ 模型网关  │         │ glm-4.7- │
└──────────────┘          │ CORS 白名单 │              │ 存上游key │         │ flash    │
                          └────────────┘              │          │  HTTP   └──────────┘
                                                       │          │ ──────▶ ┌──────────┐
                                                       └──────────┘         │Gemini中转 │
                                                                            └──────────┘
```

- 页面与 API 同域：`https://<domain>/` 与 `https://<domain>/v1/*`
- 前端只调 `/v1/chat/completions`，不携带任何 key
- Caddy 反代时注入 `Authorization: Bearer <NEWAPI_TOKEN>`，并限制 Origin
- new-api 只暴露一个模型名 `mnk-chat`，内部按优先级路由

---

## 3. 「只调用免费模型」的四层限制

这是本方案的核心。四层必须同时成立，缺一层都可能被绕过。

### L1 渠道层：付费模型在网关里不存在

new-api 里**只建两个渠道**，且每个渠道的「模型」列表里**只有 `mnk-chat`**：

| 渠道 | 类型 | Base URL | 模型列表 | 模型重定向 | 参数覆盖 |
|---|---|---|---|---|---|
| 智谱（主） | OpenAI | `https://open.bigmodel.cn` | `mnk-chat` | `mnk-chat → glm-4.7-flash` | `{"thinking":{"type":"disabled"}}` |
| Gemini 中转（备） | OpenAI | `http://186.241.104.178:3000` | `mnk-chat` | `mnk-chat → gemini-3.8-flash-high` | 无 |

要点：

- **不要**在渠道里添加 `glm-4.7`、`glm-4.7-flashx` 等任何付费型号。
- new-api 的路由前提是「模型在渠道的模型列表里」；列表里没有的模型，请求会直接 404/400，不会转发到上游。
- 即使有人把请求体改成 `{"model":"glm-4.7"}`，网关也找不到该模型，**不会产生费用**。

### L2 令牌层：令牌只允许一个模型

在 new-api 生成给 Caddy 用的令牌时：

- 「可用模型」填 `mnk-chat`（只填这一个）
- 「额度」设为 0 表示不限额，但配合下面的每日限额；或者按日重置
- 「分组」使用默认组，不额外开放
- 「IP 限制」可选：只允许 Caddy 所在内网 IP

这样即使令牌泄露，对方也只能调免费的 `mnk-chat`，无法调付费模型，也无法刷爆其他模型。

### L3 边缘层：拒绝非法 model 字段（可选加固）

Caddy 本身不擅长校验 JSON，推荐两种做法：

- **推荐**：由 new-api 令牌的「可用模型」兜底（上面 L2 已覆盖）。
- **加固**：在 Caddy 前加一个 ~20 行的 Node 小代理，校验 `body.model === "mnk-chat"`，否则返回 400。或者用 Caddy 的 `@badModel` + `request_body` 做简单匹配。

### L4 监控层：每天确认账单为 0

- 智谱控制台 → 财务/账单：每天看一眼「消费金额」必须为 0。
- new-api → 日志：抽查 `model` 字段，必须全部是 `glm-4.7-flash`。
- 建一个每天 10:00 的提醒；发现非 0 消费，立即停用渠道并轮换 key。
- 关闭自动充值，保持账户余额为 0；这样即使误调付费模型，也会因欠费失败，而不是扣钱。

> 说明：智谱控制台目前不能给单个 API Key 绑定「只能调某模型」的白名单，也没有硬性消费上限（只有余额提醒）。所以**不要指望在平台侧限制**，限制必须在自己的网关上完成。

---

## 4. 密钥清单（仅 2 把业务密钥）

| # | 密钥 | 存放位置 | 明文 | 能读到的人 | 泄露后果 |
|---|---|---|---|---|---|
| K1 | 智谱 API Key | new-api 数据库渠道表 | 是（面板掩码） | 服务器 root、面板管理员 | 可调该账户所有模型（含付费），需靠 L1/L2 限制 |
| K2 | Gemini 中转 Key | new-api 数据库渠道表 | 是 | 同上 | 可消耗该中转额度 |
| K3 | `NEWAPI_TOKEN` | 服务器 `.env` | 是 | 服务器 root | 只能调 `mnk-chat`，损失有限 |
| K4 | 管理面板密码 | 数据库哈希 | 否 | 无 | 登录后可看到 K1/K2 |
| K5 | TLS 私钥 | Caddy 证书目录 | 是 | 服务器 root | 可伪造站点 |

**前端产物中密钥数量：0。** 验证方法：

```bash
# 在构建/部署后对实际提供的 HTML 做检查，应无输出
curl -s https://<domain>/study-loop/index.html | grep -nE 'sk-[A-Za-z0-9]{20,}|[0-9a-f]{32}\.[A-Za-z0-9]{16,}' || echo "OK: 前端无密钥"
```

---

## 5. 密钥泄露路径与对策

| 编号 | 路径 | 现状 | 对策 |
|---|---|---|---|
| T1 | 前端源码被查看 | 无密钥 | 保持；任何新功能不得把 key 写进 HTML |
| T2 | new-api 数据库文件被下载 | 明文存 K1/K2 | 文件权限 600；目录不进 Web 根；定期备份加密；`.gitignore` 排除 `*.db` |
| T3 | 管理面板公网可访问 | 高风险 | 只监听 `127.0.0.1:3000`；Caddy 不反代 `/console`；强密码 + 关闭注册 |
| T4 | 日志记录请求体 | 中风险 | 关闭请求体日志；只留模型名、耗时、状态码 |
| T5 | Gemini 上游明文 HTTP | 中风险 | 该段走公网明文，key 可被中间人看到；仅作为备用，或换 HTTPS 中转 |
| T6 | key 曾出现在聊天/截图 | **已发生** | 上线前轮换 K1、K2 |
| T7 | 服务器被入侵 | 低概率高影响 | 只开 80/443；SSH 密钥登录；fail2ban |
| T8 | CORS 配置过宽 | 中风险 | 只允许自己的域名；不要 `*` |
| T9 | 令牌被盗用刷量 | 中风险 | 令牌只允许 `mnk-chat`；每日限额；异常流量告警 |
| T10 | App 包内嵌 key | 未发生 | 转 App 时继续走后端，不把 key 打进包 |

---

## 6. 限额与容量

实测（同一时段 20 次请求）：

- 智谱 `glm-4.7-flash`：成功约 44%，成功时 ~0.7 s，失败多为 429
- Gemini 中转：成功约 69%，成功时 ~5.5 s，失败全是 40 s 超时
- 组合并重试 1 次：单轮可用率约 97%

容量公式：`所需并发 = 人数 ÷ 间隔 × 响应时间`

| 场景 | 并发 | 结论 |
|---|---|---|
| 50 人，2–3 分钟一问 | ~0.3–0.6 | 可行 |
| 50 人，5 秒一问 | ~10–25 | 不可行，差一个数量级 |
| 100 人，2 分钟一问 | ~1–2 | 勉强，建议付费档 |

建议限额：

- 每人每天 10–15 条（前端按 localStorage 计数，网关再兜底）
- 全局 RPM 上限 20
- 单次 `max_tokens` 400，超时 10 s，失败回落本地回答

---

## 7. 转 App 后的密钥处理

- **不要把 key 打进 App 包**：反编译即可拿到。
- 继续走后端 `/v1`，但 Origin 会从 `https://<domain>` 变成 `capacitor://localhost`，需要：
  - Caddy 的 Origin 白名单增加 `capacitor://localhost`；或
  - 更稳：App 首次启动向后端换取**设备令牌（JWT）**，之后请求带 `Authorization: Bearer <设备令牌>`，Caddy 校验 JWT 后再注入上游 key。
- 设备令牌可设 30 天有效期、可吊销、绑定设备指纹，泄露损失可控。
- 音频等静态资源：若页面从远程 URL 加载，相对路径指向服务器；若打进包内，需把 `bgm/` 放进 `public/` 并保持相对路径。

---

## 8. P0 上线清单

- [ ] 轮换 K1 智谱 key、K2 Gemini key（都曾在对话中明文出现）
- [ ] new-api 面板改强密码，删除默认 `root/123456`
- [ ] new-api 只监听 `127.0.0.1:3000`，Caddy 不反代 `/console`
- [ ] 渠道模型列表只留 `mnk-chat`，确认没有任何付费型号
- [ ] 令牌「可用模型」只填 `mnk-chat`
- [ ] `.gitignore` 覆盖 `.env`、`*.db`、`*.log`
- [ ] 关闭 new-api 请求体日志
- [ ] CORS 只允许自己的域名（上线前不要用 `*`）
- [ ] HTTPS 证书正常，HTTP 自动跳转 HTTPS
- [ ] 每天检查智谱账单为 0；关闭自动充值
- [ ] 每人每日 10–15 条限额
- [ ] 前端产物 grep 密钥应为 0

---

## 9. 给审议模型的问题

1. 只靠 new-api 的「渠道模型列表 + 令牌可用模型」，能否 100% 阻止调用付费模型？有没有绕过路径（例如模型重定向、参数覆盖、`/v1/models` 之外的接口）？
2. new-api 数据库明文存上游 key，在「面板只监听内网 + 文件权限 600」的前提下，剩余风险是否可以接受？是否必须上 KMS/Vault？
3. Caddy 注入固定令牌的方案，令牌被前端用户拿到（例如通过浏览器网络面板看到请求头）会有什么后果？是否应该改成短时 JWT？
4. Gemini 中转是明文 HTTP，是否有必要直接放弃，只保留智谱 + 本地回落？
5. 50 人规模下，每人每天 15 条、全局 RPM 20，是否会触发智谱更严格的限流或封号？
6. 转 App 后用设备令牌 JWT，Caddy 校验 + 注入上游 key 的方案是否成立？有没有更简单的做法？
7. 免费模型政策变化（改为收费/下线）时，如何做到自动停服而不是自动扣费？
8. 这份方案还有哪些没列出的密钥泄露路径？

---

## 10. 附：相关文件

- 渠道配置：`/workspace/deploy/new-api/channels.json`
- 反向代理：`/workspace/deploy/new-api/Caddyfile`
- 启动脚本：`/workspace/deploy/new-api/start.sh`
- 冒烟测试：`/workspace/deploy/new-api/smoke.sh`
- 前端：`/workspace/study-loop/index.html`（零密钥，AI 走 `/v1/chat/completions`）
````

- 原文件名：ai-backend-security-plan-v2.md
- 总行数：209
- 来源：/workspace/exports/ai-backend-security-plan.md（当前工作文件）
- 是否逐字原文：是
- 与 AAA.md：原件不在工作区，**无法逐字节核验**；仅行数（209）与字节数（11,534）一致，不能据此下“同一份”的结论。

<!-- APPENDIX: 15-doc-version/v1-to-v2.diff -->
````diff
diff --git a/exports/ai-backend-security-plan.md b/exports/ai-backend-security-plan.md
index 098de8b..26f5fea 100644
--- a/exports/ai-backend-security-plan.md
+++ b/exports/ai-backend-security-plan.md
@@ -1,225 +1,209 @@
-# Mnk Study Loop · AI 后端安全方案（送审版）
+# Mnk Study Loop · AI 后端与密钥方案（送审版 v2）
 
-> 版本：v1 · 2026-11-11
-> 用途：交给独立模型做安全审议，重点回答「会不会泄露密钥」
-> 不含任何真实密钥，文中 `xxx` 均为占位
+> 版本：v2 · 2026-11-11
+> 用途：交给独立模型审议，重点回答三件事：
+> 1）会不会把密钥泄露给前端 / App 用户；
+> 2）能不能保证只调用免费模型、永远不产生费用；
+> 3）这套方案转成 App 后是否还成立。
+> 文中不含真实密钥，`xxx` 均为占位。
 
 ---
 
-## 0. 一句话结论（供审议者先看）
+## 0. 结论先行
 
-**密钥不会进入前端产物。** 浏览器 / App 包内零密钥，所有密钥只存在于服务器侧的三个位置（`.env`、new-api 数据库、Caddy 配置）。真正的泄露风险不在前端，而在：**①管理面板公网暴露 ②上游是明文 HTTP ③数据库文件明文存 key ④日志记录用户内容**。
+1. **前端产物里没有任何密钥。** 浏览器和 App 包内密钥数量为 0，所有密钥只在服务器侧。
+2. **「只用免费模型」不能靠 key 保证。** 智谱的 API Key 是**账户级**的，同一把 key 既能调免费的 `glm-4.7-flash`，也能调付费的 `glm-4.7`。所谓免费指模型，不指 key。因此必须在**网关层做模型白名单**，让付费模型在网关里根本不存在。
+3. 只要做到「网关只暴露 1 个虚拟模型名 `mnk-chat` → 只映射到 `glm-4.7-flash`」，即使前端被篡改、用户伪造请求，也无法让上游调用付费模型。
+4. 真正需要盯的风险不是前端，而是：new-api 数据库明文存上游 key、管理面板暴露公网、Gemini 上游是明文 HTTP、以及**曾在聊天里明文出现过的两把 key 必须轮换**。
 
 ---
 
-## 1. 目标与边界
+## 1. 资产与边界
 
 | 项 | 内容 |
 |---|---|
-| 现有资产 | 单文件 HTML 学习应用 `/workspace/study-loop/index.html`（含翻卡、关卡、错题本、好感度） |
-| 新增能力 | 站内 AI 问答（聊天面板），问题交给大模型回答 |
-| 用户规模 | 预期 ≤50 人同时在线，日请求 ≤1000 |
-| 部署形态 | 静态站（CDN）+ 反向代理 + 模型网关 + 上游模型 |
-| 远期形态 | 同一份 HTML 打包为 App（PWA 优先，必要时 Capacitor） |
-| 明确不做 | 用户注册体系、支付、聊天记录上云 |
+| 前端 | 单文件 HTML `/workspace/study-loop/index.html`（约 5.9 MB，含 20 关题库、95 张翻卡、AI 聊天、曲库） |
+| AI 能力 | 站内聊天答疑，调用 `/v1/chat/completions` |
+| 用户规模 | ≤50 人同时在线，日请求 ≤1000 |
+| 部署 | 静态站 + Caddy + new-api + 两家上游 |
+| 远期 | 同一份 HTML 打包成 App（PWA 优先，必要时 Capacitor） |
+| 不做 | 用户注册、支付、聊天记录上云 |
 
 ---
 
 ## 2. 架构
 
 ```text
-┌─────────────┐   HTTPS    ┌──────────┐   HTTP(内网)  ┌──────────┐   HTTPS   ┌────────┐
-│ 浏览器 / App │ ─────────▶ │  Caddy   │ ────────────▶ │ new-api  │ ────────▶ │ 智谱    │
-│ (零密钥)     │            │ 反代+TLS │               │ 网关     │           └────────┘
-└─────────────┘            │ 注入令牌 │               │ 存上游key│   HTTP    ┌────────┐
-                           └──────────┘               │          │ ────────▶ │Gemini中转│
-                                                      └──────────┘           └────────┘
+┌──────────────┐  HTTPS   ┌────────────┐  HTTP(内网)  ┌──────────┐  HTTPS  ┌──────────┐
+│ 浏览器 / App  │ ───────▶ │   Caddy    │ ───────────▶ │ new-api  │ ──────▶ │ 智谱      │
+│ 零密钥        │          │ TLS+注入令牌│              │ 模型网关  │         │ glm-4.7- │
+└──────────────┘          │ CORS 白名单 │              │ 存上游key │         │ flash    │
+                          └────────────┘              │          │  HTTP   └──────────┘
+                                                       │          │ ──────▶ ┌──────────┐
+                                                       └──────────┘         │Gemini中转 │
+                                                                            └──────────┘
 ```
 
-- 静态页与 API 同域：`https://<domain>/` 与 `https://<domain>/v1/*`
-- 前端只调 `/v1/chat/completions`，**从不携带任何密钥**
-- Caddy 在反代时注入 `Authorization: Bearer <NEWAPI_TOKEN>`，并做 Origin 白名单
-- new-api 负责多渠道、优先级、重试、额度统计
-- 上游两家：智谱 `glm-4.7-flash`（免费，主）、第三方 Gemini 中转（备）
+- 页面与 API 同域：`https://<domain>/` 与 `https://<domain>/v1/*`
+- 前端只调 `/v1/chat/completions`，不携带任何 key
+- Caddy 反代时注入 `Authorization: Bearer <NEWAPI_TOKEN>`，并限制 Origin
+- new-api 只暴露一个模型名 `mnk-chat`，内部按优先级路由
 
 ---
 
-## 3. 凭据清单与存放位置（审议重点）
+## 3. 「只调用免费模型」的四层限制
 
-先分清两类，不要混为一谈：
+这是本方案的核心。四层必须同时成立，缺一层都可能被绕过。
 
-- **业务密钥（2 个）**：你去平台申请的 API Key，只有这两个。
-- **系统凭据（3 个）**：系统自身需要的东西，不是去平台申请的，但泄露同样有后果。
+### L1 渠道层：付费模型在网关里不存在
 
-### 3.1 业务密钥（仅 2 个）
+new-api 里**只建两个渠道**，且每个渠道的「模型」列表里**只有 `mnk-chat`**：
 
-| # | 密钥 | 存放位置 | 明文? | 谁能读到 | 泄露途径 |
+| 渠道 | 类型 | Base URL | 模型列表 | 模型重定向 | 参数覆盖 |
 |---|---|---|---|---|---|
-| K1 | 智谱 API Key（`glm-4.7-flash`） | new-api 数据库「渠道」表 | **是**（面板掩码显示） | DB 文件、管理面板 | DB 文件被下载 / 面板被登录 |
-| K2 | Gemini 中转 Key | new-api 数据库「渠道」表 | **是** | 同上 | 同上 |
+| 智谱（主） | OpenAI | `https://open.bigmodel.cn` | `mnk-chat` | `mnk-chat → glm-4.7-flash` | `{"thinking":{"type":"disabled"}}` |
+| Gemini 中转（备） | OpenAI | `http://186.241.104.178:3000` | `mnk-chat` | `mnk-chat → gemini-3.8-flash-high` | 无 |
 
-**关键事实：K1/K2 在 new-api 数据库中是明文存储的**，面板上的 `sk-****` 只是 UI 掩码。因此「数据库文件 == 两个上游 key 全泄」，这是本项目最大的单点。
+要点：
 
-### 3.2 系统凭据（3 个，非申请所得）
+- **不要**在渠道里添加 `glm-4.7`、`glm-4.7-flashx` 等任何付费型号。
+- new-api 的路由前提是「模型在渠道的模型列表里」；列表里没有的模型，请求会直接 404/400，不会转发到上游。
+- 即使有人把请求体改成 `{"model":"glm-4.7"}`，网关也找不到该模型，**不会产生费用**。
 
-| # | 凭据 | 用途 | 存放位置 | 明文? | 泄露后果 |
-|---|---|---|---|---|---|
-| K3 | NEWAPI_TOKEN | 前端→网关的转发令牌，由 Caddy 注入 | 服务器 `.env` | 是 | 别人可无偿调用你的 AI 额度 |
-| K4 | 管理员密码 | 登录 new-api 面板 | DB（哈希存储） | 否 | 面板被登录 → 读到 K1/K2 |
-| K5 | TLS 私钥 | HTTPS 证书私钥 | Caddy 数据卷 | 是 | 可冒充你的域名 |
+### L2 令牌层：令牌只允许一个模型
 
-**结论：会被“泄露”的对象是 K1-K5 共 5 项，但其中只有 K1、K2 是你申请的大模型 API Key。**
+在 new-api 生成给 Caddy 用的令牌时：
 
-**前端产物中存在的密钥数量：0。**
+- 「可用模型」填 `mnk-chat`（只填这一个）
+- 「额度」设为 0 表示不限额，但配合下面的每日限额；或者按日重置
+- 「分组」使用默认组，不额外开放
+- 「IP 限制」可选：只允许 Caddy 所在内网 IP
 
----
+这样即使令牌泄露，对方也只能调免费的 `mnk-chat`，无法调付费模型，也无法刷爆其他模型。
 
-## 4. 密钥流向验证（如何证明不泄露）
+### L3 边缘层：拒绝非法 model 字段（可选加固）
 
-审议者可按下表逐项验证：
+Caddy 本身不擅长校验 JSON，推荐两种做法：
 
-| 验证项 | 方法 | 期望结果 |
-|---|---|---|
-| HTML 无密钥 | `grep -Ei "sk-|apikey|secret|token" index.html` | 无命中（除 UI 文案） |
-| 前端请求头 | 浏览器 F12 → Network → 任意 `/v1/*` 请求 | 请求头无 Authorization 上游 key |
-| 页面源码 | `view-source:` | 无 key 字面量 |
-| App 包 | `unzip app.apk && grep -r "sk-"` | 无命中 |
-| Caddy 注入 | 直接 curl 带 Origin 请求 | 200；不带白名单 Origin → 403 |
-| 直连 new-api 端口 | 从公网访问 `:3000` | 应**不可达**（仅监听 127.0.0.1 或防火墙拦截） |
-| 管理面板 | 公网访问 `/console` | 403/404 或需额外认证 |
+- **推荐**：由 new-api 令牌的「可用模型」兜底（上面 L2 已覆盖）。
+- **加固**：在 Caddy 前加一个 ~20 行的 Node 小代理，校验 `body.model === "mnk-chat"`，否则返回 400。或者用 Caddy 的 `@badModel` + `request_body` 做简单匹配。
 
----
+### L4 监控层：每天确认账单为 0
 
-## 5. 威胁模型与缓解
+- 智谱控制台 → 财务/账单：每天看一眼「消费金额」必须为 0。
+- new-api → 日志：抽查 `model` 字段，必须全部是 `glm-4.7-flash`。
+- 建一个每天 10:00 的提醒；发现非 0 消费，立即停用渠道并轮换 key。
+- 关闭自动充值，保持账户余额为 0；这样即使误调付费模型，也会因欠费失败，而不是扣钱。
 
-| # | 威胁 | 影响 | 严重度 | 现状 | 缓解措施 |
-|---|---|---|---|---|---|
-| T1 | 管理面板弱口令被爆破 | 全部 key 可读、可改 | 🔴 高 | 默认 root/123456 | 强密码 + 改默认路径 + 仅内网/IP 白名单 |
-| T2 | 数据库文件泄露 | K1/K2 明文外泄 | 🔴 高 | 无加密 | 卷权限 600、备份加密、不上传网盘 |
-| T3 | `.env` 进 git | K3 泄露 → 盗刷 | 🔴 高 | 未确认 | `.gitignore` + 提交前扫描 |
-| T4 | 上游 Gemini 为 **明文 HTTP** | 中间人可截获 K2、读取用户问题 | 🟠 中高 | 存在 | 换 HTTPS 中转；或限制该渠道只在家里/固定 IP 使用 |
-| T5 | CORS 过宽（`*`） | 任意站盗用你的 API | 🟠 中 | 已收紧为白名单 | 保持白名单，App 方案见 §7 |
-| T6 | 无用户级限流 | 单人刷爆额度 | 🟠 中 | 仅全局 | 设备令牌 + 每人每日 10-15 条 |
-| T7 | 日志记录 prompt | 用户内容落盘 | 🟡 中 | 未确认 | 关闭请求体日志，只留元数据 |
-| T8 | 反向代理暴露 admin 端口 | 绕过 Caddy 直连 | 🟡 中 | 需确认 | 只绑 127.0.0.1，公网只开 443 |
-| T9 | App 被反编译 | 若含密钥则全泄 | 🟡 中 | 设计为零密钥 | 包内不放 key；证书固定 |
-| T10 | 用户输入隐私内容 | 数据出境/第三方可见 | 🟡 中 | 存在 | 明示免责声明；限制输入长度；不落盘 |
+> 说明：智谱控制台目前不能给单个 API Key 绑定「只能调某模型」的白名单，也没有硬性消费上限（只有余额提醒）。所以**不要指望在平台侧限制**，限制必须在自己的网关上完成。
 
 ---
 
-## 6. 转 App 的方案与影响（审议重点之二）
+## 4. 密钥清单（仅 2 把业务密钥）
 
-| 方案 | 密钥风险 | 密钥是否进包 | 说明 |
-|---|---|---|---|
-| **PWA**（推荐先做） | 最低 | 否 | 加 manifest + service worker，可“添加到主屏幕”，无需上架、无需改打包链路 |
-| **Capacitor**（要上架再做） | 低 | 否 | WebView 加载远程 URL 或本地静态资源，API 仍走 `https://<domain>/v1` |
-| Tauri | 低 | 否 | 体积小，但需要 Rust 工具链，学习成本高 |
-
-### 转 App 带来的唯一实质变化：Origin
-
-- 浏览器：`Origin: https://<domain>`
-- Capacitor：`Origin: capacitor://localhost` 或 `https://localhost`
-- PWA：仍是 `https://<domain>`
-
-**不能用“把 App 的 Origin 加进白名单”来解决**——那等于允许任何人伪装该 Origin。
+| # | 密钥 | 存放位置 | 明文 | 能读到的人 | 泄露后果 |
+|---|---|---|---|---|---|
+| K1 | 智谱 API Key | new-api 数据库渠道表 | 是（面板掩码） | 服务器 root、面板管理员 | 可调该账户所有模型（含付费），需靠 L1/L2 限制 |
+| K2 | Gemini 中转 Key | new-api 数据库渠道表 | 是 | 同上 | 可消耗该中转额度 |
+| K3 | `NEWAPI_TOKEN` | 服务器 `.env` | 是 | 服务器 root | 只能调 `mnk-chat`，损失有限 |
+| K4 | 管理面板密码 | 数据库哈希 | 否 | 无 | 登录后可看到 K1/K2 |
+| K5 | TLS 私钥 | Caddy 证书目录 | 是 | 服务器 root | 可伪造站点 |
 
-推荐做法（**设备令牌机制**）：
+**前端产物中密钥数量：0。** 验证方法：
 
-```text
-App 首次启动
-  └─ POST /api/device-token  { deviceId }
-       └─ 服务端校验 + 签发 JWT（24h，绑定 deviceId + 每日额度）
-  └─ 后续请求  Authorization: Bearer <JWT>
-       └─ Caddy 校验 JWT，再注入 NEWAPI_TOKEN
+```bash
+# 在构建/部署后对实际提供的 HTML 做检查，应无输出
+curl -s https://<domain>/study-loop/index.html | grep -nE 'sk-[A-Za-z0-9]{20,}|[0-9a-f]{32}\.[A-Za-z0-9]{16,}' || echo "OK: 前端无密钥"
 ```
 
-这样：
-
-- App 包内仍然零密钥；
-- 即使被反编译，攻击者也只能拿到“自己的”设备令牌，受每日额度限制；
-- 浏览器端仍走 Origin 白名单，不需要令牌。
+---
 
-### 上架前提（务必写进计划）
+## 5. 密钥泄露路径与对策
 
-- ICP 备案（域名）
-- **App 备案**（工信部要求，2023 年起）
-- 隐私政策 + 权限最小化（不申请通讯录/位置等）
-- 内容安全：生成式 AI 面向公众需评估合规路径
+| 编号 | 路径 | 现状 | 对策 |
+|---|---|---|---|
+| T1 | 前端源码被查看 | 无密钥 | 保持；任何新功能不得把 key 写进 HTML |
+| T2 | new-api 数据库文件被下载 | 明文存 K1/K2 | 文件权限 600；目录不进 Web 根；定期备份加密；`.gitignore` 排除 `*.db` |
+| T3 | 管理面板公网可访问 | 高风险 | 只监听 `127.0.0.1:3000`；Caddy 不反代 `/console`；强密码 + 关闭注册 |
+| T4 | 日志记录请求体 | 中风险 | 关闭请求体日志；只留模型名、耗时、状态码 |
+| T5 | Gemini 上游明文 HTTP | 中风险 | 该段走公网明文，key 可被中间人看到；仅作为备用，或换 HTTPS 中转 |
+| T6 | key 曾出现在聊天/截图 | **已发生** | 上线前轮换 K1、K2 |
+| T7 | 服务器被入侵 | 低概率高影响 | 只开 80/443；SSH 密钥登录；fail2ban |
+| T8 | CORS 配置过宽 | 中风险 | 只允许自己的域名；不要 `*` |
+| T9 | 令牌被盗用刷量 | 中风险 | 令牌只允许 `mnk-chat`；每日限额；异常流量告警 |
+| T10 | App 包内嵌 key | 未发生 | 转 App 时继续走后端，不把 key 打进包 |
 
 ---
 
-## 7. 分阶段实施计划
+## 6. 限额与容量
 
-### P0 上线前必须完成（不做不上线）
+实测（同一时段 20 次请求）：
 
-| # | 事项 | 验收 |
-|---|---|---|
-| 1 | 管理面板改强密码（≥16 位随机） | 弱口令无法登录 |
-| 2 | new-api 仅监听 `127.0.0.1:3000` | 公网 `:3000` 不可达 |
-| 3 | `.gitignore` 覆盖 `.env`、`*.db`、`*.log` | `git status` 无敏感文件 |
-| 4 | CORS 白名单只含正式域名 | 其他 Origin 返回 403 |
-| 5 | 关闭请求体日志 | 日志中无 prompt 内容 |
-| 6 | 智谱 / Gemini key 轮换（旧 key 曾在对话中明文出现） | 旧 key 失效 |
-| 7 | 全站 HTTPS（Caddy 自动证书） | http 301 → https |
-| 8 | 每人每日上限 10-15 条 | 超限返回明确文案 |
-| 9 | 前端任何位置无 key | §4 全表通过 |
-
-### P1 上线后一周内
-
-| # | 事项 |
-|---|---|
-| 10 | 设备令牌（JWT）机制，替代纯 Origin 校验 |
-| 11 | 高频问题缓存（命中直接回，减少上游调用） |
-| 12 | 8s/10s 分级超时 + 失败降级到本地回答 |
-| 13 | 备份：DB 加密备份，落盘权限 600 |
-| 14 | 监控：每日请求量、429 率、失败率 |
+- 智谱 `glm-4.7-flash`：成功约 44%，成功时 ~0.7 s，失败多为 429
+- Gemini 中转：成功约 69%，成功时 ~5.5 s，失败全是 40 s 超时
+- 组合并重试 1 次：单轮可用率约 97%
 
-### P2 体验优化
+容量公式：`所需并发 = 人数 ÷ 间隔 × 响应时间`
 
-| # | 事项 |
-|---|---|
-| 15 | 晚高峰策略（20:00-23:00 直接优先备用渠道） |
-| 16 | 补第三家免费渠道（讯飞 Lite，待领取免费包） |
-| 17 | 回答长度硬限制（≤150 字），系统提示词约束范围 |
+| 场景 | 并发 | 结论 |
+|---|---|---|
+| 50 人，2–3 分钟一问 | ~0.3–0.6 | 可行 |
+| 50 人，5 秒一问 | ~10–25 | 不可行，差一个数量级 |
+| 100 人，2 分钟一问 | ~1–2 | 勉强，建议付费档 |
 
-### P3 转 App
+建议限额：
 
-| # | 事项 |
-|---|---|
-| 18 | 先做 PWA（manifest + SW + 图标），验证安装体验 |
-| 19 | 若需上架：Capacitor 打包 + 证书固定 + 关闭 WebView 调试 |
-| 20 | App 备案 + 隐私政策 |
+- 每人每天 10–15 条（前端按 localStorage 计数，网关再兜底）
+- 全局 RPM 上限 20
+- 单次 `max_tokens` 400，超时 10 s，失败回落本地回答
 
 ---
 
-## 8. 明确不做（降低风险面）
+## 7. 转 App 后的密钥处理
 
-- 不在前端做任何加密/拆分/混淆密钥（无效且误导）
-- 不注册多账号薅额度
-- 不把用户聊天记录上传服务器
-- 不在 App 包内硬编码任何 token
-- 不开放公开注册（避免陌生人消耗额度）
+- **不要把 key 打进 App 包**：反编译即可拿到。
+- 继续走后端 `/v1`，但 Origin 会从 `https://<domain>` 变成 `capacitor://localhost`，需要：
+  - Caddy 的 Origin 白名单增加 `capacitor://localhost`；或
+  - 更稳：App 首次启动向后端换取**设备令牌（JWT）**，之后请求带 `Authorization: Bearer <设备令牌>`，Caddy 校验 JWT 后再注入上游 key。
+- 设备令牌可设 30 天有效期、可吊销、绑定设备指纹，泄露损失可控。
+- 音频等静态资源：若页面从远程 URL 加载，相对路径指向服务器；若打进包内，需把 `bgm/` 放进 `public/` 并保持相对路径。
 
 ---
 
-## 9. 给审议模型的问题清单
+## 8. P0 上线清单
+
+- [ ] 轮换 K1 智谱 key、K2 Gemini key（都曾在对话中明文出现）
+- [ ] new-api 面板改强密码，删除默认 `root/123456`
+- [ ] new-api 只监听 `127.0.0.1:3000`，Caddy 不反代 `/console`
+- [ ] 渠道模型列表只留 `mnk-chat`，确认没有任何付费型号
+- [ ] 令牌「可用模型」只填 `mnk-chat`
+- [ ] `.gitignore` 覆盖 `.env`、`*.db`、`*.log`
+- [ ] 关闭 new-api 请求体日志
+- [ ] CORS 只允许自己的域名（上线前不要用 `*`）
+- [ ] HTTPS 证书正常，HTTP 自动跳转 HTTPS
+- [ ] 每天检查智谱账单为 0；关闭自动充值
+- [ ] 每人每日 10–15 条限额
+- [ ] 前端产物 grep 密钥应为 0
+
+---
 
-请逐条回答并给出严重度：
+## 9. 给审议模型的问题
 
-1. 前端产物中是否存在任何密钥？依据是什么？
-2. 上述 5 个密钥位置中，哪个最可能先泄露？为什么？
-3. `T1`（管理面板）与 `T4`（明文上游 HTTP）哪个更应优先处理？
-4. 设备令牌方案（§6）能否在不泄露密钥的前提下支持 App？有无更优解？
-5. new-api 明文存 key 这一设计，是否需要用「自行加密存储 + 启动时解密」来替代？
-6. 50 人规模下，是否值得引入 WAF / Turnstile？成本与收益如何？
-7. 面向公众提供生成式 AI 服务，在境内需要哪些合规动作？本项目当前形态是否触碰红线？
-8. 是否存在本方案未覆盖的攻击面？
+1. 只靠 new-api 的「渠道模型列表 + 令牌可用模型」，能否 100% 阻止调用付费模型？有没有绕过路径（例如模型重定向、参数覆盖、`/v1/models` 之外的接口）？
+2. new-api 数据库明文存上游 key，在「面板只监听内网 + 文件权限 600」的前提下，剩余风险是否可以接受？是否必须上 KMS/Vault？
+3. Caddy 注入固定令牌的方案，令牌被前端用户拿到（例如通过浏览器网络面板看到请求头）会有什么后果？是否应该改成短时 JWT？
+4. Gemini 中转是明文 HTTP，是否有必要直接放弃，只保留智谱 + 本地回落？
+5. 50 人规模下，每人每天 15 条、全局 RPM 20，是否会触发智谱更严格的限流或封号？
+6. 转 App 后用设备令牌 JWT，Caddy 校验 + 注入上游 key 的方案是否成立？有没有更简单的做法？
+7. 免费模型政策变化（改为收费/下线）时，如何做到自动停服而不是自动扣费？
+8. 这份方案还有哪些没列出的密钥泄露路径？
 
 ---
 
-## 10. 附：当前运行态快照
+## 10. 附：相关文件
 
-- new-api 已在本机 Windows 启动，面板显示：请求次数 0、消耗额度 0、令牌数 1
-- 渠道：智谱（优先级 1）+ Gemini 中转（优先级 9）
-- 免费渠道不计费，面板“剩余额度 $0.00”属正常现象
-- 尚未完成：公网反代、HTTPS、面板改密、日志关闭、每日限额
+- 渠道配置：`/workspace/deploy/new-api/channels.json`
+- 反向代理：`/workspace/deploy/new-api/Caddyfile`
+- 启动脚本：`/workspace/deploy/new-api/start.sh`
+- 冒烟测试：`/workspace/deploy/new-api/smoke.sh`
+- 前端：`/workspace/study-loop/index.html`（零密钥，AI 走 `/v1/chat/completions`）
````

- 原文件名：v1-to-v2.diff
- 总行数：368
- 来源：git diff 0510ebe 5210488 -- exports/ai-backend-security-plan.md
- 是否逐字原文：是

<!-- APPENDIX: 06-appendix-fake-ai-server.mjs -->
```javascript
/* 假 AI 后端（联调用，无依赖）
 * 行为对齐桥接文档：先发 role 事件，校验后一次性发全文；非流式则直接返回 JSON。
 * 启动：node fake-ai-server.mjs
 * 环境变量：PORT=8791 DELAY=900 FAIL=0 TOKEN=（空=不校验）STATIC_DIR=（可选，同源托管页面）
 * 例：PORT=8000 STATIC_DIR=./site FAIL=1 node fake-ai-server.mjs
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = Number(process.env.PORT || 8791);
const DELAY = Number(process.env.DELAY || 900);
const FAIL = Number(process.env.FAIL || 0);
const TOKEN = process.env.TOKEN || "";
const STATIC_DIR = process.env.STATIC_DIR || "";

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".mp4": "video/mp4", ".ico": "image/x-icon" };

const MODELS = [
  { id: "fake-echo-1", object: "model", created: 1700000000, owned_by: "fake" },
  { id: "fake-slow-1", object: "model", created: 1700000000, owned_by: "fake" }
];

let seq = 0;

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
}

function json(res, code, obj) {
  cors(res);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  console.log(new Date().toISOString(), req.method, url.pathname);
  if (req.method === "OPTIONS") { cors(res); res.writeHead(204); return res.end(); }

  if (url.pathname === "/health") return json(res, 200, { ok: true, seq, delay: DELAY, fail: FAIL });

  if (url.pathname === "/v1/models" && req.method === "GET") {
    return json(res, 200, { object: "list", data: MODELS });
  }

  if (url.pathname !== "/v1/chat/completions" || req.method !== "POST") {
    if (STATIC_DIR && req.method === "GET") {
      let rel = decodeURIComponent(url.pathname);
      if (rel === "/") rel = "/index.html";
      const file = path.join(STATIC_DIR, path.normalize(rel).replace(/^(\.\.[/\\])+/, ""));
      if (file.startsWith(path.resolve(STATIC_DIR)) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
        return fs.createReadStream(file).pipe(res);
      }
    }
    return json(res, 404, { error: { message: "not found" } });
  }

  if (TOKEN && req.headers.authorization !== "Bearer " + TOKEN) {
    return json(res, 401, { error: { message: "bad key" } });
  }

  let body = "";
  for await (const chunk of req) body += chunk;
  let payload;
  try { payload = JSON.parse(body || "{}"); } catch { return json(res, 400, { error: { message: "bad json" } }); }

  const msgs = Array.isArray(payload.messages) ? payload.messages : [];
  if (!msgs.length) return json(res, 400, { error: { message: "messages required" } });

  const last = msgs[msgs.length - 1]?.content || "";
  const model = payload.model || MODELS[0].id;
  const n = ++seq;

  if (FAIL > 0 && Math.random() < FAIL) {
    await sleep(300);
    return json(res, 503, { error: { message: "fake upstream_error" } });
  }

  const wait = DELAY + (model === "fake-slow-1" ? 4000 : 0);
  await sleep(wait);

  const content = `【假后端#${n}】收到「${String(last).slice(0, 40)}」；共 ${msgs.length} 条消息，模型 ${model}。`;

  if (!payload.stream) {
    return json(res, 200, {
      id: "chatcmpl-fake-" + n,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 }
    });
  }

  cors(res);
  res.writeHead(200, { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache" });
  const emit = (o) => res.write("data: " + JSON.stringify(o) + "\n\n");
  emit({ id: "chatcmpl-fake-" + n, object: "chat.completion.chunk", created: 0, model,
         choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }] });
  emit({ id: "chatcmpl-fake-" + n, object: "chat.completion.chunk", created: 0, model,
         choices: [{ index: 0, delta: { content }, finish_reason: null }] });
  emit({ id: "chatcmpl-fake-" + n, object: "chat.completion.chunk", created: 0, model,
         choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
         usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 } });
  res.write("data: [DONE]\n\n");
  res.end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`fake-ai-server on http://127.0.0.1:${PORT}  delay=${DELAY}ms fail=${FAIL}`);
});
```

- 原文件名：06-appendix-fake-ai-server.mjs
- 总行数：119
- 来源：exports/dev/fake-ai-server.mjs（工作区副本 06-appendix-fake-ai-server.mjs）
- 是否逐字原文：是
- §6 说明：本文件是联调用假后端，**不能作为 44%/69%/97% 实测证据**。

