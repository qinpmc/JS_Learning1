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
