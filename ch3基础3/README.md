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
 