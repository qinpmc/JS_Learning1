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
}