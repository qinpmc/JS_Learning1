# css 方法


1. css   
- 访问/设置匹配元素的样式属性。

```
var $box = $("#box");
console.log($box.css("width")); //200px

$box.css({
    background:"yellowgreen",
    opacity:0.5,
    height:"200px"

});
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
 
4. scrollTop([val])、scrollLeft([val])
获取匹配元素相对滚动条顶部、左侧的偏移。

5. width、height 
- 相当于获取、设置元素的width、height

6. innerWidth、innerHeight
- 相当于获取(__ 没有设置__ )元素可视区的宽高 clientWidth、clientHeight

7. outerHeight([options])、outerWidth([options])
获取第一个匹配元素外部宽度（默认包括补白和边框）。options 设置为 true 时，计算边距在内。



