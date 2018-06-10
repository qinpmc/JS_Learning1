# 面向对象


## 构造函数
> 函数体内部使用了this关键字，代表了所要生成的对象实例
> 生成对象的时候，必须使用new命令。
> 构造函数就是一个普通的函数(忘了使用new命令,构造函数就变成了普通函数，
  并不会生成实例对象。this这时代表全局对象，将造成一些意想不到的结果)
  
```
function Fubar(foo,bar){
    if(!(this instanceof Fubar)){
        return new Fubar(foo,bar);
    }
    this._foo = foo;
    this._bar = bar;
}
```

## new 命令的原理
> 创建一个空对象，作为将要返回的对象实例
> 将这个空对象的原型，指向构造函数的prototype属性
> 将这个空对象赋值给函数内部的this关键字
> 开始执行构造函数内部的代码
 __如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；
否则，就会不管return语句，返回this对象__

```
var Vehicle = function () {
  this.price = 1000;
  return 1000; //并不会返回1000，而是new 的新对象
};

(new Vehicle()) === 1000

var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 }; //返回该对象，而不是new 的新对象
};

(new Vehicle()).price
// 2000
```

## new 内部的原理
```
function _new(constructor,params){
        var args = [].slice.call(arguments);
        var constructor = args.shift();
        var context = Object.create(constructor.prototype);
        var result = constructor.apply(context,args);
        return (typeof result =="object" && result!=null)? result:context;
    }
    function Person(name,age){
        this.name = name;
        this.age = age;
    }

    var actor = _new(Person, '张三', 28);
    console.log(actor);
/*  Person
    age:28
    name:"张三"
    __proto__:
            constructor:ƒ Person(name,age)*/
```

## 方法及属性
1. Object.getPrototypeOf()
2. Object.setPrototypeOf()
3. Object.create()
4. Object.getOwnPropertyNames()
5. Object.keys()


6. __proto__(实例属性，非标准api)
7. prototype（构造函数的属性）
8. constructor （实例和构造函数均有）
9. hasOwnProperty()
10. isPrototypeOf()
11. instanceof （会向上查找原型链）
12. propertyIsEnumerable


### propertyIsEnumerable
> 此方法可以确定对象中指定的属性是否可以被for...in循环枚举，
  但是通过 __原型链继承的属性除外__。如果对象没有指定的属性，则此方法返回false。
  (原型属性返回false,实例属性返回true))
> 这个属性必须是可枚举的，不可枚举的属性返回false。 

```
var a = ['is enumerable'];

a.propertyIsEnumerable(0);          // 返回 true
a.propertyIsEnumerable('length');   // 返回 false,length 不会枚举

Math.propertyIsEnumerable('random');   // 返回 false，random不可枚举
this.propertyIsEnumerable('Math');     // 返回 false，Math不可枚举
```

  

### in 运算符和 for…in 循环 (Object.getOwnPropertyNames()/Object.keys())
> for in: 返回通过对象可访问的、可枚举的属性，既包括实例中的属性，
  也包括原型中的属性(不包括对象中不可枚举的属性，如内置的属性)
> in: 通过对象可访问到给定属性时返回true,不论属性存在实例中还是原型中
 （包含可枚举和不可枚举）
> Object.keys:取得对象上所有可枚举的 __实例__属性(未查找原型链上的属性)
> Object.getOwnPropertyNames:取得对象上所有（包括不可枚举）的 __实例__属性(未查找原型链上的属性)

 

### 获取实例对象obj的原型对象，有三种方法。

1. obj.__proto__
2. obj.constructor.prototype
3. Object.getPrototypeOf(obj)
> 上面三种方法之中，前两种都不是很可靠。__proto__属性只有浏览器才需要部署，其他环境可以不部署。
> 而obj.constructor.prototype在手动改变原型对象时，可能会失效

```
P = function () {this.p= "p"};
var p = new P();

var C = function () {this.c = "c"};
C.prototype = p;
var c = new C();
 
c.constructor;  //ƒ () {this.p= "p"},并不是 C 
c.constructor.prototype ===p.__proto__ ; //
```
 

