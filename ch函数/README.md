# 函数

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


