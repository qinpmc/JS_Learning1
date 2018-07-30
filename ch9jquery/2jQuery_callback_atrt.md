# 常用方法属性

## 回调函数

1. ready()
    以下两种写法等价:  
    $(function(){})   
    $(document).ready(function(){})  
    
```
 // 原生方式
    window.onload = function(){}

    //区别 ，// 只会执行后面的 console.log(2222);
/*    window.onload = function(){
        console.log(1111);
    };
    window.onload = function(){
        console.log(2222);
    };*/


    // console.log(3333)和console.log(4444)都执行;
/*    $(function(){
        console.log(3333);
    })
    $(function(){
        console.log(4444);
    })*/
```

2. .Callbacks()

- .add(callbacks)
- .disable()
- .empty()
- .fire(arguments)
- .has(callback)


```
function fn1(value){
    console.log("fn1: "+value);
}
function fn2(value){
    console.log("fn2: "+value);
}

var $call = $.Callbacks();
$call.add(fn1);
$call.fire(100); //fn1: 100

$call.add(fn2);
$call.fire(200); //fn1: 200  , fn2: 200

$call.remove(fn2);
$call.fire(300); // fn1: 300
```

## 属性   

1.attr 设置和获取属性
2.removeAttr
3.prop 
4.removeProp 

```
$("#box").attr("myAttr",100); //设置属性
console.log($("#box").attr("myAttr"));
$("#box").removeAttr("myAttr");
```

attr 与prop区别   
勾选checkbox ：prop('checked') 为：  
  attr('checked'): checked   
  prop('checked'): true  
不勾选checkbox ：prop('checked') 为：  
attr('checked'): checked   
prop('checked'): false   


```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title> </title>
    <script src="https://cdn.bootcss.com/jquery/1.10.2/jquery.min.js">
    </script>
    <script>
        $(document).ready(function(){
            $("button").click(function(){
                $("#p1").html("attr('checked'): " + $("input").attr('checked')
                        + "<br>prop('checked'): " + $("input").prop('checked'));
            });
        });
    </script>
</head>
<body>

<p><b>注意:</b>确认或取消选中该复选框,然后单击按钮刷新内容。</p>
<button>查看attr() 和 prop() 的值</button>
<br><br>
<input id="check1" type="checkbox" checked="checked">
<label for="check1">Check me</label>
<p id="p1"></p>

</body>
</html>
```








