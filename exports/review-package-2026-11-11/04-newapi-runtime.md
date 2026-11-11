# ④ new-api 版本 / 部署方式 / 数据库路径 / 面板监听 / 默认账号

状态：【未实现】——从未部署。

## 实际情况

| 项目 | 值 | 证据 |
|---|---|---|
| new-api 版本 | **无法确定**（镜像写的是 `latest`，且从未 pull） | `appendix-drafts-NOT-DEPLOYED/docker-compose.yml` 第 3 行 |
| 部署方式 | docker compose（草稿） | 同上 |
| Docker 是否可用 | 否，`docker: command not found` | `11-scripts/run-output.txt` |
| 数据库 | 草稿设计为内置 SQLite：容器内 `/data/one-api.db`；宿主 `./data/` | compose 注释与 volume |
| `./data/` 是否存在 | 否 | `ls deploy/new-api` 只有 5 个文件 |
| 面板监听 | 草稿为 `127.0.0.1:3000`（仅回环） | compose ports |
| 实际监听 | 无 3000 端口 | `14-ports.txt` |
| 默认账号 | 草稿文档写 `root / 123456`，并提示“立刻改密码” | `11-scripts/start.sh` 第 33 行 |
| 默认密码是否已改 | **否**（没有实例，无法改） | —— |
| 管理员密码存储 | 未产生 | —— |

## 结论

- 没有“运行中的 new-api 版本号”，也没有“实际数据库文件”。
- 面板默认密码 `root/123456` 只存在于启动脚本的提示文字里，从未在一个真实面板上生效，也从未被修改。
- 若按现状直接上线，默认密码问题会立即出现，属于 P0。
