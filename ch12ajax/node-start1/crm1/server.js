var http = require("http"),
    url= require("url"),
    fs = require("fs");

var httpServer = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true),
        pathName = urlObj.pathname,
        query = urlObj.query;

    var reg = /\.(HTML|CSS|JS)/i;
    if(reg.test(pathName)){
        var suffix = reg.exec(pathName)[1].toUpperCase();
        var suffixMIME  = "text/html";
        switch (suffix){
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
        }
        try{
            var conFile = fs.readFileSync("."+pathName,"utf-8");
            res.writeHead(200,{"content-type":suffixMIME+";charset=utf-8"});
            res.end(conFile);
        }catch(e){
            res.writeHead(400,{"content-type":suffixMIME+";charset=utf-8"});
            res.end("request file is not find~~");
        }
        return;
    }

    //处理API

    // 1 获取所有用户
    var  result = null,
        jsonPath = "json/customs.json";
    var conFile = fs.readFileSync(jsonPath,"utf-8");
    conFile.length==0? conFile ="[]":null; //防止json文件为空，获取的从File为空字符串，JSON.parse会报错。
    conFile = JSON.parse(conFile);
    result  = {
        code :0,
        msg:"没有信息",
        data:null
    };
    if(pathName ==="/getList"){

        if(conFile.length>0){
            result  = {
                code :1,
                msg:"成功",
                data:conFile
            };
        }
        res.writeHead(200,{
            "content-type":"application/json;charset=utf-8"
        });
        res.end(JSON.stringify(result));
        return;
    }

    //2. 获取指定id用户信息
    var customID =null,custom = null;
    if(pathName ==="/getCustom"){
        customID = query["id"];
        for(var i= 0,len=conFile.length;i<len;i++){
            if(conFile[i].id == customID){
                custom = conFile[i];
                break;
            }
        }
        if(conFile.length>0){
            result  = {
                code :1,
                msg:"成功",
                data:[custom]
            };
        }
        res.writeHead(200,{
            "content-type":"application/json;charset=utf-8"
        });
        res.end(JSON.stringify(result));
        return;

    };

    //3. 删除指定id的用户
    if(pathName ==="/deleteCustom"){
        customID = query["id"];
        var flag = false; //默认不删除
        for(var i= 0,len=conFile.length;i<len;i++){
            if(conFile[i].id == customID){
                conFile.splice(i,1);
                flag = true;
                break;
            }
            result = {
                code :0,
                msg:"删除失败"
            }
        }
        if(flag){
            result  = {
                code :1,
                msg:"删除成功"
            };
            fs.writeFileSync(jsonPath,JSON.stringify(conFile),"utf-8"); // 删除json文件存储的内容
        }
        res.writeHead(200,{
            "content-type":"application/json;charset=utf-8"
        });
        res.end(JSON.stringify(result));
        return;

    };

    //4. 新增用户  get 请求
    /*    if(pathName ==="/addCustom"){
            var maxId = conFile[conFile.length-1].id;
            var newCunstom = {};
            newCunstom["name"] = query["name"];
            newCunstom["age"] = query["age"];
            newCunstom["phone"] = query["phone"];
            newCunstom["address"] = query["address"];
            newCunstom["id"] = ++maxId;
            result = {
                code :0,
                msg:"删除失败"
            }

            try{
                conFile.push(newCunstom);
                fs.writeFileSync(jsonPath,JSON.stringify(conFile),"utf-8"); // 更新json文件存储的内容
                result  = {
                    code :1,
                    msg:"新增成功"
                };
            }catch (e){

            }
            res.writeHead(200,{
                "content-type":"application/json;charset=utf-8"
            });
            res.end(JSON.stringify(result));
            return;
        };*/

    if(pathName ==="/addCustom"){
       var inStr = "";
        req.on("data",function(chunk){
            inStr+=chunk;
        });
        req.on("end",function(){
            if(inStr.length==0){
                result = {
                    code :0,
                    msg:"增加失败"
                }
                res.writeHead(200,{
                    "content-type":"application/json;charset=utf-8"
                });
                res.end(JSON.stringify(result));
                return;
            }

            inStr = JSON.parse(inStr) ;
            conFile.length==0 ? inStr["id"] = 1: inStr["id"]= parseInt(conFile[conFile.length-1]["id"])+1;
            result = {
                code :1,
                msg:"增加成功"
            }
            conFile.push(inStr);
            fs.writeFileSync(jsonPath,JSON.stringify(conFile),"utf-8");
            res.writeHead(200,{
                "content-type":"application/json;charset=utf-8"
            });
            res.end(JSON.stringify(result));
            return;
        })

    }


}).listen(8888,function(){
    console.log("server listening on port 8888");
})
