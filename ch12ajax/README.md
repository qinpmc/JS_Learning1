# AJAX

## URL、URI、URN

URI：统一资源标识符，URI就像英特网上的邮政地址一样，在世界范围内唯一标识并定位信息资源；
     URI 有两种形式，分别为URL 和 URN

URL：统一资源定位符是资源标识符的最常见形式， URL描述了一台特定服务器上某资源的特定位置。
URN：URI 的第二种形式为统一资源名，URN 是作为特定内容的唯一名称使用的，与目前的资源所在地无关。
     比如，不论英特网标准文档RFC 2141 位于何处，都可以用下列URN命名它：
     urn:ietf:rfc:2141

示例：http://v.qq.com:80/index.html?name=zhangsan&age=22#bbs
http: 传输协议 
     （http:默认端口80；https：默认端口443； FTP文件传输协议：默认21端口）
v.qq.com ：域名
80 端口
index.html ： 请求资源文件名
?name=zhangsan&age=22 URL传参
#bbs ：URL的hash （锚点定位）


## node

node 模块：
1. 内置模块
2. 自定义模块
    module.exports = {fn:fn}  
    module.exports.fn = fn;
3. 第三方模块  npm install/uninstall xxmodule  -g  ,-g 全局安装


## ajax

### ajax 流程
1. 创建 AJAX 对象（） ---  2.open ---- [ onreadystatechange 监听状态改变，触发对应的方法，非必需] ---- 3.send 

#### 创建AJAX 对象


