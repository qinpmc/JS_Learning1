# DOM

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。    
它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。             

DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成.           



**DOM元素的原型链**
oDiv --- HTMLDivElement --- HTMLElement --- Element ---Node ---EventTarget --- Object

## 1 Node
DOM1级定义了一个Node接口，该接口由DOM所有节点类型实现。
常见的节点类型如下：  

- 元素节点（element）：1，对应常量Node.ELEMENT_NODE
- 属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
- 文本节点（text）：3，对应常量Node.TEXT_NODE
- 注释节点（Comment）：8，对应常量Node.COMMENT_NODE
- 文档节点（document）：9，对应常量Node.DOCUMENT_NODE
- 文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE
- 文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE

   
### 1.1 nodeType /nodeName/ nodeValue


**只有文本节点（text）、注释节点（comment）和属性节点（attr）有nodeValue文本值**，  
 因此这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。
 

> 元素节点：HTML标签元素
 - nodeType：1
 - nodeName：大写的标签名（部分浏览器的怪异模式下，为小写标签名）
 - nodeValue：null
 - [cur]Element.tagName :获取当前元素的标签名（获取的是大写标签名）
 
> 属性节点
- nodeType:2
- nodeName： 属性名称
- nodeValue： 属性值

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
 - parentNode:null

> DocumentFragment
 - nodeType：11
 - nodeName：#document-fragment
 - nodeValue： null
 
### 1.2 childNodes
- 获取当前元素的所有子节点（包括元素子节点、文本、注释等子节点）
- 返回节点集合

### 1.3 children
- 获取当前元素的所有 __元素子节点__ （只包括元素子节点）
- 返回节点集合（IE6、7、8下会把注释当做元素子节点）

### 1.4 parentNode、.parentElement
- 获取当前元素的父节点 

### 1.5 previousSibling、nextSibling
- previousSibling获取当前节点上一个兄弟节点（不一定是元素节点）   
- nextSibling获取当前节点下一个兄弟节点（不一定是元素节点）  
    
### 1.6 previousElementSibling、nextElementSibling
- previousElementSibling获取当前节点上一个兄弟 __元素节点__  
- nextElementSibling获取当前节点下一个兄弟 __元素节点__   
- IE6、7、8不兼容

### 1.7 firstChild、lastChild
- firstChild：当前元素第一个子节点（不一定是元素节点）
- lastChild：当前元素最后一个子节点（不一定是元素节点）

### 1.8 firstElementChild、lastElementChild
- firstElementChild：当前元素第一个__元素子节点__  
- lastElementChild：当前元素最后一个__元素子节点__   
- IE6、7、8不兼容

### 1.9 Node.prototype.baseURI
- baseURI属性返回一个字符串，表示当前网页的绝对路径。
- 以使用 HTML 的<base>标签，改变该属性的值。

```
// 当前网页的网址为
// http://www.example.com/index.html
document.baseURI
// "http://www.example.com/index.html"
```


### 1.10 Node.prototype.ownerDocument
Node.ownerDocument属性返回当前节点所在的顶层文档对象，即document对象。

### 1.11 [parentNode].appendChild()

### 1.12 [parentNode].insertBefore(newElement, referenceElement)

### 1.13 [parentNode].removeChild(child)

### 1.14 [parentNode].replaceChild(newChild, oldChild);

### 1.15 node.cloneNode(deep);
- deep 可选,为true,则该节点的所有后代节点也都会被克隆,如果为false,则只克隆该节点本身.

### 1.16 Node.prototype.normalize()
normalize方法用于清理当前节点内部的所有文本节点（text）。   
它会去除空的文本节点，并且将毗邻的文本节点合并成一个.    

```
var wrapper = document.createElement('div');

wrapper.appendChild(document.createTextNode('Part 1 '));
wrapper.appendChild(document.createTextNode('Part 2 '));

wrapper.childNodes.length // 2
wrapper.normalize();
wrapper.childNodes.length // 1

```



## 2 Document

### 2.1 快捷方式属性
1. document.doctype

```
var doctype = document.doctype;
doctype // "<!DOCTYPE html>"
doctype.name // "html"
```
2. document.documentElement
 - returns the __Element__ that is the root element of the document 
   (for example, the `<html>` element for HTML documents).
HTML网页的该属性，一般是<html>节点.
 
3. document.body，document.head 
- Returns the `<body>` or `<frameset>` node of the current document
-returns the `<head>` element of the current document
 
### 2.2 节点集合属性

1. document.links

返回当前文档所有设定了href属性的<a>及<area>节点。

2. document.forms
除了使用位置序号，id属性和name属性也可以用来引用表单。

```
/* HTML 代码如下
  <form name="foo" id="bar"></form>
*/
document.forms[0] === document.forms.foo // true
document.forms.bar === document.forms.foo // true
```

3. document.images

4. document.scripts

 
### 2.3 文档静态信息属性
1. document.domain

document.domain基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把document.domain设为对应的上级域名。           
比如，当前域名是a.sub.example.com，则document.domain属性可以设置为sub.example.com，也可以设为example.com。         
修改后，document.domain相同的两个网页，可以读取对方的资源，比如设置的 Cookie。     


2. document.location
Location对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过window.location也可获得。    

3. document.title、document.characterSet

4. document.documentURI，document.URL
都返回一个字符串，表示当前文档的网址。       
不同之处是它们继承自不同的接口，documentURI继承自Document接口，可用于所有文档；URL继承自HTMLDocument接口，只能用于 HTML 文档。  

```
document.URL
// http://www.example.com/about

document.documentURI === document.URL
// true
```

### 2.4 document.cookie









## 3 HTMLCollection和NodeList
1. 相同点：
- 都是类数组对象，都有length属性
- 都有共同的方法：item，可以通过item(index)或者item(id)来访问返回结果中的元素
- 都是实时变动的（live），document上的更改会反映到相关对象上（例外：document.querySelectorAll返回的NodeList不是实时的）

2. 区别是：
- NodeList可以包含任何节点类型，HTMLCollection只包含元素节点（elementNode），elementNode就是HTML中的标签
- HTMLCollection比NodeList多一项方法：namedItem，可以通过传递id或name属性来获取节点信息


```
    var oList = document.body.childNodes;
    console.dir(oList);    //NodeList(7)
    console.dir(document.body.children); //HTMLCollection(2)

    var div1 = document.getElementById("div1");
    var liAry = div1.getElementsByTagName("li");
    console.log(liAry) ;// HTMLCollection(3) [li, li, li]

    var divAry = div1.getElementsByClassName("cotent");
    console.log(divAry) ;// HTMLCollection(3)

    var imgs = document.images;
    console.log(imgs) ;//HTMLCollection(2) [img, img]


    // HTML 代码如下
    // <img id="pic" src="http://example.com/foo.jpg">

    // namedItem方法的参数是一个字符串，表示id属性或name属性的值，返回对应的元素节点。如果没有对应的节点，则返回null。
    var pic = document.getElementById('pic');
    document.images.namedItem('pic') === pic // true
```


## 1 获取DOM元素的方法
1. document.getElementById 
 - 上下文只能是document
 - returns an __Element__ object 
 
2. [context].getElementsByTagName 
 - returns __HTMLCollection__
 
3. [context].getElementsByClassName
 - returns  __HTMLCollection__
 - IE6-8下不兼容
 - 如果查找多个类，类名顺序不重要，[context].getElementsByClassName("item2 item1")，    
 可以匹配 <div class='item1 item2'>
 
4. document.getElementsByName 
 - 上下文只能是document
 - returns __NodeList__ Collection
 - IE浏览器(9及以下)只能识别表单元素的name属性，一般用于操作表单元素

   
8. [context].querySelector
 - Returns the first element that is a descendant of the element
 
9. [context].querySelectorAll()
- returns a __static__ (not live) NodeList（静态的）
- querySelector和querySelectorAll在IE6、7、8下不兼容，一般多用于移动端开发








## 4 DOM的节点
 
 

##  5 DOM元素创建


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


3.
   
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
	