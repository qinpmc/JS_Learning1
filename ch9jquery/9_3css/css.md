# css 方法


1. css   
- 访问/设置匹配元素的样式属性。

```
取得第一个段落的color样式属性的值 ,注意：此处$("p")可能返回不止一个p元素，但css("color")仅返回第一个p元素的样式
$("p").css("color");
```


```
<div id="box" style="width:200px"></div>
<div id="wrapper" style="position: absolute;left:500px;width: 400px;height: 400px;background: darkred">
    <div id="inner" style="position: relative">
        <div></div>
        <div style="position: relative;left: 50px;"></div>
    </div>
</div>
<script type="text/javascript">
    var $box = $("#box");
    console.log($box.css("width")); //200px

    //取得第一个div的color样式属性的值。
    console.dir($("div").css("width")); //200px

    $box.css({
        background:"yellowgreen",
        opacity:0.5,
        height:"200px"

    });
</script>
```


2. offset
获取/设置匹配元素在当前视口的相对偏移。

```
var p = $("p:last");
var offset = p.offset();
p.html( "left: " + offset.left + ", top: " + offset.top );
$("p:last").offset({ top: 10, left: 30 });
```

3. position
获取(__ 没有设置__ )匹配元素距离父级参照物的偏移。

```
    <div id="box" style="width:200px"></div>
    <div id="wrapper" style="position: absolute;left:500px;top:200px;width: 400px;height: 400px;background: darkred">
        <div id="inner" style="position: relative">
            <div></div>
            <div style="position: relative;left: 50px;"></div>
        </div>
    </div>
    <script type="text/javascript">
        var div1 = $("#inner div:first-child");
        console.log(div1.offset());//{top: 200, left: 500}
        console.log(div1.position());//{top: 0, left: 0}

        console.log("******************");

        var div2 = $("#inner div:nth-child(2)");
        console.log(div2.offset());//{top: 200, left: 550}
        console.log(div2.position());//{top: 0, left: 50}
    </script>
```
 
4. scrollTop([val])、scrollLeft([val])
获取匹配元素相对滚动条顶部、左侧的偏移。

5. width、height 
- 相当于获取、设置元素的width、height

6. innerWidth、innerHeight
- 相当于获取(__ 没有设置__ )元素可视区的宽高 clientWidth、clientHeight

7. outerHeight([options])、outerWidth([options])
获取第一个匹配元素外部宽度（默认包括补白和边框）。options 设置为 true 时，计算边距在内。

```
    <div id="box" style="width:200px"></div>
    <div id="wrapper" >
        <div id="inner"  >
            <div></div>
            <div  ></div>
        </div>
    </div>
    <script type="text/javascript">
        var $box = $("#box");
        $box.css({
            background:"yellowgreen",
            opacity:0.5,
            height:"200px",
            border:"solid red 10px",
            margin:"100px",
            padding:"30px 20px"

        });
        console.log($box.innerWidth()); //240    width+padding
        console.log($box.innerHeight()); //260   height+padding

        console.log($box.width()); //200   
        console.log($box.height()); //200
        //$box.innerHeight(1000);
        console.log($box.outerWidth()); //260 ，包含了边框  width+padding+border
        console.log($box.outerHeight()); // 280，包含了边框 height+padding+border

        console.log($box.outerWidth(true)); //460 ，包含了外边距  width+padding+border+margin
        console.log($box.outerHeight(true)); // 480，包含了外边距  height+padding+border+margin
    </script>
```

