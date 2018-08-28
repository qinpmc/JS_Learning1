# 函数

## 函数定义

1. 函数声明语句

```
function fn([arg1 [,arg2 [...,argn]]]){
    statement;
}
```
> 函数声明会造成函数提升
> 函数的重复声明会覆盖前面的声明(无论是变量还是函数声明)
> 和变量声明一样，函数声明语句创建的变量无法删除

```
function foo(){
    console.log(1);
}
delete foo;//false
console.log(foo());//1
```

2.函数定义表达式

> 以表达式方式定义的函数，函数的名称是可选的
> 函数的名称将成为函数内部的一个局部变量
> 匿名函数的名称为空字符串

```
    var test = function fn(){
        return fn === test;
    }
    console.log(test());//true  内部可以访问fn 函数名称
    //console.log(test === fn);//ReferenceError: fn is not defined


    var ff2 = function(){
        console.log(arguments.callee.name); //ff2
    };
    console.log(ff2.name);//''，在chrome/firefox浏览器中会显示'ff2' ,IE11-浏览器无效， 输出undefined
    ff2(); //ff2     IE11-浏览器无效， 输出undefined

    var ff3 = function abc(){};
    console.log(ff3.name);//'abc'   IE11-浏览器无效， 输出undefined

    setTimeout(function(){
        console.log("***"+arguments.callee.name+"---");  //***---
    });
```



3. Function构造函数

> Function构造函数接收任意数量的参数，但 __ 最后一个参数始终都被看成是函数体__ ，而前面的参数则枚举出了新函数的参数
> Function构造函数无法指定函数名称，它创建的是一个匿名函数


##  函数返回值

> 函数中的return语句用来返回函数调用后的返回值,或终止执行函数
> 并不是函数中return语句后的所有语句都不执行，finally语句是例外，return语句不会阻止finally子句的执行

```
    function testFinnally(){
        try{
            return 2;
        }catch(error){
            return 1;
        }finally{
            return 99;
        }
    }
    console.log(testFinnally());//99
```
## 函数调用

函数有4种调用模式：函数调用模式、方法调用模式、构造器调用模式和间接调用模式，不同调用方式下this指向问题见this专题。


## 函数参数
> arguments对象的length属性显示 __实参的个数__，函数的length属性显示 __形参的个数__
> 形参只是提供便利，但不是必需的

### 函数参数同步

> 当形参与实参的个数相同时，arguments对象的值和对应形参的值保持同步(严格模式下，arguments对象的值和形参的值是独立的)
> 当形参并没有对应的实参时，arguments对象的值与形参的值并不对应

```
    function test(num1,num2){
        console.log(num1,arguments[0]);//undefined,undefined
        num1 = 10;
        arguments[0] = 5;
        console.log(num1,arguments[0]);//10,5
    }
    test();
```


##  参数传递

javascript中所有函数的参数都是按值传递的。注意：在向参数传递引用类型的值时，传递的是这个值在内存中的地址


## 内部属性
1.  callee
arguments对象有一个名为callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数（严格模式下不可用）

2. caller
函数的caller属性保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值是null
注意不是 arguments对象的caller，该属性始终是undefined
```
复制代码
function outer(){
    inner();
}
function inner(){
    console.log(inner.caller);//outer(){inner();}
}
outer();
```



```
//函数：
        // 1、构造函数-类
        ///2、对象
        ///3、普通函数
        //三种角色之间的变量互不相关
        function Fn(){
            var num = 500;
            this.x = 100;
        }
        Fn.prototype.getX = function () {
            console.log(this.x);
        }
        Fn.aaa = 1000; //对象

        var f = new Fn();  //构造函数
        console.log(f.num); //undefined
        console.log(f.aaa); //undefined

        var res = Fn();  // 普通函数
        console.log(res); //undefined

```















## 异步
js中异步的操作有：
1. 回调函数
2. 定时器
3. ajax 中指定为异步
4. 事件绑定

## 回调函数   
1. 数组的方法中支持回调，如forEach，map等，forEach，map的第二个参数允许指定this；
如 ary.forEach(callback,obj),obj 为指定的this对象，也可以使用bind强行修改；   
但sort方法不支持指定this。   
   
```
    var ary = [3,5,7,9];
    // 数组的forEach 没有返回值
    // 原则上不修改数组，但可以手动修改
    var res1 = ary.forEach(function(item,index,array){
        //return index;
        array[index] = item*100;
    })
    console.log(res1); //undefined
    console.log(ary);  // [3,5,7,9];
    console.log("*************");
    var ary2 = [2,5,7,9];
    var res2 = ary2.map(function(item,index,array){
        //console.log(arguments);
        //array[index] = item*100;  // 原则上不修改数组，但可以手动修改
        return item*10;  //原数组不变，返回新数组
    });
    console.log(res2);
    console.log(ary2);
```

```
Array.prototype.myForEach = function(callback,context){
    context = context || window;
    if("forEach" in Array.prototype){
        this.forEach(callback,context);
        return ;
    }
    // IE 6~8 ,不支持forEach
    for(var i= 0,len=this.length;i<len;i++){
        callback && callback.call(context,this[i],i,this);
    }
}

Array.prototype.myMap = function(callback,context){
    context = context || window;
    if("map" in Array.prototype){
        return this.forEach(callback,context);

    }
    // IE 6~8 ,不支持forEach
    var newAry = [];
    for(var i= 0,len=this.length;i<len;i++){
        if(typeof callback =="function")
            newAry[newAry.length] = callback.call(context,this[i],i,this);
    }
    return newAry;
}
```


```
    function callback(){
        console.log(this);
        console.log(Array.prototype.slice.call(arguments));
    }

    Function.prototype.myBind =function(context){
        var outerArgs = Array.prototype.slice.call(arguments,1); //得到myBind函数除context外的参数
        context = context || window;
        if("bind" in Function.prototype){
            //this.bind.apply(this,[context].concat(outerArgs));
            this.bind(context,context);
        }

        var that = this;
        return function (){
            var innerArgs = Array.prototype.slice.call(arguments);
            if("call" in Function.prototype){
                that.apply(context,outerArgs.concat(innerArgs));
            }
        }
    }

    var box = document.getElementById("box");
    box.onclick = callback.myBind({name:"q3333"},111,222);  //{name:"q3333" [111, 222, MouseEvent]

```


