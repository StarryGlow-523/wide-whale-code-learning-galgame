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

## 1. 三个可用模型怎么分工

你手上只有 Gemini 3 Pro、DeepSeek V4、Qwen3-Max（或 GLM）。分工如下：

| 角色 | 用哪个 | 具体做什么 | 不要让它做 |
|---|---|---|---|
| 主笔 | **DeepSeek V4** | 按 Prompt A 生成 L1-L2 金标准；写代码题的 `refCode/expect`；按金标准扩 L3-L16 | 不要让它同时做最终审校 |
| 中文润色 | **Qwen3-Max** | 改题干、解析、干扰项措辞，让大一新生读得懂 | 不要改答案、代码和选项顺序 |
| 审校 | **Gemini 3 Pro** | 每次只看 2 关，查结构、重复、难度、歧义 | 不要让它单独定代码题答案 |

**推荐流水线**：

1. DeepSeek V4 用 Prompt A 生成 L1-L2。
2. Qwen3-Max 用 Prompt C 只做语言润色。
3. Gemini 3 Pro 用 Prompt D 审校这 2 关，标出 `UNSURE` 的代码题。
4. 本地用 Python 跑所有 `refCode`，核对 `expect`。
5. 通过后，再让 DeepSeek 按同一金标准扩 L3-L4。

**为什么这样分**：

- DeepSeek V4 的代码和结构化输出最稳，适合当出题主笔。
- Qwen3-Max 的中文教材语感更自然，适合润色，不适合定代码答案。
- Gemini 3 Pro 的长上下文适合审校，但这次评审出现过 QID 不准，不能让它单独定答案。
- 如果第三個是 GLM 而不是 Qwen，把 Qwen 的位置换成 GLM 即可，分工不变。

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

## 4. 润色与审校提示词

### Prompt C：Qwen3-Max 中文润色

```text
你是中文教材编辑，服务对象是零基础大一新生。附件是 MAINLINE_LEVELS 的 L1-L2 JS 数据。

只做语言润色，不改知识内容：
1. 题干、选项、doc 改得更口语、更像老师说话，避免翻译腔和术语堆砌。
2. 代码片段、变量名、答案、选项顺序、ans 一律不动。
3. 不新增、不删除题目，不合并选项。
4. doc 控制在 40 字以内。
5. 保留所有字段名和 JS 结构。
6. 只输出完整的 JS 数组。

输出后自检：ans 数量与位置没变、opts 仍是 4 个、代码片段逐字未改。
```

### Prompt D：Gemini 3 Pro 审校

```text
你是 Python 题库审校。附件是 MAINLINE_LEVELS 的 L1-L2 JS 数据和大纲。每次只审这 2 关，不要扩展到其他关。

检查项：
1. 结构：每关 8 题，读 2、补全 2、找 Bug 2、写 1、概念 1；pass=6；选择题 4 个互不相同选项；ans 0-3。
2. 语义：选择题答案是否符合 Python 3；题干是否缺少输入/上下文；是否存在两个正确答案。
3. 代码题：逐题写出你推定的输出，与 expect 比对。不确定的标 UNSURE，不要猜。
4. 干扰项：是否对应初学者典型错误；是否能靠长度、措辞、绝对化词排除。
5. 难度：是否超出本关目标，是否出现禁用知识点。
6. 兼容性：字段是否齐全，JS 语法是否合法。

输出：
- 只列有问题的题：关卡/题号 → 问题 → 证据 → 修复建议。
- 代码题单独一张表：题号、你推定的输出、expect、PASS/UNSURE。
- 最后给结论：可直接用 / 修完可用 / 需要重做。
- 不要重写全库，不要给无关建议。
```

---

## 5. 使用流程

1. 用 Prompt A 让 DeepSeek V4 生成 L1-L2，人工看一遍难度和语气。
2. 把结果交给 Qwen3-Max，用 Prompt C 只做中文润色。
3. 确认金标准后，用“继续 L3-L4”让 DeepSeek 批量生成。
4. 每批生成完，用 Prompt D 让 Gemini 3 Pro 审校这 2 关。
5. 代码题全部跑一遍 `refCode`，比对 `expect`。
6. 通过后再合并进 HTML 的 `MAINLINE_LEVELS`。
7. 旧题库按 tag 映射成每关的练习池，不参与主线。

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
