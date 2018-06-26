
var tween = function(){
    var aniEffect = {
       Linear: function(spendTime,begin,distance,duration){
            return begin+ spendTime * (distance/duration);
        }
    }
/*    curEle:运动的元素
      target : 运动的目标,对象，可能包含多个方向
      duration :运动时间
    */
    function move(curEle,target,duration){
        var begin ={},change = {};
        // 获取各个方向上的初始值begin[key] 和 运动最大范围值change[key]
        for(var key in target){
            if(target.hasOwnProperty(key)){
                begin[key] = utils.css(curEle,key);
                change[key] = target[key] - begin[key];
            }
        }

        var time = 0;
        window.clearInterval(curEle.timer);
        curEle.timer = window.setInterval(function(){
            time+=10;
            if(time>=duration){
                window.clearTimeout(curEle.timer);
                utils.css(curEle,target);
                return;
            }
            for(var key in target){
                if(target.hasOwnProperty(key)){
                    var curPostion = aniEffect.Linear(time,begin[key],change[key],duration);
                    utils.css(curEle,key,curPostion);

                }
            }

        },10)
    }
    return {
        move:move
    }
}();