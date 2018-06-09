# 预解析

## 预解析

> 在当前作用域中(如全局作用域、函数作用越)，JS代码执行之前，浏览器会把所有带 var 的变量 和 function 声明 进行提前声明或者定义
> 声明（declare） var num
> 定义（defined） num=12

```
console.log(num); //undefined,不会报错
console.log(fn1); //function fn1(){console.log("fn1");}
fn1();            // fn1,可正确执行
var num =100;    //变量提升
function fn1(){    //变量提升
    console.log("fn1");
}

```

## 预解析-细节问题
> 条件语句中会预解析
> 函数声明提前，可以执行; 函数表达式不预解析
> 自执行函数不进行预解析
> 函数体中return下面的代码虽然不执行，但是需要预解析；但return后面的是返回值，不进行预解析
> 函数优先。函数名与变量名冲突，后面重名的函数会覆盖先前声明的函数，且函数优先级比变量高（当函数与变量重名，即使变量声明在最后，预解析后该变量仍为函数）


## 预解析-注意全局变量和局部变量的问题

```
// 预解析，注意全局变量和局部变量的问题
console.log(total); //undefined，访问的是全局变量
var total = 0;      //全局变量 total
function fn(num1,num2){
    console.log(total);  //undefined，此处total 为函数fn局部变量
    console.log(num1);   //100
    var total = num1+num2; 
    console.log(total);  //300 
}
fn(100,200);
console.log(total);  //0,全局的total仍为0

console.log("--------------------------------"); 


console.log(total2); //undefined，访问的是全局变量
var total2 = 0;
function fn2(num1,num2){
    console.log(total2);  //0
    console.log(num1);   //100
    total2 = num1+num2;  // 和上例的区别在于此句没有var ，此处total2 向上寻找，找到全局变量total2
    console.log(total2);  //300
}
fn2(100,200);
console.log(total2);      //300,函数执行后，将全局的total2 修改了

```

## 预解析-带有var 声明和不带有var的变量
> 未通过var 定义的变量可删除
> 通过var 定义的变量无法删除

```
//console.log(num2);  //error: num2 is not defined .num2并未预解析
num2 =100;          // 相当于给window 增加了一个num2 属性，可通过window.num2 访问


console.log(num); //undefined
var num =100;  
console.log(num) //100 ,也可通过window.num 访问


console.log(delete num2);  //true，未通过var 定义的变量可删除
console.log(delete num);   //false ,通过var 定义的变量无法删除

```

---
# 作用域链
> 作用域查找会在找到第一个匹配的标识符时停止
> 函数的词法作用域只由函数被声明时的位置决定，与函数在哪里被调用及如何被调用没有关系	

```
// 函数的词法作用域只由函数被声明时的位置决定
var num = 12;
function fn() {
    var num = 120;
    return function () {
        console.log(num);
    }
}

var f = fn();
f();  // 120

~function () {
    var num = 1200;
    f();  //120 ;并非1200
}();
```

## 不注意的命名冲突

```
function foo(){
    function bar(a){
        i=3;  // i引用for循环中的i
        console.log(a+i);
    }
    for(var i = 0;i<10;i++){
        bar(i*2);
    }
}
foo();// 3 , 11,11...死循环

```

## 函数作用域
> 函数可将其内部的变量和函数隐藏起来，外部无法访问
> 立即执行函数会被当做函数表达式而不是标准的函数声明来处理（如果function是声明的第一个词，那么就是一个函数声明，否则是一个函数表达式函数表达式-立即执行函数不作变量提升）

```
function foo(){} // 声明，因为它是程序的一部分
  var bar = function foo(){}; // 表达式，因为它是赋值表达式的一部分

  new function bar(){}; // 表达式，因为它是new表达式

  (function(){
    function bar(){} // 声明，因为它是函数体的一部分
  })();

(function foo(){}); // 函数表达式：包含在分组操作符内

```

## 作用域销毁问题

```
//fn运行完成后的作用域无法销毁
    //因为f引用这fn作用域中的匿名函数
    function fn(){
        var num = 100;
        return function(){
            console.log(num);
        }
    }
    var f = fn();
    f();

    // oDiv为对象，其onclick属性指向一个匿名函数（引用数据类型--对象），
    //该自执行函数的作用域无法销毁，因为该作用域中的匿名函数被oDiv引用。
    var oDiv = document.getElementById("#div");
    ~function(){
        oDiv.onclick = function () {
            console.log("hello");
        }
}();

    //fn的作用域不立即销毁
    function fn(){
        var num = 100;
        return function(){
            console.log(num);
        }
    }
   fn()();

```

















