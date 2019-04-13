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


数组的索引
一般使用正整数和0 作为数组索引，而其实负数或非整数也可以，这种情况下，数值转换为字符串，字符串作为属性名使用。
var a = ["hello"];
a[-1.23] = true; // 创建一个名为 "-1.23"的属性 不可遍历
a["10"] = 0; // 相当于 a[10] = 0, 此时数组长度为11
console.log(a.length); // 11

for(var i = 0;i<a.length;i++ ){
  console.log(a[i]); // hello  undefined (9次) 0
}

console.log(a[1.000] === a[1]) ; // true

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

不会改变原数组的方法（返回一个新数组）： filter(), concat() 和 slice() 。 

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

```
var arr = [23,12,31,42,55,78,31,22];
arr.sort(function (a,b) {
    console.log(a,b);
    //return a-b;  //升序,a-b大于0 交换位置
    //return b-a;  //降序，b-a大于0 交换位置
})

arr.sort(function (a,b) {
    return 1;  // 数组被reverse
})
console.log(arr);


var ary = [
    {name:"小明",age:21},
    {name:"大明",age:22},
    {name:"毛毛",age:3},
    {name:"宝宝",age:4},
];
/*        ary.sort(function(a,b){
    return a.age - b.age; //按照年龄升序排列
});
console.log(ary);*/

ary.sort(function(a,b){
    //return a.name - b.name;
    return a.name.localeCompare(b.name);
});
console.log(ary);

```



3.8 slice 
- slice方法用于提取目标数组的一部分，返回一个新数组，__原数组不变__
- 第一个参数为 __起始位置（从0开始）__，第二个参数为 __终止位置__（但该位置的元素本身不包括在内）
- 参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取
```
var arr = [1,2,3,4,5]
arr.slice(1) ; // [2, 3, 4, 5]
arr.slice(-2) ;// [4, 5]
arr.slice(-2,-1) ; // [4]
arr.slice(-1,-2) ;// []
```

3.9 splice 

- arr.splice(start, count, addElement1, addElement2, ...);该方法会 __改变原数组__
- 1. 删除：第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数，
第三个参数（item1, item2, ... 可选）要添加进数组的元素,从start 位置开始 

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

3.10 indexOf()，lastIndexOf()
- indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
- lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

3.11 遍历方法
 - 均不改变原数组
 - map：
  * map方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。
  * map方法向它传入三个参数：当前成员、当前位置和数组本身。
  
```
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]
```

 - forEach：
  * forEach方法不返回值，只用来操作数据。
  * forEach方法向它传入三个参数：当前成员、当前位置和数组本身。

```
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```


- filter
  * 用于过滤数组成员，满足条件的成员组成一个新数组返回。
```
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});
// [1, 3, 5]
```

- some ，every 
  * some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false
  * every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false。

```
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true

var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});
```

- reduce

1. arr.reduce(callback[, initialValue])
2. allback 参数
 - accumulator
   The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied (see below).
 - currentValue
   The current element being processed in the array.
 - currentIndex（Optional）
   The index of the current element being processed in the array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 - array（Optional）
   The array reduce() was called upon.

```
const array1 = [1, 2, 3, 4];

// 1 + 2 + 3 + 4
console.log(array1.reduce((accumulator, currentValue) => accumulator + currentValue));


var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.x;
},initialValue)

console.log(sum) // logs 6

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
> 与str[index] 区别，str[index]访问的索引不存在，获取的是**undefined**；而**charAt返回空字符串**

```
var s = new String('abc');
s.charAt(1) // "b"
```

4. charCodeAt
> 返回 字符串指定位置的 Unicode 码点

'a'.charCodeAt(0) ；// 97    


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
> 它们都返回一个 __新字符串__ ，__不改变原字符串__。

8. indexOf()，lastIndexOf()
> indexOf方法用于确定一个字符串在另一个字符串中第一次出现的位置
> 返回结果是匹配开始的位置。如果返回-1，就表示不匹配。
> indexOf方法还可以接受第二个参数，表示从该位置开始向后匹配
> lastIndexOf从尾部开始匹配

9. trim
> 去除字符串两端的空格，返回一个新字符串，__不改变原字符串__。

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
> concat方法用于连接两个字符串，返回一个新字符串，__不改变原字符串__。
> 该方法可以接受多个参数

```
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"

//该方法可以接受多个参数。
'a'.concat('b', 'c') // "abc"
```


# Object

JavaScript 的所有其他对象都继承自Object对象，即那些对象都是Object的实例。


## 1 Object()

Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于**保证某个值一定是对象**。

- 如果参数为空（或者为undefined和null），Object()返回一个**空对象**
- 如果参数是原始类型的值，Object方法将其转为对应的包装对象的实例
- 如果Object方法的参数是一个对象，它总是返回该对象，即不用转换

```
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

var obj = Object('foo');
obj instanceof Object // true
obj instanceof String // true


var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true

```

## 2 Object 构造函数

Object不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用new命令. Object构造函数的用法与工具方法很相似，几乎一模一样。
- 使用时，可以接受一个参数，如果该参数是一个对象，则直接返回这个对象；
- 如果是一个原始类型的值，则返回该值对应的包装对象.  

## 3 Object 的静态方法

1. Object.keys()
2. Object.getOwnPropertyNames()


**对象属性模型的相关方法**

3. Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
4. Object.defineProperty()：通过描述对象，定义某个属性。
5. Object.defineProperties()：通过描述对象，定义多个属性。


**控制对象状态的方法**

6. Object.preventExtensions()：防止对象扩展。
7. Object.isExtensible()：判断对象是否可扩展。
8. Object.seal()：禁止对象配置。
9. Object.isSealed()：判断一个对象是否可配置。
10. Object.freeze()：冻结一个对象。
11. Object.isFrozen()：判断一个对象是否被冻结。

**原型链相关方法**

- Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
- Object.getPrototypeOf()：获取对象的Prototype对象。

## 4 Object 的实例方法
 
1. Object.prototype.valueOf()：返回当前对象对应的值。
2. Object.prototype.toString()：返回当前对象对应的字符串形式。
3. Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。 
4. Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。      
5. Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。  
6. Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举, (原型属性返回false,实例属性返回true)


**Object.keys | Object.getOwnPropertyNames| in | for in**
 

Object.keys方法的参数是一个对象，返回一个数组。该数组的成员都是该对象**自身**的（而不是继承的）所有属性名。              
Object.getOwnPropertyNames方法与Object.keys类似，也是接受一个对象作为参数，返回一个数组，包含了该对象**自身**的所有属性名.              

对于一般的对象来说，Object.keys()和Object.getOwnPropertyNames()返回的结果是一样的。      
只有涉及不可枚举属性时，才会有不一样的结果。Object.keys方法只返回可枚举的属性,     
Object.getOwnPropertyNames方法还返回**不可枚举**的属性名。     

```

var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]  数组的length属性是不可枚举的属性
Object.getOwnPropertyNames(a) // ["0", "1", "length"]  
```
 
- for in: 返回通过对象可访问的、可枚举的属性，既包括**实例**中的属性，也包括**原型**中的属性(**不包括对象中不可枚举的属性**，如内置的属性)

- in :通过对象可访问到给定属性时返回true,不论属性存在**实例中还是原型**中（包含**可枚举和不可枚举**）
 

**valueOf()**

valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。              
valueOf方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法 . 

**toString()**
1. **数组、字符串、函数、Date 对象**都分别部署了自定义的toString方法，**覆盖了Object.prototype.toString方法**。

```
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"

```
2. Object.prototype.toString方法返回对象的类型字符串，因此可以用来判断一个值的类型

不同数据类型的Object.prototype.toString方法返回值如下。    

- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 数组：返回[object Array]。
- arguments 对象：返回[object Arguments]。
- 函数：返回[object Function]。
- Error 对象：返回[object Error]。
- Date 对象：返回[object Date]。
- RegExp 对象：返回[object RegExp]。
- 其他对象：返回[object Object]。

```
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"


var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

```

## 5 属性

### 5.1 数据属性
- configurable：-- 删除和配置 delete 
- enumerable：-- 遍历 for in
- writable: 修改
- value:值

### 5.2 访问器属性
- configuable:
- enumerable:
- get:
- set:
 
**数据属性 | 访问器属性 的设置和获取**
- Object.defineProperty()
- Object.defineProperties()
- Object.getOwnPropertyDescriptor()

1. 调用Object.defineProperty()，**默认configurable、enumerable、writable均为** false    
2. 采用对象字面量创建的对象，**默认configurable、enumerable、writable均为** true   

 
```
// 两种属性的定义方式：
	var p={};
    p.age=21;  // 采用此种方式赋值，该属性为可写，可枚举，可配置

	var person={};
	Object.defineProperty(person,"name",{
		value:"qp"  // 采用此种方式赋值，该属性为不可写，不可枚举，不可配置
	});

Object.defineProperty(p,"age",{
	value:21,
	//writable:true  // 如不显示添加可写为true,则该属性不可修改--此种方式定义属性时，默认writable为false
}); 
	alert(p.age); //21
	p.age=31;
	alert(p.age); //21，未修改成功
*/

```

```
/一旦将属性定义为不可配置，就不能再将其变回可配置的；
//调用Object.defineProperty() 修改其他特性为true 时也会报错（高程3中说修改除//writable以外的特性为导致错误）

var person={};
	Object.defineProperty(person,"name",{
		configurable:false, //无法删除
		value:"qp"
	});
	delete person.name;	
	alert(person.name); //qp ,仍然存在


/*
	Object.defineProperty(person,"name",{
		configurable:true,  // 报错，已经不可配置  Enumerable Writeble Value
		value:"qp22"
	}); */
/*
	Object.defineProperty(person,"name",{
		value:"qp22"// 报错，已经不可配置
	});*/
/**/
	Object.defineProperty(person,"name",{
		enumerable:true,  //  报错  
		 //enumerable:false  // 未报错？？？ chrome 73
	});


	Object.defineProperty(person,"name",{
		writable:true,  //  报错  
		//writable:false,  //  未报错？？？ chrome 73
		//value:"123"   //添加此句报错！！！
	});


```

```
	var p={};
	Object.defineProperties(p,
	{
		"name":{value:"qqq",configurable:true},
		"age":{value:31}
	});
	alert(p.name);  //qqq
	delete p.name; 
	alert(p.name);  //undefined

```




**preventExtensions() | Object.seal() | Object.freeze()** 

- Object.preventExtensions(obj),可以使得对象obj不可扩展，即不能添加新属性和方法                         
- Object.isExtensible() 用于检测对象是否可扩展     
- Object.seal(obj)，可以密封对象，此时对象不可扩展，且[[ Configurable]]特性被设为false,此时不能删除属性和方法（但属性方法可修改）                                   
- Object.freeze(obj),冻结对象，对象不可扩展，是密封的，且数据属性[[ Writable]]特性设为false,数据属性为只读的     
（但对象的存取器具有setter的话，存取器属性不受影响，仍然可以通过属性赋值调用它们）                       
即使冻结对象，如果给对象的原型添加/修改属性和方法，仍然可以（尽管这会影响对象的属性和方法）。                  


















