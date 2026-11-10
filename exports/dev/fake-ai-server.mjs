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
