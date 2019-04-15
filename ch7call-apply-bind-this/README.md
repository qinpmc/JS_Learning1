# call/apply/bind
> 函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。
> apply方法的作用与call方法类似，也是改变this指向， 唯一的区别就是，它接收一个 __数组__作为函数执行时的参数

```
Function.prototype.myCall = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}
function fn1(){
    console.log(this);
    console.log(1);
}
function fn2(){
    console.log(this);
    console.log(2);
}
//fn1.myCall(fn2);// fn2 , 1
//fn1.myCall.myCall(fn2); //window ,2
fn1.myCall.myCall.myCall(fn2); //window ,2
```

##  call的作用
1. 使用call完成继承
2. call：借用其他对象的方法
    (注意:对象借用了数组的slice方法,对象有 __length__属性，__属性名为数字__，可得到对应的属性值构成的数组)
    
```
//1. 使用call完成继承
var Parent = function(){
    this.name = "yjc";
    this.age = 22;
}
var child = {};
console.log(child);//Object {} ,空对象
Parent.call(child);//使用call完成继承
console.dir(child); //Object {name: "yjc", age: 22}

//2. 借用其他对象的方法
//注意以下非典型例子，对象借用了数组的slice方法
//对象有length属性，属性名为数字，可得到对应的属性值构成的数组
var a = {0:1, 1:"yjc", length: 2};
var a2 = {p1:1, 1:"yjc", length: 2};
var a3 = {p1:1, p2:"yjc", length: 2};
var a4 = {0:1, 1:"yjc"};
var a5 = {p1:1, p2:"yjc"};
// a.slice(); //TypeError: a.slice is not a function
var res1 = Array.prototype.slice.call(a);//[1, "yjc"]
var res2 = Array.prototype.slice.call(a2);//[empty × 1, "yjc"]
var res3 = Array.prototype.slice.call(a3);//[empty × 2]
var res4 = Array.prototype.slice.call(a4);//[]
var res5 = Array.prototype.slice.call(a5);//[]

```  
 
## 非严格模式下call中this指向的对象

1. 非严格模式下this指向的对象:
> 默认 ---> window
> null --->window
> undefined ---> window
 
2. 严格模式下call中this指向的对象
> 默认 ---> undefined
> null --->null
> undefined ---> undefined

## call/apply应用案例

### 巧用call/apply求最大值/平均值

```
    var arr = [23,12,31,42,55,78,31,22,23];

    //利用数组的原生方法
    arr.sort(function(a,b){
        return a-b;
    });
    var maxNum = arr[arr.length-1];

    //借用Math.max方法
    //var res2 = Math.max(23,24,21);
    var maxNum2 = Math.max.apply(null,arr);

    //eval方法+Math.max方法
    var maxNum3 = eval("Math.max("+arr.join()+")");

    //自实现查找最大值
    function findMax(arr){
        var max = arr[0];
        for(var i=0;i<arr.length;i++){
            max<arr[i]?max = arr[i]:null;
        }
        return max;
    }
    var maxNum4 =findMax(arr);

    //求平均值
    function avg(){
        var arr = [].slice.apply(arguments);
        arr.shift();
        arr.pop();
        return (eval(arr.join("+"))/arr.length).toFixed(2);
    }
    var res = avg(23,12,31,42,55,78,31,22,23);
```

### 类数组转数组

```
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike)


// 5. 使用ES6的 ... 运算符，可以轻松转成数组。

function func(...arguments) {
    console.log(arguments); // [1, 2, 3]
}

func(1, 2, 3);

```



```
 //类数组：1、arguments 2、NodeList 3、HTMLCollection
var down_div = document.getElementsByName("down");
console.dir(down_div); // NodeList(1)

var divs = document.getElementsByTagName("div");
console.dir(divs);   // HTMLCollection

var arr1 = [].slice.apply(down_div);
console.dir(arr1);

var arr2 = [].slice.apply(divs);
console.dir(arr2);

//ie6~8 利用数组的slice方法将类数组转换为数组不可行
var utils ={
    listToArray:function(likeAry){
        var arr=[];
        try{
            ary = [].slice.apply(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[i] = likeAry[i];
            }
        }
        return ary;
    }
}
var arr3 = utils.listToArray(divs);

```


## bind
> bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
> 如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）。


```
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var obj = {
  count: 100
};
var func = counter.inc.bind(obj);
func();
obj.count // 101

var count = -99; 
var func2 = counter.inc.bind(null);
func2();
count; // -98
```

> bind还可以接受更多的参数，将这些参数绑定原函数的参数

```
var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);
newAdd(5) // 20
```







