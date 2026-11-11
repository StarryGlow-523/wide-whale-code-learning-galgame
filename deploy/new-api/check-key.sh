#!/usr/bin/env bash
# 校验智谱 key 是否可用。
# 用法一：bash check-key.sh            （交互输入，不回显）
# 用法二：ZHIPU_KEY=xxxx bash check-key.sh（从环境变量读，不落盘）
# 说明：key 只用于本次请求，不写入任何文件，也不回显到终端历史。
set -uo pipefail

KEY="${ZHIPU_KEY:-}"
if [ -z "$KEY" ]; then
  printf '粘贴智谱 API Key（输入不回显）：'
  read -rs KEY
  printf '\n'
fi
[ -n "$KEY" ] || { echo "未输入 key，退出"; exit 1; }

BODY='{"model":"glm-4.7-flash","messages":[{"role":"user","content":"只回答两个字：可以"}],"max_tokens":16}'
OUT="$(mktemp)"
trap 'rm -f "$OUT"' EXIT

echo "== 直连智谱 glm-4.7-flash =="
CODE=$(curl -sS -o "$OUT" -w '%{http_code}' -m 25 \
  https://open.bigmodel.cn/api/paas/v4/chat/completions \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d "$BODY" 2>&1)

echo "HTTP $CODE"
case "$CODE" in
  200)
    echo "PASS：key 有效，模型 glm-4.7-flash 可用"
    grep -o '"content":"[^"]*"' "$OUT" | head -1
    ;;
  401|403)
    echo "FAIL：key 无效、被禁用或没有该模型权限"
    ;;
  404)
    echo "FAIL：模型名不对（glm-4.7-flash 不存在或未开通）"
    ;;
  429)
    echo "PASS（限流）：key 有效，但当前额度/频率受限，稍后重试即可"
    ;;
  *)
    echo "FAIL：未预期状态，响应前 300 字节如下"
    head -c 300 "$OUT"; echo
    ;;
esac

echo
echo "提示：这一步通过代表 key 本身可用；"
echo "      还要经 new-api 网关再验一次，才算端到端可用（见 smoke.sh）。"
