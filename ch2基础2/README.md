# 数据类型转换

## Number()

1. 原始类型值
> 数值：转换后还是原来的值
> 字符串：如果可以被解析为数值，则转换为相应的数值
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

 __注意包含单个数值的数组 __
```
Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
Number([""]) // 0
Number([]) // 0
```

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

# String
> String对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象。

```
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"
```
1. 属性 length
> length： 字符串长度
2. 访问方式
> str[index] 方式访问每个字符
> 这种方式只可以度，不能修改， str[str.length-1] = "N",无效

3. charAt 返回指定索引位置度字符
> 与str[index] 区别，str[index]访问的索引不存在，获取的是undefined；而charAt返回空字符串

```
var s = new String('abc');
s.charAt(1) // "b"
```

4. charCodeAt
> 返回 字符串指定位置的 Unicode 码点

5. fromCharCode()
> 返回值是这些码点组成的字符串s

```
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111)
```

6. slice()、substring()、substr()

6.1 slice
> 取出子字符串并返回，不改变 __原字符串__。
> 它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。
> 省略第二个参数，则表示子字符串一直到原字符串结束。
> 参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。


6.2 substring
> 取出子字符串并返回，不改变 __原字符串__。
> 跟slice方法很相像。它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）。
> 省略第二个参数，则表示子字符串一直到原字符串的结束。
> 第一个参数大于第二个参数，substring方法会自动更换两个参数的位置。
> 不支持负数

6.3 substr
> 取出子字符串并返回，不改变 __原字符串__。
> substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的 __长度__
> 省略第二个参数，则表示子字符串一直到原字符串的结束。
> 第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串。

```
var str1="abcdefghijk";
str1.substr(0,2)  ;//"ab"
str1.substr(-3,2) ;//"ij
```

7. toLowerCase()，toUpperCase()
> 它们都返回一个 __新字符串__ ，不改变原字符串。

8. indexOf()，lastIndexOf()
> indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置
> 返回结果是匹配开始的位置。如果返回-1，就表示不匹配。
> indexOf方法还可以接受第二个参数，表示从该位置开始向后匹配
> lastIndexOf从尾部开始匹配

9. trim
> 去除字符串两端的空格，返回一个新字符串，不改变原字符串。

10. split
> 照给定规则分割字符串，返回一个由分割出来的子字符串组成的 __数组__

```
a|b|c'.split('|') // ["a", "b", "c"]

//分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]

//如果省略参数，则返回数组的唯一成员就是原字符串。
'a|b|c'.split() // ["a|b|c"]

//如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串。
'a||c'.split('|') // ['a', '', 'c']
```
11. concat
> concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串。
> 该方法可以接受多个参数

```
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"

//该方法可以接受多个参数。
'a'.concat('b', 'c') // "abc"
```






