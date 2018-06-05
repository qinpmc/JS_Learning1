# DOM

## 获取DOM元素的方法
1. document.getElementById 
 - returns an __Element__ object 
2. [context].getElementByTagName 
 - returns __HTMLCollection__
3. [context].getElementByClassName
 - returns  __HTMLCollection__
4. document.getElementsByName 
 - returns __NodeList__ Collection
 - IE浏览器只能识别表单元素的name属性，一般用于操作表单元素
5. document.documentElement
 - returns the __Element__ that is the root element of the document 
   (for example, the `<html>` element for HTML documents).
6. Document.body
 - Returns the `<body>` or `<frameset>` node of the current document
7. Document.head
   -returns the `<head>` element of the current document
8. [context].querySelector
 - Returns the first element that is a descendant of the element
9. [context].querySelectorAll()
- returns a __static__ (not live) NodeList
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

2. [parentElement].appendChild()

3. [parentElement].insertBefore(newElement, referenceElement)


