# PC浏览器内核
1. chrome: 曾经Webkit 内核（V8)引擎，现在为Blink
2. Safari：WebKit内核
2. Firefox：Gecko内核 ，[‘gekəʊ]
3. Opera：Presto内核，曾经 [‘prestəʊ]，现在为Blink
4. IE：Trident内核，[‘traɪd(ə)nt]

# 移动端浏览器内核
1. iPhone、iPad 等苹果iOS 平台主要是 WebKit
2. Android 4.4 之前的 Android 系统浏览器内核是 WebKit，
3. Android4.4 系统浏览器切换到了Chromium，内核是 Webkit 的分支 Blink
4. Windows Phone 8 系统浏览器内核是 Trident。

# 浏览器兼容处理
1. -moz-     /* 火狐等使用Mozilla浏览器引擎的浏览器 */
2. -webkit-  /* Safari, 谷歌浏览器等使用Webkit引擎的浏览器 */
3. -o-       /* Opera浏览器(早期) */
4. -ms-      /* Internet Explorer

# 引入JS的3种方式

```
<body>
   <!-- 行内方式-->
    <div onclick="alert('Hello World!')">Click me !!</div>
   <!--内嵌式-->
    <script type="text/javascript">
        console.log("window onLoad");
    </script>
   <!--外链式-->
   <script src="./1.js">
       /*带有src属性的<script>元素中的js代码会被忽略*/
       console.log("This code will not run");
   </script>
</body>
```