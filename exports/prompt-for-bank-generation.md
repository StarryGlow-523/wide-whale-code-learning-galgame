# 题库生成提示词（契合 study-loop/index.html）

> 用途：让大模型按新主线大纲生成题目，并尽量少改原 HTML。
> 配套大纲：`new-mainline-outline.md`

---

## 0. 先明确兼容性

原 HTML 的题库入口有两个：

- `QUIZ_DATA`：6090 题的基础题库，每 10 题硬切一关。
- `EXTRA_QUESTIONS`：扩展区，只接受四选一题，字段为 `{m, tag, q, opts, ans, doc}`；`type`、`refCode`、`expect` 会被过滤掉。

所以：

| 方案 | 要改 HTML 吗 | 能得到什么 |
|---|---|---|
| A. 新增 `MAINLINE_LEVELS` + 小改 `getQuestionsForLevel` | 要，约 20-30 行 | 16 关、每关 8 题、75% 通过、支持写代码题 |
| B. 只写 `EXTRA_QUESTIONS` | 不改 | 只能生成四选一练习题，仍是每 10 题一关、全对才通关 |

**要真正落地新主线，选 A。** 下面的 Prompt A 就是为 A 设计的；Prompt B 只用于“零改动练习池”。

原 HTML 已经支持代码题：

- `type:"code"` 时，页面会要求上传代码截图和运行结果截图，展示 `refCode` 参考答案和 `expect` 预期输出，然后让学习者自评。
- 这条链路不用新判题后端，适合先跑通“写代码”题型。

---

## 1. 模型选择建议

| 模型 | 适合做什么 | 优势 | 风险 |
|---|---|---|---|
| Claude Sonnet/Opus 4.x | 主笔：关卡设计、干扰项、讲解语气 | 遵循复杂 rubric，教学语气稳，长文一致性好 | 中文偶有翻译腔，代码需复核 |
| GPT-5.x | 主笔或代码审校 | 代码语义、结构化输出、JS/JSON 稳定 | 容易解释过度，成本较高 |
| Gemini 3 Pro | 审校：全库一致性、长上下文检查 | 能一次看很多题，适合找结构和重复问题 | 细节容易“看起来对”，本次评审就有 2 处 QID 不准 |
| DeepSeek V4 | 批量扩题、中文润色 | 中文自然、代码强、成本低 | 课程节奏和干扰项设计略弱 |
| Qwen3-Max / GLM | 中文教育场景批量生成 | 中文教材语感好、便宜 | 需要强 schema 约束，否则格式漂移 |

**推荐组合**：

1. Claude 或 GPT-5.x 做主笔，先写 L1-L3 金标准。
2. DeepSeek 或 Qwen 按金标准批量扩 L4-L16。
3. Gemini 或另一个 GPT 会话做审校。
4. 所有代码题用 Python 实际运行校验 `refCode → expect`。

不要用一个模型从出题到审校闭环，至少两个模型交叉。

---

## 2. Prompt A：生成 16 关主线题库（推荐）

```text
你是资深 Python 入门课程设计者 + 题库作者。请为“零基础大一新生”编写一套 16 关主线题库，输出可直接嵌入 study-loop/index.html 的 JS 数据。

【产品目标】
目标不是让学习者猜对 Python 表达式，而是让他学完能独立写出 20-40 行、能跑、能改的小程序。

【硬性约束】
1. 每关 8 题，题型数量固定：读意图 2、补全 2、找 Bug 2、写代码 1、概念 1。
2. 每关 pass: 6，表示 8 题对 6 题通过。
3. 全部中文，Python 3。题干里的代码用 \n 表示换行。
4. 选择题必须有 4 个互不相同的选项，ans 是 0-3 的整数，0=A、1=B、2=C、3=D。
5. 写代码题用 type:"code"，必须提供 refCode（完整可运行代码）和 expect（预期输出，字符串）。
6. 严禁考：负数取模/整除、多运算符优先级长表达式、for...else、while...else、装饰器、生成器、闭包、pandas、正则、爬虫、LeetCode。
7. 不考不可见字符的视觉题；如果输出含空格或换行，必须在题干里明确标出。
8. 只输出一个 JS 数组，不要输出解释、Markdown 代码围栏或前后缀。

【16 关主题】
L1 第一行代码：print、引号、注释 → 打印自我介绍卡
L2 变量与输入：变量、input、int()、f-string → 输入姓名年龄，输出明年几岁
L3 数字与计算：+ - * / // %、f-string 保留小数 → 平均分、找零、分糖果
L4 布尔与 if：比较、and/or/not、缩进、= 与 == → 判断成年/及格
L5 多分支：if/elif/else、区间、边界、分支顺序 → 成绩等级
L6 for 循环：for、range、循环变量、缩进 → 打印 1-10、乘法表一行
L7 while 循环：while、循环变量更新、break → 猜数字
L8 累加与统计：累加器、计数器、max/min、条件筛选 → 总分/平均分/最高分
L9 列表基础：索引、append、remove/pop、len、遍历 → 待办清单
L10 列表统计：遍历筛选、计数、sort/sorted → 及格人数、平均分
L11 字典：创建、d[k]、get、keys/values/items、遍历 → 通讯录、词频统计
L12 列表 + 字典：列表套字典、嵌套遍历、字段访问 → 学生成绩表筛选
L13 函数入门：def、参数、调用、return 基础 → average()、is_pass()
L14 返回值与作用域：return 与 print 区别、None、局部变量 → 组合小函数
L15 文件与异常：open、with、读写模式、strip、try/except ValueError → 待办存盘
L16 小项目：整合列表/字典/函数/文件/异常 → 命令行待办或记账本

【输出格式】
var MAINLINE_LEVELS = [
  {
    id: 1,
    title: "第一行代码",
    goal: "能让程序输出一行文字，知道字符串要加引号",
    task: "打印一张三行的自我介绍卡",
    pass: 6,
    questions: [
      { type:"choice", kind:"read", m:"L1", tag:"print", q:"下面这段代码想做什么？\nprint(\"你好，小明\")", opts:["输出一段文字","计算两个数","读取用户输入","定义函数"], ans:0, doc:"print 与字符串" },
      { type:"choice", kind:"blank", m:"L1", tag:"字符串", q:"要输出 你好，小明，横线处应填？\nprint(____)", opts:["你好，小明","\"你好，小明\"","(你好，小明)","[你好，小明]"], ans:1, doc:"字符串必须加引号" },
      { type:"choice", kind:"bug", m:"L1", tag:"print", q:"下面哪一行能正确输出 你好？", opts:["print(你好)","print(\"你好\")","print('你好')","B 和 C 都对"], ans:3, doc:"单双引号都可以表示字符串" },
      { type:"choice", kind:"read", m:"L1", tag:"注释", q:"代码里的 # 注释会被执行吗？", opts:["会，但结果被隐藏","不会，解释器忽略它","会报错","只在大括号里生效"], ans:1, doc:"注释用于说明代码" },
      { type:"choice", kind:"blank", m:"L1", tag:"换行", q:"要在一行里输出两行文字，应该用什么？", opts:["\\n","\\t","//","%"], ans:0, doc:"\\n 是换行符" },
      { type:"choice", kind:"bug", m:"L1", tag:"字符串", q:"print(\"你好\") 少了什么会报错？", opts:["少了分号","少了右引号","少了括号","少了逗号"], ans:1, doc:"字符串必须成对引号" },
      { type:"code", kind:"write", m:"L1", tag:"print", q:"写一段代码，输出三行：你的名字、专业、一句喜欢的话。", refCode:"print(\"小明\")\nprint(\"计算机科学\")\nprint(\"今天也要写代码\")", expect:"小明\n计算机科学\n今天也要写代码" },
      { type:"choice", kind:"concept", m:"L1", tag:"print", q:"下面哪种写法最不容易出错？", opts:["print(你好)","print(\"你好\")","print(你好，)","print 你好"], ans:1, doc:"字符串用引号包住" }
    ]
  }
];

【生成要求】
1. 一次只生成 2 关，避免截断；我下一轮会说“继续 L3-L4”。
2. 每关的 8 题必须严格符合题型数量：读 2、补全 2、找 Bug 2、写 1、概念 1。
3. 干扰项要对应初学者真实错误，不要用随机数字凑数。
4. 写代码题要能在 Python 3 里直接运行，expect 必须和 refCode 的真实输出逐字符一致。
5. 题目要围绕本关任务，不要提前考后面的知识。
6. 输出前自检：选项是否 4 个且互不相同、ans 是否 0-3、代码题字段是否齐全、是否出现禁用知识点。

现在生成 L1-L2。
```

---

## 3. Prompt B：零改动练习池（只能四选一）

```text
你是 Python 入门题库作者。请为 study-loop/index.html 的 EXTRA_QUESTIONS 扩展区生成四选一练习题。

【输出格式】
var EXTRA_QUESTIONS = [
  {m:"M13", tag:"print", q:"print(\"你好\") 会输出什么？", opts:["你好","\"你好\"","报错","None"], ans:0, doc:"print 与字符串"},
  {m:"M13", tag:"input", q:"input() 返回的类型是什么？", opts:["int","float","str","bool"], ans:2, doc:"input 返回字符串"}
];

【规则】
1. 只输出数组，不要解释。
2. 每题 4 个互不相同的选项；ans 是 0-3。
3. 面向零基础，不考负数取模、运算符优先级、for...else、装饰器、pandas、正则、LeetCode。
4. 每 10 题会自动成为一关；题目要按难度从易到难排列。
5. 干扰项要像初学者会犯的错，不要随机数字。
6. 一次生成 20 题，按 tag 分组排列。

现在生成第 1 批：print、变量、input、类型转换、f-string。
```

---

## 4. 审校提示词（交给第二个模型）

```text
你是 Python 题库审校。附件是 MAINLINE_LEVELS 的 JS 数据和大纲要求。请逐关检查，不要重写全库。

检查项：
1. 代码正确性：把每道代码题的 refCode 在 Python 3 里执行，确认 expect 完全一致；选择题的答案是否符合 Python 语义。
2. 歧义：题干是否缺少输入/上下文，选项是否互斥，是否有两个正确答案。
3. 干扰项：是否对应典型初学者错误，是否靠长度、措辞、绝对化词就能排除。
4. 难度：是否超出本关目标，是否提前考了后面的知识，是否出现禁用知识点。
5. 题型数量：每关读 2、补全 2、找 Bug 2、写 1、概念 1；pass 是否为 6。
6. 兼容性：选择题字段 m/tag/q/opts/ans/doc 是否齐全；代码题是否有 type/refCode/expect；JS 语法是否合法。

输出格式：
- 按 level 和题目序号列出问题：问题 → 证据（题干/选项）→ 影响 → 修复后的题目。
- 最后给一个总体结论：这套题能不能直接上线，还差什么。
- 不要输出与检查无关的建议。
```

---

## 5. 使用流程

1. 用 Prompt A 让主笔模型生成 L1-L2，人工看一遍难度和语气。
2. 确认金标准后，用“继续 L3-L4”批量生成。
3. 每批生成完，立刻用 Prompt 4 让第二个模型审校。
4. 代码题全部跑一遍 `refCode`，比对 `expect`。
5. 通过后再合并进 HTML 的 `MAINLINE_LEVELS`。
6. 旧题库按 tag 映射成每关的练习池，不参与主线。

---

## 6. 最小 HTML 改动（供参考，不在本提示词范围内）

```js
var MAINLINE_LEVELS = [ /* 模型生成的数据 */ ];

function getQuestionsForLevel(lv){
  var level = MAINLINE_LEVELS[lv - 1];
  if(!level) return [];
  return level.questions.map(function(raw, i){
    return makeQ(raw, lv + "-" + (i + 1), (lv - 1) * 8 + i);
  });
}
```

同时把 `finishLevel` 里的 `allRight` 判定改成：

```js
var need = Math.ceil(quizState.list.length * 0.75);
var passed = right >= need;
```

具体改动确认大纲后再做。
