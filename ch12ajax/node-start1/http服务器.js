var http=require("http"),
    fs = require("fs"),
    url = require("url");

var httpServer = http.createServer(function(res,rep){
    //console.log("createServer");
    //console.log(res.url);
    var urlObj = url.parse(res.url,true),
        pathName = urlObj.pathname,
        query = urlObj.query;
    if(pathName=="/1.html"){
        var content = fs.readFileSync("./1.html","utf-8");
        rep.write(content);
        rep.end();
    }
}).listen(8888,function(){
    console.log("listening 8888");
})
