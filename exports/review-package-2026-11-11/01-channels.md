# ① new-api 渠道导出

状态：【未实现】——new-api 从未部署，没有任何运行实例，因此不存在“渠道导出”。

## 事实

- 服务器/沙箱内没有 docker：`docker --version` → `command not found`（原始输出见 `11-scripts/run-output.txt`）。
- `deploy/new-api/` 下没有任何 `data/` 数据库目录，也没有 `.env`。
- `ss -lntp` 中没有 3000 端口监听（见 `14-ports.txt`）。
- 因此：没有渠道、没有模型列表、没有重定向、没有参数覆盖、没有优先级，全部为“未配置”。

## 附录里的 channels.json 是什么

`appendix-drafts-NOT-DEPLOYED/channels.json` 是一份**本地起草文件**，写于部署之前，**从未导入任何 new-api 实例，不是实例导出，不能作为“已配置”的证据**。

它的内容仅为草稿，包含两个渠道：

- 智谱：`base_url=https://open.bigmodel.cn`，模型列表 `["mnk-chat"]`，重定向 `mnk-chat → glm-4.7-flash`，参数覆盖 `{"thinking":{"type":"disabled"}}`
- Gemini 中转：`base_url=http://186.241.104.178:3000`，模型列表 `["mnk-chat"]`，重定向 `mnk-chat → gemini-3.8-flash-high`

请按“草稿”审议，不要按“线上渠道”审议。若需要真实导出，必须先部署 new-api、手工建渠道，再从面板导出。
