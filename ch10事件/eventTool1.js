(function () {
    function on(ele, eventType, cb) {
        if(ele.addEventListener){
            ele.addEventListener(eventType,cb,false);
            return;
        }else{
            if (!ele["_" + eventType]) {
                ele["_" + eventType] = [];
                // 放入此if语句中，确保只绑定一次 run 方法
                ele.attachEvent("on"+eventType,function () {
                    run.call(ele);
                });
            };

            var ary = ele["_" + eventType];
            for (var i = 0; i < ary.length; i++) {
                if (ary[i] == cb) {
                    return;
                }
            }
            ary.push(cb);
        }
    }

    function off(ele, eventType, cb) {
        if(ele.removeEventListener){
            ele.removeEventListener(eventType,cb,false);
        }else{
            if (ele["_" + eventType]) {
                for (var i = 0; i < ele["_" + eventType].length; i++) {
                    if (ele["_" + eventType][i] == cb) {
                        ele["_" + eventType][i] = null;
                        break;
                    }
                }
            }
        }
    }
    function run(e) {
        e = e || window.event;
        var flag = e.target ? true : false;
        if (!flag) {
            e.target = e.srcElement;
            e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
            e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
            e.preventDefault = function () {
                e.returnValue = false;
            };
            e.stopPropagation = function () {
                e.cancelBubble = true;
            };
        }
        var ary = this["_" + e.type];
        for (var i = 0; i < ary.length; i++) {
            var tempFn = ary[i];
            if (typeof tempFn == "function") {
                tempFn.call(this, e);
            } else {
                ary.splice(i, 1);
                i--;
            }
        }
    }
    window.on = on;
    window.off = off;
    })()