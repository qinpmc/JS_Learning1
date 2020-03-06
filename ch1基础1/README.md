# 0 前置知识

##  浏览器内核

### PC浏览器内核
1. chrome: 曾经Webkit 内核（V8)引擎，现在为Blink
2. Safari：WebKit内核
2. Firefox：Gecko内核 ，[‘gekəʊ]
3. Opera：Presto内核，曾经 [‘prestəʊ]，现在为Blink
4. IE：Trident内核，[‘traɪd(ə)nt]

### 移动端浏览器内核
1. iPhone、iPad 等苹果iOS 平台主要是 WebKit
2. Android 4.4 之前的 Android 系统浏览器内核是 WebKit，
3. Android4.4 系统浏览器切换到了Chromium，内核是 Webkit 的分支 Blink
4. Windows Phone 8 系统浏览器内核是 Trident。

### 浏览器兼容处理
1. -moz-     /* 火狐等使用Mozilla浏览器引擎的浏览器 */
2. -webkit-  /* Safari, 谷歌浏览器等使用Webkit引擎的浏览器 */
3. -o-       /* Opera浏览器(早期) */
4. -ms-      /* Internet Explorer

## 常用命令和快捷键

### 	键盘常用快捷键
    Windows + D ：显示桌面
    Windows + R ：执行运行命令
    Windows + L ：切换用户
    Windows + E ：启动我的电脑
    
### DOS常用命令
    d：回车 切换到d盘
    dir ：列出当前目录下的文件和文件夹
    md ：创建文件夹
    rd  ：删除文件夹
    copy con test1.js （然后输入内容）：创建文件  
    cd  ：进入指定目录
    cd .. ：退回上一级目录
    cd \ ：返回根目录
    del  ：删除文件  del *.txt
    exit ：退出
    cls  ：清屏

## npm 包管理工具

### 安装node.js ，会附带安装npm （其他的包管理工具，还有Yarn，Bower 等）

### 解决npm 安装慢的问题

    1. 使用nrm
    2. 使用cnpm
    3. 使用淘宝镜像
    4. 使用yarn 

#### 1 nrm 使用

nrm(npm registry manager )是npm的镜像源管理工具， 使用这个就可以快速地在 npm 源间切换

- 1.安装nrm

在命令行执行命令，npm install -g nrm，全局安装nrm。

- 2.使用

执行命令nrm ls查看可选的源。

``` 
nrm ls                                                                                                                                   

*npm ---- https://registry.npmjs.org/

cnpm --- http://r.cnpmjs.org/

taobao - http://registry.npm.taobao.org/

eu ----- http://registry.npmjs.eu/

au ----- http://registry.npmjs.org.au/

sl ----- http://npm.strongloop.com/

nj ----- https://registry.nodejitsu.com/

其中，带*的是当前使用的源，上面的输出表明当前源是官方源。

```
 
- 3 .切换

如果要切换到taobao源，执行命令nrm use taobao。

- 4.增加

你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 nrm add <registry> <url>，其中reigstry为源名，url为源的路径。

```
nrm add registry http://registry.npm.frp.trmap.cn/

```


- 5.删除
执行命令nrm del <registry>删除对应的源。

- 6.测试速度
可以通过 nrm test 测试相应源的响应时间。

```
nrm test npm   
```


#### 2 cnpm 和淘宝镜像


- 1.临时使用

```
npm --registry https://registry.npm.taobao.org install express
```   

- 2.持久使用

```
npm config set registry https://registry.npm.taobao.org
```

配置后可通过下面方式来验证是否成功

```
npm config get registry

或

npm info express
```

- 3.通过cnpm使用

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install express
```

#### 3 使用yarn  

```
npm install yarn -g
yarn add xxx
yarn remove xxx
```




## script 标签

### 引入JS的3种方式

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

###  默认
默认引用 script:<script type="text/javascript" src="x.min.js"></script>
当浏览器遇到 script 标签时，文档的解析将停止，并立即**下载并执行脚本**，    
脚本执行完毕后将继续解析文档。

### defer 属性
1. defer属性只适用于外部脚本
2. 脚本会被延迟到整个页面都解析完毕后再运行（即使将script元素放在head元素中），该属性相当于告诉浏览器立即下载脚本，但延迟执行
3. HTML5规范要求脚本按照它们**出现的先后顺序执行**，且脚本会**先于DOMContentLoaded事件**执行。
   但现实中，延迟脚本不一定按照顺序执行，也不一定在DOMContentLoaded事件之前执行，因此最好只包含一个延迟脚本。
4. 有 defer，加载后续文档元素的过程将和 script.js 的 __加载并行进行__ （异步）；
    即当浏览器遇到 script 标签时，文档的**解析不会停止**，**其他线程将下载脚本**，   
    待到**文档解析完成，脚本才会执行**。


### async 属性
1. 只适用于外部脚本
2. 相当于告诉浏览器立即下载脚本，并**不保证按照脚本的先后顺序**执行，因此异步脚本之间最好互不依赖
3. async 属性的目的是不让页面等待脚本下载和执行，异步加载页面其他内容，因此异步脚本不要在加载期间修改DOM
4. 有 async，加载和渲染后续文档元素的过程将和 script.js 的 __加载与执行并行进行__ （异步）
    即当浏览器遇到 script 标签时，文档的**解析不会停止**，其他线程将下载脚本，脚本**下载完成后开始执行脚本**，  
    **脚本执行的过程中文档将停止解析**，直到脚本执行完毕。
5. 异步脚本一定会在页面的load事件前执行。可能会在DOMContentLoaded 事件之前或之后执行。


![defer_async](./defer_async.png)





# 1 标识符
1. 第一个字符必须是字母、下划线、或$
2. 其他字符可以是字母、下划线、$ 、 __或数字__
3. 区分大小写


# 2 可选分号
如果当前语句与下一行语句无法合并解析，Javascript则在第一行后填补分号，但有2个例外：
1. 在涉及return 、break、continue语句，如果这3个关键词后紧跟换行，Javascript会在换行处填补分号。

```
return 
true

本意可能是 return true, JavaScript解析为 return; true
```

2. 涉及 ++ ‘-- 运算符，这些运算符既可以作为表达式前缀，也可以作为表达式后缀。如果作为后缀，必须将其与表达式在同一行，否则行尾会被Javascript自动添加分号

```
x
++
y

会被解析为x; ++y
```
 

# 3 数据类型

## 3.1 数据类型分类

1. 基本数据类型（原始类型）
- Undefined
- Null
- Boolean
- Number
- String

2. 引用数据类型（对象类型）
- Object,包括 普通对象{ }，正则、数组[]
- Function
- Json/Error/Date/Math/RegExp



 ## 3.2 Javascript 内建对象：
Object、Array、Function、Boolean、String、Number、Error、Date、RegExp、Math   

**包装对象** 
Javascript中 字符串、数字、布尔值也可以拥有自己的方法，这些方法的调用来自临时对象，存取字符串、数字和布尔值的属性时  
创建的临时对象称作包装对象。可以 通过new String()/Number()/Boolean()的方式显示创建包装对象。         

只有**null、undefined 无法拥有方法的值**。  




 ## 3.3 typeof 操作符
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


 ## 3.4 null 和 undefined
1. null与undefined都可以表示“没有”，相等运算符（==）直接报告两者相等
2. null可以自动转为0,undefined 不行
3. null表示空值；undefined表示“未定义”


```
Number(null) // 0
5 + null // 5
```


 ## 3.5 Boolean
- 布尔类型，包括true 和 false
- 6个falsy值： false,"",0,NaN,undefined,null, ==>  false


 ## 3.6 Number
javascript 不区分整数值和浮点数值，所有数字均用浮点数表示。  


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
* **null 转换为0**  
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
注意和Number区别： 
**空字符串/null/空数组 均转为NaN，而不是0；布尔值转为NaN，而不是0/1；**   
 
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

6. parseFloat()
类同parseInt()函数，多解析一个小数点

7. 二进制浮点数和四舍五入错误

Javascript采用 IEEE-754浮点数表示（几乎现代所有的编程语言使用），这是一种二进制表示法，可精确表示1/2, 1/8等分数，   
但不能精确表示十进制分数，如1/10等，所以 0.3-0.2 ！= 0.2-0.1 为true。


 ## 3.7 String        
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


 ## 3.8 对象
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


 ## 3.9 数组
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

 ## 3.10 函数

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

# 4 运算符

## 4.1 算术运算符
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


运算子的不同，导致了不同的语法行为，这种现象称为“重载”（overload）。
由于**加法运算符存在重载**，可能执行两种运算，使用的时候必须很小心。     

```
'3' + 4 + 5 // "345"
3 + 4 + '5' // "75"
```

加号的转换规则是**优先考虑字符串连接**，如果其中一个操作数是字符串或者转换为字符串的对象，另一个操作数   
将会转换为字符串，加法将进行字符串的连接操作。 如果两个操作数都不是类字符串的，将进行算上加法运算。     
  
对象加法示例：


```
[1] + 1 ; //  "11"
new Date() -1 ;//  1553579163407
new Date() + 1 ;//  "Tue Mar 26 2019 13:46:09 GMT+0800 (中国标准时间)1"

(function f(){})+1 ;//  "function f(){}1"

({})+1 ; // "[object Object]1"
```

除了加法运算符，其他算术运算符（比如减法、除法和乘法）都不会发生重载。     
它们的规则是：所有运算子**一律转为数值**，再进行相应的数学运算。       

```
1 - '2' // -1
1 * '2' // 2
1 / '2' // 0.5
```

注意：**++x 和 x=x+1并不完全一样**:
++ 从不进行字符连接，它总是将操作数转换为数字并增1；
而 x=x+1采用和 + 同样的规则

```
var x = '1';

x++ ; // 1
x=x+1; // '11' 

```
 
 
**运算顺序**

Js中总是严格按照从左到右的顺序计算表达式，但有的表达式具有副作用，会影响其他表达式，此时表达式的求值和看上去不同。   
例如 ++ 运算符
```
var a = 1;
var b = (a++) + a; // 注意这里的计算 ，先计算() 里的，a取了1 ，然后执行了a++, 右边第二个a 取值2 ，因此 有 (1) + 2
console.log(b);  // 3

var a2 = 1;
var b2 = (++a2) + a2;
console.log(b2);  //4 

var a3 = 1;
var b3 = a3++;
b3 ; // 1
a3 ; //2

```



## 4.2 比较运算符

> < 小于运算符
> > 大于运算符
> <= 小于或等于运算符
> >= 大于或等于运算符
> == 相等运算符
> === 严格相等运算符
> != 不相等运算符
> !== 严格不相等运算符

**比较运算符更偏爱数字**，只有2个操作数都是字符串的时候，才会进行字符串比较。


```
'11' < 3   ;// false , '11' 转化为数字比较
'11' < '3'  ;// true
'one' < 3  ; // false, 'one' 转化为 NaN

```

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

## 4.3 相等运算符

### 4.3.1 === 运算符
- 类型相同，否则返回false
- NaN 和自身也不相等（ ===）
- +0， -0 ，0 三者 === 为真
- 对象1  === 对象2 ，表示2个对象引用同一对象
- 字符串/数字/布尔 其值完全一致，才相等

### 4.3.2 == 运算符
- 如果 === 比较相等，则返回true
- 如果一个操作数为布尔值，将布尔值转换为数字0/1 然后比较
- 如果一个值是null，另一个是undefined，则它们相等；
- 如果一个是字符串，一个是数字，则转换字符串为**数字**进行比较
- 如果一个值是对象，则先调研valueOf()转换为原始值，如果仍然不是原始值调用toString()转换为原始值进行比较。                   
除了日期类，日期类只会使用toString转换。     
- 注意： null 虽然经过Number转换为0， 但 null != 0 ; undefined != 0 


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

[] ==![] // true
// 首先计算 ![] 为false；
// 有一个值为布尔值，则false转换为 0；
// [] 对象转换为字符串'', 然后转换为数字0；
// 
```



## 4.4 布尔操作符
1. 逻辑与 (&&)

运算规则是：如果第一个运算子的布尔值为true，则返回第二个运算子的值（**注意是值，不是布尔值**）；   
如果第一个运算子的布尔值为false，则直接返回第一个运算子的**值**，且不再对第二个运算子求值。
   expr1 &&expr2	如果expr1 能转换成false则返回expr1，否则返回expr2。
   因此，与布尔值一起使用时，如果两个操作数都为true时&&返回true，否则返回false。
   
2. 逻辑或 (||)
运算规则是：如果第一个运算子的布尔值为true，则返回第一个**运算子的值**，且不再对第二个运算子求值；     
如果第一个运算子的布尔值为false，则返回第二个运算子的**值**。
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

## 4.5 位运算符

1. 按位非 ~     ~25 = -26
2. 按位与 &     25&3 = 1
3. 按位或 |     25|3 = 27
4. 按位异或 ^   25^3 = 26
5. 左移 <<      左移不影响符号位
6. 有符号右移动 >>  向右移动但保持符号位，以符号位填充空位
7. 无符号右移 >>>  以0填充空位


````
-100 >> 4 = -7
-100 >>> 4 = 268435449


-100带符号右移4位。

-100原码：   10000000    00000000    00000000   01100100

-100补码：    保证符号位不变，其余位置取反加1

			  11111111    11111111    11111111   10011100

右移4位：   在高位补1

					 11111111    11111111    11111111    11111001

			 补码形式的移位完成后，结果不是移位后的结果，要根据补码写出原码才是我们所求的结果。其方法如下:

保留符号位，然后按位取反

					 10000000    00000000    00000000     00000110

然后加1，即为所求数的原码：

							   10000000    00000000    00000000    00000111

	 所有结果为：-7

// ----------------------------------------------

-100无符号右移4位。

-100原码：   10000000    00000000    00000000   01100100

-100补码：    保证符号位不变，其余位置取反加1

					 11111111    11111111    11111111   10011100

无符号右移4位   ：   在高位补0

					 00001111    11111111    11111111    11111001

即为所求：268435449


```






# 5 表达式与语句

1. 语句和表达式的区别在于，语句主要为了进行某种操作，一般情况下不需要返回值；
表达式则是为了得到返回值，一定会返回一个值。凡是 JavaScript 语言中预期为值的地方，都可以使用表达式。
比如，赋值语句的等号右边，预期是一个值，因此可以放置各种表达式。

```
1 + 3; //叫做表达式（expression），指一个为了得到返回值的计算式。
var a = 1 + 3; //赋值语句
```


## 5.1 常见语句
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






