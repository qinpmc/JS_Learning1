# 数据类型转换

## Number()

1. 原始类型值
> 数值：转换后还是原来的值
> 字符串：如果可以被解析为数值，则转换为相应的数值，即只含有数字（含+ - 号,前导的0被忽略，空格也会被忽略）
  Number('324') // 324

  // 字符串：如果不可以被解析为数值，返回 NaN
  Number('324abc') // NaN

  // 空字符串转为0
   Number('') // 0

> 布尔值：true 转成 1，false 转成 0

> undefined：转成 NaN
> null：转成0

2. 对象
> 第一步，调用对象自身的valueOf方法。如果返回原始类型的值，则直接对该值使用Number函数，不再进行后续步骤。

> 第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。

> 第三步，如果toString方法返回的是对象，就报错。

   __注意包含单个数值的数组__
```
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
Number([""]) // 0
Number([]) // 0
```

##  parseInt()
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

## parseFloat()
 类同parseInt()函数，多解析一个小数点

## String()
1. 原始类型值
> 数值：转为相应的字符串。
> 字符串：转换后还是原来的值。
> 布尔值：true转为字符串"true"，false转为字符串"false"。
> undefined：转为字符串"undefined"。
> null：转为字符串"null"。

2. 对象
String方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。
> 先调用对象自身的toString方法。如果返回原始类型的值，则对该值使用String函数，不再进行以下步骤。

> 如果toString方法返回的是对象，再调用原对象的valueOf方法。如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。

> 如果valueOf方法返回的是对象，就报错。

```
String({a: 1}) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
String([]) // ""
```

## Boolean()
以下值的转换结果为false，其他的值全部为true
> undefined
> null
> -0或+0
> NaN
> ''（空字符串)

# 自动转换


1. 不同类型的数据互相运算。
2. 非布尔值类型的数据求布尔值。
3. 对非数值类型的值使用一元运算符（即+和-）


## 自动转换为字符串
字符串拼接

```
'5' + 1 // '51'
'5' + true // "5true"
'5' + false // "5false"
'5' + {} // "5[object Object]"
'5' + [] // "5"
'5' + function (){} // "5function (){}"
'5' + undefined // "5undefined"
'5' + null // "5null"
```

## 自动转换为数值
加减乘除等，以及一元运算符也会把运算子转成数值

```
'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0

+'abc' // NaN
-'abc' // NaN
+true // 1
-false // 0
```

# 对象转换为原始值
对象继承了2个转换方法，一个是toString()、一个是valueOf()

## toString()
- 数组：转换为将各元素以逗号合并成的字符串
- 函数：转换为Javascript 源代码字符串
- 日期：返回一个可读的日期和字符串
- RegExp: 转换为正则表达式直接量的字符串

```
[1,2,3].toString() ; // "1,2,3"
(function(x){f(x)}).toString() ; // "function(x){f(x)}"
/\d+/g.toString() ; // "/\d+/g"
new Date(2010,0,1).toString()   ;// "Fri Jan 01 2010 00:00:00 GMT+0800 (中国标准时间)"

```

## valueOf()
- 对象的valueOf多返回对象自身，数组/函数/正则均如此，Date返回 1970年1月1日以来的毫秒数







