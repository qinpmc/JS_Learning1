# 跨域

## 5 CORS 跨域


CORS请求
CORS请求分为两种, 1 简单请求; 2 非简单请求.
满足如下两个条件便是简单请求, 反之则为非简单请求.(CORS请求部分摘自阮一峰老师博客)
1) 请求是以下三种之一:
- HEAD
- GET
- POST

2) http头域不超出以下几种字段:
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type字段：限三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

对于简单请求, 浏览器将发送一次http请求, 同时在Request头域中增加 Origin 字段, 用来标示请求发起的源, 服务器根据这个源采取不同的响应策略.
若要服务器认为该请求合法, 那么需要往返回的 HTTP Response 中添加 Access-Control-* 等字段.

对于非简单请求,
比如： 
1、Method为POST且Content-Type值为 application/json 的请求       

2、 Method为 PUT 或 DELETE 的请求,            
浏览器将发送两次http请求. 第一次为preflight预检(Method: OPTIONS),主要验证来源是否合法.
值得注意的是:OPTION请求响应头同样需要包含 Access-Control-* 字段等. 第二次才是真正的HTTP请求.
所以服务器必须处理OPTIONS应答(通常需要返回20X的状态码, 否则xhr.onerror事件将被触发)

对于 复杂 CORS请求，需设置以下头信息：
 Access-Control-Allow-Origin: 指定允许哪些源的网页发送请求.

 Access-Control-Allow-Credentials: 指定是否允许cookie发送.

 Access-Control-Allow-Methods: 指定允许哪些请求方法. 如 'Access-Control-Allow-Methods':'DELETE'

 Access-Control-Allow-Headers: 指定允许哪些常规的头域字段,  如 'Access-Control-Allow-Headers':'X-Test-Cors'

 Access-Control-Expose-Headers: 指定允许哪些额外的头域字段, 比如说 X-Custom-Header.该字段可省略.
 CORS请求时, xhr.getResponseHeader() 方法默认只能获取6个基本字段: Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma .
 如果需要获取其他字段, 就需要在Access-Control-Expose-Headers 中指定.
 如上, 这样xhr.getResponseHeader('X-Custom-Header') 才能返回X-Custom-Header字段的值.
 Access-Control-Max-Age: 指定preflight OPTIONS请求的有效期, 单位为秒.此时 浏览器不应禁用缓存

 


## 1 JSONP

不存在跨域的html标签
- script
- img
- link
- iframe

示例 jsonp：
- 1. 运行服务：node server.js
- 2 访问前端页面， http://localhost:8080/index.html






