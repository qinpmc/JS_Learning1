# 作用域

## javascript的内部编译过程


以var a = 2;为例，说明javascript的内部编译过程，主要包括以下三步：

1. 分词(tokenizing)
 把由字符组成的字符串分解成有意义的代码块，这些代码块被称为词法单元(token)
 var a = 2;被分解成为下面这些词法单元：
 var、a、=、2、;。这些词法单元组成了一个词法单元流数组

```
// 词法分析后的结果
[
  "var" : "keyword",
  "a" : "identifier",
  "="   : "assignment",
  "2"  : "integer",
  ";"   : "eos" (end of statement)
]
```

2. 解析(parsing)

把词法单元流数组转换成一个由元素逐级嵌套所组成的代表程序语法结构的树，这个树被称为“抽象语法树” (Abstract Syntax Tree, AST)
var a = 2;的抽象语法树中有一个叫VariableDeclaration的顶级节点，接下来是一个叫Identifier(它的值是a)的子节点，
以及一个叫AssignmentExpression的子节点，且该节点有一个叫Numericliteral(它的值是2)的子节点

```
{
  operation: "=",
  left: {
    keyword: "var",
    right: "a"
  }
  right: "2"
}
```
3. 代码生成

将AST转换为可执行代码的过程被称为代码生成.
var a=2;的抽象语法树转为一组机器指令，用来创建一个叫作a的变量(包括分配内存等)，并将值2储存在a中.
实际上，javascript引擎的编译过程要复杂得多，包括大量优化操作，上面的三个步骤是编译过程的基本概述.
任何代码片段在执行前都要进行编译，大部分情况下编译发生在代码执行前的几微秒.
javascript编译器首先会对var a=2;这段程序进行编译，然后做好执行它的准备，并且通常马上就会执行它.




## 查询
引擎查询共分为两种：LHS查询和RHS查询，从字面意思去理解，当变量出现在赋值操作的左侧时进行LHS查询，出现在右侧时进行RHS查询。
更准确地讲，RHS查询与简单地查找某个变量的值没什么区别，而LHS查询则是试图找到变量的容器本身，从而可以对其赋值。

```
function foo(a){
    console.log(a);//2
}
foo( 2 );
/*
　　这段代码中，总共包括4个查询，分别是：
　　1、foo(...)对foo进行了RHS引用
　　2、函数传参a = 2对a进行了LHS引用
　　3、console.log(...)对console对象进行了RHS引用，并检查其是否有一个log的方法
　　4、console.log(a)对a进行了RHS引用，并把得到的值传给了console.log(...)
*/
```

## 嵌套

在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量，或抵达最外层的作用域（也就是全局作用域）为止。

## 异常

### RHS

1. 如果RHS查询失败，引擎会抛出ReferenceError(引用错误)异常

```
//对b进行RHS查询时，无法找到该变量。也就是说，这是一个“未声明”的变量

function foo(a){
    a = b;
}
foo();//ReferenceError: b is not defined
```

2. 如果RHS查询找到了一个变量，但尝试对变量的值进行不合理操作，比如对一个非函数类型值进行函数调用，
或者引用null或undefined中的属性，引擎会抛出另外一种类型异常：TypeError(类型错误)异常

```
function foo(){
    var b = 0;
    b();
}
foo();//TypeError: b is not a function
```

### LHS

1. 当引擎执行LHS查询时，如果无法找到变量，全局作用域会创建一个具有该名称的变量，并将其返还给引擎。

```
function foo(){
    a = 1;
}
foo();
console.log(a);//1
```

2.如果在严格模式中LHS查询失败时，并不会创建并返回一个全局变量，引擎会抛出同RHS查询失败时类似的ReferenceError异常。

```
function foo(){
    'use strict';
    a = 1;
}
foo();
console.log(a);//ReferenceError: a is not defined
```


