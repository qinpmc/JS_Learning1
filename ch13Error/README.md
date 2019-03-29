# Error

## 1 Error 实例对象

JavaScript 语言标准只提到:Error实例对象必须有message属性，表示出错时的提示信息，没有提到其他属性。         
大多数 JavaScript 引擎，对Error实例还提供name和stack属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有.

- message：错误提示信息
- name：错误名称（非标准属性）
- stack：错误的堆栈（非标准属性）

```
var err = new Error('出错了');
err.message // "出错了"

```

## 2 原生错误类型
Error实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他6种错误对象。也就是说，存在Error的**6个派生对象**.

```
Error 对象
  -- SyntaxError 对象
  -- ReferenceError 对象
  -- RangeError对象
  -- TypeError 对象
  -- URIError 对象
  -- EvalError 对象 
```


### 2.1 SyntaxError 对象
SyntaxError: 解析代码时发生的语法错误。

```
// 缺少括号
console.log 'hello');
// Uncaught SyntaxError: Unexpected string
```


### 2.2 ReferenceError对象
ReferenceError对象:是引用一个不存在的变量时发生的错误。

```
// 使用一个不存在的变量
unknownVariable
// Uncaught ReferenceError: unknownVariable is not defined

```


### 2.3 RangeError 对象
RangeError对象: 是一个值超出有效范围时发生的错误。

```
new Array(-1)
// Uncaught RangeError: Invalid array length

```

### 2.4 TypeError 对象
TypeError 对象:变量或参数不是预期类型时发生的错误。

```
new 123
// Uncaught TypeError: number is not a func

var obj = {};
obj.unknownMethod()
// Uncaught TypeError: obj.unknownMethod is not a function
```

### 2.5 URIError 对象

URIError对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、       
decodeURIComponent()、escape()和unescape()这六个函数

```
decodeURI('%2')
// URIError: URI malformed

```

### 2.6 EvalError 对象
eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经**不再使用**



## 3 自定义错误 

可以定义自己的错误对象
```
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

```


## 4 throw 语句

- throw语句的作用是手动中断程序执行，抛出一个错误。
- throw也可以抛出自定义错误。
- throw可以**抛出任何类型**的值。也就是说，它的参数可以是任何值

```
// 抛出自定义错误
throw new UserError('出错了！');
// Uncaught UserError {message: "出错了！", name: "UserError"}
 
// 抛出一个字符串
throw 'Error！';
// Uncaught Error！

// 抛出一个数值
throw 42;
// Uncaught 42

// 抛出一个布尔值
throw true;
// Uncaught true

// 抛出一个对象
throw {
  toString: function () {
    return 'Error!';
  }
};

```

## 5 try...catch  

一旦发生错误，程序就中止执行了。JavaScript 提供了try...catch结构，允许对错误进行处理，选择是否往下执行。

- catch代码块之中，还可以再抛出错误，甚至使用嵌套的try...catch结构

```
var n = 100;

try {
  throw n;
} catch (e) {
  if (e <= 50) {
    // ...
  } else {
    throw e;
  }
}
// Uncaught 100
```


## 6 finally 代码

finally代码块，表示不管是否出现错误，都必需在最后运行的语句。

```
function idle(x) {
  try {
    console.log(x);
    return 'result';
  } finally {
    console.log('FINALLY');
  }
}

idle('hello')
// hello
// FINALLY

```

### 6.1 finally 与return 结合时执行顺序

```
        function f() {
            try {
                console.log(0);
                throw 'bug';
            } catch(e) {
                console.log(1);
                return true; // 这句原本会延迟到 finally 代码块结束再执行
                console.log(2); // 不会运行
            } finally {
                console.log(3);
                return false; // 这句会覆盖掉前面那句 return true，由于return了，会立即退出，不会执行下句
                console.log(4); // 不会运行
            }

            console.log(5); // 不会运行
        }

        var result = f();
        console.log(result);
/*
        0
        1
        3
        false  ----------这里返回的是false，而不是true ；console.log(5) 未执行
*/

/*
        注释 return false 
        0
        1
        3
        4
        true  ----------这里返回的是true,  console.log(5) 仍未执行
*/


```



```
        function f() {
            try {
                throw '出错了！';
            } catch (e) {
                console.log('捕捉到内部错误');
                throw e; // 这句原本会等到finally结束再执行
            } finally {
                console.log("in finally")
                return false; // 直接返回
            }
        }

        try {
            f();
        } catch (e) {
            // 此处不会执行
            console.log('caught outer "bogus"');
        }

        /*
            捕捉到内部错误
            in finally

        */

/* 
        注释  finally语句中 return false; 会返回throw语句 执行 throw e

        捕捉到内部错误
        in finally
        caught outer "bogus"
*/

```