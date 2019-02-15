var http = require('http'),
    querystring = require('querystring'),
    fs = require("fs"),
    url = require("url");

http.createServer(function (req, res) {
    var body = "";
    var urlObj = url.parse(req.url,true),
        pathName = urlObj.pathname;
    if(pathName=="/login.html"){
        var content = fs.readFileSync("./login.html","utf-8");
        res.write(content);
        res.end();
    }

    if(pathName=="/sendblob.html"){
        var content = fs.readFileSync("./sendblob.html","utf-8");
        res.write(content);
        res.end();
    }
    if(pathName=="/register"){
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            // 解析参数
            console.log(body);
            body = querystring.parse(body);
            // 设置响应头部信息及编码
            //res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
            console.log(body);
            res.end();
        });
    }

}).listen(3000);