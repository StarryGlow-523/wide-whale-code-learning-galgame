# 题库模板代表样本（给 Gemini 的精读版）

- 共 266 个模板、6090 道题；其中 208 个模板重复出现，覆盖 6032 题。
- 每道题都是模板填入不同数字/字符串生成的；按模板去重后，逐个评审这些代表样本即可覆盖全库设计。
- 每组列出：出现次数、涉及模块与标签、QID 范围、一个完整样例。

## 387 题 ｜ M9 · HTML 解析

- QID：Q4198 … Q4667
- 样例 Q4198：下列正则提取代码的输出是？ ⏎ import re ⏎ html = '<a href="/p/16.html">x</a><a href="/post/12">x</a>' ⏎ print(re.findall(r'href="([^"]+)"', html))
  - A. ['/post/12', '/p/16.html'] ｜ B. ['/p/16.html', '/post/12'] ｜ C. ['/p/16.html">x</a><a href="/post/12'] ｜ D. <re.Match object; span=(3, 20), match='href="/p/16.html"'>
  - 答案：B. ['/p/16.html', '/post/12']

## 210 题 ｜ M6 · 继承

- QID：Q2710 … Q3267
- 样例 Q2710：下列代码的输出是？ ⏎ class A: ⏎     def __init__(self, x): ⏎         self.x = x ⏎ class B(A): ⏎     def __init__(self, x, y): ⏎         super().__init__(x) ⏎         self.y = y ⏎ b = B(11, 12) ⏎ print(b.x, b.y, b.x + b.y)
  - A. 12 12 24 ｜ B. 12 11 23 ｜ C. 11 12 23 ｜ D. 11 12 11
  - 答案：C. 11 12 23

## 138 题 ｜ M12 · 字符串处理

- QID：Q5638 … Q6086
- 样例 Q5638：下列代码的输出是？ ⏎ from collections import Counter ⏎ c = Counter('b c d b a b'.split()) ⏎ print(c.most_common(1)[0][1])
  - A. 6 ｜ B. 4 ｜ C. b ｜ D. 3
  - 答案：D. 3

## 130 题 ｜ M11 · 装饰器

- QID：Q5158 … Q5632
- 样例 Q5158：下列代码的输出是？ ⏎ def deco(f): ⏎     def wrapper(*a): ⏎         return f(*a) + 16 ⏎     return wrapper ⏎ @deco ⏎ def add(x): ⏎     return x + 4 ⏎ print(add(1))
  - A. 5 ｜ B. 20 ｜ C. 22 ｜ D. 21
  - 答案：D. 21

## 125 题 ｜ M12 · 数据处理

- QID：Q5634 … Q6089
- 样例 Q5634：下列代码的输出是？ ⏎ nums = [2, 4, 3, 12, 1] ⏎ print(sum(n for n in nums if n > 7))
  - A. 1 ｜ B. 12 ｜ C. 22 ｜ D. 13
  - 答案：B. 12

## 108 题 ｜ M4 · 参数与默认值

- QID：Q1825 … Q2406
- 样例 Q1825：下列代码的输出是？ ⏎ def add(x, y=29): ⏎     return x + y ⏎ print(add(46)) ⏎ print(add(46, 100))
  - A. 46
146 ｜ B. 75
146 ｜ C. 146
75 ｜ D. 76
146
  - 答案：B. 75
146

## 87 题 ｜ M2 · for 循环

- QID：Q0610 … Q1189
- 样例 Q0610：下列代码的输出是？ ⏎ print(sum(range(11, 20, 1)))
  - A. 136 ｜ B. 135 ｜ C. 134 ｜ D. 155
  - 答案：B. 135

## 87 题 ｜ M7 · 标准库 random

- QID：Q3270 … Q3689
- 样例 Q3270：下列代码的输出是？ ⏎ import random ⏎ random.seed(21) ⏎ print([random.randint(1, 6) for _ in range(3)])
  - A. [2, 2, 1] ｜ B. [4, 2, 6] ｜ C. [2, 4, 6, 4] ｜ D. [2, 4, 6]
  - 答案：D. [2, 4, 6]

## 86 题 ｜ M4 · 作用域

- QID：Q1832 … Q2398
- 样例 Q1832：下列代码的输出是？ ⏎ x = 5 ⏎ def f(): ⏎     x = 31 ⏎     return x ⏎ print(f(), x)
  - A. 31 5 ｜ B. 31 31 ｜ C. 5 31 ｜ D. 5 5
  - 答案：A. 31 5

## 86 题 ｜ M11 · 迭代器

- QID：Q5168 … Q5626
- 样例 Q5168：下列代码的输出是？ ⏎ it = iter([8, 2, 1, 1]) ⏎ print(next(it), next(it)) ⏎ print(list(it))
  - A. [1, 1]
8 2 ｜ B. 8 2
[1, 1] ｜ C. 8
[2, 1, 1] ｜ D. 8 2
[8, 2, 1, 1]
  - 答案：B. 8 2
[1, 1]

## 82 题 ｜ M4 · 函数定义

- QID：Q1833 … Q2402
- 样例 Q1833：下列代码的输出是？ ⏎ def f(x): ⏎     y = x + 8 ⏎ r = f(3) ⏎ print(r)
  - A. 报错：UnboundLocalError ｜ B. 0 ｜ C. None ｜ D. True
  - 答案：C. None

## 82 题 ｜ M4 · 返回值

- QID：Q1866 … Q2403
- 样例 Q1866：下列代码的输出是？ ⏎ def f(): ⏎     return 10, 9 ⏎ r = f() ⏎ print(type(r).__name__, r[1])
  - A. tuple 9 ｜ B. tuple 10 ｜ C. 9 tuple ｜ D. tuple
  - 答案：A. tuple 9

## 80 题 ｜ M11 · 迭代器

- QID：Q5156 … Q5631
- 样例 Q5156：下列代码的输出是？ ⏎ it = iter([4, 7, 5, 7, 8]) ⏎ print(next(it), next(it)) ⏎ print(list(it))
  - A. 4
[7, 5, 7, 8] ｜ B. 4 7
[4, 7, 5, 7, 8] ｜ C. 4 7
[5, 7, 8] ｜ D. [5, 7, 8]
4 7
  - 答案：C. 4 7
[5, 7, 8]

## 79 题 ｜ M2 · if/elif

- QID：Q0611 … Q1184
- 样例 Q0611：下列代码的输出是？ ⏎ score = 32 ⏎ if score >= 60: ⏎     grade = 'A' ⏎ elif score >= 94: ⏎     grade = 'B' ⏎ else: ⏎     grade = 'C' ⏎ print(grade)
  - A. 报错：NameError ｜ B. C ｜ C. B ｜ D. A
  - 答案：B. C

## 79 题 ｜ M6 · 继承

- QID：Q2708 … Q3262
- 样例 Q2708：下列代码的输出是？ ⏎ class A: ⏎     def f(self): ⏎         return 6 ⏎ class B(A): ⏎     def f(self): ⏎         return super().f() + 2 ⏎ print(A().f(), B().f())
  - A. 8 8 ｜ B. 8 6 ｜ C. 6 2 ｜ D. 6 8
  - 答案：D. 6 8

## 79 题 ｜ M6 · 构造方法

- QID：Q2719 … Q3255
- 样例 Q2719：下列代码的输出是？ ⏎ class P: ⏎     def __init__(self, x): ⏎         self.x = x * 2 ⏎ p = P(1) ⏎ print(p.x)
  - A. 1 ｜ B. 2 ｜ C. 4 ｜ D. 3
  - 答案：B. 2

## 76 题 ｜ M2 · while 循环

- QID：Q0618 … Q1191
- 样例 Q0618：下列代码的输出是？ ⏎ i = 0 ⏎ s = 0 ⏎ while i < 47: ⏎     s += i ⏎     i += 3 ⏎ print(s)
  - A. 264 ｜ B. 359 ｜ C. 360 ｜ D. 361
  - 答案：C. 360

## 74 题 ｜ M10 · 筛选与索引

- QID：Q4673 … Q5150
- 样例 Q4673：下列代码的输出是？ ⏎ import pandas as pd ⏎ df = pd.DataFrame({'a': [1, 2, 4, 3, 7]}) ⏎ print(int(df[df['a'] > 3]['a'].sum()))
  - A. 14 ｜ B. 2 ｜ C. 12 ｜ D. 11
  - 答案：D. 11

## 73 题 ｜ M10 · 分组聚合

- QID：Q4668 … Q5138
- 样例 Q4668：下列代码的输出是？ ⏎ import pandas as pd ⏎ df = pd.DataFrame({'k': ['x','x','y'], 'v': [3, 9, 6]}) ⏎ print(int(df.groupby('k')['v'].sum().loc['x']))
  - A. 18 ｜ B. 3 ｜ C. 12 ｜ D. 13
  - 答案：C. 12

## 73 题 ｜ M10 · pandas Series

- QID：Q4671 … Q5146
- 样例 Q4671：下列代码的输出是？ ⏎ import pandas as pd ⏎ s = pd.Series([1, 7, 2, 8]) ⏎ print(int(s.sum() * 3))
  - A. 18 ｜ B. 55 ｜ C. 4 ｜ D. 54
  - 答案：D. 54

## 72 题 ｜ M2 · range

- QID：Q0617 … Q1192
- 样例 Q0617：下列代码的输出是？ ⏎ print(list(range(5, 16, 1)))
  - A. [6, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15] ｜ B. [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] ｜ C. [5, 7, 9, 11, 13, 15] ｜ D. [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  - 答案：D. [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

## 72 题 ｜ M2 · while 循环

- QID：Q0628 … Q1165
- 样例 Q0628：下列代码的输出是？ ⏎ n = 113 ⏎ c = 0 ⏎ while n > 0: ⏎     n //= 2 ⏎     c += 1 ⏎ print(c)
  - A. 8 ｜ B. 7 ｜ C. 6 ｜ D. 14
  - 答案：B. 7

## 72 题 ｜ M9 · URL 与查询串

- QID：Q4187 … Q4567
- 样例 Q4187：下列代码的输出是？ ⏎ import urllib.parse ⏎ print(urllib.parse.parse_qs(urllib.parse.urlparse('https://a.com/y/z?k=9&v=2').query)['k'])
  - A. ['9'] ｜ B. 报错：TypeError ｜ C. 报错：KeyError ｜ D. ['9', '9']
  - 答案：A. ['9']

## 69 题 ｜ M3 · 列表

- QID：Q1209 … Q1814
- 样例 Q1209：下列代码的输出是？ ⏎ a = [2, 6, 4] ⏎ a.append(5) ⏎ a.insert(1, 0) ⏎ print(a)
  - A. [2, 0, 6, 4] ｜ B. [2, 0, 6, 4, 5] ｜ C. [2, 6, 0, 4, 5] ｜ D. [0, 2, 6, 4, 5]
  - 答案：B. [2, 0, 6, 4, 5]

## 69 题 ｜ M10 · DataFrame

- QID：Q4693 … Q5143
- 样例 Q4693：下列代码的输出是？ ⏎ import pandas as pd ⏎ df = pd.DataFrame({'a': [8, 4, 9], 'b': [7, 2, 9]}) ⏎ print(int(df['a'].sum()), int(df.shape[0]))
  - A. 3 21 ｜ B. 21 18 ｜ C. 18 3 ｜ D. 21 3
  - 答案：D. 21 3

## 69 题 ｜ M11 · 迭代器

- QID：Q5162 … Q5624
- 样例 Q5162：下列代码的输出是？ ⏎ it = iter([5, 9, 6]) ⏎ print(next(it), next(it)) ⏎ print(list(it))
  - A. 5
[9, 6] ｜ B. 5 9
[5, 9, 6] ｜ C. 5 9
[6] ｜ D. [6]
5 9
  - 答案：C. 5 9
[6]

## 68 题 ｜ M1 · 类型转换

- QID：Q0006 … Q0600
- 样例 Q0006：下列代码的运行结果是？ ⏎ print(int('16.8'))
  - A. 17 ｜ B. 报错：TypeError ｜ C. 16.8 ｜ D. 报错：ValueError
  - 答案：D. 报错：ValueError

## 67 题 ｜ M6 · 类与实例

- QID：Q2713 … Q3235
- 样例 Q2713：下列代码的输出是？ ⏎ class C: ⏎     k = 2 ⏎ x = C() ⏎ y = C() ⏎ y.k = 4 ⏎ print(x.k, y.k)
  - A. 2 4 ｜ B. 4 2 ｜ C. 2 ｜ D. 4 4
  - 答案：A. 2 4

## 64 题 ｜ M1 · 类型转换

- QID：Q0044 … Q0606
- 样例 Q0044：下列代码的输出是？ ⏎ print(int('970') + 66)
  - A. 1036 ｜ B. 1036.0 ｜ C. 97066 ｜ D. 1037
  - 答案：A. 1036

## 63 题 ｜ M6 · 方法重写

- QID：Q2715 … Q3247
- 样例 Q2715：下列代码的输出是？ ⏎ class A: ⏎     def f(self): ⏎         return 1 ⏎ class B(A): ⏎     def f(self): ⏎         return 9 ⏎ print(A().f(), B().f())
  - A. 9 1 ｜ B. 1 1 ｜ C. 9 9 ｜ D. 1 9
  - 答案：D. 1 9

## 62 题 ｜ M1 · f-string

- QID：Q0020 … Q0608
- 样例 Q0020：下列代码的输出是？ ⏎ x = 10.25 ⏎ print(f"{x:.2f}")
  - A. 10.75 ｜ B. 10.250000 ｜ C. 10.25 ｜ D. 10.2
  - 答案：C. 10.25

## 61 题 ｜ M1 · 变量与赋值

- QID：Q0014 … Q0599
- 样例 Q0014：下列代码的输出是？ ⏎ a, b = 93, 65 ⏎ a, b = b, a ⏎ print(a, b)
  - A. 65 ｜ B. 65 65 ｜ C. 93 65 ｜ D. 65 93
  - 答案：D. 65 93

## 60 题 ｜ M11 · 装饰器

- QID：Q5155 … Q5627
- 样例 Q5155：下列代码的输出是？ ⏎ def deco(f): ⏎     def wrapper(*a, **kw): ⏎         return f(*a, **kw) * 2 ⏎     return wrapper ⏎ @deco ⏎ def mul(a, b): ⏎     return a * b ⏎ print(mul(2, 4))
  - A. 17 ｜ B. 16 ｜ C. 8 ｜ D. 15
  - 答案：B. 16

## 59 题 ｜ M1 · 数值与运算符

- QID：Q0011 … Q0565
- 样例 Q0011：下列代码的输出是？ ⏎ print(9 + 8 * 2 ** 2)
  - A. 42 ｜ B. 41 ｜ C. 68 ｜ D. 265
  - 答案：B. 41

## 58 题 ｜ M3 · 元组

- QID：Q1208 … Q1821
- 样例 Q1208：下列代码的运行结果是？ ⏎ t = (3, 6, 9) ⏎ t[0] = 9 ⏎ print(t)
  - A. 报错：ValueError ｜ B. (3, 6, 9, 9) ｜ C. 3 ｜ D. 报错：TypeError
  - 答案：D. 报错：TypeError

## 53 题 ｜ M2 · 条件表达式

- QID：Q0609 … Q1188
- 样例 Q0609：下列代码的输出是？ ⏎ n = 41 ⏎ print('偶' if n % 2 == 0 else '奇')
  - A. 偶 ｜ B. None ｜ C. 报错：NameError ｜ D. 奇
  - 答案：D. 奇

## 53 题 ｜ M2 · 循环 else

- QID：Q0614 … Q1173
- 样例 Q0614：下列代码的输出是？ ⏎ for n in range(7): ⏎     if n == 3: ⏎         print('找到', n) ⏎         break ⏎ else: ⏎     print('没找到')
  - A. 找到 3
没找到 ｜ B. 3 找到 ｜ C. 找到 3 ｜ D. 找到
  - 答案：C. 找到 3

## 50 题 ｜ M3 · 元组

- QID：Q1195 … Q1822
- 样例 Q1195：下列代码的输出是？ ⏎ t = (9, 6, 7) ⏎ x, y, z = t ⏎ print(y + z)
  - A. 22 ｜ B. 14 ｜ C. 15 ｜ D. 13
  - 答案：D. 13

## 49 题 ｜ M10 · 缺失值

- QID：Q4672 … Q5149
- 样例 Q4672：下列代码的输出是？ ⏎ import pandas as pd ⏎ s = pd.Series([3, None, 1]) ⏎ print(int(s.isna().sum()), int(s.sum()))
  - A. 1 4 ｜ B. 1 2 ｜ C. 4 1 ｜ D. 0 0
  - 答案：A. 1 4

## 49 题 ｜ M12 · 调试排错

- QID：Q5639 … Q6065
- 样例 Q5639：下列代码会报什么错？ ⏎ def f(a, b): ⏎     return a / b ⏎ print(f(9, 1))
  - A. 报错：IndexError ｜ B. 9.5 ｜ C. 报错：NameError ｜ D. 9.0
  - 答案：D. 9.0

## 48 题 ｜ M1 · f-string

- QID：Q0023 … Q0604
- 样例 Q0023：下列代码的输出是？ ⏎ n = 944 ⏎ print(f"{n:06d}")
  - A. 000944 ｜ B. 943 ｜ C.    944 ｜ D. 945
  - 答案：A. 000944

## 48 题 ｜ M7 · from import

- QID：Q3268 … Q3645
- 样例 Q3268：下列代码的输出是？ ⏎ from math import sqrt ⏎ print(round(sqrt(15), 3))
  - A. 3.37 ｜ B. 4.37 ｜ C. 4.0 ｜ D. 3.873
  - 答案：D. 3.873

## 47 题 ｜ M7 · json

- QID：Q3272 … Q3679
- 样例 Q3272：下列代码的输出是？ ⏎ import json ⏎ s = json.dumps({'a': 37, 'b': [5]}) ⏎ print(type(s).__name__)
  - A. list ｜ B. str ｜ C. dict ｜ D. bytes
  - 答案：B. str

## 46 题 ｜ M7 · re

- QID：Q3284 … Q3682
- 样例 Q3284：下列代码的输出是？ ⏎ import re ⏎ print(re.split(r'[abc]', 'a19b854c5'))
  - A. ['19', '', '854', '5'] ｜ B. 报错：ValueError ｜ C. ['a', 'b', 'c'] ｜ D. ['', '19', '854', '5']
  - 答案：D. ['', '19', '854', '5']

## 45 题 ｜ M7 · re

- QID：Q3289 … Q3701
- 样例 Q3289：下列代码的输出是？ ⏎ import re ⏎ print(re.findall(r'\d+', 'a62b474c6'))
  - A. ['474', '62', '6'] ｜ B. ['62', '474', '6'] ｜ C. <re.Match object; span=(1, 3), match='62'> ｜ D. ['6', '2', '4', '7', '4', '6']
  - 答案：B. ['62', '474', '6']

## 45 题 ｜ M8 · 排序

- QID：Q3705 … Q4184
- 样例 Q3705：下列冒泡排序一共做了多少次比较？ ⏎ a = [16, 6, 12, 23, 6] ⏎ c = 0 ⏎ for i in range(1, len(a)): ⏎     for j in range(len(a) - i): ⏎         c += 1 ⏎         if a[j] > a[j + 1]: ⏎             a[j], a[j + 1] = a[j + 1], a[j] ⏎ print(c)
  - A. 10 ｜ B. 25 ｜ C. 11 ｜ D. 20
  - 答案：A. 10

## 43 题 ｜ M7 · json

- QID：Q3277 … Q3698
- 样例 Q3277：下列代码的输出是？ ⏎ import json ⏎ s = json.dumps({'a': 31, 'b': [7]}) ⏎ print(json.loads(s)['a'])
  - A. 32 ｜ B. 报错：TypeError ｜ C. 31 ｜ D. [7]
  - 答案：C. 31

## 42 题 ｜ M1 · 变量与赋值

- QID：Q0005 … Q0603
- 样例 Q0005：下列代码的输出是？ ⏎ x = 19 ⏎ x *= 3 ⏎ x -= 7 ⏎ print(x)
  - A. 15 ｜ B. 51 ｜ C. 8.14 ｜ D. 50
  - 答案：D. 50

## 40 题 ｜ M6 · 属性与封装

- QID：Q2714 … Q3218
- 样例 Q2714：下列代码的输出是？ ⏎ class T: ⏎     def __init__(self): ⏎         self._v = 0 ⏎     @property ⏎     def v(self): ⏎         return self._v * 5 + 9 ⏎ t = T() ⏎ t._v = 5 ⏎ print(t.v)
  - A. 5 ｜ B. 34 ｜ C. 14 ｜ D. 35
  - 答案：B. 34

## 40 题 ｜ M7 · re

- QID：Q3294 … Q3699
- 样例 Q3294：下列代码的输出是？ ⏎ import re ⏎ print(re.search(r'\d+', 'a88b340c1').group())
  - A. None ｜ B. 88 ｜ C. 89 ｜ D. 87
  - 答案：B. 88

## 39 题 ｜ M1 · 数值与运算符

- QID：Q0008 … Q0602
- 样例 Q0008：表达式 -31 % 8 的值是？
  - A. 2 ｜ B. -4 ｜ C. 1 ｜ D. 0
  - 答案：C. 1

## 39 题 ｜ M8 · 排序

- QID：Q3710 … Q4183
- 样例 Q3710：下列冒泡排序代码的输出是？ ⏎ a = [18, 36, 37, 55, 15, 45, 55] ⏎ for i in range(1, len(a)): ⏎     for j in range(len(a) - i): ⏎         if a[j] > a[j + 1]: ⏎             a[j], a[j + 1] = a[j + 1], a[j] ⏎ print(a)
  - A. [55, 55, 45, 37, 36, 18, 15] ｜ B. [18, 15, 36, 37, 45, 55, 55] ｜ C. [15, 18, 36, 37, 45, 55, 55] ｜ D. [15, 18, 36, 37, 45, 55]
  - 答案：C. [15, 18, 36, 37, 45, 55, 55]

## 35 题 ｜ M3 · 列表

- QID：Q1210 … Q1819
- 样例 Q1210：下列代码的输出是？ ⏎ a = [1] ⏎ b = [8, 6] ⏎ a.extend(b) ⏎ print(a)
  - A. [8, 1, 6] ｜ B. [1, 8] ｜ C. [1, 8, 6] ｜ D. [1, [8, 6]]
  - 答案：C. [1, 8, 6]

## 35 题 ｜ M7 · json

- QID：Q3287 … Q3688
- 样例 Q3287：下列代码的输出是？ ⏎ import json ⏎ s = json.dumps({'a': 51, 'b': [5]}) ⏎ print(len(json.loads(s)))
  - A. 报错：KeyError ｜ B. 2 ｜ C. 1 ｜ D. 3
  - 答案：B. 2

## 35 题 ｜ M8 · 排序

- QID：Q3730 … Q4174
- 样例 Q3730：下列冒泡排序一共做了多少次比较？ ⏎ a = [45, 9, 42, 37] ⏎ c = 0 ⏎ for i in range(1, len(a)): ⏎     for j in range(len(a) - i): ⏎         c += 1 ⏎         if a[j] > a[j + 1]: ⏎             a[j], a[j + 1] = a[j + 1], a[j] ⏎ print(c)
  - A. 6 ｜ B. 7 ｜ C. 12 ｜ D. 16
  - 答案：A. 6

## 34 题 ｜ M2 · break/continue

- QID：Q0622 … Q1185
- 样例 Q0622：下列代码的输出是？ ⏎ total = 0 ⏎ for i in range(1, 27): ⏎     if i % 4 == 0: ⏎         break ⏎     if i == 8: ⏎         break ⏎     total += i ⏎ print(total)
  - A. 5 ｜ B. 7 ｜ C. 351 ｜ D. 6
  - 答案：D. 6

## 33 题 ｜ M1 · 数值与运算符

- QID：Q0004 … Q0566
- 样例 Q0004：表达式 -7 // 10 的值是？
  - A. -2 ｜ B. 1 ｜ C. 3 ｜ D. -1
  - 答案：D. -1

## 33 题 ｜ M2 · break/continue

- QID：Q0621 … Q1176
- 样例 Q0621：下列代码的输出是？ ⏎ total = 0 ⏎ for i in range(1, 18): ⏎     if i % 4 == 0: ⏎         continue ⏎     if i == 8: ⏎         break ⏎     total += i ⏎ print(total)
  - A. 112 ｜ B. 28 ｜ C. 114 ｜ D. 113
  - 答案：D. 113

## 33 题 ｜ M3 · 列表

- QID：Q1193 … Q1803
- 样例 Q1193：下列代码的输出是？ ⏎ a = [3] ⏎ b = [6, 8] ⏎ a.append(b) ⏎ print(a)
  - A. [3, [6, 8]] ｜ B. [3, [6] ｜ C. [[6, 3, 8]] ｜ D. [3, 6, 8]
  - 答案：A. [3, [6, 8]]

## 32 题 ｜ M4 · 高阶函数

- QID：Q1828 … Q2408
- 样例 Q1828：下列代码的输出是？ ⏎ print(list(map(lambda x: x * 3, filter(lambda x: x % 2, range(8)))))
  - A. [4, 12, 20, 28] ｜ B. [0, 6, 12, 18] ｜ C. [3, 9, 15, 21] ｜ D. [9, 3, 15, 21]
  - 答案：C. [3, 9, 15, 21]

## 31 题 ｜ M5 · 异常类型

- QID：Q2515 … Q2703
- 样例 Q2515：下列代码会抛出哪种异常？ ⏎ print((42, 0))[6]
  - A. 报错：ValueError ｜ B. 报错：KeyError ｜ C. 报错：IndexError ｜ D. 报错：TypeError
  - 答案：D. 报错：TypeError

## 31 题 ｜ M10 · 数组运算

- QID：Q4695 … Q5139
- 样例 Q4695：下列代码的输出是？ ⏎ import numpy as np ⏎ a = np.array([1, 1, 9, 9]) ⏎ print((a + 7).sum())
  - A. 49 ｜ B. 48 ｜ C. 27 ｜ D. 140
  - 答案：B. 48

## 30 题 ｜ M8 · 排序

- QID：Q3721 … Q4182
- 样例 Q3721：下列冒泡排序代码的输出是？ ⏎ a = [14, 54, 52, 31, 15] ⏎ for i in range(1, len(a)): ⏎     for j in range(len(a) - i): ⏎         if a[j] > a[j + 1]: ⏎             a[j], a[j + 1] = a[j + 1], a[j] ⏎ print(a)
  - A. [15, 14, 31, 52, 54] ｜ B. [14, 15, 31, 52] ｜ C. [54, 52, 31, 15, 14] ｜ D. [14, 15, 31, 52, 54]
  - 答案：D. [14, 15, 31, 52, 54]

## 30 题 ｜ M8 · 排序

- QID：Q3725 … Q4178
- 样例 Q3725：下列冒泡排序代码的输出是？ ⏎ a = [51, 28, 12, 40] ⏎ for i in range(1, len(a)): ⏎     for j in range(len(a) - i): ⏎         if a[j] > a[j + 1]: ⏎             a[j], a[j + 1] = a[j + 1], a[j] ⏎ print(a)
  - A. [12, 28, 40] ｜ B. [28, 12, 40, 51] ｜ C. [51, 40, 28, 12] ｜ D. [12, 28, 40, 51]
  - 答案：D. [12, 28, 40, 51]

## 30 题 ｜ M10 · 统计量

- QID：Q4669 … Q5148
- 样例 Q4669：下列代码的输出是？ ⏎ import numpy as np ⏎ a = np.array([18, 29, 19, 10, 13]) ⏎ print(round(float(a.std()), 2))
  - A. 89 ｜ B. 6.49 ｜ C. 42.16 ｜ D. 6.99
  - 答案：B. 6.49

## 29 题 ｜ M12 · 算法应用

- QID：Q5635 … Q6088
- 样例 Q5635：两数之和的哈希解法，输出是？ ⏎ nums = [23, 37, 14, 2, 4] ⏎ target = 27 ⏎ seen = {} ⏎ for i, v in enumerate(nums): ⏎     if target - v in seen: ⏎         print([seen[target - v], i]) ⏎         break ⏎     seen[v] = i
  - A. [0, 4] ｜ B. [0] ｜ C. [1, 3] ｜ D. [4, 0]
  - 答案：A. [0, 4]

## 29 题 ｜ M12 · 算法应用

- QID：Q5668 … Q6060
- 样例 Q5668：两数之和的哈希解法，输出是？ ⏎ nums = [30, 5, 20, 35, 2, 11] ⏎ target = 41 ⏎ seen = {} ⏎ for i, v in enumerate(nums): ⏎     if target - v in seen: ⏎         print([seen[target - v], i]) ⏎         break ⏎     seen[v] = i
  - A. [0, 5] ｜ B. [0] ｜ C. [5, 0] ｜ D. [1, 4]
  - 答案：A. [0, 5]

## 28 题 ｜ M3 · 切片

- QID：Q1212 … Q1816
- 样例 Q1212：下列代码的输出是？ ⏎ s = 'donlhocegh' ⏎ print(s[0:6:2])
  - A. 报错：IndexError ｜ B. donlho ｜ C. dnh ｜ D. olo
  - 答案：C. dnh

## 28 题 ｜ M12 · 算法应用

- QID：Q5669 … Q6087
- 样例 Q5669：两数之和的哈希解法，输出是？ ⏎ nums = [6, 14, 32, 24] ⏎ target = 30 ⏎ seen = {} ⏎ for i, v in enumerate(nums): ⏎     if target - v in seen: ⏎         print([seen[target - v], i]) ⏎         break ⏎     seen[v] = i
  - A. [0, 3] ｜ B. [0] ｜ C. [3, 0] ｜ D. [1, 2]
  - 答案：A. [0, 3]

## 27 题 ｜ M3 · 字典

- QID：Q1211 … Q1813
- 样例 Q1211：下列代码的输出是？ ⏎ d = {'a': 14, 'x': 11} ⏎ print(d.get('missing', 100) + d.get('a', 0))
  - A. 14 ｜ B. 114 ｜ C. 113 ｜ D. 115
  - 答案：B. 114

## 27 题 ｜ M3 · 集合

- QID：Q1225 … Q1809
- 样例 Q1225：表达式 {3, 4, 9, 10, 11} | {1, 4, 6, 7, 9} 的结果是？
  - A. [1, 3, 4, 6, 7, 9, 10, 11] ｜ B. [4, 9] ｜ C. [3, 4, 9, 10, 11] ｜ D. 报错：TypeError
  - 答案：A. [1, 3, 4, 6, 7, 9, 10, 11]

## 27 题 ｜ M5 · 异常类型

- QID：Q2459 … Q2700
- 样例 Q2459：下列代码会抛出哪种异常？ ⏎ print(len(42))
  - A. 报错：TypeError ｜ B. 报错：KeyError ｜ C. 报错：IndexError ｜ D. 报错：ValueError
  - 答案：A. 报错：TypeError

## 27 题 ｜ M5 · 异常类型

- QID：Q2475 … Q2705
- 样例 Q2475：下列代码会抛出哪种异常？ ⏎ print(sorted(18, 0))
  - A. 报错：TypeError ｜ B. 报错：KeyError ｜ C. 报错：ValueError ｜ D. 报错：IndexError
  - 答案：A. 报错：TypeError

## 27 题 ｜ M8 · 排序

- QID：Q3708 … Q4177
- 样例 Q3708：下列冒泡排序一共做了多少次比较？ ⏎ a = [14, 50, 14, 6, 15, 18] ⏎ c = 0 ⏎ for i in range(1, len(a)): ⏎     for j in range(len(a) - i): ⏎         c += 1 ⏎         if a[j] > a[j + 1]: ⏎             a[j], a[j + 1] = a[j + 1], a[j] ⏎ print(c)
  - A. 36 ｜ B. 16 ｜ C. 15 ｜ D. 30
  - 答案：C. 15

## 27 题 ｜ M8 · 排序

- QID：Q3714 … Q4161
- 样例 Q3714：下列冒泡排序代码的输出是？ ⏎ a = [17, 16, 30, 37, 45, 15] ⏎ for i in range(1, len(a)): ⏎     for j in range(len(a) - i): ⏎         if a[j] > a[j + 1]: ⏎             a[j], a[j + 1] = a[j + 1], a[j] ⏎ print(a)
  - A. [15, 16, 17, 30, 37] ｜ B. [16, 15, 17, 30, 37, 45] ｜ C. [15, 16, 17, 30, 37, 45] ｜ D. [45, 37, 30, 17, 16, 15]
  - 答案：C. [15, 16, 17, 30, 37, 45]

## 26 题 ｜ M7 · 标准库 math

- QID：Q3309 … Q3677
- 样例 Q3309：下列代码的输出是？ ⏎ import math ⏎ print(math.sqrt(125))
  - A. 11.180339887498949 ｜ B. 11 ｜ C. 11.68 ｜ D. 11.224972160321824
  - 答案：A. 11.180339887498949

## 25 题 ｜ M2 · 嵌套循环

- QID：Q0620 … Q1186
- 样例 Q0620：下列代码的输出是？ ⏎ c = 0 ⏎ for i in range(4): ⏎     for j in range(5): ⏎         c += 1 ⏎ print(c)
  - A. 9 ｜ B. 21 ｜ C. 20 ｜ D. 30
  - 答案：C. 20

## 25 题 ｜ M3 · 解包

- QID：Q1199 … Q1820
- 样例 Q1199：下列代码的输出是？ ⏎ a, *b, c = [9, 6, 1, 6] ⏎ print(a, b, c)
  - A. 报错：ValueError ｜ B. 9 [6, 1] 6 ｜ C. [6, 9 1] 6 ｜ D. 9 [6, 1, 6]
  - 答案：B. 9 [6, 1] 6

## 25 题 ｜ M5 · with 语句

- QID：Q2420 … Q2638
- 样例 Q2420：下列代码的输出是？ ⏎ class C: ⏎     def __enter__(self): ⏎         print('enter') ⏎         return self ⏎     def __exit__(self, *args): ⏎         print('exit') ⏎ with C() as c: ⏎     print(2 + 4)
  - A. enter
6
exit ｜ B. enter
6
leave ｜ C. enter
6 ｜ D. 6
exit
  - 答案：A. enter
6
exit

## 25 题 ｜ M8 · 二分查找

- QID：Q3719 … Q4169
- 样例 Q3719：下列二分查找代码输出的是？ ⏎ nums = [53, 88, 134, 141, 143, 191] ⏎ lo, hi = 0, len(nums) - 1 ⏎ while lo <= hi: ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 134: ⏎         print(mid) ⏎         break ⏎     elif nums[mid] < 134: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1
  - A. 1 ｜ B. 2 ｜ C. 3 ｜ D. 4
  - 答案：B. 2

## 25 题 ｜ M12 · 算法应用

- QID：Q5664 … Q6090
- 样例 Q5664：两数之和的哈希解法，输出是？ ⏎ nums = [24, 19, 15, 32, 4, 14, 38] ⏎ target = 62 ⏎ seen = {} ⏎ for i, v in enumerate(nums): ⏎     if target - v in seen: ⏎         print([seen[target - v], i]) ⏎         break ⏎     seen[v] = i
  - A. [1, 5] ｜ B. [0, 6] ｜ C. [6, 0] ｜ D. [0]
  - 答案：B. [0, 6]

## 24 题 ｜ M3 · 字典

- QID：Q1196 … Q1818
- 样例 Q1196：下列代码的输出是？ ⏎ d = {'c': 4, 'z': 2} ⏎ print(d.pop('c'), len(d))
  - A. 1 4 ｜ B. 4 ｜ C. 4 {'z': 2} ｜ D. 4 1
  - 答案：D. 4 1

## 23 题 ｜ M3 · 集合

- QID：Q1206 … Q1788
- 样例 Q1206：表达式 {2, 5, 6, 7, 10} ^ {2, 3, 4, 7, 11} 的结果是？
  - A. [2, 5, 6, 7, 10] ｜ B. [3, 4, 5, 6, 10, 11] ｜ C. 报错：TypeError ｜ D. [2, 3, 4, 5, 6, 7, 10, 11]
  - 答案：B. [3, 4, 5, 6, 10, 11]

## 23 题 ｜ M8 · 二分查找

- QID：Q3760 … Q4164
- 样例 Q3760：下列二分查找代码输出的是？ ⏎ nums = [57, 81, 109, 125, 131, 144, 162, 184] ⏎ lo, hi = 0, len(nums) - 1 ⏎ while lo <= hi: ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 162: ⏎         print(mid) ⏎         break ⏎     elif nums[mid] < 162: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1
  - A. 6 ｜ B. 4 ｜ C. 5 ｜ D. 7
  - 答案：A. 6

## 22 题 ｜ M3 · 字典

- QID：Q1243 … Q1748
- 样例 Q1243：下列代码的输出是？ ⏎ d = {'a': 17, 'z': 2} ⏎ d.setdefault('new', 9) ⏎ print(len(d))
  - A. 2 ｜ B. 3 ｜ C. 4 ｜ D. {'a': 17, 'z': 2, 'new': 9}
  - 答案：B. 3

## 22 题 ｜ M5 · 异常类型

- QID：Q2425 … Q2698
- 样例 Q2425：下列代码会抛出哪种异常？ ⏎ print(72 + None)
  - A. 报错：IndexError ｜ B. 报错：KeyError ｜ C. 报错：ValueError ｜ D. 报错：TypeError
  - 答案：D. 报错：TypeError

## 21 题 ｜ M1 · 字符串

- QID：Q0001 … Q0591
- 样例 Q0001：下列代码的输出是？ ⏎ s = 'python kit' ⏎ print(s.replace('t', '#'))
  - A. py#hon kit ｜ B. python kit ｜ C. py#hon ki# ｜ D. ki# py#hon
  - 答案：C. py#hon ki#

## 21 题 ｜ M3 · 排序

- QID：Q1202 … Q1815
- 样例 Q1202：下列代码的输出是？ ⏎ data = [(7, 'a'), (20, 'b'), (18, 'c'), (20, 'd')] ⏎ print(sorted(data, key=lambda p: p[0], reverse=True))
  - A. [(7, 'a'), (18, 'c'), (20, 'b'), (20, 'd')] ｜ B. ['b'), (20, (20, 'd'), (18, 'c'), (7, 'a')] ｜ C. [(20, 'b'), (20, 'd'), (18, 'c'), (7, 'a')] ｜ D. [(20, 'd'), (18, 'c'), (20, 'b'), (7, 'a')]
  - 答案：C. [(20, 'b'), (20, 'd'), (18, 'c'), (7, 'a')]

## 21 题 ｜ M5 · 异常类型

- QID：Q2561 … Q2707
- 样例 Q2561：下列代码会抛出哪种异常？ ⏎ print(67 / 0)
  - A. 报错：ZeroDivisionError ｜ B. 报错：ValueError ｜ C. 报错：IndexError ｜ D. 报错：TypeError
  - 答案：A. 报错：ZeroDivisionError

## 20 题 ｜ M3 · 排序

- QID：Q1214 … Q1765
- 样例 Q1214：下列代码的输出是？ ⏎ data = [(4, 'a'), (11, 'b'), (5, 'c')] ⏎ print(sorted(data, key=lambda p: p[0], reverse=False))
  - A. [(4, 'a'), (5, 'c'), (11, 'b')] ｜ B. [(11, 'b'), (5, 'c'), (4, 'a')] ｜ C. ['a'), (4, (5, 'c'), (11, 'b')] ｜ D. [(4, 'a'), (11, 'b'), (5, 'c')]
  - 答案：A. [(4, 'a'), (5, 'c'), (11, 'b')]

## 20 题 ｜ M5 · 异常类型

- QID：Q2476 … Q2692
- 样例 Q2476：下列代码会抛出哪种异常？ ⏎ print('12x' + 1)
  - A. 报错：IndexError ｜ B. 报错：ValueError ｜ C. 报错：TypeError ｜ D. 报错：KeyError
  - 答案：C. 报错：TypeError

## 20 题 ｜ M10 · numpy 数组

- QID：Q4676 … Q5109
- 样例 Q4676：下列代码的输出是？ ⏎ import numpy as np ⏎ a = np.zeros((5, 2)) ⏎ print(a.size)
  - A. 7 ｜ B. 10 ｜ C. (5, 2) ｜ D. 11
  - 答案：B. 10

## 20 题 ｜ M10 · 统计量

- QID：Q4679 … Q5142
- 样例 Q4679：下列代码的输出是？ ⏎ import numpy as np ⏎ a = np.array([8, 29, 11, 19, 6]) ⏎ print(round(float(a.mean()), 2))
  - A. 15.1 ｜ B. 14.6 ｜ C. 73.0 ｜ D. 73
  - 答案：B. 14.6

## 19 题 ｜ M3 · 解包

- QID：Q1198 … Q1806
- 样例 Q1198：下列代码的输出是？ ⏎ a, *b, c = [1, 6, 1, 7, 7, 8] ⏎ print(a, b, c)
  - A. 1 [6, 1, 7, 7, 8] ｜ B. 1 [6, 1, 7, 7] 8 ｜ C. 报错：ValueError ｜ D. [6, 1 1, 7, 7] 8
  - 答案：B. 1 [6, 1, 7, 7] 8

## 19 题 ｜ M10 · 统计量

- QID：Q4694 … Q5147
- 样例 Q4694：下列代码的输出是？ ⏎ import numpy as np ⏎ a = np.array([23, 5, 14, 23, 20]) ⏎ print(int(a.max()))
  - A. 23 ｜ B. 24 ｜ C. 22 ｜ D. 5
  - 答案：A. 23

## 19 题 ｜ M12 · 代码阅读

- QID：Q5641 … Q5792
- 样例 Q5641：下列代码的输出是？ ⏎ x = 13 ⏎ y = x ⏎ x += 1 ⏎ print(y)
  - A. 12 ｜ B. 13 ｜ C. 14 ｜ D. 报错：NameError
  - 答案：B. 13

## 18 题 ｜ M3 · 解包

- QID：Q1201 … Q1771
- 样例 Q1201：下列代码的输出是？ ⏎ a, *b, c = [9, 5, 1, 2, 4] ⏎ print(a, b, c)
  - A. 报错：ValueError ｜ B. 9 [5, 1, 2] 4 ｜ C. [5, 9 1, 2] 4 ｜ D. 9 [5, 1, 2, 4]
  - 答案：B. 9 [5, 1, 2] 4

## 18 题 ｜ M8 · 二分查找

- QID：Q3718 … Q4170
- 样例 Q3718：下列二分查找代码输出的是？ ⏎ nums = [44, 64, 80, 140, 154, 176, 186] ⏎ lo, hi = 0, len(nums) - 1 ⏎ while lo <= hi: ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 154: ⏎         print(mid) ⏎         break ⏎     elif nums[mid] < 154: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1
  - A. 3 ｜ B. 6 ｜ C. 4 ｜ D. 5
  - 答案：C. 4

## 17 题 ｜ M3 · 排序

- QID：Q1372 … Q1824
- 样例 Q1372：下列代码的输出是？ ⏎ data = [(4, 'a'), (18, 'b'), (1, 'c'), (9, 'd')] ⏎ print(sorted(data, key=lambda p: p[0], reverse=False))
  - A. [(1, 'c'), (4, 'a'), (9, 'd'), (18, 'b')] ｜ B. ['c'), (1, (4, 'a'), (9, 'd'), (18, 'b')] ｜ C. [(18, 'b'), (9, 'd'), (4, 'a'), (1, 'c')] ｜ D. [(4, 'a'), (18, 'b'), (1, 'c'), (9, 'd')]
  - 答案：A. [(1, 'c'), (4, 'a'), (9, 'd'), (18, 'b')]

## 16 题 ｜ M4 · lambda

- QID：Q1867 … Q2405
- 样例 Q1867：下列代码的输出是？ ⏎ w = ['date', 'pear', 'apple', 'berry'] ⏎ print(sorted(w, key=lambda s: s[0]))
  - A. ['berry', 'apple', 'date', 'pear'] ｜ B. ['apple', 'berry', 'date', 'pear'] ｜ C. ['apple', 'berry', 'date'] ｜ D. ['pear', 'date', 'berry', 'apple']
  - 答案：B. ['apple', 'berry', 'date', 'pear']

## 16 题 ｜ M8 · 二分查找

- QID：Q3726 … Q4127
- 样例 Q3726：下列二分查找代码输出的是？ ⏎ nums = [18, 47, 74, 84, 90, 113, 122, 144, 149, 152, 195] ⏎ lo, hi = 0, len(nums) - 1 ⏎ while lo <= hi: ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 90: ⏎         print(mid) ⏎         break ⏎     elif nums[mid] < 90: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1
  - A. 4 ｜ B. 3 ｜ C. 6 ｜ D. 5
  - 答案：A. 4

## 16 题 ｜ M8 · 二分查找

- QID：Q3747 … Q4168
- 样例 Q3747：下列二分查找代码输出的是？ ⏎ nums = [33, 63, 77, 78, 97, 105, 120, 146, 147] ⏎ lo, hi = 0, len(nums) - 1 ⏎ while lo <= hi: ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 33: ⏎         print(mid) ⏎         break ⏎     elif nums[mid] < 33: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1
  - A. 1 ｜ B. 4 ｜ C. 0 ｜ D. -1
  - 答案：C. 0

## 16 题 ｜ M10 · numpy 数组

- QID：Q4739 … Q5084
- 样例 Q4739：下列代码的输出是？ ⏎ import numpy as np ⏎ a = np.zeros((5, 2)) ⏎ print(a.shape)
  - A. 10 ｜ B. (5, 2) ｜ C. (2, 5) ｜ D. 2) (5,
  - 答案：B. (5, 2)

## 16 题 ｜ M11 · 生成器

- QID：Q5151 … Q5361
- 样例 Q5151：下列代码的输出是？ ⏎ g = (i * 2 for i in range(13)) ⏎ print(sum(g))
  - A. 156 0 ｜ B. 156 ｜ C. 26 ｜ D. 157
  - 答案：B. 156

## 15 题 ｜ M1 · 数值与运算符

- QID：Q0066 … Q0585
- 样例 Q0066：表达式 54 * 11 的值是？
  - A. 595 ｜ B. 65 ｜ C. 594 ｜ D. -594
  - 答案：C. 594

## 15 题 ｜ M4 · lambda

- QID：Q1869 … Q2381
- 样例 Q1869：下列代码的输出是？ ⏎ w = ['pear', 'plum', 'kiwi', 'apple'] ⏎ print(sorted(w, key=lambda s: len(s)))
  - A. ['pear', 'plum', 'kiwi', 'apple'] ｜ B. ['pear', 'plum', 'kiwi'] ｜ C. ['apple', 'kiwi', 'pear', 'plum'] ｜ D. ['plum', 'pear', 'kiwi', 'apple']
  - 答案：A. ['pear', 'plum', 'kiwi', 'apple']

## 15 题 ｜ M5 · 文件读写

- QID：Q2417 … Q2539
- 样例 Q2417：下列代码的输出是？ ⏎ from io import StringIO ⏎ buf = StringIO() ⏎ for i in range(2): ⏎     buf.write(f'c{i}') ⏎ print(len(buf.getvalue()))
  - A. 5 ｜ B. 3 ｜ C. 报错：NameError ｜ D. 4
  - 答案：D. 4

## 15 题 ｜ M5 · 异常类型

- QID：Q2436 … Q2675
- 样例 Q2436：下列代码会抛出哪种异常？ ⏎ print('abc'[8])
  - A. 报错：IndexError ｜ B. 报错：KeyError ｜ C. 报错：TypeError ｜ D. 报错：ValueError
  - 答案：A. 报错：IndexError

## 15 题 ｜ M8 · 二分查找

- QID：Q3741 … Q4155
- 样例 Q3741：下列二分查找代码输出的是？ ⏎ nums = [8, 16, 38, 79, 129, 133, 134, 144, 156, 170] ⏎ lo, hi = 0, len(nums) - 1 ⏎ while lo <= hi: ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 79: ⏎         print(mid) ⏎         break ⏎     elif nums[mid] < 79: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1
  - A. 3 ｜ B. 2 ｜ C. 5 ｜ D. 4
  - 答案：A. 3

## 15 题 ｜ M8 · 二分查找

- QID：Q3776 … Q4133
- 样例 Q3776：下列代码里 while 循环执行了几次？ ⏎ nums = [201, 202, 220, 225, 265, 281, 353, 463, 469, 473] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 202: ⏎         break ⏎     elif nums[mid] < 202: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 2 ｜ B. 6 ｜ C. 1 ｜ D. 10
  - 答案：A. 2

## 14 题 ｜ M1 · 数值与运算符

- QID：Q0033 … Q0476
- 样例 Q0033：表达式 45 // 12 的值是？
  - A. 3 ｜ B. -3 ｜ C. 4 ｜ D. 3.75
  - 答案：A. 3

## 14 题 ｜ M5 · 异常类型

- QID：Q2495 … Q2669
- 样例 Q2495：下列代码会抛出哪种异常？ ⏎ print('hello'.split()[8])
  - A. 报错：KeyError ｜ B. 报错：TypeError ｜ C. 报错：ValueError ｜ D. 报错：IndexError
  - 答案：D. 报错：IndexError

## 14 题 ｜ M8 · 二分查找

- QID：Q3729 … Q4179
- 样例 Q3729：下列代码里 while 循环执行了几次？ ⏎ nums = [104, 123, 125, 188, 196, 203, 220, 242, 345, 377, 422, 462] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 377: ⏎         break ⏎     elif nums[mid] < 377: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 7 ｜ B. 1 ｜ C. 4 ｜ D. 12
  - 答案：C. 4

## 13 题 ｜ M1 · 数值与运算符

- QID：Q0038 … Q0590
- 样例 Q0038：表达式 4 - 6 的值是？
  - A. 10 ｜ B. -1 ｜ C. -2 ｜ D. 2
  - 答案：C. -2

## 13 题 ｜ M3 · 列表

- QID：Q1213 … Q1823
- 样例 Q1213：下列代码的输出是？ ⏎ a = [41, 35, 2, 15] ⏎ print(a.pop(0), a)
  - A. 41 [35, 2, ｜ B. [35, 41 2, 15] ｜ C. 41 [35, 2, 15] ｜ D. 15 [41, 35, 2]
  - 答案：C. 41 [35, 2, 15]

## 13 题 ｜ M3 · 集合

- QID：Q1241 … Q1791
- 样例 Q1241：表达式 {2, 4, 5, 6, 10} & {2, 7, 8, 10, 11} 的结果是？
  - A. [2, 10] ｜ B. 报错：TypeError ｜ C. [2, 7, 8, 10, 11] ｜ D. [2, 4, 5, 6, 7, 8, 10, 11]
  - 答案：A. [2, 10]

## 13 题 ｜ M3 · 排序

- QID：Q1280 … Q1802
- 样例 Q1280：下列代码的输出是？ ⏎ data = [(6, 'a'), (0, 'b'), (19, 'c')] ⏎ print(sorted(data, key=lambda p: p[0], reverse=True))
  - A. ['c'), (19, (6, 'a'), (0, 'b')] ｜ B. [(19, 'c'), (6, 'a'), (0, 'b')] ｜ C. [(19, 'c'), (0, 'b'), (6, 'a')] ｜ D. [(0, 'b'), (6, 'a'), (19, 'c')]
  - 答案：B. [(19, 'c'), (6, 'a'), (0, 'b')]

## 13 题 ｜ M4 · lambda

- QID：Q1855 … Q2407
- 样例 Q1855：下列代码的输出是？ ⏎ w = ['fig', 'kiwi', 'lime', 'apple', 'pear'] ⏎ print(sorted(w, key=lambda s: len(s)))
  - A. ['fig', 'kiwi', 'lime', 'pear', 'apple'] ｜ B. ['apple', 'fig', 'kiwi', 'lime', 'pear'] ｜ C. ['kiwi', 'fig', 'lime', 'pear', 'apple'] ｜ D. ['pear', 'lime', 'kiwi', 'fig', 'apple']
  - 答案：A. ['fig', 'kiwi', 'lime', 'pear', 'apple']

## 13 题 ｜ M8 · 二分查找

- QID：Q3745 … Q4113
- 样例 Q3745：下列二分查找代码输出的是？ ⏎ nums = [21, 57, 59, 63, 75, 127, 129, 133, 141, 142, 156, 195] ⏎ lo, hi = 0, len(nums) - 1 ⏎ while lo <= hi: ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 142: ⏎         print(mid) ⏎         break ⏎     elif nums[mid] < 142: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1
  - A. 9 ｜ B. 6 ｜ C. 10 ｜ D. 8
  - 答案：A. 9

## 13 题 ｜ M8 · 二分查找

- QID：Q3810 … Q4180
- 样例 Q3810：下列代码里 while 循环执行了几次？ ⏎ nums = [104, 119, 154, 228, 253, 347, 368, 403, 412, 475, 486] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 475: ⏎         break ⏎     elif nums[mid] < 475: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 3 ｜ B. 1 ｜ C. 6 ｜ D. 11
  - 答案：A. 3

## 12 题 ｜ M1 · 数值与运算符

- QID：Q0024 … Q0593
- 样例 Q0024：表达式 37 + 6 的值是？
  - A. 44 ｜ B. 43 ｜ C. -43 ｜ D. 31
  - 答案：B. 43

## 12 题 ｜ M3 · 集合

- QID：Q1204 … Q1750
- 样例 Q1204：表达式 {2, 4, 6, 8, 11} - {1, 2, 3, 4, 10} 的结果是？
  - A. 报错：TypeError ｜ B. [6, 8, 11] ｜ C. [1, 2, 3, 4, 6, 8, 10, 11] ｜ D. [2, 4, 6, 8, 11]
  - 答案：B. [6, 8, 11]

## 12 题 ｜ M3 · 列表

- QID：Q1218 … Q1746
- 样例 Q1218：下列代码的输出是？ ⏎ a = [2, 1, 41, 4] ⏎ print(a.pop(-2), a)
  - A. 4 [2, 1, 41] ｜ B. 2 [1, 41, 4] ｜ C. 41 [2, 1, 4] ｜ D. [2, 41 1, 4]
  - 答案：C. 41 [2, 1, 4]

## 12 题 ｜ M8 · 二分查找

- QID：Q3732 … Q4147
- 样例 Q3732：下列代码里 while 循环执行了几次？ ⏎ nums = [75, 138, 155, 158, 257, 259, 296, 384] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 138: ⏎         break ⏎     elif nums[mid] < 138: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 5 ｜ B. 1 ｜ C. 8 ｜ D. 2
  - 答案：D. 2

## 11 题 ｜ M4 · lambda

- QID：Q1878 … Q2399
- 样例 Q1878：下列代码的输出是？ ⏎ w = ['fig', 'date', 'pear'] ⏎ print(sorted(w, key=lambda s: s[0]))
  - A. ['fig', 'date', 'pear'] ｜ B. ['date', 'fig', 'pear'] ｜ C. ['pear', 'fig', 'date'] ｜ D. ['date', 'fig']
  - 答案：B. ['date', 'fig', 'pear']

## 11 题 ｜ M8 · 动态规划

- QID：Q3703 … Q3819
- 样例 Q3703：下列动态规划代码的输出是？ ⏎ n = 13 ⏎ dp = [0, 1] ⏎ for i in range(2, n + 1): ⏎     dp.append(dp[-1] + dp[-2]) ⏎ print(dp[n])
  - A. 13 ｜ B. 233 ｜ C. 4096 ｜ D. 234
  - 答案：B. 233

## 10 题 ｜ M1 · 数值与运算符

- QID：Q0197 … Q0549
- 样例 Q0197：表达式 57 % 9 的值是？
  - A. 4 ｜ B. 3 ｜ C. -3 ｜ D. 6
  - 答案：B. 3

## 10 题 ｜ M3 · 列表

- QID：Q1363 … Q1733
- 样例 Q1363：下列代码的输出是？ ⏎ a = [12, 35, 14, 27, 22] ⏎ print(a.pop(2), a)
  - A. 22 [12, 35, 14, 27] ｜ B. 14 [12, 35, 27, 22] ｜ C. [12, 14 35, 27, 22] ｜ D. 12 [35, 14, 27, 22]
  - 答案：B. 14 [12, 35, 27, 22]

## 10 题 ｜ M8 · 二分查找

- QID：Q3715 … Q4151
- 样例 Q3715：下列代码里 while 循环执行了几次？ ⏎ nums = [6, 11, 78, 86, 99, 144, 156, 162, 273, 293, 454, 459, 495] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 273: ⏎         break ⏎     elif nums[mid] < 273: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 7 ｜ B. 4 ｜ C. 1 ｜ D. 13
  - 答案：B. 4

## 10 题 ｜ M8 · 二分查找

- QID：Q3727 … Q4173
- 样例 Q3727：下列代码里 while 循环执行了几次？ ⏎ nums = [6, 18, 36, 39, 55, 124, 162, 226, 248, 265, 277, 346, 351, 443, 465] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 39: ⏎         break ⏎     elif nums[mid] < 39: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 1 ｜ B. 15 ｜ C. 2 ｜ D. 8
  - 答案：C. 2

## 9 题 ｜ M1 · 数值与运算符

- QID：Q0185 … Q0544
- 样例 Q0185：表达式 5 ** 4 的值是？
  - A. -625 ｜ B. 626 ｜ C. 625 ｜ D. 20
  - 答案：C. 625

## 9 题 ｜ M3 · 推导式

- QID：Q1207 … Q1767
- 样例 Q1207：下列代码的输出是？ ⏎ print([x * x for x in range(12) if x % 2 == 0])
  - A. [1, 9, 25, 49, 81, 121] ｜ B. [0, 4, 16, 36, 64, 100] ｜ C. [0, 4, 8, 12, 16, 20] ｜ D. [4, 0, 16, 36, 64, 100]
  - 答案：B. [0, 4, 16, 36, 64, 100]

## 9 题 ｜ M3 · 列表

- QID：Q1215 … Q1798
- 样例 Q1215：下列代码的输出是？ ⏎ a = [39, 41, 4, 30, 48, 40] ⏎ print(a.pop(3), a)
  - A. [39, 30 41, 4, 48, 40] ｜ B. 30 [39, 41, 4, 48, 40] ｜ C. 39 [41, 4, 30, 48, 40] ｜ D. 40 [39, 41, 4, 30, 48]
  - 答案：B. 30 [39, 41, 4, 48, 40]

## 9 题 ｜ M3 · 推导式

- QID：Q1220 … Q1518
- 样例 Q1220：下列代码的输出是？ ⏎ print(sorted({x % 3 for x in range(10)}))
  - A. [1, 0, 2] ｜ B. [0, 1, 2] ｜ C. [0, 1, 2, 3] ｜ D. [0, 1]
  - 答案：B. [0, 1, 2]

## 9 题 ｜ M5 · try/except/else/finally

- QID：Q2428 … Q2505
- 样例 Q2428：下列代码的输出是？ ⏎ def f(): ⏎     try: ⏎         return 'try-4' ⏎     finally: ⏎         print('finally') ⏎ print(f())
  - A. try-4
finally ｜ B. finally
finally ｜ C. finally ｜ D. finally
try-4
  - 答案：D. finally
try-4

## 9 题 ｜ M5 · try/except/else/finally

- QID：Q2438 … Q2550
- 样例 Q2438：下列代码的输出是？ ⏎ try: ⏎     x = 6 ⏎ except ZeroDivisionError: ⏎     print('except') ⏎ else: ⏎     print('else') ⏎ finally: ⏎     print('finally')
  - A. else
finally ｜ B. else ｜ C. finally
else ｜ D. else-done
finally
  - 答案：A. else
finally

## 9 题 ｜ M6 · 特殊方法

- QID：Q2727 … Q2857
- 样例 Q2727：下列代码的输出是？ ⏎ class Box: ⏎     def __init__(self, n): ⏎         self.n = n ⏎     def __len__(self): ⏎         return self.n * 2 ⏎ print(len(Box(4)))
  - A. 4 ｜ B. 6 ｜ C. 9 ｜ D. 8
  - 答案：D. 8

## 9 题 ｜ M6 · 类方法与静态方法

- QID：Q2732 … Q2821
- 样例 Q2732：下列代码的输出是？ ⏎ class T: ⏎     @staticmethod ⏎     def add(a, b): ⏎         return a + b + 6 ⏎ print(T.add(1, 2))
  - A. 8 ｜ B. 10 ｜ C. 3 ｜ D. 9
  - 答案：D. 9

## 9 题 ｜ M8 · 二分查找

- QID：Q3754 … Q4157
- 样例 Q3754：下列代码里 while 循环执行了几次？ ⏎ nums = [9, 17, 27, 41, 43, 225, 257, 270, 296, 325, 395, 405, 415, 457] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 395: ⏎         break ⏎     elif nums[mid] < 395: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 8 ｜ B. 2 ｜ C. 1 ｜ D. 14
  - 答案：B. 2

## 9 题 ｜ M10 · numpy 数组

- QID：Q4692 … Q5105
- 样例 Q4692：下列代码的输出是？ ⏎ import numpy as np ⏎ a = np.zeros((5, 3)) ⏎ print(a.ndim)
  - A. 3 ｜ B. 2 ｜ C. 15 ｜ D. 1
  - 答案：B. 2

## 9 题 ｜ M12 · 综合输出

- QID：Q5640 … Q5863
- 样例 Q5640：下列代码的输出是？ ⏎ data = list(range(2)) ⏎ out = [str(x) for x in data if x % 2 == 0] ⏎ print('-'.join(out))
  - A. [0, 1] ｜ B. 1 ｜ C. -1 ｜ D. 0
  - 答案：D. 0

## 8 题 ｜ M1 · 输入输出

- QID：Q0027 … Q0563
- 样例 Q0027：下列代码的输出是？ ⏎ print(7, end=', ') ⏎ print("ok")
  - A. ok 7, ｜ B. 2
ok ｜ C. 7, ok ｜ D. 7,
  - 答案：C. 7, ok

## 8 题 ｜ M1 · 输入输出

- QID：Q0032 … Q0605
- 样例 Q0032：下列代码的输出是？ ⏎ print(31, 7, 28, 79, sep='')
  - A. 31 7 28 79 ｜ B. 3172878 ｜ C. 3172879 ｜ D. 3172880
  - 答案：C. 3172879

## 8 题 ｜ M4 · lambda

- QID：Q1956 … Q2380
- 样例 Q1956：下列代码的输出是？ ⏎ w = ['lime', 'pear', 'fig', 'apple'] ⏎ print(sorted(w, key=lambda s: s[-1]))
  - A. ['apple', 'lime', 'fig', 'pear'] ｜ B. ['lime', 'apple', 'fig', 'pear'] ｜ C. ['apple', 'fig', 'lime', 'pear'] ｜ D. ['pear', 'lime', 'fig', 'apple']
  - 答案：B. ['lime', 'apple', 'fig', 'pear']

## 8 题 ｜ M8 · 递归

- QID：Q3706 … Q3821
- 样例 Q3706：汉诺塔移动次数，下列代码输出？ ⏎ def h(n): ⏎     return 0 if n == 0 else 2 * h(n - 1) + 1 ⏎ print(h(5))
  - A. 32 ｜ B. 10 ｜ C. 30 ｜ D. 31
  - 答案：D. 31

## 8 题 ｜ M8 · 二分查找

- QID：Q3789 … Q4181
- 样例 Q3789：下列代码里 while 循环执行了几次？ ⏎ nums = [28, 83, 161, 174, 178, 235, 343, 449, 480] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 480: ⏎         break ⏎     elif nums[mid] < 480: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 1 ｜ B. 5 ｜ C. 9 ｜ D. 4
  - 答案：D. 4

## 8 题 ｜ M11 · 推导式进阶

- QID：Q5161 … Q5295
- 样例 Q5161：下列代码的输出是？ ⏎ print([x if x % 2 else -x for x in range(5)])
  - A. [0, 1, -2, 3] ｜ B. [0, 1, -2, 3, -4, -4] ｜ C. [1, 0, -2, 3, -4] ｜ D. [0, 1, -2, 3, -4]
  - 答案：D. [0, 1, -2, 3, -4]

## 7 题 ｜ M4 · 可变参数

- QID：Q1829 … Q2342
- 样例 Q1829：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(7, 2, 2, 5, 1, k0=0))
  - A. 5 ｜ B. 6 ｜ C. 51 ｜ D. 52
  - 答案：C. 51

## 7 题 ｜ M4 · 可变参数

- QID：Q1860 … Q2341
- 样例 Q1860：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(5, 6, 3, 1, k0=0))
  - A. 5 ｜ B. 42 ｜ C. 4 ｜ D. 41
  - 答案：D. 41

## 7 题 ｜ M4 · lambda

- QID：Q1877 … Q2263
- 样例 Q1877：下列代码的输出是？ ⏎ w = ['apple', 'berry', 'kiwi'] ⏎ print(sorted(w, key=lambda s: len(s)))
  - A. ['kiwi', 'apple', 'berry'] ｜ B. ['apple', 'kiwi', 'berry'] ｜ C. ['apple', 'berry', 'kiwi'] ｜ D. ['kiwi', 'berry', 'apple']
  - 答案：A. ['kiwi', 'apple', 'berry']

## 7 题 ｜ M9 · 响应状态码

- QID：Q4190 … Q4219
- 样例 Q4190：HTTP 状态码 403 表示什么？
  - A. 资源永久重定向，新地址在 Location 头里 ｜ B. 服务器理解请求但拒绝执行，常见于权限或反爬拦截 ｜ C. 资源临时重定向 ｜ D. 请求的资源不存在
  - 答案：B. 服务器理解请求但拒绝执行，常见于权限或反爬拦截

## 7 题 ｜ M11 · 生成器

- QID：Q5154 … Q5375
- 样例 Q5154：下列代码的输出是？ ⏎ def g(n): ⏎     for i in range(n): ⏎         yield i + 1 ⏎ print(list(g(4)))
  - A. [1, 2, 3, 4] ｜ B. [2, 1, 3, 4] ｜ C. 报错：TypeError ｜ D. [0, 1, 2, 3]
  - 答案：A. [1, 2, 3, 4]

## 7 题 ｜ M11 · 生成器

- QID：Q5172 … Q5352
- 样例 Q5172：下列代码的输出是？ ⏎ def g(n): ⏎     for i in range(n): ⏎         yield i * 2 ⏎ print(list(g(6)))
  - A. [0, 2, 4, 6, 8, 10] ｜ B. [0, 1, 2, 3, 4, 5] ｜ C. [2, 0, 4, 6, 8, 10] ｜ D. 报错：TypeError
  - 答案：A. [0, 2, 4, 6, 8, 10]

## 7 题 ｜ M11 · 生成器

- QID：Q5178 … Q5439
- 样例 Q5178：下列代码的输出是？ ⏎ def g(n): ⏎     for i in range(n): ⏎         yield i * i ⏎ print(list(g(9)))
  - A. [0, 1, 4, 9, 16, 25, 36, 49, 64] ｜ B. [0, 1, 2, 3, 4, 5, 6, 7, 8] ｜ C. 报错：TypeError ｜ D. [1, 0, 4, 9, 16, 25, 36, 49, 64]
  - 答案：A. [0, 1, 4, 9, 16, 25, 36, 49, 64]

## 6 题 ｜ M1 · 输入输出

- QID：Q0054 … Q0504
- 样例 Q0054：下列代码的输出是？ ⏎ print(80, 69, 30, sep=' ')
  - A. 80 69 30 ｜ B. 80 69 ｜ C. 69 80 30 ｜ D. 80 69 30 
  - 答案：A. 80 69 30

## 6 题 ｜ M3 · 列表

- QID：Q1398 … Q1792
- 样例 Q1398：下列代码的输出是？ ⏎ a = [23, 17, 47, 38, 36, 4] ⏎ print(a.pop(-4), a)
  - A. 47 [23, 17, 38, 36, 4] ｜ B. [23, 47 17, 38, 36, 4] ｜ C. 23 [17, 47, 38, 36, 4] ｜ D. 4 [23, 17, 47, 38, 36]
  - 答案：A. 47 [23, 17, 38, 36, 4]

## 6 题 ｜ M4 · 递归

- QID：Q1826 … Q2020
- 样例 Q1826：下列代码的输出是？ ⏎ def f(n): ⏎     return 1 if n <= 1 else n * f(n - 1) ⏎ print(f(7))
  - A. 5041 ｜ B. 10080 ｜ C. 5039 ｜ D. 5040
  - 答案：D. 5040

## 6 题 ｜ M4 · 可变参数

- QID：Q1849 … Q2378
- 样例 Q1849：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(4, 5))
  - A. 21 ｜ B. 20 ｜ C. 19 ｜ D. 2
  - 答案：B. 20

## 6 题 ｜ M4 · 可变参数

- QID：Q1852 … Q2394
- 样例 Q1852：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(2, 9, k0=0, k1=1, k2=2))
  - A. 5 ｜ B. 2 ｜ C. 24 ｜ D. 23
  - 答案：D. 23

## 6 题 ｜ M4 · 递归

- QID：Q1870 … Q2093
- 样例 Q1870：下列代码的输出是？ ⏎ def fib(n): ⏎     return n if n < 2 else fib(n - 1) + fib(n - 2) ⏎ print(fib(9))
  - A. 34 ｜ B. 35 ｜ C. 68 ｜ D. 33
  - 答案：A. 34

## 6 题 ｜ M4 · 可变参数

- QID：Q1966 … Q2389
- 样例 Q1966：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(8, k0=0, k1=1))
  - A. 3 ｜ B. 13 ｜ C. 12 ｜ D. 1
  - 答案：C. 12

## 6 题 ｜ M4 · 可变参数

- QID：Q1977 … Q2246
- 样例 Q1977：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(7, 4, k0=0))
  - A. 21 ｜ B. 2 ｜ C. 3 ｜ D. 22
  - 答案：A. 21

## 6 题 ｜ M4 · lambda

- QID：Q1983 … Q2364
- 样例 Q1983：下列代码的输出是？ ⏎ w = ['berry', 'apple', 'pear'] ⏎ print(sorted(w, key=lambda s: s[-1]))
  - A. ['pear', 'berry', 'apple'] ｜ B. ['pear', 'apple', 'berry'] ｜ C. ['apple', 'pear', 'berry'] ｜ D. ['apple', 'berry', 'pear']
  - 答案：C. ['apple', 'pear', 'berry']

## 6 题 ｜ M4 · 可变参数

- QID：Q1994 … Q2374
- 样例 Q1994：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(2, 4, 6, k0=0))
  - A. 4 ｜ B. 31 ｜ C. 32 ｜ D. 3
  - 答案：B. 31

## 6 题 ｜ M5 · 异常类型

- QID：Q2524 … Q2578
- 样例 Q2524：下列代码会抛出哪种异常？ ⏎ print([1, 2, 3][3])
  - A. 报错：TypeError ｜ B. 报错：IndexError ｜ C. 报错：ValueError ｜ D. 报错：KeyError
  - 答案：B. 报错：IndexError

## 6 题 ｜ M7 · 标准库 math

- QID：Q3317 … Q3552
- 样例 Q3317：下列代码的输出是？ ⏎ import math ⏎ print(math.factorial(5))
  - A. 720 ｜ B. 121 ｜ C. 120 ｜ D. 60
  - 答案：C. 120

## 6 题 ｜ M12 · 文件处理

- QID：Q5633 … Q5716
- 样例 Q5633：逐行遍历文件并计数，输出是？ ⏎ from io import StringIO ⏎ f = StringIO('l0\\nl1\\nl2\\nl3\\nl4\\nl5\\nl6\\nl7') ⏎ c = 0 ⏎ for line in f: ⏎     c += 1 ⏎ print(c)
  - A. 1 ｜ B. 9 ｜ C. 2 ｜ D. 7
  - 答案：A. 1

## 5 题 ｜ M3 · 推导式

- QID：Q1197 … Q1287
- 样例 Q1197：下列代码的输出是？ ⏎ print({x: x + 1 for x in range(6)})
  - A. {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6} ｜ B. {0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 10} ｜ C. 1, {0: 1: 2, 2: 3, 3: 4, 4: 5, 5: 6} ｜ D. {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5:
  - 答案：A. {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6}

## 5 题 ｜ M3 · 列表

- QID：Q1240 … Q1700
- 样例 Q1240：下列代码的输出是？ ⏎ a = [5, 8, 45, 25, 40] ⏎ print(a.pop(-5), a)
  - A. 40 [5, 8, 45, 25] ｜ B. 5 [8, 45, 25, 40] ｜ C. [8, 5 45, 25, 40] ｜ D. 5 [8, 45, 25,
  - 答案：B. 5 [8, 45, 25, 40]

## 5 题 ｜ M4 · 参数与默认值

- QID：Q1835 … Q1929
- 样例 Q1835：下列代码的输出是？ ⏎ def f(x, acc=[]): ⏎     acc.append(x) ⏎     return acc ⏎ f(2) ⏎ f(2) ⏎ print(f(2))
  - A. [2, 2, 2] ｜ B. [2] ｜ C. 报错：AttributeError ｜ D. [2, 2]
  - 答案：A. [2, 2, 2]

## 5 题 ｜ M4 · 可变参数

- QID：Q1862 … Q2224
- 样例 Q1862：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(8, 4, 6, k0=0, k1=1))
  - A. 33 ｜ B. 3 ｜ C. 32 ｜ D. 5
  - 答案：C. 32

## 5 题 ｜ M4 · 可变参数

- QID：Q1936 … Q2386
- 样例 Q1936：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(3, 3, 9, 8, 9))
  - A. 51 ｜ B. 49 ｜ C. 50 ｜ D. 5
  - 答案：C. 50

## 5 题 ｜ M4 · 可变参数

- QID：Q1940 … Q2397
- 样例 Q1940：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(1, 3, 3, 5, 4, k0=0, k1=1))
  - A. 5 ｜ B. 53 ｜ C. 7 ｜ D. 52
  - 答案：D. 52

## 5 题 ｜ M4 · lambda

- QID：Q2036 … Q2299
- 样例 Q2036：下列代码的输出是？ ⏎ w = ['apple', 'kiwi', 'lime', 'pear', 'berry'] ⏎ print(sorted(w, key=lambda s: s[0]))
  - A. ['berry', 'apple', 'kiwi', 'lime', 'pear'] ｜ B. ['pear', 'lime', 'kiwi', 'berry', 'apple'] ｜ C. ['apple', 'berry', 'kiwi', 'lime'] ｜ D. ['apple', 'berry', 'kiwi', 'lime', 'pear']
  - 答案：D. ['apple', 'berry', 'kiwi', 'lime', 'pear']

## 5 题 ｜ M4 · 可变参数

- QID：Q2116 … Q2401
- 样例 Q2116：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(4, k0=0, k1=1, k2=2))
  - A. 4 ｜ B. 13 ｜ C. 14 ｜ D. 1
  - 答案：B. 13

## 5 题 ｜ M5 · 文件读写

- QID：Q2411 … Q2456
- 样例 Q2411：下列代码的输出是？ ⏎ from io import StringIO ⏎ f = StringIO('r0\\nr1\\nr2\\nr3') ⏎ n = 0 ⏎ for line in f: ⏎     if line.strip().startswith('r'): ⏎         n += 1 ⏎ print(n)
  - A. 0 ｜ B. 5 ｜ C. 1 ｜ D. 2
  - 答案：C. 1

## 5 题 ｜ M5 · 文件读写

- QID：Q2412 … Q2536
- 样例 Q2412：下列代码的输出是？ ⏎ from io import StringIO ⏎ buf = StringIO('line1\nline2') ⏎ print(len(buf.readlines()))
  - A. 2 ｜ B. 1 ｜ C. 3 ｜ D. line1
  - 答案：A. 2

## 5 题 ｜ M5 · 文件模式

- QID：Q2413 … Q2488
- 样例 Q2413：关于 open() 的 'r' 模式，以下说法正确的是？
  - A. 'r' 模式会自动创建文件 ｜ B. 'w' 模式保留原内容并追加 ｜ C. 'a' 模式会清空文件 ｜ D. 'r' 模式要求文件已存在，否则抛 FileNotFoundError
  - 答案：D. 'r' 模式要求文件已存在，否则抛 FileNotFoundError

## 5 题 ｜ M5 · 文件读写

- QID：Q2432 … Q2560
- 样例 Q2432：下列代码的输出是？ ⏎ from io import StringIO ⏎ buf = StringIO('line1\nline2\nline3\nline4') ⏎ print(len(buf.read().splitlines()))
  - A. 5 ｜ B. 3 ｜ C. ['line1', 'line2', 'line3', 'line4'] ｜ D. 4
  - 答案：D. 4

## 4 题 ｜ M4 · 可变参数

- QID：Q1853 … Q2384
- 样例 Q1853：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(9, k0=0))
  - A. 11 ｜ B. 2 ｜ C. 12 ｜ D. 1
  - 答案：A. 11

## 4 题 ｜ M4 · 可变参数

- QID：Q1857 … Q2278
- 样例 Q1857：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(9))
  - A. 10 ｜ B. 9 ｜ C. 11 ｜ D. 1
  - 答案：A. 10

## 4 题 ｜ M4 · 可变参数

- QID：Q1891 … Q2082
- 样例 Q1891：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(8, 2, 9, 4, k0=0, k1=1))
  - A. 43 ｜ B. 6 ｜ C. 42 ｜ D. 4
  - 答案：C. 42

## 4 题 ｜ M4 · 可变参数

- QID：Q1901 … Q2218
- 样例 Q1901：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(3, 4, 8, k0=0, k1=1, k2=2))
  - A. 6 ｜ B. 33 ｜ C. 3 ｜ D. 34
  - 答案：B. 33

## 4 题 ｜ M4 · 可变参数

- QID：Q2159 … Q2385
- 样例 Q2159：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(5, 7, 5))
  - A. 29 ｜ B. 3 ｜ C. 30 ｜ D. 31
  - 答案：C. 30

## 4 题 ｜ M7 · from import

- QID：Q3273 … Q3392
- 样例 Q3273：下列代码的输出是？ ⏎ from math import factorial as fac ⏎ print(fac(5))
  - A. 报错：NameError ｜ B. 121 ｜ C. 120 ｜ D. 119
  - 答案：C. 120

## 4 题 ｜ M8 · 二分查找

- QID：Q3850 … Q4064
- 样例 Q3850：下列代码里 while 循环执行了几次？ ⏎ nums = [79, 127, 129, 155, 224, 238, 247, 255, 306, 334, 398, 405, 406, 414, 437, 446] ⏎ lo, hi = 0, len(nums) - 1 ⏎ c = 0 ⏎ while lo <= hi: ⏎     c += 1 ⏎     mid = (lo + hi) // 2 ⏎     if nums[mid] == 127: ⏎         break ⏎     elif nums[mid] < 127: ⏎         lo = mid + 1 ⏎     else: ⏎         hi = mid - 1 ⏎ print(c)
  - A. 1 ｜ B. 9 ｜ C. 3 ｜ D. 16
  - 答案：C. 3

## 3 题 ｜ M1 · 布尔与比较

- QID：Q0045 … Q0231
- 样例 Q0045：表达式 bool(' ') 的值是？
  - A. True ｜ B. None ｜ C. 报错：TypeError ｜ D. False
  - 答案：A. True

## 3 题 ｜ M1 · 输入输出

- QID：Q0181 … Q0483
- 样例 Q0181：下列代码的输出是？ ⏎ print(23, 88, sep=' ')
  - A. 23 88  ｜ B. 23 ｜ C. 23 88 ｜ D. 88 23
  - 答案：C. 23 88

## 3 题 ｜ M4 · 可变参数

- QID：Q1830 … Q2238
- 样例 Q1830：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(2, 8, 2, 9, 8, k0=0, k1=1, k2=2))
  - A. 8 ｜ B. 53 ｜ C. 5 ｜ D. 54
  - 答案：B. 53

## 3 题 ｜ M4 · 可变参数

- QID：Q1972 … Q2395
- 样例 Q1972：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(1, 6, 8, 3, k0=0, k1=1, k2=2))
  - A. 44 ｜ B. 43 ｜ C. 4 ｜ D. 7
  - 答案：B. 43

## 3 题 ｜ M5 · 异常类型

- QID：Q2409 … Q2494
- 样例 Q2409：下列代码的输出是？ ⏎ try: ⏎     raise ValueError('bad input') ⏎ except ValueError as e: ⏎     print(type(e).__name__, str(e))
  - A. ValueError 'bad input' ｜ B. ValueError bad input ｜ C. <class 'ValueError'> bad input ｜ D. bad ValueError input
  - 答案：B. ValueError bad input

## 3 题 ｜ M5 · 自定义异常

- QID：Q2421 … Q2556
- 样例 Q2421：下列代码的输出是？ ⏎ class BizError(Exception): ⏎     pass ⏎ try: ⏎     raise BizError('failed') ⏎ except BizError as e: ⏎     print('caught', e)
  - A. caught ｜ B. 报错：BizError ｜ C. caught failed ｜ D. failed caught
  - 答案：C. caught failed

## 3 题 ｜ M5 · 自定义异常

- QID：Q2422 … Q2514
- 样例 Q2422：下列代码的输出是？ ⏎ class MyError(Exception): ⏎     pass ⏎ try: ⏎     raise MyError('bad input') ⏎ except MyError as e: ⏎     print('caught', e)
  - A. bad caught input ｜ B. 报错：MyError ｜ C. caught bad ｜ D. caught bad input
  - 答案：D. caught bad input

## 3 题 ｜ M5 · with 语句

- QID：Q2424 … Q2487
- 样例 Q2424：下列代码的运行结果是？ ⏎ class C: ⏎     def __enter__(self): ⏎         return self ⏎     def __exit__(self, *a): ⏎         return False ⏎ with C(): ⏎     raise ValueError('c')
  - A. 报错：ValueError ｜ B. 报错：RuntimeError ｜ C. 报错：TypeError ｜ D. 报错：NameError
  - 答案：A. 报错：ValueError

## 3 题 ｜ M5 · 自定义异常

- QID：Q2439 … Q2479
- 样例 Q2439：下列代码的输出是？ ⏎ class AppError(Exception): ⏎     pass ⏎ try: ⏎     raise AppError('bad input') ⏎ except AppError as e: ⏎     print('caught', e)
  - A. caught bad ｜ B. 报错：AppError ｜ C. bad caught input ｜ D. caught bad input
  - 答案：D. caught bad input

## 3 题 ｜ M5 · 异常类型

- QID：Q2444 … Q2544
- 样例 Q2444：下列代码会抛出哪种异常？ ⏎ print({'a': 1}['x9'])
  - A. 报错：TypeError ｜ B. 报错：KeyError ｜ C. 报错：IndexError ｜ D. 报错：ValueError
  - 答案：B. 报错：KeyError

## 3 题 ｜ M5 · 异常类型

- QID：Q2464 … Q2628
- 样例 Q2464：下列代码会抛出哪种异常？ ⏎ print('12x'.uper())
  - A. 报错：AttributeError ｜ B. 报错：ValueError ｜ C. 报错：IndexError ｜ D. 报错：TypeError
  - 答案：A. 报错：AttributeError

## 3 题 ｜ M5 · 异常类型

- QID：Q2468 … Q2474
- 样例 Q2468：下列代码会抛出哪种异常？ ⏎ print(int('hello'))
  - A. 报错：KeyError ｜ B. 报错：TypeError ｜ C. 报错：IndexError ｜ D. 报错：ValueError
  - 答案：D. 报错：ValueError

## 3 题 ｜ M5 · 异常类型

- QID：Q2512 … Q2662
- 样例 Q2512：下列代码会抛出哪种异常？ ⏎ print('12x'.lenght())
  - A. 报错：AttributeError ｜ B. 报错：TypeError ｜ C. 报错：ValueError ｜ D. 报错：IndexError
  - 答案：A. 报错：AttributeError

## 3 题 ｜ M7 · 标准库 math

- QID：Q3301 … Q3328
- 样例 Q3301：下列代码的输出是？ ⏎ import math ⏎ print(math.log10(1000))
  - A. 6.907755278982137 ｜ B. 4.0 ｜ C. 3.0 ｜ D. 3.5
  - 答案：C. 3.0

## 3 题 ｜ M11 · 推导式进阶

- QID：Q5167 … Q5229
- 样例 Q5167：下列代码的输出是？ ⏎ print([(i, j) for i in range(2) for j in range(3)])
  - A. [0, 1, 2, 3, 4, 5, 6, 7] ｜ B. [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1] ｜ C. [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)] ｜ D. [0), (0, (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]
  - 答案：C. [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]

## 2 题 ｜ M1 · 布尔与比较

- QID：Q0060 … Q0073
- 样例 Q0060：表达式 bool(0.0) 的值是？
  - A. 报错：TypeError ｜ B. None ｜ C. False ｜ D. True
  - 答案：C. False

## 2 题 ｜ M4 · lambda

- QID：Q1879 … Q1945
- 样例 Q1879：下列代码的输出是？ ⏎ w = ['kiwi', 'pear', 'fig', 'apple', 'lime'] ⏎ print(sorted(w, key=lambda s: s[-1]))
  - A. ['apple', 'fig', 'kiwi', 'lime', 'pear'] ｜ B. ['apple', 'lime', 'fig', 'kiwi', 'pear'] ｜ C. ['lime', 'apple', 'fig', 'kiwi', 'pear'] ｜ D. ['pear', 'lime', 'kiwi', 'fig', 'apple']
  - 答案：B. ['apple', 'lime', 'fig', 'kiwi', 'pear']

## 2 题 ｜ M4 · 可变参数

- QID：Q1895 … Q2134
- 样例 Q1895：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(9, 8, 1, 6))
  - A. 40 ｜ B. 39 ｜ C. 4 ｜ D. 41
  - 答案：A. 40

## 2 题 ｜ M4 · 可变参数

- QID：Q2234 … Q2361
- 样例 Q2234：下列代码的输出是？ ⏎ def f(*a, **kw): ⏎     return len(a) * 10 + len(kw) ⏎ print(f(3, 3, k0=0, k1=1))
  - A. 23 ｜ B. 4 ｜ C. 2 ｜ D. 22
  - 答案：D. 22

## 2 题 ｜ M5 · 异常类型

- QID：Q2500 … Q2618
- 样例 Q2500：下列代码会抛出哪种异常？ ⏎ print('abc'.apend())
  - A. 报错：ValueError ｜ B. 报错：IndexError ｜ C. 报错：AttributeError ｜ D. 报错：TypeError
  - 答案：C. 报错：AttributeError

## 2 题 ｜ M11 · 上下文管理器

- QID：Q5152 … Q5220
- 样例 Q5152：下列代码的输出是？ ⏎ class C: ⏎     def __enter__(self): ⏎         return 1 ⏎     def __exit__(self, *a): ⏎         return True ⏎ with C() as v: ⏎     raise ValueError('x') ⏎ print('after', v)
  - A. after ｜ B. 报错：ValueError ｜ C. 1 after ｜ D. after 1
  - 答案：D. after 1

## 2 题 ｜ M11 · 上下文管理器

- QID：Q5157 … Q5166
- 样例 Q5157：下列代码的输出是？ ⏎ class C: ⏎     def __enter__(self): ⏎         return 1 ⏎     def __exit__(self, *a): ⏎         return False ⏎ with C() as v: ⏎     raise ValueError('y') ⏎ print('after', v)
  - A. after 1 ｜ B. 报错：TypeError ｜ C. 报错：KeyError ｜ D. 报错：ValueError
  - 答案：D. 报错：ValueError

## 1 题 ｜ M1 · 注释与缩进

- QID：Q0002
- 样例 Q0002：关于 Python 的代码块与注释，下列说法正确的是？
  - A. 多行注释用三个引号包裹，但本质是字符串表达式 ｜ B. Python 用大括号表示代码块 ｜ C. PEP 8 推荐每级缩进 2 个空格 ｜ D. 缩进不一致只会警告不会报错
  - 答案：A. 多行注释用三个引号包裹，但本质是字符串表达式

## 1 题 ｜ M1 · 注释与缩进

- QID：Q0007
- 样例 Q0007：以下哪项描述符合 Python 的语法规定？
  - A. PEP 8 推荐每级缩进 2 个空格 ｜ B. Python 用大括号表示代码块 ｜ C. 缩进不一致会抛 IndentationError ｜ D. 缩进不一致只会警告不会报错
  - 答案：C. 缩进不一致会抛 IndentationError

## 1 题 ｜ M1 · 注释与缩进

- QID：Q0019
- 样例 Q0019：关于缩进与注释，哪一项是对的？
  - A. 多行注释用三个引号包裹，但本质是字符串表达式 ｜ B. Python 用大括号表示代码块 ｜ C. PEP 8 推荐每级缩进 2 个空格 ｜ D. 缩进不一致只会警告不会报错
  - 答案：A. 多行注释用三个引号包裹，但本质是字符串表达式

## 1 题 ｜ M1 · 布尔与比较

- QID：Q0021
- 样例 Q0021：表达式 bool(None) 的值是？
  - A. None ｜ B. False ｜ C. 报错：TypeError ｜ D. True
  - 答案：B. False

## 1 题 ｜ M1 · 布尔与比较

- QID：Q0025
- 样例 Q0025：表达式 bool({}) 的值是？
  - A. False ｜ B. None ｜ C. True ｜ D. 报错：TypeError
  - 答案：A. False

## 1 题 ｜ M1 · 布尔与比较

- QID：Q0028
- 样例 Q0028：表达式 bool([0]) 的值是？
  - A. False ｜ B. True ｜ C. 报错：TypeError ｜ D. None
  - 答案：B. True

## 1 题 ｜ M1 · 布尔与比较

- QID：Q0068
- 样例 Q0068：表达式 bool((1,)) 的值是？
  - A. None ｜ B. 报错：TypeError ｜ C. False ｜ D. True
  - 答案：D. True

## 1 题 ｜ M1 · 布尔与比较

- QID：Q0358
- 样例 Q0358：表达式 bool([]) 的值是？
  - A. 报错：TypeError ｜ B. False ｜ C. None ｜ D. True
  - 答案：B. False

## 1 题 ｜ M5 · try/except/else/finally

- QID：Q2410
- 样例 Q2410：下列代码的输出是？ ⏎ try: ⏎     x = int('abc') ⏎ except ZeroDivisionError: ⏎     print('except') ⏎ else: ⏎     print('else') ⏎ finally: ⏎     print('finally')
  - A. 报错：KeyError ｜ B. 报错：ValueError ｜ C. 报错：TypeError ｜ D. except
finally
  - 答案：B. 报错：ValueError

## 1 题 ｜ M5 · 文件模式

- QID：Q2415
- 样例 Q2415：对于已含 3 个字符的 StringIO，getvalue() 的返回长度是？ ⏎ from io import StringIO ⏎ buf = StringIO('old') ⏎ buf.seek(0) ⏎ print(len(buf.getvalue()))
  - A. 4 ｜ B. 3 ｜ C. 6 ｜ D. 0
  - 答案：B. 3

## 1 题 ｜ M5 · 自定义异常

- QID：Q2418
- 样例 Q2418：关于异常处理，下列说法正确的是？
  - A. except 的顺序不影响匹配结果 ｜ B. 多个 except 要把子类写在父类前面，否则子类分支永远不执行 ｜ C. finally 在 return 之后不会执行 ｜ D. 自定义异常必须继承 BaseException
  - 答案：B. 多个 except 要把子类写在父类前面，否则子类分支永远不执行

## 1 题 ｜ M5 · try/except/else/finally

- QID：Q2426
- 样例 Q2426：下列代码的输出是？ ⏎ try: ⏎     x = 1 / 0 ⏎ except ZeroDivisionError: ⏎     print('except') ⏎ else: ⏎     print('else') ⏎ finally: ⏎     print('finally')
  - A. except
finally ｜ B. except ｜ C. 报错：ZeroDivisionError ｜ D. finally
except
  - 答案：A. except
finally

## 1 题 ｜ M5 · 编码

- QID：Q2434
- 样例 Q2434：不指定 encoding 时 open() 用什么编码？
  - A. 总是 ASCII ｜ B. 总是 UTF-8 ｜ C. 使用系统默认编码（Windows 常为 GBK），容易乱码或报错，应显式写 encoding='utf-8' ｜ D. 由文件内容自动探测
  - 答案：C. 使用系统默认编码（Windows 常为 GBK），容易乱码或报错，应显式写 encoding='utf-8'

## 1 题 ｜ M5 · 编码

- QID：Q2446
- 样例 Q2446：跨平台读写文本最稳妥的做法是？
  - A. 总是 ASCII ｜ B. 由文件内容自动探测 ｜ C. 使用系统默认编码（Windows 常为 GBK），容易乱码或报错，应显式写 encoding='utf-8' ｜ D. 总是 UTF-8
  - 答案：C. 使用系统默认编码（Windows 常为 GBK），容易乱码或报错，应显式写 encoding='utf-8'

## 1 题 ｜ M5 · 编码

- QID：Q2484
- 样例 Q2484：读取 utf-8 文件却报 UnicodeDecodeError，通常是？
  - A. 总是 ASCII ｜ B. 使用系统默认编码（Windows 常为 GBK），容易乱码或报错，应显式写 encoding='utf-8' ｜ C. 总是 UTF-8 ｜ D. 由文件内容自动探测
  - 答案：B. 使用系统默认编码（Windows 常为 GBK），容易乱码或报错，应显式写 encoding='utf-8'

## 1 题 ｜ M5 · 异常类型

- QID：Q2548
- 样例 Q2548：下列代码会抛出哪种异常？ ⏎ print(no_such_name)
  - A. 报错：TypeError ｜ B. 报错：IndexError ｜ C. 报错：ValueError ｜ D. 报错：NameError
  - 答案：D. 报错：NameError

## 1 题 ｜ M5 · 异常类型

- QID：Q2588
- 样例 Q2588：下列代码会抛出哪种异常？ ⏎ print(undefined_x)
  - A. 报错：IndexError ｜ B. 报错：ValueError ｜ C. 报错：TypeError ｜ D. 报错：NameError
  - 答案：D. 报错：NameError

## 1 题 ｜ M6 · 类方法与静态方法

- QID：Q2709
- 样例 Q2709：下列代码的输出是？ ⏎ class C: ⏎     n = 0 ⏎     @classmethod ⏎     def inc(cls): ⏎         cls.n += 1 ⏎         return cls.n ⏎ print(C.inc(), C.inc(), C.n)
  - A. 1 1 0 ｜ B. 1 2 2 ｜ C. 2 1 2 ｜ D. 报错：TypeError
  - 答案：B. 1 2 2

## 1 题 ｜ M6 · 类与实例

- QID：Q2711
- 样例 Q2711：下列代码的输出是？ ⏎ class A: pass ⏎ class B(A): pass ⏎ b = B() ⏎ print(isinstance(b, A), isinstance(b, B), type(b) is A)
  - A. True True True ｜ B. True True ｜ C. False True False ｜ D. True True False
  - 答案：D. True True False

## 1 题 ｜ M6 · MRO

- QID：Q2726
- 样例 Q2726：下列代码的输出是？ ⏎ class X: pass ⏎ class Y: pass ⏎ class Z(X, Y): pass ⏎ print([c.__name__ for c in Z.mro()])
  - A. ['X', 'Z', 'Y', 'object'] ｜ B. ['Z', 'X', 'Y', 'object'] ｜ C. ['X', 'Y'] ｜ D. ['Z', 'X', 'Y']
  - 答案：B. ['Z', 'X', 'Y', 'object']

## 1 题 ｜ M6 · MRO

- QID：Q2731
- 样例 Q2731：下列代码的输出是？ ⏎ class A: pass ⏎ class B(A): pass ⏎ class C(A): pass ⏎ class D(B, C): pass ⏎ print([c.__name__ for c in D.mro()])
  - A. ['B', 'C'] ｜ B. ['D', 'B', 'C', 'A'] ｜ C. ['B', 'D', 'C', 'A', 'object'] ｜ D. ['D', 'B', 'C', 'A', 'object']
  - 答案：D. ['D', 'B', 'C', 'A', 'object']

## 1 题 ｜ M7 · 包结构

- QID：Q3269
- 样例 Q3269：包里的 __init__.py 有什么作用？
  - A. 存放包的安装脚本 ｜ B. 定义包的版本号，必填 ｜ C. 标识目录是一个包，导入包时执行，可用来控制对外暴露的接口 ｜ D. 自动生成 requirements.txt
  - 答案：C. 标识目录是一个包，导入包时执行，可用来控制对外暴露的接口

## 1 题 ｜ M7 · 模块搜索路径

- QID：Q3276
- 样例 Q3276：import 一个模块时，Python 按什么顺序查找？
  - A. 只查 site-packages ｜ B. 只查当前目录 ｜ C. 按文件名字母序扫描全盘 ｜ D. 先查 sys.modules 缓存，再查内置模块，最后按 sys.path 顺序查找
  - 答案：D. 先查 sys.modules 缓存，再查内置模块，最后按 sys.path 顺序查找

## 1 题 ｜ M7 · import

- QID：Q3283
- 样例 Q3283：以下哪种写法是正确的？
  - A. from math import sqrt 后必须写 math.sqrt(4) ｜ B. import math 会立刻执行 math 里的所有函数 ｜ C. 同一模块被多次 import 只会在首次导入时执行一次 ｜ D. 同一模块每次 import 都会重新执行一遍
  - 答案：C. 同一模块被多次 import 只会在首次导入时执行一次

## 1 题 ｜ M7 · import

- QID：Q3312
- 样例 Q3312：关于导入语句，下列说法正确的是？
  - A. from math import sqrt 后必须写 math.sqrt(4) ｜ B. import numpy as np 把模块绑定到名字 np ｜ C. 同一模块每次 import 都会重新执行一遍 ｜ D. import math 会立刻执行 math 里的所有函数
  - 答案：B. import numpy as np 把模块绑定到名字 np

## 1 题 ｜ M8 · 哈希表

- QID：Q3702
- 样例 Q3702：哈希表查找的平均时间复杂度是？
  - A. 平均 O(log n) ｜ B. 平均 O(1)，最坏 O(n)：冲突严重时退化为线性查找 ｜ C. 始终 O(1)，不存在最坏情况 ｜ D. 平均 O(n)
  - 答案：B. 平均 O(1)，最坏 O(n)：冲突严重时退化为线性查找

## 1 题 ｜ M8 · 空间复杂度

- QID：Q3709
- 样例 Q3709：递归算法的额外空间开销主要来自哪里？
  - A. 调用栈：每层递归占一帧，空间复杂度为 O(递归深度) ｜ B. 堆上的全局变量 ｜ C. 解释器的字节码缓存 ｜ D. 函数参数的数量
  - 答案：A. 调用栈：每层递归占一帧，空间复杂度为 O(递归深度)

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3717
- 样例 Q3717：在长度为 n 的有序列表上做二分查找，时间复杂度是？
  - A. O(n log n) ｜ B. O(log n) ｜ C. O(n) ｜ D. O(1)（平均）
  - 答案：B. O(log n)

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3742
- 样例 Q3742：对 n 个元素做一次冒泡排序（最坏），时间复杂度是？
  - A. O(log n) ｜ B. O(n) ｜ C. O(2ⁿ) ｜ D. O(n²)
  - 答案：D. O(n²)

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3765
- 样例 Q3765：哈希表插入，时间复杂度是？
  - A. O(n log n) ｜ B. O(2ⁿ) ｜ C. O(1)（平均） ｜ D. O(n²)
  - 答案：C. O(1)（平均）

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3767
- 样例 Q3767：朴素递归求斐波那契，时间复杂度是？
  - A. O(1)（平均） ｜ B. O(2ⁿ) ｜ C. O(n²) ｜ D. O(n)
  - 答案：B. O(2ⁿ)

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3775
- 样例 Q3775：访问字典中的一个键，时间复杂度是？
  - A. O(n log n) ｜ B. O(log n) ｜ C. O(1)（平均） ｜ D. O(n²)
  - 答案：C. O(1)（平均）

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3790
- 样例 Q3790：遍历二维 n×n 矩阵，时间复杂度是？
  - A. O(log n) ｜ B. O(n²) ｜ C. O(1)（平均） ｜ D. O(2ⁿ)
  - 答案：B. O(n²)

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3823
- 样例 Q3823：归并排序，时间复杂度是？
  - A. O(log n) ｜ B. O(n²) ｜ C. O(2ⁿ) ｜ D. O(n log n)
  - 答案：D. O(n log n)

## 1 题 ｜ M8 · 时间复杂度

- QID：Q3854
- 样例 Q3854：遍历一次列表求和，时间复杂度是？
  - A. O(n²) ｜ B. O(log n) ｜ C. O(n) ｜ D. O(1)（平均）
  - 答案：C. O(n)

## 1 题 ｜ M9 · CSS 选择器

- QID：Q4185
- 样例 Q4185：CSS 选择器 a[href] 匹配什么？
  - A. 选中带 href 属性的 a 标签 ｜ B. 选中 ul 的直接子元素 li ｜ C. 选中作为父元素第一个子元素的 p ｜ D. 选中 id 为 main 的元素
  - 答案：A. 选中带 href 属性的 a 标签

## 1 题 ｜ M9 · 反爬应对

- QID：Q4186
- 样例 Q4186：请求频率过高最常见的后果是？
  - A. 返回 429/403、IP 被封或要求验证码；应加延时、限速并遵守站点条款 ｜ B. HTTP 100 继续 ｜ C. TLS 握手失败 ｜ D. 服务器自动返回完整数据
  - 答案：A. 返回 429/403、IP 被封或要求验证码；应加延时、限速并遵守站点条款

## 1 题 ｜ M9 · 编码

- QID：Q4188
- 样例 Q4188：requests 返回的中文乱码，通常怎么处理？
  - A. 把 timeout 调大 ｜ B. 加 User-Agent 头即可解决 ｜ C. 用 response.text.encode('utf-8') 再解码 ｜ D. requests 可能按错误编码猜测，应显式设置 response.encoding = 'utf-8'
  - 答案：D. requests 可能按错误编码猜测，应显式设置 response.encoding = 'utf-8'

## 1 题 ｜ M9 · robots 与合规

- QID：Q4189
- 样例 Q4189：关于 robots.txt，下列说法正确的是？
  - A. robots.txt 由防火墙强制执行，绕过即违法 ｜ B. 只要设了随机 UA 就完全合规 ｜ C. robots.txt 是爬虫约定而非强制限制；遵守它、控制频率、不抓隐私数据才是合规抓取 ｜ D. robots.txt 存在即表示整站禁止抓取
  - 答案：C. robots.txt 是爬虫约定而非强制限制；遵守它、控制频率、不抓隐私数据才是合规抓取

## 1 题 ｜ M9 · HTTP 请求

- QID：Q4191
- 样例 Q4191：HTTP 的 POST 方法有什么特点？
  - A. 参数拼在 URL 上，有长度限制，可被缓存 ｜ B. 用请求体整体替换目标资源 ｜ C. 请求服务器删除指定资源 ｜ D. 数据放在请求体里，适合提交表单和上传
  - 答案：D. 数据放在请求体里，适合提交表单和上传

## 1 题 ｜ M9 · HTTP 请求

- QID：Q4192
- 样例 Q4192：HTTP 的 HEAD 方法有什么特点？
  - A. 参数拼在 URL 上，有长度限制，可被缓存 ｜ B. 请求服务器删除指定资源 ｜ C. 数据放在请求体里，适合提交表单和上传 ｜ D. 只要响应头，不要响应体，常用于探测资源
  - 答案：D. 只要响应头，不要响应体，常用于探测资源

## 1 题 ｜ M9 · CSS 选择器

- QID：Q4193
- 样例 Q4193：CSS 选择器 p:first-child 匹配什么？
  - A. 选中带 href 属性的 a 标签 ｜ B. 选中作为父元素第一个子元素的 p ｜ C. 选中 ul 的直接子元素 li ｜ D. 选中 class 含 item 的 div
  - 答案：B. 选中作为父元素第一个子元素的 p

## 1 题 ｜ M9 · CSS 选择器

- QID：Q4194
- 样例 Q4194：CSS 选择器 ul > li 匹配什么？
  - A. 选中带 href 属性的 a 标签 ｜ B. 选中作为父元素第一个子元素的 p ｜ C. 选中 class 含 item 的 div ｜ D. 选中 ul 的直接子元素 li
  - 答案：D. 选中 ul 的直接子元素 li

## 1 题 ｜ M9 · 请求头

- QID：Q4196
- 样例 Q4196：请求头 Referer 的作用是？
  - A. 携带会话凭证，维持登录态 ｜ B. 说明请求从哪个页面跳转而来 ｜ C. 标识客户端类型和版本 ｜ D. 声明客户端支持的压缩方式
  - 答案：B. 说明请求从哪个页面跳转而来

## 1 题 ｜ M9 · 请求头

- QID：Q4197
- 样例 Q4197：请求头 User-Agent 的作用是？
  - A. 携带会话凭证，维持登录态 ｜ B. 说明请求从哪个页面跳转而来 ｜ C. 标识客户端类型和版本 ｜ D. 声明客户端支持的压缩方式
  - 答案：C. 标识客户端类型和版本

## 1 题 ｜ M9 · CSS 选择器

- QID：Q4200
- 样例 Q4200：CSS 选择器 #main 匹配什么？
  - A. 选中作为父元素第一个子元素的 p ｜ B. 选中 id 为 main 的元素 ｜ C. 选中 class 含 item 的 div ｜ D. 选中 ul 的直接子元素 li
  - 答案：B. 选中 id 为 main 的元素

## 1 题 ｜ M9 · 请求头

- QID：Q4201
- 样例 Q4201：请求头 Cookie 的作用是？
  - A. 说明请求从哪个页面跳转而来 ｜ B. 标识客户端类型和版本 ｜ C. 声明客户端支持的压缩方式 ｜ D. 携带会话凭证，维持登录态
  - 答案：D. 携带会话凭证，维持登录态

## 1 题 ｜ M9 · HTTP 请求

- QID：Q4203
- 样例 Q4203：HTTP 的 PUT 方法有什么特点？
  - A. 用请求体整体替换目标资源 ｜ B. 只要响应头，不要响应体，常用于探测资源 ｜ C. 数据放在请求体里，适合提交表单和上传 ｜ D. 请求服务器删除指定资源
  - 答案：A. 用请求体整体替换目标资源

## 1 题 ｜ M9 · HTTP 请求

- QID：Q4204
- 样例 Q4204：HTTP 的 DELETE 方法有什么特点？
  - A. 参数拼在 URL 上，有长度限制，可被缓存 ｜ B. 请求服务器删除指定资源 ｜ C. 数据放在请求体里，适合提交表单和上传 ｜ D. 用请求体整体替换目标资源
  - 答案：B. 请求服务器删除指定资源

## 1 题 ｜ M9 · CSS 选择器

- QID：Q4208
- 样例 Q4208：CSS 选择器 div.item 匹配什么？
  - A. 选中 class 含 item 的 div ｜ B. 选中带 href 属性的 a 标签 ｜ C. 选中 id 为 main 的元素 ｜ D. 选中 ul 的直接子元素 li
  - 答案：A. 选中 class 含 item 的 div

## 1 题 ｜ M9 · 请求头

- QID：Q4212
- 样例 Q4212：请求头 Accept-Encoding 的作用是？
  - A. 说明请求从哪个页面跳转而来 ｜ B. 标识客户端类型和版本 ｜ C. 携带会话凭证，维持登录态 ｜ D. 声明客户端支持的压缩方式
  - 答案：D. 声明客户端支持的压缩方式

## 1 题 ｜ M9 · HTTP 请求

- QID：Q4220
- 样例 Q4220：HTTP 的 GET 方法有什么特点？
  - A. 参数拼在 URL 上，有长度限制，可被缓存 ｜ B. 用请求体整体替换目标资源 ｜ C. 数据放在请求体里，适合提交表单和上传 ｜ D. 请求服务器删除指定资源
  - 答案：A. 参数拼在 URL 上，有长度限制，可被缓存

## 1 题 ｜ M11 · 异常链

- QID：Q5153
- 样例 Q5153：下列代码最后抛出的异常，它的 __cause__ 是什么类型？ ⏎ try: ⏎     int('x') ⏎ except ValueError as e: ⏎     raise RuntimeError('outer') from e
  - A. 报错：RuntimeError ｜ B. 报错：ValueError ｜ C. 报错：TypeError ｜ D. 报错：__cause__ 为 None
  - 答案：A. 报错：RuntimeError

## 1 题 ｜ M11 · 类型注解

- QID：Q5163
- 样例 Q5163：类型注解在运行时会做类型检查吗？
  - A. 会，并自动做类型转换 ｜ B. 不会。注解只是元数据，运行时不做检查，需 mypy 等工具静态分析 ｜ C. 注解会被解释器完全忽略，连 __annotations__ 都不存 ｜ D. 会，传错类型直接抛 TypeError
  - 答案：B. 不会。注解只是元数据，运行时不做检查，需 mypy 等工具静态分析

## 1 题 ｜ M11 · 异常链

- QID：Q5164
- 样例 Q5164：下列代码最后抛出的异常，它的 __cause__ 是什么类型？ ⏎ try: ⏎     {}.pop('k') ⏎ except KeyError as e: ⏎     raise RuntimeError('outer') from e
  - A. 报错：__cause__ 为 None ｜ B. 报错：KeyError ｜ C. 报错：TypeError ｜ D. 报错：RuntimeError
  - 答案：D. 报错：RuntimeError

## 1 题 ｜ M11 · 闭包

- QID：Q5169
- 样例 Q5169：下列代码的输出是？ ⏎ def outer(): ⏎     n = 0 ⏎     def inner(): ⏎         nonlocal n ⏎         n += 1 ⏎         return n ⏎     return inner ⏎ f = outer() ⏎ print(f(), f(), f())
  - A. 1 2 3 ｜ B. 1 1 1 ｜ C. 报错：UnboundLocalError ｜ D. 2 1 3
  - 答案：A. 1 2 3

## 1 题 ｜ M11 · 异常链

- QID：Q5173
- 样例 Q5173：下列代码最后抛出的异常，它的 __cause__ 是什么类型？ ⏎ try: ⏎     1 / 0 ⏎ except ZeroDivisionError as e: ⏎     raise RuntimeError('outer') from e
  - A. 报错：TypeError ｜ B. 报错：__cause__ 为 None ｜ C. 报错：ZeroDivisionError ｜ D. 报错：RuntimeError
  - 答案：D. 报错：RuntimeError

## 1 题 ｜ M12 · 类设计

- QID：Q5636
- 样例 Q5636：什么时候该用类而不是写一堆函数？
  - A. 类一定比函数运行更快 ｜ B. 需要维护状态、封装多条相关操作、或表达一组同类实体时，类比散函数更清晰 ｜ C. Python 不支持在类外定义函数 ｜ D. 函数超过 3 个就必须改成类
  - 答案：B. 需要维护状态、封装多条相关操作、或表达一组同类实体时，类比散函数更清晰
