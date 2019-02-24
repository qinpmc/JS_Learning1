var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

http.createServer(function(req, res){
    const html = fs.readFile("test1.html","utf-8",function(err,data){
        res.writeHead(200,{
            "Content-Type":"text/html"
        });
        res.end(data);
    })
}).listen(8888)