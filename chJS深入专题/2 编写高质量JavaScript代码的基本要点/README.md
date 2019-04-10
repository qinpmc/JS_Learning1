# 编写高质量JavaScript代码的基本要点

此篇专题主要参考的内容如下：
1. 深入理解JavaScript系列（1）：编写高质量JavaScript代码的基本要点（http://www.cnblogs.com/TomXu/archive/2011/12/28/2286877.html）   

## 1 最小全局变量

```
myglobal = "hello"; // 不推荐写法

function sum(x, y) {
   // 不推荐写法: 隐式全局变量result 
   result = x + y;
   return result;
}

反例2
//不推荐的做法，b为全局变量
function foo() {
   var a = b = 0;
   // ...
}


```

## 2 无var副作用

- 通过var创建的全局变量（任何函数之外的程序中创建）是不能被删除的。
- 无var创建的隐式全局变量（无视是否在函数中创建）是能被删除的。


## 3 for循环的效率问题

```
//当myarray不是数组，而是一个HTMLCollection对象, 
//每次你访问任何集合的长度，你要实时查询DOM，而DOM操作一般都是比较昂贵的。

for (var i = 0; i < myarray.length; i++) {
   // 使用myarray[i]做点什么
}

//推荐方案
for (var i = 0, max = myarray.length; i < max; i++) {
   // 使用myarray[i]做点什么
}

```

## 4（不）扩展内置原型((Not)

增加内置的构造函数原型（如Object(), Array(), 或Function()）挺诱人的，但是这严重降低了可维护性，因为它让你的代码变得难以预测。    

```
// 扩展内置原型的方法
if (typeof Object.protoype.myMethod !== "function") {
   Object.protoype.myMethod = function () {
      // 实现...
   };
}  

```

## 5 避免隐式类型转换


```
var zero = 0;
if (zero === false) {
   // 不执行，因为zero为0, 而不是false
}

// 反面示例
if (zero == false) {
   // 执行了...
}

```

## 6 避免(Avoiding) eval()
## 7 避免setInterval(), setTimeout()和Function()构造函数传递字符串

```
// 反面示例
var property = "name";
alert(eval("this." + property));


// 反面示例
setTimeout("myFunc()", 1000);
setTimeout("myFunc(1, 2, 3)", 1000);

//反面示例
Function("console.log(typeof local);")(); // 可以省略new


```


## 8 return后的换行
js 会在每行结束隐含分号。

```
// 警告： 意外的返回值
function func() {
   return
  // 下面代码不执行
   {
      name : "Batman"
   }
}

//推荐做法
function func() {
   return {
      name : "Batman"
   };
}


// 反例
return 
true

// 本意可能是 return true, JavaScript解析为 return; true
 
```






           