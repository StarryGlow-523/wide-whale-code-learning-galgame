# DELIVERY-NOTES · Hy4-final

上一批的附录清单不可信，以本清单为准；12 个附录实体文件从未交付。

- 导出时间：2026-11-11 13:05 CST
- 本包只含本轮改动过的文件：`DELIVERY-NOTES.md`、`MANIFEST.md`、`APPENDIX-FULLTEXT.md`
- 01–15 号 `.md` 在前三批，未在本包重复，也未改动
- 本包不含任何真实 key、令牌、密码、私钥，也不含其前缀

## 一、12 项交付状态

| 编号 | 原始相对路径 | 交付状态 |
|---|---|---|
| A1 | `appendix-drafts-NOT-DEPLOYED/channels.json` | 【内容已内嵌于 01-channels.md 第 27–78 行】 |
| A2 | `appendix-drafts-NOT-DEPLOYED/Caddyfile` | 【内容已内嵌于 02-caddy.md 第 11–56 行】 |
| A3 | `appendix-drafts-NOT-DEPLOYED/docker-compose.yml` | 【内容已内嵌于 04-newapi-runtime.md 第 30–80 行】 |
| B1 | `11-scripts/start.sh` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 2–37 行】 |
| B2 | `11-scripts/smoke.sh` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 45–68 行】 |
| B3 | `11-scripts/run-output.txt` | 【内容已内嵌于 11-scripts.md 第 12–24 行】 |
| C1 | `13-gitignore.txt` | 【内容已内嵌于 13-repo-hygiene.md 第 25–77 行】 |
| C2 | `14-ports.txt` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 76–100 行】 |
| C3 | `06-appendix-fake-ai-server.mjs` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 938–1058 行】 |
| C4 | `15-doc-version/v1-to-v2.diff` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 561–930 行】 |
| D1 | `15-doc-version/ai-backend-security-plan-v1.md` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 108–334 行】 |
| D2 | `15-doc-version/ai-backend-security-plan-v2.md` | 【原件·全文已贴入 APPENDIX-FULLTEXT.md 第 342–552 行】 |

说明：7 项全文都在 `APPENDIX-FULLTEXT.md`，每项前有 `<!-- APPENDIX: <原始相对路径> -->` 标记，块后写明原文件名、总行数、来源、是否逐字原文。

## 二、状态更正记录

上一批 `DELIVERY-NOTES.md` 第 12–23 行与 `MANIFEST.md` 的「实际交付状态」列，把附录写成已随包交付；实际并未随包提供。现更正：

- 改前表述：`原件·已附`（11 处）、`【已附原文】`（12 处）。
- 改后：上表 12 项，只使用“内容已内嵌于 …”与“原件·全文已贴入 …”两种取值；本轮 12 项均非“不存在·无法导出”。
- 已删除改前表述：`原有 16 个 .md 全部带上`、`12 项全部存在`。
- `MANIFEST.md` 的「实际交付状态」列与本表逐项一致。

## 三、7 项全文的位置与核验方式

| 编号 | 文件 | APPENDIX 行号 | 原文件总行数 |
|---|---|---|---|
| B1 | `11-scripts/start.sh` | 第 2–37 行 | 34 |
| B2 | `11-scripts/smoke.sh` | 第 45–68 行 | 22 |
| C2 | `14-ports.txt` | 第 76–100 行 | 23 |
| D1 | `15-doc-version/ai-backend-security-plan-v1.md` | 第 108–334 行 | 225 |
| D2 | `15-doc-version/ai-backend-security-plan-v2.md` | 第 342–552 行 | 209 |
| C4 | `15-doc-version/v1-to-v2.diff` | 第 561–930 行 | 368 |
| C3 | `06-appendix-fake-ai-server.mjs` | 第 938–1058 行 | 119 |

- 以上代码块均由原文件逐字复制，已用程序比对：7/7 与原件完全一致（含换行）。
- D2 与 AAA.md：AAA.md 原件不在工作区，**无法逐字节核验**；仅行数（209）与字节数（11,534）一致，不能据此下“同一份”的结论。
- C3 仍不能当作 §6 的 44%/69%/97% 实测证据。

## 四、自检

- 7 项均有状态，无留空，无“按方案应该是”。
- 状态列只出现三种允许取值；改前表述仅出现在“状态更正记录”并已标注。
- 每个“原件·全文已贴入”在 `APPENDIX-FULLTEXT.md` 都有 `<!-- APPENDIX: … -->`、完整代码块，总行数与代码块实际行数一致（34/22/23/225/209/368/119）。
- 三个草稿仍带「草稿·从未运行、不能当作已配置证据」标记（见 MANIFEST；01/02/04 未改动）。
- 全包扫描：无完整 key，无被删除的两个前缀。
