# DOM

## 获取DOM元素的方法
1. document.getElementById 
 - returns an __Element__ object 
 
2. [context].getElementsByTagName 
 - returns __HTMLCollection__
 
3. [context].getElementsByClassName
 - returns  __HTMLCollection__
 - IE6-8下不兼容
 
4. document.getElementsByName 
 - returns __NodeList__ Collection
 - IE浏览器只能识别表单元素的name属性，一般用于操作表单元素
 
5. document.documentElement
 - returns the __Element__ that is the root element of the document 
   (for example, the `<html>` element for HTML documents).
   
6. document.body
 - Returns the `<body>` or `<frameset>` node of the current document
 
7. document.head
   -returns the `<head>` element of the current document
   
8. [context].querySelector
 - Returns the first element that is a descendant of the element
 
9. [context].querySelectorAll()
- returns a __static__ (not live) NodeList（静态的）
- querySelector和querySelectorAll在IE6、7、8下不兼容，一般多用于移动端开发



## DOM 元素的原型链 
oDiv --- HTMLDivElement --- HTMLElement --- Element ---Node ---EventTarget --- Object


## HTMLCollection和NodeList
1. 相同点：
- 都是类数组对象，都有length属性
- 都有共同的方法：item，可以通过item(index)或者item(id)来访问返回结果中的元素
- 都是实时变动的（live），document上的更改会反映到相关对象上（例外：document.querySelectorAll返回的NodeList不是实时的）

2. 区别是：
- NodeList可以包含任何节点类型，HTMLCollection只包含元素节点（elementNode），elementNode就是HTML中的标签
- HTMLCollection比NodeList多一项方法：namedItem，可以通过传递id或name属性来获取节点信息

## DOM的节点
1. node：浏览器认为在一个HTML页面中的所有内容都是节点（包括标签、注释、文本等）
> 元素节点：HTML标签元素
 - nodeType：1
 - nodeName：大写的标签名（部分浏览器的怪异模式下，为小写标签名）
 - nodeValue：null
 - [cur]Element.tagName :获取当前元素的标签名（获取的是大写标签名）
 
> 文本节点 ：文本内容，空格和换行在高版本浏览器中也当做文本节点
 - nodeType：3
 - nodeName：#text
 - nodeValue：文本内容
 
> 注释节点 ：注释内容
 - nodeType：8
 - nodeName：#comment
 - nodeValue：注释内容
 
> document文档节点
 - nodeType：9
 - nodeName：#document
 - nodeValue：null

2. 属性
> childNodes
- 获取当前元素的所有子节点（包括元素子节点、文本、注释等子节点）
- 返回节点集合

> children
- 获取当前元素的所有 __元素子节点__ （只包括元素子节点）
- 返回节点集合（IE6、7、8下会把注释当做元素子节点）

> parentNode
- 获取当前元素的父节点 

> previousSibling、nextSibling
- previousSibling获取当前节点上一个兄弟节点（不一定是元素节点）   
- nextSibling获取当前节点下一个兄弟节点（不一定是元素节点）  
    
> previousElementSibling、nextElementSibling
- previousElementSibling获取当前节点上一个兄弟 __元素节点__  
- nextElementSibling获取当前节点下一个兄弟 __元素节点__   
- IE6、7、8不兼容

> firstChild、lastChild
- firstChild：当前元素第一个子节点（不一定是元素节点）
- lastChild：当前元素最后一个子节点（不一定是元素节点）

> firstElementChild、lastElementChild
- firstElementChild：当前元素第一个__元素子节点__  
- lastElementChild：当前元素最后一个__元素子节点__   
- IE6、7、8不兼容


##  DOM元素创建
1. document.createElement(tagName) 
```
// 可利用a标签的属性解析字符串
var link = document.createElement("a");
link.href = "http://www.baidu.com/stu/?name=zxt&age=22&sex=1#teacher";
console.log(link.hostname); // www.baidu.com
console.log(link.pathname); // /stu/
console.log(link.protocol);// http:
console.log(link.search);   // ?name=zxt&age=22&sex=1
console.log(link.hash);     // #teacher
```

2. document.createTextNode()

```
var newtext = document.createTextNode(text),
p1 = document.getElementById("p1");
p1.appendChild(newtext);
```


3. [parentNode].appendChild()

4. [parentNode].insertBefore(newElement, referenceElement)

5. [parentNode].removeChild(child)

6. [parentNode].replaceChild(newChild, oldChild);

7. node.cloneNode(deep);
   - deep 可选,为true,则该节点的所有后代节点也都会被克隆,如果为false,则只克隆该节点本身.
   
## 属性操作
1. Element.setAttribute(name, value);
2. Element.getAttribute()，返回属性值（string)
3. Element.removeAttribute(attrName); 

```
var oDiv = document.getElementById("div1");
oDiv.index1 = 100;
oDiv.setAttribute("index2","200");
console.dir(oDiv); // index1:100
// 在dom树结构中可看到index2 属性

```

```
var oDiv = document.getElementsByClassName("content")[2];
// 自定义查找上一个 兄弟元素节点
oDiv.getPreviousSiblingEle = function(){
    var previusNode = this.previousSibling;
    while(true){
        if(previusNode.nodeType==1) return previusNode;
        previusNode = previusNode.previousSibling;
    }
}
var previousEle = oDiv.getPreviousSiblingEle();
console.dir(previousEle);
console.dir(oDiv.previousElementSibling);
```

## 文档碎片及dom回流
1. document.createDocumentFragment();

2. DOM 回流(reflows)与重绘(repaints)
    > 调整窗口大小（Resizing the window）
    > 改变字体（Changing the font）
    > 增加或者移除样式表（Adding or removing a stylesheet）
    > 内容变化，比如用户在input框中输入文字（Content changes, such as a user typing text in
    > an input box）
    > 激活 CSS 伪类，比如 :hover (IE 中为兄弟结点伪类的激活)（Activation of CSS pseudo classes such as :hover (in IE the activation of the pseudo class of a sibling)）
    > 操作 class 属性（Manipulating the class attribute）
    > 脚本操作 DOM（A script manipulating the DOM）
    > 计算 offsetWidth 和 offsetHeight 属性（Calculating offsetWidth and offsetHeight）
    > 设置 style 属性的值 （Setting a property of the style attribute）

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>数据绑定以及DOM回流</title>
    <style>
        *{ margin: 0; padding: 0; list-style: none; }
        .box{ width: 400px; margin: 30px auto; border: 2px solid #ccc; border-radius: 5px; padding: 20px; box-sizing: border-box; }
        .box li { position: relative; padding-left: 20px; height: 30px; line-height: 30px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
        .box li span{ display: inline-block; line-height: 20px; text-align: center; width: 20px; height: 20px; border-radius: 50%; border: 1px solid darkblue; background: pink; color: darkmagenta; }
    </style>
</head>
<body>
<div class="box J-box"  id="J-box">
    <ul>
        <li><span>1</span>人社部：降低养老保险缴费缴费 合并生育医疗险</li>
        <li><span>2</span>内部矛盾公开公开公开 达赖发怒拒见“藏独”头目</li>
        <li><span>3</span>"东莞一哥一哥"刘志庚黑色往事 曾称扫黄要有度</li>
        <li><span>4</span>铁路运行图行图调整5月15日实施 高铁将增开“夜班车”</li>
    </ul>
</div>
<script>
    var ary = [
        {
            "title": "习近平：让互联网更好造福国家和人民",
            "desc": "描述1"
        },
        {
            "title": "俞正声与加纳中资企业代表座谈  刘云山会见坦桑尼亚革命党代表团",
            "desc": "描述2"
        },
        {
            "title": "罗振宇杀死了Papi酱？  网红最危险的时刻  骂娘的抗日剧该管吗",
            "desc": "描述3"
        },
        {
            "title": "男子涉杀妻灭子被判死缓 岳父母为其喊冤15年",
            "desc": "描述4"
        }
    ];
</script>
<script>
    //获取我们要操作的元素
    var oDiv = document.getElementById('J-box');
    var oUl = oDiv.getElementsByTagName('ul')[0];
    var oLis = oDiv.getElementsByTagName('li'); //我这会获取的时候是不是新添加的
    for(var i=0; i<oLis.length; i++){
        oLis[i].onmouseover = function (){
            this.style.backgroundColor = 'gray';
        }
        oLis[i].onmouseout = function (){
            this.style.backgroundColor = '';
        }
    }
    //添加新闻
/*    for(var i=0; i<ary.length; i++){ //循环创建数组长度这么多元素，并且追加到ul里
         var li = document.createElement('li');
         li.innerHTML = '<span>'+(i+5)+'</span>'+ary[i].title ; //<li><span>5</span>"东莞一哥一哥"刘志庚黑色往事 曾称扫黄要有度</li>
         oUl.appendChild(li);
     }*/
    //通过appendchild这种方式添加进来的并没有把已经存在事件改变，但是引起了DOM回流（回流次数=循环次数）

    //拼接字符串的方式
/*    var str = "";
     for(var i=0; i<ary.length; i++){
     str += '<li>';
     str += '<span>';
     str += (i+5);
     str += '</span>';
     str += ary[i].title;
     str += '</li>';
     }
     oUl.innerHTML += str ;*/
    //把oUl这个dom对象的innerHTML属性读取然后再拼接上str这个字符串
    //用字符串拼接的方式只引起了一次回流，但是原来存在的元素事件或其他属性全都改变了

    /*
     *  DOM 回流(reflows)与重绘(repaints)
     *      调整窗口大小（Resizing the window）
            改变字体（Changing the font）
            增加或者移除样式表（Adding or removing a stylesheet）
            内容变化，比如用户在input框中输入文字（Content changes, such as a user typing text in
            an input box）
            激活 CSS 伪类，比如 :hover (IE 中为兄弟结点伪类的激活)（Activation of CSS pseudo classes such as :hover (in IE the activation of the pseudo class of a sibling)）
            操作 class 属性（Manipulating the class attribute）
            脚本操作 DOM（A script manipulating the DOM）
            计算 offsetWidth 和 offsetHeight 属性（Calculating offsetWidth and offsetHeight）
            设置 style 属性的值 （Setting a property of the style attribute）
     *
     * */

    //利用文档碎片
    var frg = document.createDocumentFragment(); //可以理解为是一个临时的容器
    //console.dir(frg);
    for(var i=0; i<ary.length; i++){
        //需要先创建一个li标签
        var li = document.createElement('li');
        li.innerHTML = '<span>' + (i+5) + '</span>' + ary[i]['title'];
        //把刚创建的这个li放到文档碎片frg中
        frg.appendChild(li);
    }
    //把这个文档碎片加到oul中
    oUl.appendChild(frg);
    frg = null;

    /*
     *   DOM的动态数据绑定,dom中元素的数量和外部的数据多少联系起来，就是动态的数据绑定
     *
     *
     * */
</script>
</body>
</html>


```	
	