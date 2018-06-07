# Date
1. 构造函数

```
new Date();
//参数为时间零点开始计算的毫秒数
new Date(1378218728000)
 
// 代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)

//Date.parse()方法解析的字符串，都可以当作参数
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
```



2. 静态方法
> Date.now()  返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，
> Date.parse() 解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数。

3. get类方法
> getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
> getDate()：返回实例对象对应每个月的几号（从1开始）。
> getDay()：返回星期几，星期日为0，星期一为1，以此类推。
> getYear()：返回距离1900的年数。
> getFullYear()：返回四位的年份。
> getMonth()：返回月份（0表示1月，11表示12月）。
> getHours()：返回小时（0-23）。
> getMilliseconds()：返回毫秒（0-999）。
> getMinutes()：返回分钟（0-59）。
> getSeconds()：返回秒（0-59）。
> getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。
 
4. set 类方法
> setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。
> setYear(year): 设置距离1900年的年数。
> setFullYear(year [, month, date])：设置四位年份。
> setHours(hour [, min, sec, ms])：设置小时（0-23）。
> setMilliseconds()：设置毫秒（0-999）。
> setMinutes(min [, sec, ms])：设置分钟（0-59）。
> setMonth(month [, date])：设置月份（0-11）。
> setSeconds(sec [, ms])：设置秒（0-59）。
> setTime(milliseconds)：设置毫秒时间戳。
 
5. valueOf()
valueOf方法返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，该方法等同于getTime方法。

6. toString()
toString方法返回一个完整的日期字符串。

```
var d = new Date(2013, 0, 1);

d.toString()
// "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"
```   


# 数组Array

1. 构造函数

```
var arr = new Array(2);
arr.length // 2
var arr2 = [1,2];
typeof arr2 ; // object
```



2. 静态方法
Array.isArray()

3. 实例方法

3.1 valueOf()、toString()
- 数组的valueOf方法返回数组本身；
- 数组的toString方法返回数组的字符串形式。

```
var arr = [1, 2, 3];
arr.toString() // "1,2,3"
var arr2 = [1,[2,[3,4]]];
arr2.toString(); // "1,2,3,4"
```

3.2 push()，pop()
- push: 用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会 __改变原数组__
- pop: 用于删除数组的最后一个元素，并返回该元素。注意，该方法会 __改变原数组__

3.3 shift()，unshift()
- shift: 用于删除数组的第一个元素，并返回该元素。注意，该方法会 __改变原数组__
- unshift: 用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。注意，该方法会 __改变原数组__

3.4 join()
- 指定参数作为分隔符，将所有数组成员连接为一个 __字符串返回__。如果不提供参数，__默认用逗号分隔__

```
var a = [1, 2, 3, 4];

a.join(' ') // '1 2 3 4'
a.join(' | ') // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4"
```

- 如果数组成员是undefined或null或空位，会被转成空字符串。

```
[undefined, null].join('#')
// '#'

['a',, 'b'].join('-')
// 'a--b'
```

3.5 concat()
- concat方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，__原数组不变__。
```
[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]

```

- 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是新数组拷贝的是对象的引用

```
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat();

obj.a = 2;
newArray[0].a // 2
```
3.6 reverse
- reverse方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将 __改变原数组__

3.7 sort 

- sort方法对数组成员进行排序，默认是按照 __字典顺序排序__。排序后，原数组将 __被改变__。

```
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']
 
[10111, 1101, 111].sort()
// [10111, 1101, 111]
```

- sort方法按照自定义方式排序，可以传入一个函数作为参数

```
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]
```

3.8 slice 
- slice方法用于提取目标数组的一部分，返回一个新数组，__原数组不变__
- 第一个参数为 __起始位置（从0开始）__，第二个参数为 __终止位置__（但该位置的元素本身不包括在内）

3.9 splice 

- arr.splice(start, count, addElement1, addElement2, ...);该方法会 __改变原数组__
- 1. 删除：第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数

```
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]
```

- 2. 删除并插入
```
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 'g') // ["e", "f"]
a // ["a", "b", "c", "d", 'g']
```

- 3. 插入

```
var a = [1, 1, 1];

a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]
```

- 4. 拆分

```
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```












