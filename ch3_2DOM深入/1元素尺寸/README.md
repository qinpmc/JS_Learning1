# 元素尺寸

## 1 元素的offsetParent

1.  元素自身有fixed定位，offsetParent 的结果为null；
    元素有fixed定位，固定定位元素相对于视口定位，没有定位父级，因此返回null; firefox不兼容， 返回body

2. 元素自身无fixed定位，父级元素存在定位的元素， offsetParent 为 离自身最近的经过定位的父级元素

3.  元素自身无fixed定位，父级元素都未定位， offsetParent 为 body

4.  body 元素的offsetParent 是 null

5.  ie7- 下的bug :
    (1) 元素本身经过绝对定位或相对定位，且父级元素无定位的元素，ie7-下offsetParent 是html；
    (2) 父级元素存在haslayout的元素或者经过定位的元素，则元素的offsetParent为经过定位或触发了haslayout的父级元素

## 2 偏移量
![offsetTop/Left](./offsetTop-Left.jpg)
###  offsetWidth/offsetHeight
  offsetWidth = border左右宽度 + 左右padding + width;    //不包含margin
  offsetHeight = border上下高度 + 上下padding + width;   //不包含margin

IE8- 浏览器将垂直滚动条的宽度计算在width宽度和height高度中，width和height的值仍然是100px；
而其他浏览器则把垂直滚动条的宽度从width宽度中移出，把水平滚动条的高度从height高度中移出，则滚动条宽度为17px，width宽度和height高度为剩下的83px
注意： offsetWidth /offsetHeight 均相同

```
    <div id="box" style="width: 200px;height: 100px;padding: 50px;margin: 20px;border: 2px solid dodgerblue;overflow: scroll"></div>
    <script type="text/javascript">
        var box = document.getElementById("box");
        console.log(box.offsetHeight); //204 =100 + 50*2+ 2*2
        console.log(box.offsetWidth);  //304 =200 + 50*2+ 2*2

        //IE8-浏览器将垂直滚动条的宽度计算在width宽度和height高度中，width和height的值仍然是100px；
        //而其他浏览器则把垂直滚动条的宽度从width宽度中移出，把水平滚动条的高度从height高度中移出，则滚动条宽度为17px，width宽度和height高度为剩下的83px
        if( window.getComputedStyle){
            console.log(getComputedStyle(box).width,getComputedStyle(box).height)
        }else{
            console.log(box.currentStyle.width,box.currentStyle.height);
        }
    </script>
```

### offsetTop/offsetLeft

> offsetTop表示元素的上外边框至offsetParent元素的上内边框之间的像素距离
> offsetLeft表示元素的左外边框至offsetParent元素的左内边框之间的像素距离
> ie7- 下有bug。。。
```
    <div id="out" style="padding: 5px;position: relative;background-color: pink;margin: 6px;border:1px solid black">
        <div id="test" style="width:100px; height:100px; margin:10px;background-color:green;"></div>
    </div>
    <script>
        //15=test.marginTop(10) + out.paddingTop(5)
        alert(test.offsetTop);
        //15=test.marginLeft(10) + out.paddingLeft(5)
        alert(test.offsetLeft);
    </script>
```

### 偏移量注意点
1. 所有偏移量属性都是只读的(IE8-浏览器下修改偏移量会报错)

```
<div id="test" style="width:100px; height:100px; margin:10px;"></div>
<script>
    // 所有偏移量属性都是只读的
    console.log(test.offsetWidth);//100
    //IE8-浏览器会报错，其他浏览器则静默失败
    test.offsetWidth = 10;
    console.log(test.offsetWidth);//100
</script>
```

2. 如果给元素设置了display:none，则它的偏移量属性都为0 
3. 每次访问偏移量属性都需要重新计算（注意性能问题）

### 页面偏移
要知道某个元素在页面上的偏移量，将这个元素的offsetLeft和offsetTop与其offsetParent的相同属性相加，
并加上offsetParent的相应方向的边框，如此循环直到根元素，就可以得到元素到页面的偏移量

```
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
        return {left:left,top:top};   // 不含px单位
    }
```



