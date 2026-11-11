# 补充项 A：start.sh / smoke.sh 全文与真实运行输出

状态：【已存在·附原文】（脚本）＋【已存在·附原文】（失败输出）

## 文件

- `11-scripts/start.sh`（原始文件名 `start.sh`，来自 `deploy/new-api/start.sh`）
- `11-scripts/smoke.sh`（原始文件名 `smoke.sh`，来自 `deploy/new-api/smoke.sh`）

## 真实运行输出（2026-11-11 12:29 CST）

```text
$ bash start.sh
cp: cannot stat '.env.example': No such file or directory
exit=1

$ bash smoke.sh
smoke.sh: line 5: ./.env: No such file or directory
exit=1

$ docker --version
zsh:1: command not found: docker
exit=127
```

说明：

- `start.sh` 第一步就要求 `.env` 或 `.env.example`，两者都不存在，因此直接退出。
- `smoke.sh` 第 5 行 `source ./.env` 失败，因此后面的 `/v1/models`、真实问答、`/console` 三步**从未执行过**。
- 没有 `/v1/models` 的真实响应，也没有“非法 model”的真实响应。这两项状态为【未实现】。
- `docker` 不存在，所以也无法通过 compose 启动。
