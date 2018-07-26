(function(){
    var jsonData = null;
    var imgWrapper = utils.getElementByClass("wrap")[0];
    var dots = utils.getElementByClass("dots")[0];
    var imgList = imgWrapper.getElementsByTagName("img");
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
               /* str+="<img src='"+jsonData[i].img+"'>";*/
                str+="<div><img src='' truePath='"+jsonData[i].img+"'></div>";
            }
            str+="<div><img src='' truePath='"+jsonData[0].img+"'></div>";
        }
        imgWrapper.innerHTML = str;
        utils.css(imgWrapper,"width",(len+1)*1024);

        // 绑定焦点
        str="";
        for(i= 0;i<len;i++){
            i==0? str+="<li class='active'></li>":str+="<li></li>";
            dots.innerHTML = str;
        }

    }()


     //延迟加载
     function lazyLoadImg(curImg){
         if(curImg.isLoaded){
             return;
         }
         var oImg = new Image();
         oImg.src = curImg.getAttribute("truePath");
         oImg.onload = function(){
             curImg.src = oImg.src;
             curImg.style.display = "block";
             oImg = null;
         }
         curImg.isLoaded = true;
     }
for(var i= 0,len = imgList.length;i<len;i++){
    lazyLoadImg(imgList[i]);
    tween.move(imgList[i],{
        opacity:1
    },500)
}

    // 轮播
    var j=0;
    var liList = dots.getElementsByTagName("li");
    var lastLi = liList[0];
    window.setInterval(function(){
            if (j>=len-1){
                j = 0;
                utils.css(imgWrapper,"left",0);

            }
        utils.css(imgWrapper,"left",-1024*j);
        j++;
        tween.move(imgWrapper,{left:-j*1024},500);
        if(lastLi){
            lastLi.className="";
        }
        if(j==len-1){
            liList[0].className="active";
            lastLi = liList[0];
        }else{
            liList[j].className="active";
            lastLi = liList[j];
        }

        },2000)

})()
