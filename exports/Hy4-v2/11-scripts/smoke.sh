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
