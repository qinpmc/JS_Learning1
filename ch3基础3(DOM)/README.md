# DOM

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。  
它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。

DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成.

**DOM 元素的原型链**
oDiv --- HTMLDivElement --- HTMLElement --- Element ---Node ---EventTarget --- Object

## 1 Node

DOM1 级定义了一个 Node 接口，该接口由 DOM 所有节点类型实现。
常见的节点类型如下：

- 元素节点（element）：1，对应常量 Node.ELEMENT_NODE
- 属性节点（attr）：2，对应常量 Node.ATTRIBUTE_NODE
- 文本节点（text）：3，对应常量 Node.TEXT_NODE
- 注释节点（Comment）：8，对应常量 Node.COMMENT_NODE
- 文档节点（document）：9，对应常量 Node.DOCUMENT_NODE
- 文档片断节点（DocumentFragment）：11，对应常量 Node.DOCUMENT_FRAGMENT_NODE
- 文档类型节点（DocumentType）：10，对应常量 Node.DOCUMENT_TYPE_NODE

### 1.1 nodeType /nodeName/ nodeValue

**只有文本节点（text）、注释节点（comment）和属性节点（attr）有 nodeValue 文本值**，  
 因此这三类节点的 nodeValue 可以返回结果，其他类型的节点一律返回 null。

> 元素节点：HTML 标签元素

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

> document 文档节点

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

- 获取当前元素的所有 **元素子节点** （只包括元素子节点）
- 返回节点集合（IE6、7、8 下会把注释当做元素子节点）

### 1.4 parentNode、parentElement

- 获取当前元素的父节点

### 1.5 previousSibling、nextSibling

- previousSibling 获取当前节点上一个兄弟节点（不一定是元素节点）
- nextSibling 获取当前节点下一个兄弟节点（不一定是元素节点）

### 1.6 previousElementSibling、nextElementSibling

- previousElementSibling 获取当前节点上一个兄弟 **元素节点**
- nextElementSibling 获取当前节点下一个兄弟 **元素节点**
- IE6、7、8 不兼容

### 1.7 firstChild、lastChild

- firstChild：当前元素第一个子节点（不一定是元素节点）
- lastChild：当前元素最后一个子节点（不一定是元素节点）

### 1.8 firstElementChild、lastElementChild

- firstElementChild：当前元素第一个**元素子节点**
- lastElementChild：当前元素最后一个**元素子节点**
- IE6、7、8 不兼容

### 1.9 Node.prototype.baseURI

- baseURI 属性返回一个字符串，表示当前网页的绝对路径。
- 以使用 HTML 的<base>标签，改变该属性的值。

```
// 当前网页的网址为
// http://www.example.com/index.html
document.baseURI
// "http://www.example.com/index.html"
```

### 1.10 Node.prototype.ownerDocument

Node.ownerDocument 属性返回当前节点所在的顶层文档对象，即 document 对象。

### 1.11 [parentNode].appendChild()

### 1.12 [parentNode].insertBefore(newElement, referenceElement)

### 1.13 [parentNode].removeChild(child)

### 1.14 [parentNode].replaceChild(newChild, oldChild);

### 1.15 node.cloneNode(deep);

- deep 可选,为 true,则该节点的所有后代节点也都会被克隆,如果为 false,则只克隆该节点本身.

### 1.16 Node.prototype.normalize()

normalize 方法用于清理当前节点内部的所有文本节点（text）。  
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

- returns the **Element** that is the root element of the document
  (for example, the `<html>` element for HTML documents).
  HTML 网页的该属性，一般是<html>节点.

3. document.body，document.head

- Returns the `<body>` or `<frameset>` node of the current document
  -returns the `<head>` element of the current document

### 2.2 节点集合属性

1. document.links

返回当前文档所有设定了 href 属性的<a>及<area>节点。

2. document.forms
   除了使用位置序号，id 属性和 name 属性也可以用来引用表单。

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

document.domain 基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把 document.domain 设为对应的上级域名。  
比如，当前域名是 a.sub.example.com，则 document.domain 属性可以设置为 sub.example.com，也可以设为 example.com。  
修改后，document.domain 相同的两个网页，可以读取对方的资源，比如设置的 Cookie。

2. document.location
   Location 对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过 window.location 也可获得。

3. document.title、document.characterSet

4. document.documentURI，document.URL
   都返回一个字符串，表示当前文档的网址。  
   不同之处是它们继承自不同的接口，documentURI 继承自 Document 接口，可用于所有文档；URL 继承自 HTMLDocument 接口，只能用于 HTML 文档。

```
document.URL
// http://www.example.com/about

document.documentURI === document.URL
// true
```

### 2.4 document.cookie

### 2.5 方法

- document.open()，document.close()
- document.write()，document.writeln()
- document.querySelector()，document.querySelectorAll()
- document.getElementsByTagName()
- document.getElementsByClassName()
- document.getElementsByName()
- document.getElementById()
- document.createElement()
- document.createTextNode()
- document.createAttribute()
- document.createComment()
- document.createDocumentFragment()
- document.createEvent()
- document.addEventListener()，document.removeEventListener()，document.dispatchEvent()

1. document.getElementById

- 上下文只能是 document
- returns an **Element** object

2. [context].getElementsByTagName

- returns **HTMLCollection**

3. [context].getElementsByClassName

- returns **HTMLCollection**
- IE6-8 下不兼容
- 如果查找多个类，类名顺序不重要，[context].getElementsByClassName("item2 item1")，  
  可以匹配 <div class='item1 item2'>

4. document.getElementsByName

- 上下文只能是 document
- returns **NodeList** Collection
- IE 浏览器(9 及以下)只能识别表单元素的 name 属性，一般用于操作表单元素

5. [context].querySelector

- Returns the first element that is a descendant of the element
- 静态的

6. [context].querySelectorAll()

- returns a **static** (not live) NodeList（静态的）
- querySelector 和 querySelectorAll 在 IE6、7、8 下不兼容，一般多用于移动端开发

**一般说的都是 getElement(s)Byxxxx 获取的是动态集合，querySelector 获取的是静态集合**

```
// 死循环
<body>
<ul id="box">
    <li class="a">测试1</li>
    <li class="a">测试2</li>
    <li class="a">测试3</li>
</ul>
</body>
<script type="text/javascript">
//获取到ul，为了之后动态的添加li
    var ul = document.getElementById('box');
//获取到现有ul里面的li
    var list = ul.getElementsByTagName('li');
     for(var i =0;i<list.length;i++){  //死循环
        ul.appendChild(document.createElement('li')); //动态追加li
    }
</script>
```

```
<body>
<ul id="box">
    <li class="a">测试1</li>
    <li class="a">测试2</li>
    <li class="a">测试3</li>
</ul>
</body>
<script type="text/javascript">
//获取到ul，为了之后动态的添加li
     var ul = document.querySelector('ul');
//获取到现有ul里面的所有li
     var list = ul.querySelectorAll('li');
     for(var i = 0;i<list.length;i++){
         ul.appendChild(document.createElement('li'));//动态追加li
     }
console.log(list.length); //输出的结果仍然是3，不是此时li的数量6
</script>

```

7. document.createElement(tagName)

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

8. document.createTextNode()

```
var newtext = document.createTextNode(text),
p1 = document.getElementById("p1");
p1.appendChild(newtext);
```

9. document.createEvent()/dispatchEvent()

document.createEvent 方法生成一个事件对象（Event 实例），该对象可以被 element.dispatchEvent 方法使用，触发指定事件。

```
var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  console.log(e.type); // "build"
}, false);
document.dispatchEvent(event);
```

## 3 Element

## 3.1 元素特性的相关属性

- Element.id
- Element.tagName 返回指定元素的大写标签名,与 nodeName 属性的值相等
- Element.accessKey 分配给当前元素的快捷键, btn.accessKey // "h"
- Element.draggable 返回一个布尔值，表示当前元素是否可拖动
- Element.lang 当前元素的语言设置 <html lang="en">
- Element.tabIndex 返回一个整数，表示当前元素在 Tab 键遍历时的顺序
- Element.title 读写当前元素的 HTML 属性 title

## 3.2 元素状态的相关属性

- Element.contentEditable，
- Element.attributes  
  属性返回一个类似数组的对象，NamedNodeMap
- Element.className，Element.classList  
  className 属性用来读写当前元素节点的 class 属性。它的值是一个字符串，每个 class 之间用空格分割。  
  **classList 属性返回一个类似数组的对象**，当前元素节点的每个 class 就是这个对象的一个成员.

```
console.log(div.className);
// "one two three"

console.log(div.classList);
// object DOMTokenList]: {0: "one", 1: "two", 2: "three", length: 3, value: "one two three"}

```

**classList 对象有下列方法**:

- add()：增加一个 class。
- remove()：移除一个 class。
- contains()：检查当前元素是否包含某个 class。
- toggle()：将某个 class 移入或移出当前元素。
- item()：返回指定索引位置的 class。
- toString()：将 class 的列表转为字符串。

## 3.3 Element.innerHTML / outerHTML

返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写.  
如果文本节点包含&、小于号（<）和大于号（>），innerHTML 属性会将它们转为实体形式&amp;、&lt;、&gt;

```
// HTML代码如下 <p id="para"> 5 > 3 </p>
document.getElementById('para').innerHTML
// 5 &gt; 3

```

outerHTML 属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。

```
// HTML 代码如下
// <div id="d"><p>Hello</p></div>
var d = document.getElementById('d');
d.outerHTML
// '<div id="d"><p>Hello</p></div>'

```

## JS 盒子模型(13 个)

1. client

   > top
   > left
   > width
   > height

2. offset

   > top
   > left
   > width
   > height
   > parent

3. scroll
   > top
   > left
   > width
   > height

## 3.4 Element.clientHeight，Element.clientWidth

1. Element.clientHeight 属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），**只对块级元素生效**，对于行内元素返回 0。  
   如果块级元素没有设置 CSS 高度，则返回实际高度。

2. 除了元素本身的高度，它还**包括 padding**部分，但是**不包括 border、margin**。  
   如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。

3. Element.clientWidth 属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和 padding，  
   如果有垂直滚动条，还要减去垂直滚动条的宽度。

4. 该值和是否溢出无关，和是否设置了 overflow:hidden 无关，就是设定的内容宽/高（如未显示设置，为内容撑开占据的宽/高）+padding

注意：不设置 height 等于 300px 时
oDiv.clientHeight //240 （此时内容不溢出），
oDiv.clientHeight //570 （增加内容，文本框高度自动扩大，此时内容不溢出）

设置 height 等于 300px 时  
oDiv.clientHeight //360 ;360px = 300px(height) + 上下 padding(30px),此时内容不溢出
oDiv.clientHeight //360 ;增加内容,文本内容溢出，clientHeight 仍为 360

document.documentElement 的 clientHeight 属性，返回当前视口的高度（即浏览器窗口的高度），  
等同于 window.innerHeight 属性减去水平滚动条的高度（如果有的话）。  
document.body 的高度则是网页的实际高度。  
一般来说，document.body.clientHeight 大于 document.documentElement.clientHeight。

```
document.body.clientHeight;//25597

document.documentElement.clientHeight;//722

```

## 3.5 clientLeft、clientTop

Element.clientLeft 属性等于元素节点**左边框（left border）的宽度**（单位像素），不包括左侧的 padding 和 margin。
如果**没有设置左边框，或者是行内元素（display: inline），该属性返回 0**。该属性总是返回整数值，如果是小数，会四舍五入。  
Element.clientTop 属性等于网页元素顶部边框的宽度（单位像素），其他特点都与 clientLeft 相同。

## 3.6 scrollWidth /scrollHeight

> 内容不溢出时，和 clientWidth、cientHeight 一致，
> 溢出时，其值为真实内容的高度/宽度 + 上填充/左填充

Element.scrollHeight 属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。  
它包括 padding，但是不包括 border、margin 以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（::before 或::after）的高度。

## 3.7 scrollLeft/ scrollTop

- 滚动条卷去的宽度/高度 ，scrollTop 最大值为 document.documentElement.scrollHeight - document.documentElement.clientHeight
- 对于那些没有滚动条的网页元素，这两个属性总是等于 0。因此该值 介于 0~ document.documentElement.scrollHeight - document.documentElement.clientHeight
- 该值可以读，还可以写

## 3.8 offsetHeight/offsetWidth (和 clientHeight 类似)

Element.offsetHeight 属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），  
包括元素本身的**高度、padding 和 border，以及水平滚动条的高度**（如果存在滚动条）.  
offsetWidth 类似。

(设置 height 时，和内容是否溢出没有关系)
offsetHeight; //380 = clientHeight + 上下 border 高度
offsetWidth ;// 380 = clientWidth + 上下 border 宽度

(不设置 height 时，增加内容，文本框高度自动扩大，此时内容不溢出，offsetHeight = clientHeight + 上下 border 高度

## 3.9 offsetLeft / offsetTop 当前元素的外边框距离父级参照物内边框的偏移量

(chrome 测试时，如果 offsetParent 为 body，则会包含 body 的边框值及 margin 值？)

## 3.10 offsetParent 当前元素的父级参照物

Element.offsetParent 属性返回最靠近当前元素的、并且 CSS 的 position 属性不等于 static 的上层元素。

- 1. 元素自身有 fixed 定位，offsetParent 的结果为 null（ 元素有 fixed 定位，固定定位元素相对于视口定位，
     没有定位父级，因此返回 null; firefox 返回 body）
- 2. 元素 display: none，则其 offsetParent 的结果为 null
- 3. 元素自身无 fixed 定位，父级元素存在定位的元素， offsetParent 为 离自身最近的经过定位的(position 属性不等于 static)父级元素
- 4. 元素自身无 fixed 定位，父级元素都未定位， offsetParent 为 body
- 5. body 元素的 offsetParent 是 null
- 6. ie7- bug :
     (1) 元素本身经过绝对定位或相对定位，且父级元素无定位的元素，ie7-下 offsetParent 是 html；  
      (2) 父级元素存在 haslayout 的元素或者经过定位的元素，则元素的 offsetParent 为经过定位或触发了 haslayout 的父级元素

## 3.11 Element.style

## 3.12 Element.children

返回一个类似数组的对象（HTMLCollection 实例），包括当前元素节点的所有子元素。

## 3.13 Element.firstElementChild，Element.lastElementChild

## 3.14 Element.nextElementSibling，Element.previousElementSibling

## 3.15 方法

- getAttribute(attrName)：读取某个属性的值，返回属性值（string)
- getAttributeNames()：返回当前元素的所有属性名
- setAttribute(name, value)：写入属性值
- hasAttribute(attrName)：表示当前元素节点是否包含指定属性
- hasAttributes()： 性返回一个布尔值，表示当前元素是否有属性
- removeAttribute(attrName)：删除属性

- Element.querySelector()
- Element.querySelectorAll()
- Element.getElementsByClassName()
- Element.getElementsByTagName()

- Element.getBoundingClientRect()
- Element.remove()
- Element.focus()，Element.blur()
- Element.click()

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

```
getBoundingClientRect方法返回的rect对象，具有以下属性（全部为只读）。

x：元素左上角相对于视口的横坐标
y：元素左上角相对于视口的纵坐标
height：元素高度
width：元素宽度
left：元素左上角相对于视口的横坐标，与x属性相等
right：元素右边界相对于视口的横坐标（等于x + width）
top：元素顶部相对于视口的纵坐标，与y属性相等
bottom：元素底部相对于视口的纵坐标（等于y + height）


```

## 3 HTMLCollection 和 NodeList

1. 相同点：

- 都是类数组对象，都有 length 属性
- 都有共同的方法：item，可以通过 item(index)或者 item(id)来访问返回结果中的元素
- 都是实时变动的（live），document 上的更改会反映到相关对象上（例外：document.querySelectorAll 返回的 NodeList 不是实时的）

2. 区别是：

- NodeList 可以包含任何节点类型，HTMLCollection 只包含元素节点（elementNode），elementNode 就是 HTML 中的标签
- HTMLCollection 比 NodeList 多一项方法：namedItem，可以通过传递 id 或 name 属性来获取节点信息

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

## 4 Text

文本节点（Text）代表元素节点（Element）和属性节点（Attribute）的文本内容。

通常我们使用父节点的 firstChild、nextSibling 等属性获取文本节点，或者使用 Document 节点的 createTextNode 方法创造一个文本节点。

```
// 获取文本节点
var textNode = document.querySelector('p').firstChild;
```

### 4.1 Text 节点的属性

- data data 属性等同于 nodeValue 属性
- length
- nextElementSibling，previousElementSibling

```
// HTML 为
// <div>Hello <em>World</em></div>
var tn = document.querySelector('div').firstChild;
tn.nextElementSibling
// <em>World</em>
```

### 4.2 Text 节点的方法

以下 5 个方法都是编辑 Text 节点文本内容的方法。

- appendData()：在 Text 节点尾部追加字符串。
- deleteData()：删除 Text 节点内部的子字符串，第一个参数为子字符串开始位置，第二个参数为子字符串长度。
- insertData()：在 Text 节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。
- replaceData()：用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。
- subStringData()：用于获取子字符串，第一个参数为子字符串在 Text 节点中的开始位置，第二个参数为子字符串长度。

## 5 文档碎片及 dom 回流

1. document.createDocumentFragment();

2. DOM 回流(reflows)与重绘(repaints)
   > 调整窗口大小（Resizing the window）
   > 改变字体（Changing the font）
   > 增加或者移除样式表（Adding or removing a stylesheet）
   > 内容变化，比如用户在 input 框中输入文字（Content changes, such as a user typing text in
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

## 6 CSS 操作

操作 CSS 样式最简单的方法，就是使用网页元素节点的 getAttribute 方法、setAttribute 方法和 removeAttribute 方法，  
直接读写或删除网页元素的 style 属性。

```
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);

```

### 6.1 CSSStyleDeclaration 接口

CSSStyleDeclaration 接口用来操作元素的样式。三个地方部署了这个接口。

- 元素节点的 style 属性（Element.style）
- CSSStyle 实例的 style 属性
- window.getComputedStyle()的返回值

注意：Element.style 返回的只是**行内样式**，并不是该元素的全部样式。  
 通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。元素的**全部样式要通过 window.getComputedStyle()**得到。

```
var divStyle = document.querySelector('div').style;

divStyle.backgroundColor = 'red'; //  backgroundColor 为 background-color
divStyle.border = '1px solid black';
divStyle.width = '100px';

```

-
注意：

- **float 写成 cssFloat**
- **background-color 写成 backgroundColor**
- 属性值都是字符串，设置时必须**包括单位**，但是不含规则结尾的分号。比如，divStyle.width 不能写为 100，而要写为 100px。

#### 6.1.1 实例属性

- cssText 用来读写当前规则的所有样式声明文本。
- length 表示当前规则包含多少条样式声明。

```
var divStyle = document.querySelector('div').style;

divStyle.cssText = 'background-color: red;'
  + 'border: 1px solid black;'
  + 'height: 100px;'
  + 'width: 100px;';

```

#### 6.1.2 实例方法

- getPropertyPriority()  
  接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置 important 优先级。如果有就返回 important，否则返回空字符串

- getPropertyValue()  
  接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。

- item() 接受 整数值作为参数，返回该位置的 CSS 属性名
- removeProperty() 接受一个属性名作为参数，在 CSS 规则里面移除这个属性
- setProperty() 接受三个参数。

  第一个参数：属性名，该参数是必需的。  
   第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。  
   第三个参数：优先级，该参数可选。如果设置，唯一的合法值是 important，表示 CSS 规则里面的!important。

```
// <div id="myDiv" style="margin: 10px!important; color: red;"/>
var style = document.getElementById('myDiv').style;
style.margin // "10px"
style.getPropertyPriority('margin') // "important"

var style = document.getElementById('myDiv').style;
style.margin // "10px"
style.getPropertyValue("margin") // "10px"

```

### 6.2 window.getComputedStyle()

参数：

- 第一个参数：一个节点对象，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息
- 第二个参数： 表示当前元素的伪元素（比如:before、:after、:first-line、:first-letter 等）。

```
    .box:before{
        content: "我在前面 before";
        display: block;
        text-align: center;
        background: lightcoral;
        margin: 10px;
    }


    var oDiv = document.getElementById("div1");
    var beforeContent = window.getComputedStyle(oDiv,"before")["display"];

    console.log(beforeContent); // "block"

```
