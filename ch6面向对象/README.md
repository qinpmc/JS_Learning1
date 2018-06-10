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

13. Object.defineProperty()
14. Object.defineProperties()
15. Object.getOwnPropertyDescriptor()

16. Object.assign
 
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
 
### Object.defineProperty()（defineProperties/getOwnPropertyDescriptor）
> 数据属性
  - configurable：-->delete 删除
  - enumerable：-->for in 遍历
  - writable: 修改
  - value:值

> 访问器属性
  - configuable:
  - enumerable:
  - get:
  - set:

> 调用Object.defineProperty()，默认configurable、enumerable、writable均为false
> obj.prop 或obj[prop]定义属性，默认configurable、enumerable、writable均为true
  - Object.defineProperty(obj, prop, descriptor)
  
```
/*    // 两种属性的定义方式：
    var p = {};
    p.age = 21;  // 采用此种方式赋值，该属性为可写，可枚举，可配置

    var person = {};
    Object.defineProperty(person, "name", {
        value: "qp"  // 采用此种方式赋值，该属性为不可写，不可枚举，不可配置
    });

    Object.defineProperty(person, "age", {
        value: 21,
        //writable:true  // 如不显示添加可写为true,则该属性不可修改--此种方式定义属性时，默认writable为false
    });
    alert(person.age); //21
    person.age = 31;
    alert(person.age); //21，未修改成功*/


    var person={};
    Object.defineProperty(person,"name",{
        configurable:false, //无法删除
        value:"qp"
    });
    delete person.name;
    alert(person.name); //qp ,仍然存在

/*    Object.defineProperty(person,"name",{
        configurable:true,  // 报错，已经不可配置  Enumerable Writeble Value
        value:"qp22"
    })*/
    person.name="Jack";
    alert(person.name); //qp，无法修改

    /*Object.defineProperty(person,"name",{
        value:"qp22"// 报错，已经不可配置
    })*/
    /*Object.defineProperty(person,"name",{
        enumerable:true,  //  报错
        //enumerable:false  // 不报错
    })*/

    Object.defineProperty(person,"name",{
        writable:true,  //  报错
        //writable:false,  //  不报错
    })
``` 

### Object.assign(target, ...sources)
> 所有 __可枚举属性__的值从一个或多个源对象复制到目标对象。它将返回目标对象。
> 如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。后来的源的属性将类似地覆盖早先的属性。

---

## 原型
> 1. 原型上的属性是所有实例共享，对于共享的对象属性，一个实例修改，会影响另一个实例的该属性
> 2. 对原型对象所做的任何修改都能立即从实例上反映出来—即使是先创建实例，后修改原型

```
function Person2(name,age,job,sayName){
    this.age=31;
    this.job="worker";	
}
Person2.prototype.sayName = function(){
    alert(this.name);
};
var p1 = new Person2();
var p2 = new Person2();
p1.name="qqqqq";
alert(p1.hasOwnProperty("name"));  //true ,this构造的实例均自身具有该属性
alert(p2.hasOwnProperty("name"));  //false，来自原型

```

### 重写原型

1. 直接重写原型，然后定义实例
> 直接将原型重写为{}；重写原型后， 构造函数为Object

```
function Person(){};
Person.prototype={
    // constructor: Person, 会导致constructor[[Enumerable]]为true
name:"qqq",
    age:21,
    job:"hahha",
    sayName:function(){
        alert(this.name);
    }
}
var p1=new Person(); // 
alert(p1.name);  //qqq

alert(p1 instanceof Person);//true
alert(p1.constructor==Person); //false
alert(p1.constructor==Object); //true   //重写原型后， 构造函数为Object
alert(Object.getPrototypeOf(p1)==Person.prototype); //true-- 重写原型后，原型为Person.prototype
alert(Object.getPrototypeOf(p1)==Object.prototype); //false --

```

2. 先定义实例，然后重写原型
> 重写原型后，以前创建的实例指向旧的原型

```
function Person(){};
var friends=new Person();

Person.prototype={
    name:"qqq",
    age:21,
    job:"hahha",
    sayName:function(){
        alert(this.name);
    }
}

alert(friends.name);  //undefined
alert(friends instanceof Person);//false  
alert(friends.constructor==Person); //true  friends在重写原型前定义，但构造函数仍为Person，friends.__proto__指向旧的 Person.prototype
alert(friends.constructor==Object); //false   
alert(Object.getPrototypeOf(friends)==Person.prototype); //false
alert(Object.getPrototypeOf(friends)==Object.prototype); //false --

```
![重写原型](./new_prototype.png)

---

## 继承

1. 原型链

```
function Super()
{
    this.superProperty="super";
}
Super.prototype.getSuperValue=function()
{
    return this.superProperty;
};
function Sub()
{
    this.subProperty="sub";
}
Sub.prototype=new Super(); //先原型链，然后给原型添加方法！！
Sub.prototype.getSubValue=function()  ////先原型链，然后给原型添加方法！！
{
    return this.subProperty;
};

Sub.prototype.getSuperValue=function()
{
    return this.superProperty+"子类重写";
};

var insSub=new Sub();
alert(insSub.constructor); //注意：构造函数为function Super...
alert(Sub.prototype.constructor);  //function Super...
alert(insSub.getSuperValue());    //super子类重写，子类重写了该方法

var insSuper =new Super();
alert(insSuper.constructor);      //function Super...
alert(insSuper.getSuperValue());  //super，子类重写并不改变父类
alert(insSuper.getSubValue);    //undefined

```
![prototype](./prototype1.png)
![prototype2](./prototype2.png)



2. 借用构造函数
> 函数无法公用,父类的原型属性，子类无法使用

```
function Super()
{
    this.friends=["qq1","qq2"];
    this.innerSay=function(){alert("inner!!")};
}
Super.prototype.outSay=function(){alert("out!!!");}

function Sub()
{
    Super.call(this);  /// 借用构造函数
//Super.apply(this,arguments);  /// 借用构造函数

};

var sub1= new Sub();
var sub2= new Sub();
sub1.friends.push("qq3");
alert(sub1.friends);  // qq1,qq2,qq3
alert(sub2.friends); // qq1,qq2 ，实例的引用属性并未受影响
alert(sub1.innerSay==sub2.innerSay);   //false
alert(sub1.outSay);      // undefined

```

3. 组合继承
> 调用两次SuperType

```
function SuperType(name){
    this.name =name;
    this.colors = ["red","yellow"];
}

SuperType.prototype.sayName = function(){
    console.log(ame)
}

function SubType(name,age){
    SuperType.call(this,name); //第一次调用
    this.age = age;
}

SubType.prototype = new SuperType();  //第二次调用
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    console.log(this.age);
}

var instance1 = new SubType("qq1",21);
instance1.colors.push("blue"); // color为["red","yellow","blue"];
console.log(instance1);
var instance2 = new SubType("qq2",22);  //color为 ["red","yellow"];
console.log(instance2);

```

![prototype3](./prototype3.png)

4. 原型式继承

>  Object.create 
等同：
function  Object(o){
    function F(){}
    F.prototype = o;
    return new F();
}

```
var person ={
    name:"qq1",
    friends:["pp1","pp2"]
};
var p1=Object.create(person);
var p2=Object.create(person);
p1.name="qq1New";
p1.friends=["pp3"];

```

![prototype4](./prototype4.png)

5. 寄生式继承

```
// 使用原型式继承思路，并增强对象，不使用new
function object(o)
{
    function F(){}
    F.prototype=o;
    F.prototype.innersayF=function(){alert("innerF")}; //共享，增强
    return new F();
}

function createAnother(origin)
{
    var clone=object(origin);
    clone.say=function(){alert("hi")}; // 每个实例各自拥有，增强
    return clone;
}
var person={
    name:"qq1",
    friends:["ff1","ff2"],
    innersay:function(){alert("inner")}
};
var pp1=createAnother(person);
var pp2=createAnother(person);

pp1.friends.push("ff3");
//pp1.friends=["ff3"]; //与上句的区别
alert(pp1.friends);  //ff1,ff2,ff3
alert(pp2.friends);  //ff1,ff2,ff3 ，pp1的修改影响了pp2 的friends
alert(pp1.innersayF==pp2.innersayF);  //true
alert(pp1.innersay==pp2.innersay);  //true
alert(pp1.say==pp2.say);              //false ,注意与say 和innersayF的区别

```

![prototype5](./prototype5.png)


6. 寄生组合式继承
> 
function extend(Child,Parent){
		var F  =function(){};
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.uber = Parent.prototype;
}

```
function object(o)
{
    function F(){}
    F.prototype=o;
    return new F();
}

function inherit(subType,superType)
{
    var prototype=object(superType.prototype); //此处传入的是原型
    prototype.constructor=subType;
    subType.prototype=prototype;
}
function SuperType(name)
{
    this.name=name;
    this.colors=["red","blue"];
}
SuperType.prototype.sayName=function()   //补充原型属性
{
    alert(this.name);
}
function SubType(name,age)
{
    SuperType.call(this,name);
    this.age=age;
}
inherit(SubType,SuperType);
SubType.prototype.sayAge = function(){
    alert(this.age);
}
var ins1= new SubType("qq1",21);
var ins2= new SubType("qq2",22);
ins1.colors.push("black");

alert(ins1.sayAge==ins2.sayAge);  //true
alert(ins1.sayName==ins2.sayName); //true
alert(ins2.colors);  //red ,blue
alert(ins1.colors);  //red ,blue,black

```
![prototype6](./prototype6.png)
![prototype7](./prototype7.png)

--- 
## 其它方法

1. 原型属性拷贝法

```
function extend2(Child,Parent){
		var p = Parent.prototype;
		var c = Child.prototype;
		for(var i in p){
			c[i] = p[i];
		}
		c.uber = p;
	}
```



2. 浅拷贝（全属性拷贝）

```
//浅拷贝，基于对象（会拷贝父对象原型中属性，引用类型属性仅仅是引用传递）
function extendCopy(p){
		var c={};
		for(var i in p ){
			c[i] = p[i];
		}
		c.uber =p;
		return c;
	}

```

3. 深拷贝

```
//深拷贝，基于对象（不拷贝父对象原型中属性，所有属性是值传递）

function deepCopy(p,c){
		c = c || {};
		for(var i in p){
			if(p.hasOwnProperty(i)){
				if(typeof p[i] ==="object"){
					c[i] = Array.isArray(p[i]) ? []:{};
					deepCopy(p[i],c[i]);
				}else{
					c[i] = p[i];
				}
			}
		}
		return c;
	}
```


















