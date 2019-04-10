 
DOMContentLoaded 和load ：

参考资源：
1. Page lifecycle: DOMContentLoaded, load, beforeunload, unload（http://javascript.info/onload-ondomcontentloaded）
2. [译]页面生命周期：DOMContentLoaded, load, beforeunload, unload解析（https://github.com/fi3ework/blog/issues/3）
3. DOMContentLoaded vs jQuery.ready vs onload, How To Decide When Your Code Should Run  
   （https://eager.io/blog/how-to-decide-when-your-code-should-run/）
4. https://zhuanlan.zhihu.com/p/25876048

- DOMContentLoaded —— 浏览器已经完全加载了 HTML，DOM 树已经构建完毕，但是像是 <img> 和样式表等外部资源可能并没有下载完毕。
- load —— 浏览器已经加载了所有的资源（图像，样式表等）

每个事件都有特定的用途：

- DOMContentLoaded —— DOM 加载完毕，所以 JS 可以访问所有 DOM 节点，初始化界面。
- load —— 附加资源已经加载完毕，可以在此事件触发时获得图像的大小（如果没有被在 HTML/CSS 中指定）

## DOMContentLoaded 和脚本

当浏览器在解析 HTML 页面时遇到了 <script>...</script> 标签，将无法继续构建DOM树（译注：**UI 渲染线程与 JS 引擎是互斥**的，当 JS 引擎执行时 UI 线程会被挂起），必须立即执行脚本。所以 DOMContentLoaded 有可能在所有脚本执行完毕后触发。

外部脚本（带 src 的）的**加载和解析也会暂停DOM树构建**，所以 DOMContentLoaded 也会等待外部脚本。

不过有两个例外是带 async 和 defer 的外部脚本，他们告诉浏览器继续解析而不需要等待脚本的执行，所以用户可以在脚本加载完成前可以看到页面，有较好的用户体验。

async 和 defer 属性仅仅对外部脚本起作用，并且他们在 src 不存在时会被自动忽略。

它们都告诉浏览器继续处理页面上的内容，而在后台加载脚本，然后在脚本加载完毕后再执行。所以脚本不会阻塞DOM树的构建和页面的渲染。

（译注：带有 async 和 defer 的脚本的**下载**是和 HTML 的下载与解析是**并行**的，但是 JS 的**执行**一定是和 UI 线程是**互斥**的，   

async 在下载完毕后的执行会阻塞HTML的解析，defer在html解析完成后执行）



```
	                                async	                                                     defer
顺序	             带有 async 的脚本是优先执行先加载完的脚本，
                    他们在页面中的顺序并不影响他们执行的顺序。             	     带有 defer 的脚本按照他们在页面中出现的顺序依次执行。

DOMContentLoaded	带有 async 的脚本也许会在页面没有完全下载完之前就加载，        带有 defer 的脚本会在页面加载和解析完毕后执行，
                    这种情况会在脚本很小或本缓存，并且页面很大的情况下发生。	    刚好在 DOMContentLoaded 之前执行。


```


## DOMContentLoaded 与样式表

外部样式表并不会阻塞 DOM 的解析，所以 DOMContentLoaded 并不会被它们影响。
不过仍然有一个陷阱：如果在样式后面有一个内联脚本，那么脚本必须等待样式先加载完。

（译注：简单来说，JS 因为有可能会去获取 DOM 的样式，所以 JS 会等待样式表加载完毕，而 JS 是阻塞 DOM 的解析的，所以在有外部样式表的时候，JS 会一直阻塞到外部样式表下载完毕）     


```
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // 脚本直到样式表加载完毕后才会执行。
  alert(getComputedStyle(document.body).marginTop);
</script>
```


发生这种事的原因是脚本也许会像上面的例子中所示，去得到一些元素的坐标或者基于样式的属性。所以他们自然要等到样式加载完毕才可以执行。
DOMContentLoaded 需要等待脚本的执行，脚本又需要等待样式的加载。




## 浏览器的自动补全
Firefox, Chrome 和 Opera 会在 DOMContentLoaded 执行时自动补全表单。     
 
例如，如果页面有登录的界面，浏览器记住了该页面的用户名和密码，那么在 DOMContentLoaded 运行的时候浏览器会试图自动补全表单（如果用户设置允许）。      

所以如果 DOMContentLoaded 被一个需要长时间执行的脚本阻塞，那么自动补全也会等待。你也许见过某些网站（如果你的浏览器开启了自动补全）—— 浏览器并不会立刻补全登录项，      
而是等到整个页面加载完毕后才填 充。这就是因为在等待 DOMContentLoaded 事件。    
 


## defer 与 DOMContentLoaded

如果 script 标签中包含 defer，那么这一块脚本将不会影响 HTML 文档的解析，而是等到 HTML 解析完成后才会执行。而 DOMContentLoaded 只有在 defer 脚本执行结束后才会被触发。 所以这意味     
HTML 文档解析不受影响，等 DOM 构建完成之后 defer 脚本执行，但脚本执行之前需要等待 CSSOM 构建完成。在 DOM、CSSOM 构建完毕，defer 脚本执行完成之后，DOMContentLoaded 事件触发。

## async 与 DOMContentLoaded

如果 script 标签中包含 async，则 HTML 文档构建不受影响，解析完毕后，DOMContentLoaded 触发，而不需要等待 async 脚本执行、样式表加载等等。



## window.onload
window 对象上的 onload 事件在所有文件包括样式表，图片和其他资源下载完毕后触发。

下面的例子正确检测了图片的大小，因为 window.onload 会等待所有图片的加载。

```

<script>
  window.onload = function() {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">

```

 

## DOMContentLoaded 与 jQuery.ready (sometimes referred to as $.ready, or just as $()).

 DOMContentLoaded 与jQuery.ready 等价


 ## Run When a Specific Element Has Loaded
 如果想要在一个元素正好被解析，但却而未渲染时使用它，可以使用 MutationObservers
if you want to access an element the exact moment it’s parsed, before it’s rendered, you can use MutationObservers.

```
var MY_SELECTOR = ".blog-post" // Could be any selector

var observer = new MutationObserver(function(mutations){
  for (var i=0; i < mutations.length; i++){
    for (var j=0; j < mutations[i].addedNodes.length; j++){
      // We're iterating through _all_ the elements as the parser parses them,
      // deciding if they're the one we're looking for.
      if (mutations[i].addedNodes[j].matches(MY_SELECTOR)){
        alert("My Element Is Ready!");

        // We found our element, we're done:
        observer.disconnect();
      };
    }
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

```







## setTimeout与页面渲染

在JavaScript代码中所做的更改通常不会立即呈现到页面。为了提高速度，浏览器通常会等到下一个事件循环周期来呈现更改。        
或者，它将等待，直到您请求一个可能在任何挂起的呈现发生后发生更改的属性。如果需要进行渲染，可以等待下一个事件循环标记.  

```
setTimeout(function(){
  // Everything will have rendered here
});

```