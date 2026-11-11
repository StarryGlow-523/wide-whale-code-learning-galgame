# ① new-api 渠道导出

状态：【未实现】——new-api 从未部署，没有任何运行实例，因此不存在“渠道导出”。

标记：草稿·从未运行·不能当作已配置证据（仅指附录 `channels.json`）。

## 事实

- 服务器/沙箱内没有 docker：`docker --version` → `command not found`（原始输出见 `11-scripts.md` 第 12–24 行）。
- `deploy/new-api/` 下没有任何 `data/` 数据库目录，也没有 `.env`。
- `ss -lntp` 中没有 3000 端口监听（见 `14-ports.txt`）。
- 因此：没有渠道、没有模型列表、没有重定向、没有参数覆盖、没有优先级，全部为“未配置”。

## 附录里的 channels.json 是什么

`appendix-drafts-NOT-DEPLOYED/channels.json` 是一份**本地起草文件**，写于部署之前，**从未导入任何 new-api 实例，不是实例导出，不能作为“已配置”的证据**。

它的内容仅为草稿，包含两个渠道：

- 智谱：`base_url=https://open.bigmodel.cn`，模型列表 `["mnk-chat"]`，重定向 `mnk-chat → glm-4.7-flash`，参数覆盖 `{"thinking":{"type":"disabled"}}`
- Gemini 中转：`base_url=http://186.241.104.178:3000`，模型列表 `["mnk-chat"]`，重定向 `mnk-chat → gemini-3.8-flash-high`

请按“草稿”审议，不要按“线上渠道”审议。若需要真实导出，必须先部署 new-api、手工建渠道，再从面板导出。

## channels.json 全文（草稿）

```json
{
  "_note": "new-api 渠道配置清单（最终两家版）。按 channels 顺序在控制台逐条添加。",
  "_mapping": {
    "name": "渠道名称（随便填，方便识别）",
    "type": "渠道类型：选「OpenAI」",
    "base_url": "Base URL（不带 /v1）",
    "models": "「模型」输入框，填 mnk-chat",
    "model_map": "「模型重定向」JSON，把 mnk-chat 映射到该家真实型号",
    "param_override": "「参数覆盖」JSON，合并进请求体",
    "priority": "优先级，数字小的先用",
    "weight": "权重，同优先级按权重分流",
    "timeout_s": "该渠道超时，在「设置 → 运营设置」里配全局"
  },
  "_env_keys": {
    "zhipu": "智谱 API Key，形如 xxxxxxxx.yyyyyyyy",
    "gemini_relay": "第三方中转 key，形如 sk-xxxx"
  },
  "channels": [
    {
      "name": "智谱-4.7-flash（主·快·会429）",
      "type": "OpenAI",
      "base_url": "https://open.bigmodel.cn",
      "models": ["mnk-chat"],
      "model_map": { "mnk-chat": "glm-4.7-flash" },
      "param_override": { "thinking": { "type": "disabled" } },
      "priority": 1,
      "weight": 80,
      "timeout_s": 8
    },
    {
      "name": "Gemini中转（备·1/3卡死）",
      "type": "OpenAI",
      "base_url": "http://186.241.104.178:3000",
      "models": ["mnk-chat"],
      "model_map": { "mnk-chat": "gemini-3.8-flash-high" },
      "param_override": {},
      "priority": 9,
      "weight": 20,
      "timeout_s": 10
    }
  ],
  "_routing_note": "不同优先级是「先主后备」：智谱先跑，429/超时立刻落 Gemini。两家都失败由前端落到本地回答。",
  "_global_settings": {
    "重试次数": 1,
    "超时": "10s",
    "自动禁用渠道": "开启，连续失败 5 次才禁用（阈值调高，避免免费渠道被误禁）",
    "允许跨渠道重试": true,
    "缓存": "强烈建议开启，重复问题直接回，能砍掉一半 Gemini 流量"
  }
}
```
