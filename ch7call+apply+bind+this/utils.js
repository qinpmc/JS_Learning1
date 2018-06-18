/*
var utils ={
    listToArray:function(likeAry){
        var arr=[];
        try{
            ary = [].slice.apply(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[i] = likeAry[i];
            }
        }
        return ary;
    },

    jsonParse : function(str){
        var val = null;
        try{
            val = JSON.parse(str);
        }catch(e){
            val = eval("("+str+")");
        }
        return val;
    }
}*/
var utils = (function(){
    var flag = "getComputedStyle" in window; //检测是否是ie6，7，8

    function listToArray(likeAry){
        if(flag){
            return [].slice.call(likeAry);
        }
        var arr=[];
        for(var i=0;i<likeAry.length;i++){
            ary[i] = likeAry[i];
        }
        return ary;
    }

    function getCss(ele,attr){
        var res = null,reg = null;
        if(flag){
            res = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr =="opacity"){
                res= ele.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;i
                res = reg.test(res)? reg.exec(res)[1]/100 :1;
            }else{
                res = ele.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i;
        return reg.test(res)? parseFloat(res):res;
    }

    function jsonParse(str){
        return "JSON" in window ?JSON.parse(str): eval("("+str+")");
    }

    function getOffset(ele){
        var top = ele.offsetTop,left= ele.offsetLeft,parent =ele.offsetParent ;
        while(parent){
            if(navigator.userAgent.indexOf("MSIE 8.0")==-1){ //ie8下已累加边框
                //累加父级参照物的边框
                left += parent.clientLeft;
                top += parent.clientTop;
            }

            //累加父级参照物的偏移
            left +=parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {left:left,top:top};
    }

    function win(attr, value){
        if(typeof value === "undefined"){
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    //获取上一个兄弟元素节点
    function prev(curEle){
        var prevSibling = curEle.previousSibling;
        while(prevSibling){
            if(prevSibling.nodeType===1){
                return prevSibling;
            }else{
                curEle = prevSibling;
            }
        }
        return null;
    }

    return {
        listToArray :listToArray,
        getCss :getCss,
        jsonParse:jsonParse,
        getOffset:getOffset,
        win:win
    }
})()