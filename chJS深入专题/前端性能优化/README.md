# 优化技巧

1. 使用雪碧图，减少http请求
2. css和js文件压缩，减少请求数据大小和请求次数
3. 服务端和客户端传输采用json格式，json比较轻量级
4. 减少dom操作，减少dom回流和重绘（目前的vue，react框架解决）
5. 图片懒加载，分页展示技术等
6. html中的AUDIO 或VIDEO标签，设置 preload = none,不加载音频和视频
7. 合理使用异步编程
8. css选择器优化，如减少选择器前面的前缀，尽量少用id选择器，而使用样式类选择器
9. 避免使用css表达式
10. js放到body尾部，css放到head中
11.减少闭包使用，防止过多占有内存和内存泄漏风险
12.dom事件绑定时，尽量减少一个个事件绑定，应使用事件委托，把事件绑定到外层元素（冒泡到外层）
13.字体图标替代位图，减少http请求
14.css3动画替代js动画，css3动画开启了硬件加速
15.cdn加速，缓存等措施