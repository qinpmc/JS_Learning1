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
# script 标签
## defer 属性
1. defer属性只适用于外部脚本
2. 脚本会被延迟到整个页面都解析完毕后再运行（即使将script元素放在head元素中），该属性相当于告诉浏览器立即下载脚本，但延迟执行
3. HTML5规范要求脚本按照它们出现的先后顺序执行，且脚本会先于DOMContentLoaded事件执行。
   但现实中，延迟脚本不一定按照顺序执行，也不一定在DOMContentLoaded事件之前执行，因此最好只包含一个延迟脚本。
4. 有 defer，加载后续文档元素的过程将和 script.js 的 __加载并行进行__ （异步）

## async 属性
1. 只适用于外部脚本
2. 相当于告诉浏览器立即下载脚本，并不保证按照脚本的先后顺序执行，因此异步脚本之间最好互不依赖
3. async 属性的目的是不让页面等待脚本下载和执行，异步加载页面其他内容，因此异步脚本不要在加载期间修改DOM
4. 有 async，加载和渲染后续文档元素的过程将和 script.js 的 __加载与执行并行进行__ （异步）

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，
“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行



