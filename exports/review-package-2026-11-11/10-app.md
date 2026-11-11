# ⑩ Capacitor / manifest / service worker / 真机 origin

状态：【未实现】——三项配置都不存在，真机也没有测过。

## 检查结果（对 `study-loop/index.html` 全文检索）

| 项目 | 命中次数 | 结论 |
|---|---|---|
| `rel="manifest"` | 0 | 没有 Web App Manifest |
| `serviceWorker` | 0 | 没有注册 Service Worker |
| `capacitor` / `Capacitor` | 0 | 没有 Capacitor 配置或桥接代码 |
| `viewport-fit` | 1 | 只有 viewport meta，不构成 PWA |

## 目录层面

- 没有 `capacitor.config.*`、没有 `android/`、没有 `ios/`、没有 `manifest.webmanifest`、没有 `sw.js`。
- 没有图标集、没有启动图、没有 App 备案材料。

## 真机 `location.origin`

- 未在真机实测，**没有值**。
- 参考：此前用无头 Chromium 打开 `http://127.0.0.1:8000/study-loop/` 时，origin 为 `http://127.0.0.1:8000`。这不是 App 环境，也不是真机，不能作为 Capacitor 的 `location.origin` 证据。
- 预期值（未验证）：Capacitor 默认 `capacitor://localhost` 或 `https://localhost`，取决于配置。

## 结论

- 转 App 目前只是方案，没有任何工程落地。
- 因此“App 包内无密钥”目前只能根据“尚未打包”推断，不能给出构建产物证据。
