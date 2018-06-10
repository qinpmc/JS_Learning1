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

new 内部的原理






