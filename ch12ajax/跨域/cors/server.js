var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

http.createServer(function(req, res){
    var pathObj = url.parse(req.url, true)

    switch (pathObj.pathname) {
        case '/getNews':
            var news = [
                "第11日前瞻：中国冲击4金 博尔特再战200米羽球",
                "正直播柴飚/洪炜出战 男双力争会师决赛",
                "女排将死磕巴西！郎平安排男陪练模仿对方核心"
            ]

            //允许http://localhost:8080 访问
            res.setHeader('Access-Control-Allow-Origin','http://localhost:8080')

            //运行所有访问
            //res.setHeader('Access-Control-Allow-Origin','*')
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); //解决中文乱码
            res.end(JSON.stringify(news))
            break;
        default:
            fs.readFile(path.join(__dirname, pathObj.pathname), function(e, data){
                if(e){
                    res.writeHead(404, 'not found')
                    res.end('<h1>404 Not Found</h1>')
                }else{
                    res.end(data)
                }
            })
    }
}).listen(8080)