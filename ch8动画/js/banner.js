(function(){
    var jsonData = null;
    var imgWrapper = utils.getElementByClass("wrap")[0];
    var dots = utils.getElementByClass("dots")[0];
    // 1 绑定图片

    //1.1 请求图片数据
    ~function(){
        var xhr = new XMLHttpRequest();
        xhr.open("get","./json/banner.txt?_"+Math.random(),false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
                jsonData = utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send(null);
    }();
  // 1.2 绑定图片
    ~function(){
        var str= "";
        if(jsonData){
            for(var i= 0,len=jsonData.length;i<len;i++){
                str+="<img src='"+jsonData[i].img+"'>";
                

            }
        }
        imgWrapper.innerHTML = str;
        utils.css(imgWrapper,"width",len*1024);

        // 绑定焦点
        str="";
        for(i= 0;i<len;i++){
            i==0? str+="<li class='active'></li>":str+="<li></li>";
            dots.innerHTML = str;
        }

    }()


     //延迟加载




})()
