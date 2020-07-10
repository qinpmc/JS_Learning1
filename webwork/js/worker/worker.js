// 写法一
// onmessage = function (e) {
//   console.log(this);

//   console.log("Worker: Message received from main script");
//   const result = e.data[0] * e.data[1];
//   if (isNaN(result)) {
//     postMessage("Please write two numbers");
//   } else {
//     const workerResult = "Result: " + result;
//     console.log("Worker: Posting message back to main script");
//     postMessage(workerResult);
//   }
// };

// 写法二
// this.onmessage = function (e) {
//   console.log(this);

//   console.log("Worker: Message received from main script");
//   const result = e.data[0] * e.data[1];
//   if (isNaN(result)) {
//     postMessage("Please write two numbers");
//   } else {
//     const workerResult = "Result: " + result;
//     console.log("Worker: Posting message back to main script");
//     postMessage(workerResult);
//   }
// };

// 写法三
// this.addEventListener(
//   "message",
//   function (e) {
//     console.log(this);

//     console.log("Worker: Message received from main script");
//     const result = e.data[0] * e.data[1];
//     if (isNaN(result)) {
//       postMessage("Please write two numbers");
//     } else {
//       const workerResult = "Result: " + result;
//       console.log("Worker: Posting message back to main script");
//       postMessage(workerResult);
//     }
//   },
//   false
// );

// 写法四
addEventListener(
  "message",
  function (e) {
    console.log(this);

    console.log("Worker: Message received from main script");
    const result = e.data[0] * e.data[1];
    if (isNaN(result)) {
      postMessage("Please write two numbers");
    } else {
      const workerResult = "Result: " + result;
      console.log("Worker: Posting message back to main script");
      postMessage(workerResult);
    }
  },
  false
);
