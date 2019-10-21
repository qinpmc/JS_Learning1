# 正则

## 正则定义
1. 字面量方法
   var regex = /xyz/;
2. 使用RegExp构造函数
   var regex = new RegExp('xyz');
3. 两者的区别
    如果正则中希望引入变量，此时只能用构造函数方式创建

var name = "jack";
var reg1 = new RegExp("^\\d+"+name+"\\d+$","g"); // 注意是 \\d   /^\d+jack\d+$/g.test("222jack333");//true
//  var reg2 = /^\d+"+name+"\d+$/g; //匹配的是 '2234"""nameeee"33333'
   
 
   
##  正则元字符

     . 匹配除换行符（\n、\r）之外的任何单个字符
    ^ 以某一元字符开始
    $ 以某一元字符结尾
    * 出现0到多次
    + 出现1到多次
    ？ 出现0次或1次
    {n}:出现n次
    {n,}:出现n次到多次
    {n,m}:出现n到m次
    () 分组
    x|y 匹配 x 或 y
    [xyz] 匹配x、y、z的任意一个字符
    [^xyz] x、y、z以外的任意一个字符
    [a-z] a到z之间到任意一个字符
    [^a-z] 除了a到z之间到任意一个字符
    \d 匹配一个数字字符。等价于 [0-9]
    \D 0到9 以外的字符
    \w	匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'
    \W	匹配非字母、数字、下划线。等价于 '[^A-Za-z0-9_]'
    \b	匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。
    \B	匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。
    \s	匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
    \S	匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。
   
### 注意： 

1. [] 内部的所有字符都是其本身的意思，没有特殊含义，
>   如[.] 代表小数点，而不是匹配除换行符（\n、\r）之外的任何单个字符；
>   [+-] 代表 + 号或 - 号

2. 易犯的错 [] 不识别2位数   
>  /^[12]$/ ;指的是1 或者2， 并不是12
> /^ [12-68]$/;指的是1，2-6中的一个，8 这三个中的一个，并不是12到68
> [] 中的 - ，最好放在最前面，否则成为 2个匹配元字符之间的意思，如[w-z],匹配w到z，而[-wz]匹配- 或w或z





3.“|”，正则表达式中的或（注意它和[]的区别）
把“|”左右两边的一到多个字符当成一个整体对待
b|c表示，匹配b或者c（这里相当于[bc]）。ab|ac表示匹配ab或ac（但这里不相当于[abc]，[]表示在一组字符中任选一个）。
reg = /^z|o.+/; str='zhufengpeixun.cn'; alert(reg.exec(str));
结果只有一个z，而不是整个字符串。因为上面正则表达式的意思是，匹配开头的z或者匹配一个o后边连续出现一到多个任意字符。而并非表示以z或o开头。如果是表示以z或o开头应该写成：
reg = /^(z|o).+/;



### 分组
1. 改变 x|y的默认优先级
     var reg = /^18|19$/;
     符合的：18，19，181，189，119，819，1819, 表示start of line-"18" 或者 "19"-end of line
     var reg = /^(18|19)$/;  表示 start of line - （18或19）-end of line
     符合的：18，19

2. 分组引用 反向引用
   \1 代表和第一个分组一样，\2代表和第二个分组一样，匹配的内容也需要一样
   
   /^(\w)\1(\w)\2$/.test("xxyy"); //true
   /^(\w)\1(\w)\2$/.test("xxyz"); //false
   
3. 分组捕获
> 正则捕获时，不仅仅把大正则匹配的内容捕获到，也可以把小分组匹配的内容捕获到
  ?: 在分组中的意思是只匹配，不捕获
  
```
var reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(?:\d{2})(\d)(?:\d|X)$/;
reg.exec("1422726199009181211") ;
//["142726199009181211", "14", "2726", "1990", "09", "18", "1", index: 0, input: "142726199009181211", groups: undefined]
```  
4. ^,$的作用

/(18|19)/.test("018") ;//true

/^(18|19)/.test("018") ;// false


 
 
```
//有效数字要求：
//1 最开始可以有 + 或者- 号(只出现0次或1次)
//2 整数部分，一位数可以是0-9，多位数不能以0开始
//3 小数点 . 可以出现，也可以不出现，一旦出现，后面必须跟至少一位数字

var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/;

// 
    
```   
    
 
## 正则实例属性
> ignoreCase：返回一个布尔值，表示是否设置了i修饰符。
> global：返回一个布尔值，表示是否设置了g修饰符。
> multiline：返回一个布尔值，表示是否设置了m修饰符。 
> lastIndex：返回一个数值，表示下一次开始搜索的位置,该属性可读写，但是只在进行连续搜索时有意义.
> source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读

## 正则实例方法

> 懒惰性：每次执行exec只捕获第一个匹配的内容，多次执行，捕获的还是第一个匹配的内容
> 解决懒惰性： 采用g 全局捕获
> 贪婪性：正则的每一次捕获都是按照匹配最长的结果捕获的，如
     /\d+/g.exec("peking2018tsinghua2019china")，匹配的2018而不是2、20等
> 解决贪婪性：在量词元字符后面添加一个？
  如{n,}?, *?, +?, ??, {m,n}?

```
  /\d+?/g.exec("peking2018tsinghua2019china")，匹配的是2
```

```
 reg = /c{1,}?/; str='ccccc'; alert(reg.exec(str));
 返回的结果只有1个c，尽管有5个c可以匹配，但是由于正则表达式是非贪心模式，所以只会匹配一个。
```


1. test
> 正则实例对象的test方法返回一个布尔值，表示当前模式是否能匹配参数字符串。
> 带有g修饰符，表示是全局搜索，会有多个结果。每一次开始搜索的位置都是上一次匹配的后一个位置。  
  带有g修饰符时，可以通过正则对象的lastIndex属性指定开始搜索的位置


```
/cat/.test('cats and dogs') // true

var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2  //解决懒惰性：采用g 全局捕获
r.test(s) // true
```

2. exec
> 正则实例对象的exec方法，用来返回匹配结果。如果发现匹配，就返回一个 __数组__，
> 成员是匹配成功的子字符串，否则返回 __null__。
> 返回的结果第一个参数为匹配的大正则，后续分别为小分组，然后是index，匹配的字符串(input)等。
> 如果正则表达式加上g修饰符，则可以使用多次exec方法，下一次搜索的位置从上一次匹配成功结束的位置开始。


```
var r = /a(b+)a/g;
var arr = r.exec('_abbba_aba_');

arr // ["abbba", "bbb", index: 1, input: "_abbba_aba_", groups: undefined]
r.lastIndex ;// 6 ,由于有g修饰符，lastIndex匹配成功后变化

var arr2 = r.exec('_abbba_aba_'); //["aba", "b", index: 7, input: "_abbba_aba_", groups: undefined]

```


```
var reg4 = /peking(\d+)/g;
var str4 = "tsinghua2020peking1910shanghai2018peking2010";
console.log(reg4.exec(str4));
console.log(reg4.exec(str4));
/*["peking1910", "1910", index: 12, input: "tsinghua2020peking1910shanghai2018peking2010", groups: undefined]
["peking2010", "2010", index: 34, input: "tsinghua2020peking1910shanghai2018peking2010", groups: undefined]*/
```

 

3. 字符串的match 
> 返回一个数组，成员是所有匹配的子字符串
> 匹配失败返回null
> match传入空参数，返回["",...]

```
var str = "Nothing will come of nothing.";
str.match(); 
// ["", index: 0, input: "Nothing will come of nothing.", groups: undefined] 

```

```
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

s.match(r1) // ["x", index: 1, input: "_x_x", groups: undefined]; 
s.match(r1) // ["x", index: 1, input: "_x_x", groups: undefined]; //正则不含g
s.match(r2) // null

// 正则带有g修饰符，一次全部匹配
var s2 = '_x_x';
var r2 = /x/g;
 
s2.match2(r1)；//["x", "x"]

```
> 不带有g修饰符，返回匹配的大正则（整个正则）结果，以及匹配的分组小正则结果，index索引，input输入等。字符串的match和正则的exec返回结果一致
> 如果正则表达式**带有g**修饰符，则该方法与正则对象的exec方法**行为不同**，字符串的match会一次性返回所有匹配成功的结果。
> 带有g修饰符，match **不捕获小分组**的内容，只捕获大的正则 


```
var reg4 = /peking(\d+)/g;
var str4 = "tsinghua2020peking1910shanghai2018peking2010";
str4.match(reg4); //["peking1910", "peking2010"]  //带g后一次全部匹配，字符串的 match 不捕获小分组 (\d+), 
reg4.exec(str4);//   ["peking1910", "1910", index: 12, input: "tsinghua2020peking1910shanghai2018peking2010", groups: undefined]



var reg5 = /peking(\d+)/;  // 不带有g修饰符
var str5 = "tsinghua2020peking1910shanghai2018peking2010";
str5.match(reg5); 
//["peking1910", "1910", index: 12, input: "tsinghua2020peking1910shanghai2018peking2010", groups: undefined]

reg5.exec(str5);//
//  ["peking1910", "1910", index: 12, input: "tsinghua2020peking1910shanghai2018peking2010", groups: undefined]


// 与 正则 exec 比较
var reg4 = /peking(\d+)/g;
var str4 = "tsinghua2020peking1910shanghai2018peking2010";
console.log(reg4.exec(str4));
console.log(reg4.exec(str4));
/*["peking1910", "1910", index: 12, input: "tsinghua2020peking1910shanghai2018peking2010", groups: undefined]
["peking2010", "2010", index: 34, input: "tsinghua2020peking1910shanghai2018peking2010", groups: undefined]*/


```

示例： 量词元字符后面添加一个？解决贪婪性

```
"peking2018tsinghua2019china".match(/\d+?/g); 
//["2", "0", "1", "8", "2", "0", "1", "9"] ;//在量词元字符后面添加一个？解决贪婪性

```


4. 字符串的search
> str.search(regexp)
> 参数为正则，如果不是，将隐式转换为正则（new RegExp(obj)）
> 返回值：最开始匹配到正则的**索引**位置，未匹配到返回-1；

```
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re)); // returns 4, which is the index of the first capital letter "J"
console.log(str.search(re)); // 4 ,正则带有g，但匹配的仍是J，而不是E
console.log(str.search(re2)); // returns -1 cannot find '.' dot punctuation

str.search("J") ;// 4
str.search("j") ;// -1
```

5. 字符串的replace
> str.replace(regexp|substr, newSubStr|function)
> replace方法可以替换匹配的值。   

> 第二个参数为函数时，函数的参数有：
- match：匹配的子串。（对应于上述的$&。）
- p1,p2, ...：假如replace()方法的第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。
  例如, 如果是用 /(\a+)(\b+)/这个来匹配， p1就是匹配的 \a+,  p2 就是匹配的 \b+。
- offset：匹配到的子字符串在原字符串中的偏移量。（比如，如果原字符串是“abcd”，匹配到的子字符串是“bc”，那么这个参数将是1）
- string：被匹配的原字符串

```
function replacer(match, p1, p2, p3, offset, string) {

    console.log(arguments);
   //["abc12345#$*%", "abc", "12345", "#$*%", 0, "abc12345#$*%", callee: ƒ, Symbol(Symbol.iterator): ƒ]

  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);  // abc - 12345 - #$*%
```



```
 var str = "peking2018peking2010";

 //字符串的方式替换(无法解决懒惰性)
 //str = str.replace("peking","chinapeking").replace("peking","chinapeking");
 //console.log(str); //chinachinapeking2018peking2010

 //正则的方式替换
 //str = str.replace(/peking/g,"chinapeking"); //chinapeking2018chinapeking2010"
 
 
 /*     console.log("-----------");
      str =  str.replace(/(peking)/g,function(){
         console.log(arguments);   //所有信息
         console.log(arguments[0]);//匹配到到大正则的值 peking
         console.log(arguments[1]); //匹配到到分组的值 peking
         return "shanghai";  // return 为用于替换匹配的值
     })*/
 /*
     注意：以上回调函数执行了2次，因为匹配到了2次
     ["peking", "peking", 5, "chinapeking2018chinapeking2010", callee: ƒ, Symbol(Symbol.iterator): ƒ]   peking   peking
     ["peking", "peking", 20, "chinapeking2018chinapeking2010", callee: ƒ, Symbol(Symbol.iterator): ƒ]  peking   peking
 
     str; // "shanghai2018shanghai2010"
     */
 ```
 

 
```
      var str = "20180808";
      var ary = ["零","一","二","三","四","五","六","七","八","九","十"];
      str = str.replace(/\d/g,function(){
          //console.log(arguments[0]);
          return ary[arguments[0]];
      })
  
     // str;// "二零一八零八零八"
``` 


```

    // 自己实现String match
    String.prototype.myMatch = function(){
        var result = [],regexp = arguments[0];
        var res = regexp.exec(this);
        while (res){  // 正则带有g修饰符，否则死循环
            result.push(res[0]);
            res = regexp.exec(this);
        }
        return result;
    }
```

```
// 将日期改为xxxx年xx月xx日 xx时xx分xx秒
var str = "2015-6-10 14:55:23";

String.prototype.myDataFormat =  function(){
    var reg1= /^(\d{4})-(\d{1,2})-(\d{1,2})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/g;
    var ary = [];
    this.replace(reg1,function(){
        ary = ([].slice.call(arguments)).slice(1,7); // 获取到匹配的每个小分组值，分别为 2015 6 10 14 55 23
    });
    var stringFormat = "{0}年{1}月{2}日{3}时{4}分{5}秒";
    stringFormat = stringFormat.replace(/{(\d+)}/g,function(){
        var temp = ary[arguments[1]];
        temp.length===1? temp="0"+temp:void 0;
        return temp;
    })
    return stringFormat;
}
var newStr = str.myDataFormat(); //"2015年06月10日14时55分23秒"
```
