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

//DOM 元素的原型链 
oDiv --- HTMLDivElement --- HTMLElement --- Element ---Node ---EventTarget --- Object
