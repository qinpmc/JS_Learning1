
var http = require("http"),
    url = require("url"),
    fs=require("fs");

var server = http.createServer(function(res,rep){
    var urlObj = url.parse(res.url,true),
        pathName = urlObj.pathname,
        query = urlObj.query;
    var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO)/i;
    if(reg.test(pathName)){ //处理静态资源请求
        var suffix = reg.exec(pathName)[1].toUpperCase();
        var suffixMIME = "text/plain";
        switch (suffix){
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
            case "JSON":
                suffixMIME = "application/json";
                break;
            case "ICO":
                suffixMIME = "image/x-icon";
                break;
        }
    }
    try{
        var content = fs.readFileSync("."+pathName,"utf-8");
        rep.writeHead(200,{"content-type":suffixMIME+";charset=utf-8"});

        rep.end(content);
    }catch (e){
        rep.writeHead(404,{"content-type":suffixMIME+";charset=utf-8"});
        rep.end("request file is not find~~");
    }


}).listen(80,function(){
    console.log("listening...");
});