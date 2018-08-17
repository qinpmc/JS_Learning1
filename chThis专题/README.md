# THis 专题

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
```

严格模式（strict mode），那么全局对象将无法使用默认绑定，因此this 会绑定到undefined

```
//严格模式
function foo() {
    "use strict";
    console.log( this.a );
}
var a = 2;
foo(); //  undefined ，严格模式下this绑定到undefined

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







