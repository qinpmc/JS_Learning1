# this 专题

## 执行上下文
A this value is a special object which is related with the execution context. 
Therefore, it may be named as a context object (i.e. an object in which context the execution context is activated).
this适合执行的上下文环境息息相关的一个特殊对象。因此，它也可以称为上下文对象[context object](激活执行上下文的上下文)。

a this value is a property of the execution context, but not a property of the variable object.
this是执行上下文环境的一个属性，而不是某个变量对象的属性



## 默认绑定
直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。

```
function foo() {
   console.log( this.a );
}
var a = 2;
foo(); // 2


function foo2() {
  console.log(this);
}
 
// caller 激活 "foo"这个callee，
// 并且提供"this"给这个 callee
 
foo2(); // 全局对象
foo2.prototype.constructor(); // foo2.prototype

```

严格模式（strict mode），那么全局对象将无法使用默认绑定，因此this 会绑定到undefined

```
//严格模式
function foo() {
    "use strict";
    console.log( this.a );
}
var a = 2;
foo(); // Cannot read property 'a' of undefined ，严格模式下this绑定到undefined

严格模式下与函数的调用位置无关：
function foo() {
    console.log( this.a );
}
var a = 2;
(function(){
   // 严格模式调用，this指向全局
    "use strict";
    foo(); // 2
})();
```





## 隐式绑定

```
//隐式绑定
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // this绑定到obj	//对象属性引用链中只有最顶层或者说最后一层会影响调用位置
function foo() {
    console.log( this.a );
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
obj1.obj2.foo(); // 42, 绑定到最后一层obj2

```

**隐式丢失**

```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn; // 丢失
j(); 

```


```
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
            console.log(this); //b
        }
    }
}
var j2 = o.b; // 
j2.fn();  //


```

```
function foo() {
    console.log( this );
}

var bar = {
  baz: foo
};
 
bar.baz(); // bar
 
(bar.baz)(); // also bar
(bar.baz = bar.baz)(); // 这是一个全局对象，丢失 , 返回值是目标函数foo的引用
(bar.baz, bar.baz)(); // 也是全局对象，丢失
(false || bar.baz)(); // 也是全局对象，丢失

var otherFoo = bar.baz;
otherFoo(); // 还是全局对象，丢失

```

```
//回调函数中的隐式丢失
function foo() {
   console.log( this.a );
}
function doFoo(fn) {
// fn 其实引用的是foo
   fn(); // <-- 调用位置！相当于 fn = bj.foo,丢失了bj
}
var obj = {
   a: 2,
   foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"

```


```
//把函数传入语言内置的函数也会隐式丢失
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout( obj.foo, 100 ); // "oops, global"


```


```
var boss1 = {
  name: 'boss1',
  returnThis () {
    return this
  }
}
var boss2 = {
  name: 'boss2',
  returnThis () {
    return boss1.returnThis()
  }
}
var boss3 = {
  name: 'boss3',
  returnThis () {
    var returnThis = boss1.returnThis
    return returnThis()
  }
}
boss1.returnThis() // boss1
boss2.returnThis() // boss1
boss3.returnThis() // window

```


## 显式绑定
Object.prototype.call和Object.prototype.apply，它们可以通过参数指定this  

```
function returnThis () {
  return this
}
var boss1 = { name: 'boss1' }
returnThis() // window
returnThis.call(boss1) // boss1
returnThis.apply(boss1) // boss1
```

**显式绑定优先级高于隐式绑定**

```
//显式绑定优先级高于隐式绑定
function foo() {
    console.log( this.a );
}
var obj1 = {
    a: 2,
    foo: foo
};
var obj2 = {
    a: 3,
    foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3,this指向obj2
obj2.foo.call( obj1 ); // 2,this指向obj1

```



## Bind绑定
bind绑定优先级高于call、apply   

```
// bind绑定优先级高于call、apply
function returnThis () {
  return this
}
var boss1 = { name: 'boss1'}
var boss1returnThis = returnThis.bind(boss1)
boss1returnThis() // boss1
var boss2 = { name: 'boss2' }
boss1returnThis.call(boss2) // still boss1，仍然是bind的绑定
```


## new绑定

当我们new一个函数时，就会自动把this绑定在新对象上，然后再调用这个函数。new新建的对象会覆盖bind的绑定.

```
function showThis () {
  console.log(this)
}
showThis() // window
new showThis() // showThis {}

var boss1 = { name: 'boss1' }
showThis.call(boss1) // boss1
new showThis.call(boss1) // TypeError ,showThis.call is not a constructor
 
var boss1showThis = showThis.bind(boss1)
boss1showThis() // boss1
new boss1showThis() // showThis {}


```


**注意new 的return 返回值类型**
- return返回值是一个对象（null除外），那么this指向的就是那个返回的对象
- 如果返回值不是一个对象，那么this还是指向函数的实例

```
function fn()  
{  
    this.user = '追梦子';  
    return null;
}
var a = new fn();  
console.log(a.user); //追梦子

//////////////////////////////////
function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn();  
console.log(a.user); //追梦子

////////////////////////
function fn()  
{  
    this.user = '追梦子';  
    return function(){};  // return{}也是同样效果
}
var a = new fn();  
console.log(a.user); // undefined


```


## 容易忽略的this绑定
把null 或者undefined 作为this 的绑定对象传入call、apply 或者bind，这些值     
在调用时会被忽略，实际应用的是默认绑定规则.   

```
function foo() {
    console.log( this.a );
}
var a = 2;
foo.call( null ); // 2


// call、apply、bind中传入null的常见用途
function foo(a,b) {
    console.log( "a:" + a + ", b:" + b );
}
// 把数组“展开”成参数
foo.apply( null, [2, 3] ); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind( null, 2 ); //注意：只给foo传入了一个参数
bar( 3 ); // a:2, b:3    给foo传入第二个参数

```



1. 非严格模式下this指向的对象:
> 默认 ---> window
> null --->window
> undefined ---> window
 
2. 严格模式下call中this指向的对象
> 默认 ---> undefined
> null --->null
> undefined ---> undefined


## 箭头函数中this

1. 箭头函数中的this是在定义函数的时候绑定，而不是在执行函数的时候绑定
2. 箭头函数中，this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
    导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
3. 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
4. 箭头函数是根据外层（函数或者全局）作用域来决定this

