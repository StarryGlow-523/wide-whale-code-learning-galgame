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
