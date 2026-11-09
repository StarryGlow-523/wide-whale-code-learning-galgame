# 题库分析简报（给 Gemini 的评审素材）

> 配套文件：`question-bank.json`（完整结构化数据）、`question-bank.csv`（表格）、`questions-all.md`（逐题可读版）、`knowledge-cards.json`（知识点卡片/解析原文）、`template-representatives.md`（208 个模板各一个代表样本，精读首选）、`by-module/`（按模块拆分，适合分批上传给 Gemini）。

## 1. 基本盘

| 指标 | 值 |
|---|---|
| 总题数 | 6090 |
| 关卡数 | 609 |
| 每关题数 | 10 |
| 最后一个关卡题数 | 10 |
| 模块数 | 12 |
| 题目标签数（模块内去重） | 95 |
| 跨模块关卡数（一关内混有两个模块） | 10 |
| 带出处 doc 的题 | 6090（100.00%）|

> 模块题量不是 10 的倍数，所以模块交界处会出现“一关里混两个模块”的情况：
> 第 61 关（M1 + M2）；第 120 关（M2 + M3）；第 183 关（M3 + M4）；第 241 关（M4 + M5）；第 271 关（M5 + M6）；第 327 关（M6 + M7）；第 371 关（M7 + M8）；第 419 关（M8 + M9）；第 467 关（M9 + M10）；第 564 关（M11 + M12）。
> 如果希望每关严格属于一个模块，需要在切关时按模块边界重新分组，而不是简单按题量除 10。

### 各模块题量

| 模块 | 题数 | 关卡数 |
|---|---|---|
| M3 | 632 | 64 |
| M1 | 608 | 61 |
| M2 | 584 | 59 |
| M4 | 584 | 59 |
| M6 | 560 | 56 |
| M8 | 483 | 49 |
| M9 | 483 | 49 |
| M10 | 483 | 49 |
| M11 | 482 | 49 |
| M12 | 458 | 46 |
| M7 | 434 | 44 |
| M5 | 299 | 30 |

## 2. 自动体检结果

### 2.1 答案位置分布

| 正确答案位置 | 题数 | 占比 |
|---|---|---|
| A | 1506 | 24.73% |
| B | 1531 | 25.14% |
| C | 1494 | 24.53% |
| D | 1559 | 25.60% |

若四个位置接近 25%，说明生成器没有答案位置偏置；页面运行时还会再打乱选项。

### 2.2 选项与格式

- 选项数不等于 4 的题：0
- 同一题内选项文字重复的题：0
- 四个选项长度完全相同的题：1154（18.95%）
- 正确答案是**唯一最长**选项的题：195（3.20%）
- 正确答案是**唯一最短**选项的题：172（2.82%）
- 正确答案平均长度：8.4 字符；干扰项平均长度：9.4 字符
- 含“报错/Error/错误”类选项的题：1060（17.41%）
- 其中“报错”类选项**就是正确答案**的题：354（5.81%）

> 结论：正确答案既不是明显最长也不是明显最短，基本不存在靠长度蒙对的漏洞；但近两成题目四个选项长度完全一致，干扰项的区分度值得进一步看。

### 2.3 题型构成（按题干开头粗分）

| 类型 | 题数 | 占比 |
|---|---|---|
| 代码输出/运行结果 | 4925 | 80.87% |
| 含代码块的问答 | 883 | 14.50% |
| 表达式求值 | 230 | 3.78% |
| 概念问答 | 39 | 0.64% |
| 概念判断 | 12 | 0.20% |
| 裸代码片段 | 1 | 0.02% |

### 2.4 重复与模板化

- 题干完全相同的重复题：0 组，共 0 题
- 把数字/字符串字面量归一化后，仍有重复模板的题干：208 组，涉及 6032 题

重复最多的模板（前 40）：

| 次数 | 模板（数字已归一化为 <n>） |
|---|---|
| 387 | 下列正则提取代码的输出是？ import re html = '<s>'/p/<n>.html'<s>'/post/<n>'<s>' print(re.findall(r'<s>'([^'<s>'', html)) |
| 210 | 下列代码的输出是？ class a: def __init__(self, x): self.x = x class b(a): def __init__(self, x, y): super().__init__(x) self.y = y b = b(<n>, <n>) print(b.x, b |
| 138 | 下列代码的输出是？ from collections import counter c = counter('<s>'.split()) print(c.most_common(<n>)[<n>][<n>]) |
| 130 | 下列代码的输出是？ def deco(f): def wrapper(*a): return f(*a) + <n> return wrapper @deco def add(x): return x + <n> print(add(<n>)) |
| 125 | 下列代码的输出是？ nums = [<n>, <n>, <n>, <n>, <n>] print(sum(n for n in nums if n > <n>)) |
| 108 | 下列代码的输出是？ def add(x, y=<n>): return x + y print(add(<n>)) print(add(<n>, <n>)) |
| 87 | 下列代码的输出是？ print(sum(range(<n>, <n>, <n>))) |
| 87 | 下列代码的输出是？ import random random.seed(<n>) print([random.randint(<n>, <n>) for _ in range(<n>)]) |
| 86 | 下列代码的输出是？ x = <n> def f(): x = <n> return x print(f(), x) |
| 86 | 下列代码的输出是？ it = iter([<n>, <n>, <n>, <n>]) print(next(it), next(it)) print(list(it)) |
| 82 | 下列代码的输出是？ def f(x): y = x + <n> r = f(<n>) print(r) |
| 82 | 下列代码的输出是？ def f(): return <n>, <n> r = f() print(type(r).__name__, r[<n>]) |
| 80 | 下列代码的输出是？ it = iter([<n>, <n>, <n>, <n>, <n>]) print(next(it), next(it)) print(list(it)) |
| 79 | 下列代码的输出是？ score = <n> if score >= <n>: grade = '<s>' elif score >= <n>: grade = '<s>' else: grade = '<s>' print(grade) |
| 79 | 下列代码的输出是？ class a: def f(self): return <n> class b(a): def f(self): return super().f() + <n> print(a().f(), b().f()) |
| 79 | 下列代码的输出是？ class p: def __init__(self, x): self.x = x * <n> p = p(<n>) print(p.x) |
| 76 | 下列代码的输出是？ i = <n> s = <n> while i < <n>: s += i i += <n> print(s) |
| 74 | 下列代码的输出是？ import pandas as pd df = pd.dataframe({'<s>': [<n>, <n>, <n>, <n>, <n>]}) print(int(df[df['<s>'] > <n>]['<s>'].sum())) |
| 73 | 下列代码的输出是？ import pandas as pd df = pd.dataframe({'<s>': ['<s>','<s>','<s>'], '<s>': [<n>, <n>, <n>]}) print(int(df.groupby('<s>')['<s>'].sum().loc['<s |
| 73 | 下列代码的输出是？ import pandas as pd s = pd.series([<n>, <n>, <n>, <n>]) print(int(s.sum() * <n>)) |
| 72 | 下列代码的输出是？ print(list(range(<n>, <n>, <n>))) |
| 72 | 下列代码的输出是？ n = <n> c = <n> while n > <n>: n //= <n> c += <n> print(c) |
| 72 | 下列代码的输出是？ import urllib.parse print(urllib.parse.parse_qs(urllib.parse.urlparse('<s>').query)['<s>']) |
| 69 | 下列代码的输出是？ a = [<n>, <n>, <n>] a.append(<n>) a.insert(<n>, <n>) print(a) |
| 69 | 下列代码的输出是？ import pandas as pd df = pd.dataframe({'<s>': [<n>, <n>, <n>], '<s>': [<n>, <n>, <n>]}) print(int(df['<s>'].sum()), int(df.shape[<n>])) |
| 69 | 下列代码的输出是？ it = iter([<n>, <n>, <n>]) print(next(it), next(it)) print(list(it)) |
| 68 | 下列代码的运行结果是？ print(int('<s>')) |
| 67 | 下列代码的输出是？ class c: k = <n> x = c() y = c() y.k = <n> print(x.k, y.k) |
| 64 | 下列代码的输出是？ print(int('<s>') + <n>) |
| 63 | 下列代码的输出是？ class a: def f(self): return <n> class b(a): def f(self): return <n> print(a().f(), b().f()) |
| 62 | 下列代码的输出是？ x = <n> print(f'<s>') |
| 61 | 下列代码的输出是？ a, b = <n>, <n> a, b = b, a print(a, b) |
| 60 | 下列代码的输出是？ def deco(f): def wrapper(*a, **kw): return f(*a, **kw) * <n> return wrapper @deco def mul(a, b): return a * b print(mul(<n>, <n>)) |
| 59 | 下列代码的输出是？ print(<n> + <n> * <n> ** <n>) |
| 58 | 下列代码的运行结果是？ t = (<n>, <n>, <n>) t[<n>] = <n> print(t) |
| 53 | 下列代码的输出是？ n = <n> print('<s>' if n % <n> == <n> else '<s>') |
| 53 | 下列代码的输出是？ for n in range(<n>): if n == <n>: print('<s>', n) break else: print('<s>') |
| 50 | 下列代码的输出是？ t = (<n>, <n>, <n>) x, y, z = t print(y + z) |
| 49 | 下列代码的输出是？ import pandas as pd s = pd.series([<n>, none, <n>]) print(int(s.isna().sum()), int(s.sum())) |
| 49 | 下列代码会报什么错？ def f(a, b): return a / b print(f(<n>, <n>)) |

### 2.5 标签与知识点卡片的对应

- 题目标签在整份 CARD_DATA 里找不到同名的：0 题，0 种标签
- 题目标签在本模块的卡片里找不到同名的：0 题，0 种标签

> 答错后的解析优先按 `tag` 去 CARD_DATA 找卡片，找不到才回退到题目 `doc`。上面这些题只能显示 doc。

## 3. 代码层面需要知道的规则

- 每 10 题按数组顺序切一关：第 N 关 = `BANK[(N-1)*10 : N*10]`。
- 一关必须 **10 题全对** 才记为通关并解锁下一关；错一题只能重做整关。
- 运行时会把 4 个选项随机打乱，用正确选项的文本判题，所以 `ans` 下标只在原始数据里有效。
- 错题本用题目下标 `bid` 做 key，中途插入/删除题会让旧错题记录与关卡错位。

## 4. 建议让 Gemini 评审的维度

可以直接把下面这段连同文件一起发给 Gemini：

```text
这是一套面向零基础大一新生的 Python 关卡题库：6090 题，12 个模块，每 10 题一关，一关必须全对才解锁下一关。
附件：analysis-brief.md 是自动体检数据；template-representatives.md 是 208 个出题模板各一个代表样本；question-bank.json 是逐题全量数据。
请先读简报和模板样本，需要核对细节时再查全量 JSON。重点回答：
1. 题目本身是否有知识性错误或歧义（抽样检查，标出具体 QID 和错误原因）。
2. 难度曲线是否合理：12 个模块从基础语法到综合实战，每关 10 题全对的机制是否会劝退新手。
3. 题型单一度：80% 以上是“下列代码输出是？”，是否足够覆盖理解、调试、应用、迁移能力。
4. 选项设计：干扰项是否有效，是否存在长度/措辞泄题，是否频繁出现“报错”作为正确答案。
5. 模板化与重复：208 个模板覆盖 99% 的题，同一个模板换数字大量复制会带来什么问题，应保留多少、如何改写。
6. 关卡切分：模块题量不是 10 的倍数，部分关卡会混两个模块，是否应该按模块边界重新切关。
7. 标签与知识点讲解的对应是否完整；答错后能否给出有针对性的解析。
8. 给出可执行的调整方案：删/改/补各占多少，优先补哪些知识点，题目形式如何配比。
输出请按“问题 → 证据（题号）→ 影响 → 调整建议”组织。
```

## 5. 数据字段说明

| 字段 | 含义 |
|---|---|
| id | 导出编号 Q0001–Q6090，方便在讨论里指题 |
| index | 在题库数组里的 0 基下标，也是错题本使用的 bid |
| level | 所属关卡（1 起） |
| module | 模块编号 M1–M12 |
| tag | 知识点标签，用于匹配讲解卡片 |
| question | 题干，`\n` 为换行 |
| options | 原始顺序的 4 个选项 |
| answerIndex / answerLetter | 正确选项在原始数组中的下标 / 字母 |
| answer | 正确选项文本 |
| doc | 出处 |

CARD_DATA（知识点卡片）的结构：`{ch, title, cards:[{tag, q, a, doc}]}`，共 12 章、95 张卡。
