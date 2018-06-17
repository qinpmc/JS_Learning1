# DOM深入

## 元素的属性

```
    <style type="text/css">
        * {
            margin:0;
            padding:0;
        }
        #box{
            margin: 100px;
            padding: 30px;
            border: solid darkgreen 10px;
            height: 300px;
            width: 300px;
            line-height: 30px;
        }
        
    </style>
<div id="box" class="parentBox wrap">
    样式表定义如何显示 HTML 元素，就像 HTML 3.2 的字体标签和颜色属性所起的作用那样。样式通常保存在外部的 .css 文件中。
    通过仅仅编辑一个简单的 CSS 文档，外部样式表使你有能力同时改变站点中所有页面的布局和外观.
    
</div>
```

> attributes
  oDiv.attributes; // NamedNodeMap {0: id, 1: class, id: id, class: class, length: 2}
  oDiv.attributes.item("id"); //id="box"

> classList
oDiv.classList; //  ["parentBox", "wrap", value: "parentBox wrap"]

> clientHeight、clientWidth
clientHeight: 内容的高度+上下填充
clientWidth: 内容的宽度+左右填充

注意：不设置height等于300px时
oDiv.clientHeight //240 （此时内容不溢出），
oDiv.clientHeight //570 （增加内容，文本框高度自动扩大，此时内容不溢出）

设置height等于300px时            
oDiv.clientHeight //360  ;360px = 300px(height) + 上下padding(30px),此时内容不溢出
oDiv.clientHeight //360  ;增加内容,文本内容溢出，clientHeight仍为360
            

> offsetHeight/offsetWidth
  (设置height时，和内容是否溢出没有关系)
   offsetHeight; //380 = clientHeight + 上下border 高度
   offsetWidth ;// 380 = clientWidth + 上下border 宽度
   
> offsetParent 当前元素的父级参照物

> offsetLeft / offsetTop 当前元素的外边框距离父级参照物内边框的偏移量
  (chrome测试时，如果offsetParent 为body，则会包含body的边框值？)
> scrollWidth /scrollHeight
  > 内容不溢出时，和clientWidth、cientHeight一致，
  > 溢出时，其值为真实内容的高度/宽度 + 上填充/左填充

> scrollLeft/ scrollTop
  滚动条卷去的宽度/高度
  
## 浏览器本身的盒子模型

> clientHeight、clientWidth当前浏览器可视窗口的宽度和高度
> scrollWidth /scrollHeight 当前页面真实的宽度和高度
> 兼容性 document.documentElement[attr] || document.body[attr]

## style
> 元素.style[attr] ,只能获取行内样式的值，样式表中的样式值无法获取

> window.getComputedStyle(元素，伪类);伪类一般不用，传入null
  返回 CSSStyleDeclaration
  此属性ie6-8不支持，可使用currentStyle
  
```
  function getCss(ele,attr){
      var res = null;
      if(window.getComputedStyle){
          res = window.getComputedStyle(ele,null)[attr];
      }else{
          res = ele.currentStyle[attr];
      }
      var reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
      return reg.test(res)? parseFloat(res):res;
  }
```

## parentNode OffsetParent

```

<div id="outer">
    <div id="center">
        <div id="inner"></div>
    </div>
</div>


```

> parentNode
1. parentNode -- dom 树上的父节点

var inner = document.getElementById("inner");
var outer = document.getElementById("outer");
inner.parentNode; //center
inner.parentNode.parentNode; //outer
inner.parentNode.parentNode.parentNode; //body
inner.parentNode.parentNode.parentNode.parentNode; //html
inner.parentNode.parentNode.parentNode.parentNode.parentNode; //#document

> offsetParent
1. offsetParent 父级参照元素
2. 可通过 position修改：absolute、relative、fixed

inner.offsetParent; //body ,此时center、outer的position均为默认static
inner.offsetParent.offsetParent; //null
