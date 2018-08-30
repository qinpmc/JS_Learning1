# PC浏览器内核
1. chrome: 曾经Webkit 内核（V8)引擎，现在为Blink
2. Safari：WebKit内核
2. Firefox：Gecko内核 ，[‘gekəʊ]
3. Opera：Presto内核，曾经 [‘prestəʊ]，现在为Blink
4. IE：Trident内核，[‘traɪd(ə)nt]

# 移动端浏览器内核
1. iPhone、iPad 等苹果iOS 平台主要是 WebKit
2. Android 4.4 之前的 Android 系统浏览器内核是 WebKit，
3. Android4.4 系统浏览器切换到了Chromium，内核是 Webkit 的分支 Blink
4. Windows Phone 8 系统浏览器内核是 Trident。

# 浏览器兼容处理
1. -moz-     /* 火狐等使用Mozilla浏览器引擎的浏览器 */
2. -webkit-  /* Safari, 谷歌浏览器等使用Webkit引擎的浏览器 */
3. -o-       /* Opera浏览器(早期) */
4. -ms-      /* Internet Explorer

# 引入JS的3种方式

```
<body>
   <!-- 行内方式-->
    <div onclick="alert('Hello World!')">Click me !!</div>
   <!--内嵌式-->
    <script type="text/javascript">
        console.log("window onLoad");
    </script>
   <!--外链式-->
   <script src="./1.js">
       /*带有src属性的<script>元素中的js代码会被忽略*/
       console.log("This code will not run");
   </script>
</body>
```
# script 标签
## defer 属性
1. defer属性只适用于外部脚本
2. 脚本会被延迟到整个页面都解析完毕后再运行（即使将script元素放在head元素中），该属性相当于告诉浏览器立即下载脚本，但延迟执行
3. HTML5规范要求脚本按照它们出现的先后顺序执行，且脚本会先于DOMContentLoaded事件执行。
   但现实中，延迟脚本不一定按照顺序执行，也不一定在DOMContentLoaded事件之前执行，因此最好只包含一个延迟脚本。
4. 有 defer，加载后续文档元素的过程将和 script.js 的 __加载并行进行__ （异步）

## async 属性
1. 只适用于外部脚本
2. 相当于告诉浏览器立即下载脚本，并不保证按照脚本的先后顺序执行，因此异步脚本之间最好互不依赖
3. async 属性的目的是不让页面等待脚本下载和执行，异步加载页面其他内容，因此异步脚本不要在加载期间修改DOM
4. 有 async，加载和渲染后续文档元素的过程将和 script.js 的 __加载与执行并行进行__ （异步）

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，
“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行

![defer_async](./defer_async.png)


# 标识符
1. 第一个字符必须是字母、下划线、或$
2. 其他字符可以是字母、下划线、$ 、 __或数字__
3. 区分大小写


# 表达式与语句

1. 语句和表达式的区别在于，语句主要为了进行某种操作，一般情况下不需要返回值；
表达式则是为了得到返回值，一定会返回一个值。凡是 JavaScript 语言中预期为值的地方，都可以使用表达式。
比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。

```
1 + 3; //叫做表达式（expression），指一个为了得到返回值的计算式。
var a = 1 + 3; //赋值语句
```


# 常见语句
1. if 结构 、if…else 结构
2. switch结构
3. 三元运算符 ?:
4. while 循环、for 循环、do…while 循环
5. break 语句和 continue 语句
6. 标签（label）

-  switch
   switch语句比较的是 __全等=== 操作符__，不会发生类型转换，例如”10”不等于10
   缺失break关键词后，执行当前case后，继续执行下一个case
   default语句不一定放在最后，此时需加上break

-  break 终止一层循环，并不会终止嵌套的外层循环；采用标签后，终止整个循环
- continue 跳出内部循环一次

```
//break命令后面加上了top标签（注意，top不用加引号），满足条件时，直接跳出双层循环
top: // top为标签
 for (var i = 0; i < 3; i++){
   for (var j = 0; j < 3; j++){
     if (i === 1 && j === 1) break top;
     console.log('i=' + i + ', j=' + j);
   }
 }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
```

```
// break语句后面不使用标签，则只能跳出内层循环，进入下一次的外层循环。
for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break;
      console.log('i=' + i + ', j=' + j);
    }
  }

i=0, j=0
i=0, j=1
i=0, j=2
i=1, j=0
i=2, j=0
i=2, j=1
i=2, j=2

```
***





# 数据类型
1. 基本数据类型
- Undefined
- Null
- Boolean
- Number
- String
2. 引用数据类型
- Object,包括 普通对象{ }，正则、数组[]
- function

3. typeof 操作符
返回结果
- undefined
- boolean
- string
- number
- object （ __null__ 、{}、[]、/at/）
- function

```
alert(typeof (a*2));  //number, '21' -->21
alert(typeof a*2);    //NaN ，先执行typeof
alert(typeof Error); // function,构造函数Error
alert(typeof NaN); // number
alert(typeof Array);  // function,构造函数
```


# null 和 undefined
1. null与undefined都可以表示“没有”，相等运算符（==）直接报告两者相等
2. null可以自动转为0,undefined 不行
3. null表示空值；undefined表示“未定义”


```
Number(null) // 0
5 + null // 5
```


# Boolean
- 布尔类型，包括true 和 false
- 6个falsy值： false,"",0,NaN,undefined,null, ==>  false


#  Number
1. 几个特别的值
  * NaN （与自身也不相等）
  * Infinity
  * -Infinity
  * Number.MAX_VALUE
  * Number.MIN_VALUE

2. isFinite()
判断数字是否有穷

```
isFinite(Number.MAX_VALUE+1);   //  true，溢出
isFinite(Number.MAX_VALUE+999) ; //true，溢出
isFinite(Number.MAX_VALUE+Number.MAX_VALUE); // false
isFinite(Number.MAX_VALUE*2) ; //false
```

3. Number()
转换规则：
* null 转换为0
* undefined转换为 __NaN__
* Boolean类型，true转为1，false转换为0
* Number类型，直接传入和返回
* String类型
   - 字符串只含有数字（含+ - 号,前导的0被忽略，空格也会被忽略），转换为数字，如Number("-00012.3");//-12.3
   - 字符串中为有效的十六进制格式数字，转换为相同大小的十进制
   - 空字符串转换为0
   - 其他格式被转换为NaN
```
Number("0xf");   //15
Number("-0xf");  //NaN
Number("+0xf");  //NaN
Number("123a");   //NaN
```

* Object类型，调用对象的valueOf()方法，依照前述规则转换；如果结果为NaN，调用对象的toString() 方法，再依照前述规则转换返回的字符串值

```
Number({}) ;   //NaN
Number(function(){}) ;  //NaN
Number([]) ;       //0
Number([1]) ;      //1
Number(["1"]);     //1
Number(["1","2"]);  //NaN ，["1","2"] => "1，2" =>NaN
```

4. isNaN()
调用Number()函数，然后判断是否是NaN

5. parseInt()
忽略字符串前的空格，直至找到第一个非空字符，直到解析到后续字符为非数字

```
parseInt("123as");   //123
Number("123as");   //NaN
parseInt("");  // NaN,空字符串转换为NaN !!!
Number("");  // 0
parseInt("070");  // 70
parseInt("070",8);  // 56 ，八进制转换
parseInt(070);  // 56
alert(parseInt("0xf"));  // 15
alert(parseInt(true));  // NaN
alert(parseInt(null));  // NaN
alert(parseInt(undefined));  // NaN
alert(parseInt([]));  // NaN
alert(parseInt({}));  // NaN
```

6 parseFloat()
类同parseInt()函数，多解析一个小数点

# String
1. 单引号、双引号均可
2. 转义
> \0 ：null（\u0000）
> \b ：后退键（\u0008）
> \f ：换页符（\u000C）
> \n ：换行符（\u000A）
> \r ：回车键（\u000D）
> \t ：制表符（\u0009）
> \v ：垂直制表符（\u000B）
> \' ：单引号（\u0027）
> \" ：双引号（\u0022）
> \\ ：反斜杠（\u005C）

3. length 属性 返回字符串长度
4. 可以以数组的方括号运算符，用来返回某个位置的字符，如 str[1];
   此种方式 __只能访问__，不能用于修改等，如str[1] = 'A';


# 对象
1. 对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合
2. 属性访问可以用 点操作符或 [] 访问，对于特殊情况用[],如属性包含空格，或者属性名为数字。

```
obj2 = {2: "aaa", x: 2}
obj2[2]; //"aaa"
// obj2.2 ;//错误
```

1. Object.keys 查看一个对象本身的所有属性
2. delete命令用于删除对象的属性，删除成功后返回true
> 删除一个不存在的属性，delete不报错，而且返回true
3. in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回true，否则返回false。
>  in运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。
4. for...in循环用来遍历一个对象的全部属性
> 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
> 它不仅遍历对象自身的属性，还遍历继承的属性。


# 数组
1. 数组的length属性，返回数组的成员数量
2. in 运算符 查某个键名是否存在的运算符in，适用于对象，也适用于数组
3. for...in循环不仅可以遍历对象，也可以遍历数组
> for...in不仅会遍历数组所有的数字键，还会遍历非数字键。

```
var arr = [ 'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false

var a = [1, 2, 3];
a.foo = true;

for (var key in a) {
  console.log(key);
}
// 0
// 1
// 2
// foo ; for...in不仅会遍历数组所有的数字键，还会遍历非数字键。
```

4. 类似数组的对象
- 类似数组的对象”的根本特征，就是具有length属性
- 类似数组的对象:
   > 是函数的arguments对象
   > 大多数 DOM 元素集
   > 字符串

- 数组的slice方法可以将“类似数组的对象”变成真正的数组。
  var arr = Array.prototype.slice.call(arrayLike);
- 通过call()，可以把forEach()嫁接到arrayLike上面调用

```
function logArgs() {
  Array.prototype.forEach.call(arguments, function (elem, i) {
    console.log(i + '. ' + elem);
  });
}
```

# 函数

1. 函数声明

```
function print(s) {
  console.log(s);
}
```

2. 函数表达式
> 采用函数表达式声明函数时，function命令后面不带有函数名。
  如果加上函数名，该函数名 __只在函数体内部有效__，在函数体外部无效。
  
```
var print = function(s) {
  console.log(s);
};
```

3. Function 构造函数
> 如果只有一个参数，该参数就是函数体

```
var add = new Function(
  'x',
  'y',
  'return x + y'
);

// 等同于
function add(x, y) {
  return x + y;
}
```
4. 函数名的提升
> function命令声明函数时，整个函数会像var变量声明一样，被提升到代码头部

5. name 属性

```
function f1() {}
f1.name // "f1"

var f2 = function () {};
f2.name // "f2"

var f3 = function myName() {};
f3.name // 'myName'
```
6. length 属性
> length属性返回形参数个数，即函数定义之中的参数个数

7. arguments
> arguments对象包含了函数运行时的所有参数

```
function doAdd(num1,num2)
  {
	  arguments[1]=10;
	  alert(arguments[1]);
	  alert(num2);
	  alert(arguments[0]+num2);
  }
   doAdd(10);     // 10,undefined,NaN ,arguments[1] 与num2不是同一个值,
  //doAdd(10,20);  //10,10,20

  function doAdd2(num1,num2)
  {
	  num2=10;
	  alert(arguments[1]);
	  alert(num2);
	  alert(arguments[0]+num2);
  }
  doAdd2(10);     // undefined,10,20 ,arguments[1] 与num2不是同一个值,
  //doAdd2(10,20);  //10,10,20

```

# 算术运算符

> 加法运算符：x + y
> 减法运算符： x - y
> 乘法运算符： x * y
> 除法运算符：x / y
> 指数运算符：x ** y
> 余数运算符：x % y
> 自增运算符：++x 或者 x++
> 自减运算符：--x 或者 x--
> 数值运算符： +x
> 负数值运算符：-x

# 比较运算符

> < 小于运算符
> > 大于运算符
> <= 小于或等于运算符
> >= 大于或等于运算符
> == 相等运算符
> === 严格相等运算符
> != 不相等运算符
> !== 严格不相等运算符

1. 字符串的比较
> 字符串按照字典顺序进行比较。

```
'cat' > 'dog' // false
'cat' > 'catalog' // false
```

2. 原始类型的值的比较
> 两个原始类型的值的比较，除了相等运算符（==）和严格相等运算符（===），其他比较运算符都是先转成 __数值__ 再比较。

```
5 > '4' // true
// 等同于 5 > Number('4')
// 即 5 > 4

true > false // true
// 等同于 Number(true) > Number(false)
// 即 1 > 0

2 > true // true
// 等同于 2 > Number(true)
// 即 2 > 1
```
3. 对象的比较
> 对象转换成原始类型的值，算法是先调用valueOf方法；如果返回的还是对象，再接着调用toString方法

```
var x = [2];
x > '11' // true
// 等同于 [2].valueOf().toString() > '11'
// 即 '2' > '11'

x.valueOf = function () { return '1' };
x > '11' // false
// 等同于 [2].valueOf() > '11'
// 即 '1' > '11'

{x: 2} >= {x: 1} // true
// 等同于 {x: 2}.valueOf().toString() >= {x: 1}.valueOf().toString()
// 即 '[object Object]' >= '[object Object]'
```

# 相等运算符

1. 原始类型的值
> 原始类型的数据会转换成 __数值__ 类型再进行比较
> 对象与原始类型值比较,对象（这里指广义的对象，包括数组和函数）与原始类型的值比较时，对象转化成原始类型的值，再进行比较。

```
 1 == true // true
// 等同于 1 === Number(true)

0 == false // true
// 等同于 0 === Number(false)

2 == true // false
// 等同于 2 === Number(true)

2 == false // false
// 等同于 2 === Number(false)

'true' == true // false
// 等同于 Number('true') === Number(true)
// 等同于 NaN === 1

[1] == 1 // true
// 等同于 Number([1]) == 1

[1] == '1' // true
// 等同于 Number([1]) == Number('1')

[1] == true // true
// 等同于 Number([1]) == Number(true)
```



# 布尔操作符
1. 逻辑与 (&&)
   expr1 &&expr2	如果expr1 能转换成false则返回expr1，否则返回expr2。
   因此，与布尔值一起使用时，如果两个操作数都为true时&&返回true，否则返回false。
2. 逻辑或 (||)
   expr1 ||expr2	如果expr1能转换成true则返回expr1，否则返回expr2。因此，
   与布尔值一起使用时，如果任意一个操作数为true时||返回true。
3. 逻辑非(!)
   !expr	如果expr能转换为true，返回false；
   如果expr能转换为false，则返回true。

```
alert("1"&&"2");  //2
alert("0"&&"2");  //2, "0" 为 truthy，"" 才为falsy
alert(0&&"2");  //0

// 逻辑与&& 的短路
alert(""&&"2");   //""
alert(null&&"2");  //null
alert(undefined&&"2");  //undefined
alert(NaN&&"2");  //NaN
alert(0 &&"2");  //0
alert(false &&"2");  //false
//alert("1"||"2");  //1
//alert("0"||"2");  //0

```






