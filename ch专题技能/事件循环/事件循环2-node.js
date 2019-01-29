 
   setTimeout(function () {
       console.log(1);
   },0);
   console.log(2);
   process.nextTick(() => {
       console.log(3);
   });
   new Promise(function (resolve, rejected) {
       console.log(4);
       resolve()
   }).then(res=>{
       console.log(5);
   })
   setImmediate(function () {
       console.log(6)
   })
   console.log('end');
 
	
	
/*	
输出：2、4、end、3、5、1、6 
	
*/
 