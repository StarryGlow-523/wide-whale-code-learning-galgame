#!/usr/bin/env bash
# 一键启动 new-api + Caddy
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v docker >/dev/null 2>&1; then
  echo "未检测到 docker，请先安装 Docker Engine 与 compose 插件。" >&2
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "已生成 .env，请先填写 DOMAIN / ALLOW_ORIGIN / ACME_EMAIL / SESSION_SECRET 再运行。" >&2
  exit 1
fi

set -a; . ./.env; set +a
for k in DOMAIN ALLOW_ORIGIN ACME_EMAIL SESSION_SECRET; do
  if [ -z "${!k:-}" ]; then
    echo ".env 缺少 $k，请填写后重试。" >&2
    exit 1
  fi
done
if [ -z "${NEWAPI_TOKEN:-}" ]; then
  echo "提示：NEWAPI_TOKEN 为空。首次启动后到面板创建令牌，填入 .env 再重启。"
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
echo "  2) 浏览器打开：http://127.0.0.1:3000  首次登录后立刻改强密码（不要使用默认口令）"
echo "  3) 添加渠道 → 创建令牌（可用模型只选 mnk-chat）→ 填入 .env 的 NEWAPI_TOKEN → docker compose up -d 重启"
