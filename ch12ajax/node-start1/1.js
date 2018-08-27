var less = require("less");
var fs = require("fs");

less.render(fs.readFileSync("./1.less","utf-8"),{compress:true},function(err,out){
    fs.writeFileSync("./1.css",out.css,"utf-8");
})
