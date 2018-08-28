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

## 词法作用域
javascript使用的是 __词法作用域__。
1. 词法作用域就是定义在词法阶段的作用域，是由写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变
2. 无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定。

```
var a = 2;
function foo() {
    console.log( a );  //2
}
function bar() {
    var a = 3;
    foo();
}
bar(); //2
```

3. 遮蔽。 作用域查找从运行时所处的最内部作用域开始，逐级向外或者说向上进行，直到遇见第一个匹配的标识符为止，
在多层的嵌套作用域中可以定义同名的标识符，这叫作“遮蔽效应”，内部的标识符“遮蔽”了外部的标识符。
```
var a = 0;
function test(){
    var a = 1;
    console.log(a);//1, 不是0
}
test();
```

## 变量声明提升

1. 变量和函数在内的所有声明都会在任何代码被执行前首先被处理

```
a = 2 ;
var a;
console.log( a );
```

2. 每个作用域都会进行提升操作

```
    console.log(a); //undefined
    var a = 0;
    function fn(){
        console.log(b);  //undefined
        var b = 1;
        function test(){
            console.log(c);  //undefined
            var c = 2;
        }
        test();
    }
    fn();
```
3. 函数覆盖
  > 函数声明和变量声明都会被提升。但是，函数声明会覆盖变量声明
  > 变量的重复声明是无用的，但函数的重复声明会覆盖前面的声明(无论是变量还是函数声明)

```
//函数声明会覆盖变量声明
var a;
function a(){}
console.log(a);//'function a(){}'
```

```
//函数的重复声明会覆盖前面的声明
a();//2
function a(){
    console.log(1);
}
function a(){
    console.log(2);
}
```

## 块作用域

1. let
ES6引入了新的let关键字，提供了除var以外的另一种变量声明方式。
> let关键字可以将变量绑定到所在的任意作用域中(通常是{...}内部)，实现块作用域。
> let不允许在相同作用域内，重复声明同一个变量
> 使用let进行的声明不会在块作用域中进行提升

```
{
  let i = 1;
};
console.log(i);//ReferenceError: i is not defined

var a = [];
for(let i = 0; i < 5; i++){
    a[i] = function(){
        return i;
    }
}
console.log(a[4]());//4
```

2. const

> const 值是固定的（常量）。之后任何试图修改值的操作都会引起错误
> const声明的常量，也与let一样不可重复声明
> const声明时必须赋值
> const 引用类型的值可以修改属性（引用的地址不变）

3. try .. catch 分句会创建一个块作用域，其中声明的变量仅在 catch 内部有效。
```
    try{
        var a= 100;
        throw 2;
    }catch(e){
        console.log( a ); //100
        console.log( e ); //2
    }
    console.log( a ); //100
    console.log( e ); //ReferenceError: a is not defined
```

