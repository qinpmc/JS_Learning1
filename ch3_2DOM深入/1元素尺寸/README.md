# 元素尺寸

## 1 元素的offsetParent

1.  元素自身有fixed定位，offsetParent 的结果为null；
    元素有fixed定位，固定定位元素相对于视口定位，没有定位父级，因此返回null; firefox不兼容， 返回body

2. 元素自身无fixed定位，父级元素存在定位的元素， offsetParent 为 离自身最近的经过定位的父级元素

3.  元素自身无fixed定位，父级元素都未定位， offsetParent 为 body

4.  body 元素的parentNode 是 null

5.  ie7- 下的bug :
    (1) 元素本身经过绝对定位或相对定位，且父级元素无定位的元素，ie7-下offsetParent 是html；
    (2) 父级元素存在haslayout的元素或者经过定位的元素，则元素的offsetParent为经过定位或触发了haslayout的父级元素