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

var oDiv = $("#box");
oDiv.attr("myAttr",99);
oDiv.prop("index",-1);
console.log(oDiv.attr("myAttr")); //99
console.log(oDiv.attr("index")); //undefined

console.log(oDiv.prop("myAttr")); //undefined
console.log(oDiv.prop("index")); //-1
```

attr 与prop区别   
勾选checkbox ：prop('checked') 为：  
  attr('checked'): checked   
  prop('checked'): true  
不勾选checkbox ：prop('checked') 为：  
attr('checked'): checked   
prop('checked'): false   


prop()函数的结果:    
      1.如果有相应的属性，返回指定属性值。    
      2.如果没有相应的属性，返回值是空字符串。    
attr()函数的结果:    
      1.如果有相应的属性，返回指定属性值。   
      2.如果没有相应的属性，返回值是undefined。   

对于HTML元素本身就带有的固有属性，在处理时，使用prop方法。   
对于HTML元素我们自己自定义的DOM属性，在处理时，使用attr方法。   
具有 true 和 false 两个属性的属性，如 checked, selected 或者 disabled 使用prop()  

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

prop 
添加的属性，如果为内置的属性，可以在html结构中体现；否则在html结构中不体现（但可以获取）

如 oDiv.prop("style",{background:red});   可以在html中显示   
   oDiv.prop("class","banner");   可以在html中显示
    oDiv.prop("index",33);    在html中不显示


## 类属性
addClass
removeClass
toggleClass

## 上下文
$(selector,context) ,context 默认为document，但也可以传入
如 $("div","$box") ,等价 $("#box div")获取 id为box元素下的div元素

## 内置循环
 $boxDivList.addClass("w1"); // 直接给$boxDivList 集合中每一个元素添加class “w1”

## each

$boxDivList.each(function(index,item){
    $(item).addClass("w1");
})

## html / text /value
这3个方法均是不传参数时，表示获取；
传1个参数时，为设置
html表示获取innerHTML
text表示获取innerText
value 获取表单元素的值