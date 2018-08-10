# 事件

- 事件是可以被 JavaScript 侦测到的行为。
## 鼠标事件
   onclick	当用户点击某个对象时调用的事件句柄。	2  
   oncontextmenu	在用户点击鼠标右键打开上下文菜单时触发	    
   ondblclick	当用户双击某个对象时调用的事件句柄。	2   
   onmousedown	鼠标按钮被按下。	2  
   onmouseenter	当鼠标指针移动到元 素上时触发。	2   
   onmouseleave	当鼠标指针移出元素时触发	2  
   onmousemove	鼠标被移动。	2   
   onmouseover	鼠标移到某元素之上。	2   
   onmouseout	鼠标从某元素移开。	2   
   onmouseup	鼠标按键被松开。  2   
     
## 键盘事件
 
onkeydown	某个键盘按键被按下。	2   
onkeypress	某个键盘按键被按下并松开。	2   
onkeyup	某个键盘按键被松开。   2  
 
## 框架/对象（Frame/Object）事件
 
onabort	图像的加载被中断。 ( <object>)	2
onerror	在加载文档或图像时发生错误。 ( <object>, <body>和 <frameset>)	   
onload	一张页面或一幅图像完成加载。	2
onresize	窗口或框架被重新调整大小。	2
onscroll	当文档被滚动时发生的事件。	2
onunload	用户退出页面。 ( <body> 和 <frameset>)	2     

##  表单事件
onblur	元素失去焦点时触发	2  
onchange	该事件在表单元素的内容改变时触发( <input>, <keygen>, <select>, 和 <textarea>)	2   
onfocus	元素获取焦点时触发	2  
onfocusin	元素即将获取焦点时触发	2  
onfocusout	元素即将失去焦点时触发	2  
oninput	元素获取用户输入时触发	3   
onreset	表单重置时触发	2   
onsearch	用户向搜索域输入文本时触发 ( <input="search">)	   
onselect	用户选取文本时触发 ( <input> 和 <textarea>)	2  
onsubmit	表单提交时触发	2  

## DOM 事件

1. DOM 0级事件处理程序

```
//一是在标签内写onclick事件
//二是在JS写onclick=function（）{}函数

<input id="myButton" type="button" value="Press Me" onclick="alert('thanks');" >
document.getElementById("myButton").onclick = function () {
    alert('thanks');
}
```

2. 没有DOM 1级事件处理程序
DOM级别1于1998年10月1日成为W3C推荐标准。1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。

3. DOM 2级事件处理程序
- addEventListener / removeEventListener 
- 它们都有三个参数：
   > 第一个参数是事件名（如click）；
   > 第二个参数是事件处理程序函数；
   > 第三个参数如果是true则表示在捕获阶段调用，为false表示在冒泡阶段调用。
- addEventListener():可以为元素添加多个事件处理程序，触发时会按照添加顺序依次调用。
- removeEventListener():不能移除匿名添加的函数。
- dom 0级 事件是元素的私有属性，如onclick， 而addEventListener 是位于 EventTarget上   

## IE 事件处理程序
- attachEvent/ detachEvent
- 接受2个参数，事件名称和事件处理回调函数；只支持冒泡

```
   var EventUtil = {
       addHandler:function (ele,type,handler) {
           if(ele.addEventListener){
               ele.addEventListener("type",handler,false);
           }else if(ele.attachEvent){
               ele.attachEvent("on"+type,handler);
           }else{
               ele["on"+type] = handler;
           }
       },
       removeHandler:function (ele,type,handler) {
           if(ele.removeEventListener){
               ele.removeEventListener("type",handler,false);
           }else if(ele.detachEvent){
               ele.detachEvent("on"+type,handler);
           }else{
               ele["on"+type] = null;
           }
       }
   }
```

5. 鼠标事件对象
- 鼠标事件触发时，浏览器默认给方法传递一个参数 MouseEvent
- MouseEvent ---> UIEvent ---> Event ---> Object 
- MouseEvent 记录的是页面唯一一个鼠标触发时的相关信息，和在哪个元素上触发没有关系   


## DOM事件流
- DOM2 级事件规定的事件流包含3个阶段：事件捕获阶段/处于目标阶段和事件冒泡阶段。
首先是事件捕获（Netscape 事件流），然后是目标接收到事件，最后是冒泡阶段（IE浏览器事件流）。

![DOM事件流](./DOM事件流.png)










