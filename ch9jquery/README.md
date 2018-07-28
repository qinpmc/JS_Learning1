# Jquery

## jquery 对象与 dom 对象

 // jquery对象 转 dom 对象
    console.log($oDiv[0] ===oDiv); //true
    console.log($oDiv.get(0) ===oDiv);//true
    
 //  dom对象 转 jquery 对象
    console.log($oDiv ===$(oDiv));//false

## jquery 选择器
1. 基本选择器
![selector1](./selector1.png)

2. 层级选择器
$(“parent > child”)	子选择器:选择所有指定”parent”元素中指定的”child”的直接子元素
$(“ancestor descendant”)	后代选择器:选择给定祖先ancestor元素的所有后代元素，包括子元素，孙子元素等全部后代元素
$(“prev + next”)	相邻兄弟选择器:选择所有紧接在prev元素后的next元素
$(“prev ~ siblings”)	一般兄弟选择器：匹配“prev”元素之后的所有兄弟元素。具有相同的父元素，并匹配过滤出 __所有的__ “siblings”选择器。

3. 基本过滤选择器
![selector2](./selector2.png)

