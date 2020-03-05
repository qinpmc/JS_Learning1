# 类型转换

1 JavaScript数据类型（7种）
 - null
 - undefined
 - string
 - number
 - boolean
 - object
 - symbol
 
2 typeof 返回的类型
typeof null --- object 
typeof function a(){} --- function
typeof []typeof [] --- object 
js中，数组和函数,正则，错误，日期等都是对象。


```
	console.log(typeof null); // object 
	console.log(typeof undefined);// undefined 
	console.log(typeof "hello"); //string 
	console.log(typeof 123); // number
	console.log(typeof true); // boolean
	console.log(typeof {}); // object 
	console.log(typeof function a(){}); // function
	console.log(typeof []); // object
	console.log(typeof Symbol("mysymbol")); // symbol
	console.log(typeof /abc/); //  object 
	console.log(typeof new Date()); //  object 
	console.log(typeof new Error()); // object            z  
```
3 ToString 

- String(null);// "null"
- String(undefined);// "undefined"

3.1 toString() 方法

- 特别大或者特别小的数字转换为 指数形式
- 数组则会以 ， 拼接起来
- 对象{} 返回 [object Object]
- 日期对象，转换为 这种形式 ：Wed Mar 04 2020 15:19:58 GMT+0800 (中国标准时间)
- 错误对象，转换为 这种形式 ：Error: 错了
```
	//console.log(null.toString()); // null 没有方法
	//console.log(undefined.toString());// undefined 没有方法
	console.log("hello".toString()); // hello 
	console.log((123).toString()); // 123
	console.log((0.0000000000123).toString()); // 1.23e-11
	console.log((123000000000000000000000000000000000).toString()); // 1.23e+35
	console.log(true.toString()); // true
	console.log(({name:"qq"}).toString()); // [object Object]
	console.log((function f(){console.log(9)}).toString()); // function f(){console.log(9)}
	console.log(["a",1].toString()); // a,1
	console.log([1].toString()); //  1
	console.log(Symbol("mysymbol").toString());// Symbol(mysymbol)
	console.log(/abc/.toString());// /abc/
	console.log(new Date().toString()); // Wed Mar 04 2020 15:19:58 GMT+0800 (中国标准时间)
	console.log(new Error("错了").toString()); // Error: 错了
```

3.2 Object 的toString()

```
	console.log(Object.prototype.toString.call(null));// [object Null]
	console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
	console.log(Object.prototype.toString.call("hello"));// [object String]
	console.log(Object.prototype.toString.call(123)); // [object Number]
	console.log(Object.prototype.toString.call(true));// [object Boolean]
	console.log(Object.prototype.toString.call({})); // [object Object]
	console.log(Object.prototype.toString.call(function a(){})); // [object Function]
	console.log(Object.prototype.toString.call([])); // [object Array]
	console.log(Object.prototype.toString.call(Symbol("mysymbol"))); // [object Symbol]
	
	console.log(Object.prototype.toString.call(/abc/));// [object RegExp]
	console.log(Object.prototype.toString.call(new Date()));// [object Date]
	console.log(Object.prototype.toString.call(new Error()));// [object Error]
```
3 valueOf()

```
	//console.log(null.valueof()); // null 没有方法
	//console.log(undefined.valueof());// undefined 没有方法
	console.log("hello".valueOf()); // hello 
	console.log((123).valueOf()); // 123
	console.log(true.valueOf()); // true
	console.log({name:"qq"}.valueOf()); // {name: "qq"}
	console.log((function f(){console.log(9)}).valueOf()); // function f(){console.log(9)}
	console.log(["a",1].valueOf()); // ["a",1]
	console.log([1].valueOf()); // [1]
	console.log(Symbol("mysymbol").valueOf());// Symbol(mysymbol)
	console.log(/abc/.valueOf());// /abc/
	console.log(new Date().valueOf()); // 1583307166346
	console.log(new Error("错了").valueOf()); // Error: 错了 at testValueOf (类型转换2.html:57)
```
4 ToNumber()
- true 转换为1，false转化为0
- null转换为0，undefined转换为NaN
- 如果 是字符串，
  （1）空字符转化为0
  （2）字符串前面的0被忽略，ox开头则按照十六进制进行转换
  （3）字符串中 包含其它非 ”数字“的字符，转换为NaN

- 如果是对象，先调用对象的valueOf，如果为基本类型，则 按照前文进行转换，否则调用toString()，   
  如果为基本类型，则按照前文规则转换   



```
	console.log(Number(null)); //  0
	console.log(Number(undefined));//  NaN
	console.log(Number(true)); //  1
	console.log(Number(false)); // 0
	
	console.log(Number({age:1})); //  NaN
	console.log(Number(function f(){console.log(9)})); //  NaN
	console.log(Number(["a",1])); //  NaN
	console.log(Number([1])); //  1
	// console.log(Number(Symbol("mysymbol")));//  报错 Cannot convert a Symbol value to a number

	console.log(Number(/abc/));// NaN
	console.log(Number(new Date())); // 1583309314370
	console.log(Number(new Error("错了"))); //  NaN
	
	// 字符串 转 数字
	console.log(Number("12")); // 12
	console.log(Number("012"));// 12
	console.log(Number("1.2"));// 1.2
	console.log(Number("01.2"));// 1.2
	console.log(Number("0x10"));// 16
	console.log(Number(""));// 0
	console.log(Number("12a"));// NaN
```


