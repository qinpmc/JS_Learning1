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







