# 

## 单线程JavaScript
(https://juejin.im/post/5aacd1766fb9a028cb2d6766#comment)
https://juejin.im/post/5a623a11f265da3e2d33846b#heading-1
单线程意思就是说同一个时间只能做一件事。
javascript的单线程特点是跟他的用途有关的。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
假如不是单线程的话，在一个线程当我们在给某个DOM节点增加内容的时候，另一个线程正在删除这个DOM节点的内容，会造成混乱和错误。
所以javascript只能是单线程。


## 任务队列

所有的同步任务都在主线程上执行，形成一个执行栈 stack。当所有同步任务执行完毕后，
它会去执行microtask queue中的异步任务（nextTick，Promise），将他们全部执行。主线程之外还有一个任务队列task queue，
当有异步任务（DOM，AJAX，setTimeout，setImmediate）有结果的时候，就在任务队列里放一个事件，
一旦执行栈和microtask queue任务执行完毕，系统就会读取任务队列，将取出排在最前面的事件加入执行栈执行，这种机制就是任务队列。
 
## 同步任务和异步任务(https://juejin.im/post/5aacd1766fb9a028cb2d6766#comment)

javascript里面的任务有两种，同步任务和异步任务。  
同步任务是指：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。    
异步任务指的是，不进入主线程、而进入"任务队列"的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。   




## js的事件循环流程：
 
- 1. 所有同步任务都在主线程上执行，形成一个执行栈。
- 2. 当主线程中的执行栈为空时，检查事件队列是否为空，如果为空，则继续检查；如不为空，则执行3；
- 3. 取出任务队列的首部，压入执行栈；
- 4. 执行任务；
- 5. 检查执行栈，如果执行栈为空，则跳回第 2 步；如不为空，则继续检查；
 

 
 
## Event Loop：
主线程在任务队列中读取事件，这个过程是循环不断地，所以这种运行机制叫做Event Loop（事件循环）
事件循环其实就是入栈出栈的循环。上面例子中说到了setTimeout，那setInterval呢，Promise呢等等等等，有很多异步的函数。但是这些异步任务有分宏任务(macro-task)和微任务(micro-task)：
macro-task包括： setTimeout, setInterval, setImmediate, I/O, UI rendering。 
micro-task包括：process.nextTick, Promises, Object.observe(废弃), MutationObserver。
每一次Event Loop触发时：

- 1. 执行完主执行线程中的任务。
- 2. 取出micro-task中任务执行直到**清空**(注意：这里是将任务全部执行完)。
- 3. 取出macro-task中一个任务执行。
- 4. 取出micro-task中任务执行直到清空。
- 5. 重复3和4。

其实promise的then和catch才是microtask，本身的内部代码不是。

注意：
- 在浏览器浏览器和node中的执行不一样。   
- 任务队列里面是“先入先出”的。    
 
 
```
console.log('global')

for (var i = 1;i <= 5;i ++) {
  setTimeout(function() {
    console.log(i)
  },i*1000)
  console.log(i)
}

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
 }).then(function () {
  console.log('then1')
})

setTimeout(function () {
  console.log('timeout2')
  new Promise(function (resolve) {
    console.log('timeout2_promise')
    resolve()
  }).then(function () {
    console.log('timeout2_then')
  })
}, 1000)
 

```
 
 
 
 
 
 
 