# 补充项 C：备份 / 镜像 / CI / .gitignore

状态：【未实现】（备份、镜像、CI）＋【已存在·附原文】（.gitignore）

## 备份与镜像

| 项目 | 状态 |
|---|---|
| 服务器备份 | 无 |
| 数据库备份 | 无（没有数据库） |
| 镜像仓库 | 无 |
| 异地镜像 | 无 |
| 定时任务 / cron | 无 |

## CI

- `.github/workflows/` 不存在，没有任何 CI 工作流。
- 没有自动构建、没有自动测试、没有自动部署。
- 唯一的远程是 `origin https://github.com/Tarnishedtaffy/wide-whale-code-learning-galgame`。

## .gitignore 全文

已原样附在 `13-gitignore.txt`（来自仓库根 `.gitignore`）。

与实际密钥相关的内容：

```text
# ---- 密钥 / 本地配置（千万别提交）----
.env
.env.*
*.key
*.pem
secrets.*
```

## 发现的缺口

- `*.db` **没有**被忽略（new-api 的 SQLite 文件会落在 `deploy/new-api/data/one-api.db`）。
- `*.log` **没有**被忽略（只忽略了 Ren'Py 的 `log.txt`）。
- 没有忽略 `deploy/new-api/data/` 整个目录。
- 没有配置 Git LFS；`bgm` 约 20.3 MiB，HTML 约 5.7 MiB，尚未超过单文件 100 MiB 限制，但仓库会持续变大。
