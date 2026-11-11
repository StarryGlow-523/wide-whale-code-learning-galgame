# ⑦ 产物校验、bgm 清单、托管与缓存

状态：【已存在·附原文】（本地文件与校验和）＋【未实现】（线上产物对照、托管、缓存规则）。

## 前端文件校验和

| 文件 | 大小（字节） | MD5 | 说明 |
|---|---|---|---|
| `/workspace/study-loop/index.html` | 5,939,520 | `7073de7d746d1fb0e7d6fdac3943301a` | 本地工作文件 |
| `/workspace/exports/mnk-study-loop-with-bgm.html` | 5,939,520 | `7073de7d746d1fb0e7d6fdac3943301a` | 送审副本 |
| `/workspace/exports/mnk-study-loop-with-bgm.zip` | 25,336,164 | `5a9af8df0d7d6e123be6f401d159611a` | HTML + bgm 目录 |

结论：送审 HTML 与本地 `study-loop/index.html` **是同一份**（MD5 完全一致）。

## 线上产物

- 状态：【未实现】
- 没有已部署的公网地址，没有线上文件可下载，因此无法做“线上 vs 送审”的 MD5 对照。
- GitHub 仓库存在：`https://github.com/Tarnishedtaffy/wide-whale-code-learning-galgame`
- 没有 `gh-pages` 分支，也没有证据表明 GitHub Pages 已开启。
- 没有 CDN、没有缓存规则、没有 `Cache-Control` 配置（Caddyfile 里只有 `encode`）。

## bgm/ 目录完整文件名

| 文件名 | 大小（字节） | 时长 |
|---|---|---|
| `bgm/冥想.mp3` | 7,809,149 | 244.04 s |
| `bgm/愉悦.mp3` | 3,249,214 | 101.54 s |
| `bgm/节拍.mp3` | 4,762,227 | 148.82 s |
| `bgm/轻松.mp3` | 5,530,368 | 172.82 s |

合计 21,330,958 字节（约 20.3 MiB）。HTML 内引用路径为 `bgm/节拍.mp3`（相对 `study-loop/`）。

## 补充说明

- `exports/bgm-demo/` 下的截图来自**无头 Chromium**（393×852 视口），不是真机截图。
- 没有真机、没有 iOS/Android 实机验证记录。
