# 闭包


闭包（MDN）：

> 闭包是指那些能够访问自由变量的函数。

自由变量:

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。        

由此，我们可以看出闭包共有两部分组成：                        

闭包 = 函数 + 函数能够访问的自由变量 .              

举个例子：   

```

var a = 1;

function foo() {
    console.log(a);
}

foo();

// foo 函数可以访问变量 a，但是 a 既不是 foo 函数的局部变量，也不是 foo 函数的参数，所以 a 就是自由变量。        

// 那么，函数 foo + foo 函数访问的自由变量 a 就构成了一个闭包           

```

ECMAScript中，闭包指的是：

1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。       
哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。         
2. 从实践角度：以下函数才算是闭包：
- 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
- 在代码中引用了自由变量

示例：  

```

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
```
如上代码 ，checkscope() 执行后，其上下文被销毁
但 f 执行上下文维护的作用域链：

```
fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
```
因此 f执行时，虽然 checkscopeContext被销毁了，但checkscopeContext.AO仍活在内存中，f函数可以通过作用域链找到它。






