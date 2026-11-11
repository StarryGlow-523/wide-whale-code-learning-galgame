#!/usr/bin/env node
/*
 * 构建「前端直连」演示版：把中转地址与 key 混淆后内联进 HTML。
 *
 * 重要限制：
 *   1. 只能用于允许跨域的中转（如你的 new-api），智谱官方接口无 CORS，浏览器调不通。
 *   2. 中转是 HTTP 明文，页面若部署在 HTTPS 站点会被浏览器按混合内容拦截。
 *   3. 混淆只提高提取门槛，不能真正保护密钥。任何拿到此文件的人都能还原出 key。
 *
 * 用法（不要提交产物，也不要提交本命令里的 key）：
 *   RELAY_URL='http://你的中转:3000' RELAY_KEY='你的中转key' node deploy/build-demo.mjs
 * 产物：exports/mnk-demo-live.html
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "study-loop/index.html";
const OUT = "exports/mnk-demo-live.html";

const url = (process.env.RELAY_URL || "").replace(/\/+$/, "");
const key = process.env.RELAY_KEY || "";
const model = process.env.RELAY_MODEL || "mnk-chat";
if (!url || !key) {
  console.error("缺少 RELAY_URL 或 RELAY_KEY，未生成。");
  process.exit(1);
}

// 简单混淆：XOR + base64，再切成 4 段。仅提高提取门槛。
function obf(s) {
  const buf = Buffer.from(s, "utf8");
  for (let i = 0; i < buf.length; i++) buf[i] ^= 0x5a;
  const b64 = buf.toString("base64");
  const n = Math.ceil(b64.length / 4);
  return [b64.slice(0, n), b64.slice(n, n * 2), b64.slice(n * 2, n * 3), b64.slice(n * 3)];
}
const [a, b, c, d] = obf(`${url}\n${key}`);

const prelude = `
<script>
(function(){
  var P=["${a}","${b}","${c}","${d}"],B=atob(P.join("")),X="";
  for(var i=0;i<B.length;i++)X+=String.fromCharCode(B.charCodeAt(i)^0x5a);
  var L=X.split("\\n"),U=L[0],K=L[1];
  if(!U||!K)return;
  var F=window.fetch;
  window.fetch=function(u,o){
    if(typeof u==="string"&&u.indexOf("/v1/chat/completions")>=0){
      o=o||{};
      o.headers=Object.assign({},o.headers||{},{Authorization:"Bearer "+K});
      u=U+"/v1/chat/completions";
    }
    return F.call(this,u,o);
  };
})();
</script>`;

let html = fs.readFileSync(SRC, "utf8");
const before = html;
html = html.replace('mode: "local",', 'mode: "proxy",');
html = html.split('model: "mnk-chat"').join(`model: ${JSON.stringify(model)}`);
// 中转侧多为推理型模型，首字延迟常在 5-8s，演示版放宽超时避免误回落
html = html.replace("timeout: 10000,", "timeout: 25000,");
if (html === before) {
  console.error("未找到 mode: \"local\"，页面可能已被改动，已中止。");
  process.exit(1);
}
html = html.replace("</body>", prelude + "\n</body>");
fs.writeFileSync(OUT, html);

console.log(`已生成 ${OUT}`);
console.log(`大小：${fs.statSync(OUT).size} 字节`);
console.log(`目标：${U_SAFE(url)}（key 长度 ${key.length}，已混淆内联）`);
function U_SAFE(u) {
  return u.replace(/\/\/([^/:]+)/, "//$1");
}
