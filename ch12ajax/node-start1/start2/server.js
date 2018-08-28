
var http = require("http"),
    url = require("url"),
    fs=require("fs");

var server = http.createServer(function(res,rep){
    var urlObj = url.parse(res.url,true),
        pathName = urlObj.pathname,
        query = urlObj.query;
    if(pathName=="/index.html"){
        var content = fs.readFileSync("./index.html","utf-8");
        rep.write(content);
        rep.end();
        return;
    };
    if(pathName=="/index.css"){
        var content = fs.readFileSync("./index.css","utf-8");
        rep.end(content);
        return;
    };
    if(pathName=="/index.js"){
        var content = fs.readFileSync("./index.js","utf-8");
        rep.end(content);
        return;
    };


}).listen(80,function(){
    console.log("listening...");
});