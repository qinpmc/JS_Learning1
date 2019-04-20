# Form 表单

<form>元素代表了表单，继承了 HTMLFormElement 接口。

## 1 HTMLFormElement 的实例属性

- elements：返回一个类似数组的对象，成员是属于该表单的所有控件元素。该属性只读。
- length：返回一个整数，表示属于该表单的控件数量。该属性只读。
- name：字符串，表示该表单的名称。
- method：字符串，表示提交给服务器时所使用的 HTTP 方法。
- action：字符串，表示表单提交数据的 URL。
- enctype（或encoding）：字符串，表示表单提交数据的编码方法，可能的值有- application/x-www-form-urlencoded、multipart/form-data和text/plain。
- acceptCharset：字符串，表示服务器所能接受的字符编码，多个编码格式之间使用逗号或空格分隔。
- target：字符串，表示表单提交后，服务器返回的数据的展示位置。
- autocomplete：字符串on或off，表示浏览器是否要对<input>控件提供自动补全。
- noValidate：布尔值，表示是否关闭表单的自动校验。

## 2  HTMLFormElement 的实例方法

- submit()：提交表单，但是不会触发submit事件和表单的自动校验。
- reset()：重置表单控件的值为默认值。
- checkValidity()：如果控件能够通过自动校验，返回true，否则返回false，同时触发invalid事件。

**获取表单**

1. document.getElementById("form1"); // 获取id 为form1的表单
2. document.forms[0] // 获取页面中第一个表单
3. document.forms["form2]  // 获取页面中name为 form2 的表单

## 3 表单操作

### 3.1 提交表单

以下3种均可提交表单：

```
<input type="submit" value="Submit Form">
<button type="submit">Submit</button>
<input type="image" src="./提交.png"> 

```
利用编程的方式也可提交表单，但这种方式不会触发submit 事件

```
form.submit(); // 编程方式提交表单，不会触发submit 事件
```

### 3.2 重置表单

以下2种均可重置表单：

```
<input type="reset" value="Reset Form">
<button type="reset" >重置</button>
```

利用编程的方式也可重置表单，这种方式会触发 reset 事件

```
form.reset(); // 编程方式重置表单，会触发reset 事件
```


## 4 表单字段

### 4.1 共有的表单字段属性

- disabled：布尔值，是否禁用
- form：指向表单的指针，只读
- name：字段的名称
- readonly：布尔值：只读
- tabInex：字段的切换序号
- type：类型，reset/submit/button/select-one/select-multiple等
- value：值，提交给服务器的值

### 4.2 共有的表单字段方法
- focus:
- blur：

### 4.3 共有的表单字段事件
- blur
- change: input和textarea 元素，失去焦点且value改变触发；select在选项改变时触发
- focus


## 5 文本框脚本

### 5.1 选择文本

1. select(): 选择全部文本
2. setSelectionRange(start,end)：选择部分文本

示例：6选择文本.html

3. 获取选择的文本属性
- selectionStart
- selectionEnd

### 5.2 过滤输入


```
textbox.addEventListener("keypress",function(e){
    var target = e.target;
    var charCode = e.charCode;
    // 只允许输入数字
    if(!/\d/.test(String.fromCharCode(charCode))){
        e.preventDefault();
    }
})

```
示例：7过滤输入.html





















