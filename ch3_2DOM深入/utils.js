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
        if(flag){
            return curEle.previousElementSibling;
        }
        var prevSibling = curEle.previousSibling;
        while(prevSibling){
            if(prevSibling.nodeType===1){
                return prevSibling;
            }else{
                prevSibling = prevSibling.previousSibling
            }
        }
        return null;
    }

    //获取下一个兄弟元素节点
    function next(curEle){
        if(flag){
            return curEle.nextElementSibling;
        }
        var nextSibling = curEle.nextSibling;
        while(nextSibling){
            if(nextSibling.nodeType===1){
                return nextSibling;
            }else{
                nextSibling = nextSibling.previousSibling
            }
        }
        return null;
    }
   //获取所有的上一个兄弟元素节点
    function prevAll(curEle){
        var result = [];
        var prevEle = this.prev(curEle);
        while(prevEle){
            result.unshift(prevEle);
            prevEle = this.prev(prevEle);
        }
        return result;
    }

    //获取所有的下一个兄弟元素节点
    function nextAll(curEle){
        var result = [];
        var nextEle = this.next(curEle);
        while(nextEle){
            result.push(nextEle);
            nextEle = this.next(nextEle);
        }
        return result;
    }

    //获取前后相邻的2个兄弟元素节点
    function sibling(curEle){
        var result = [];
        var prevEle = this.prev(curEle);
        var nextEle = this.next(curEle);
        result.push(prevEle);
        result.push(nextEle);
        return result;
    }

    //获取所有的兄弟元素节点
    function siblings(curEle){
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }

    //获取元素的索引
    function index(curEle){
        return this.prevAll(curEle).length;
    }

    function children(domEle,tagName){
        var childrenRes=[];
        if(/MSIE (6|7|8)/i.test(navigator.userAgent)){
            var childNodes = domEle.childNodes;
            for(var i= 0,len = childNodes.length;i<len;i++){
                if(childNodes[i].nodeType ==1){ //是元素节点
                    childrenRes.push(childNodes[i]);
                }
            }
            childNodes = null;
        }else{
            childrenRes = childrenRes.slice.call(domEle.children);
        }

        if(typeof tagName ==="string"){
            for(var j= 0;j<childrenRes.length;j++){
                if(childrenRes[j].nodeName.toLowerCase() !==tagName.toLowerCase()){
                    childrenRes.splice(j,1);
                    j--;
                }
            }
        }
        return childrenRes;
    }

    function firstChild(curEle,tagName){
        var children = this.children(curEle,tagName);
        return children.length>0 ? children[0]:null;
    }

    function lastChild(curEle,tagName){
        var children = this.children(curEle,tagName);
        return children.length>0 ? children[children.length-1]:null;
    }

    function append(newEle,container){
        container.appendChild(newEle);
    }

    function prePend(newEle,container){
        var firstEle = this.firstChild(container);
        if(firstEle){
            container.insertBefore(newEle,firstEle);
        }
        container.appendChild(newEle);
    }

    function insertBefore(newEle,refELe){
        var container = refELe.parentNode;
        container.insertBefore(newEle,refELe);
    }

    function insertAfter(newEle,refELe){
        var container = refELe.parentNode;
        var refEle_after = this.next(refELe);
        if(refEle_after){
            container.insertBefore(newEle,refEle_after);
        }else{
            container.appendChild(newEle);
        }
    }

    return {
        listToArray :listToArray,
        getCss :getCss,
        jsonParse:jsonParse,
        getOffset:getOffset,
        win:win,
        prev:prev,
        next:next,
        prevAll:prevAll,
        nextAll:nextAll,
        sibling:sibling,
        siblings:siblings,
        index:index,
        children:children,
        firstChild:firstChild,
        lastChild:lastChild
    }
})()