// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//     console.log(response.farewell);
//   });

// var timer = 0;
// var si = setInterval(() => {
//           try {
//              chrome.runtime.sendMessage({
//                   data: "Hello popup, how are you"
//               }, function (response) {
//                   console.dir(response);
//               });
//               timer++;
//               if (timer === 5) {
//                   clearInterval(si);
//               }
//           } catch (error) {
//               // debugger;
//               console.log(error);
//           }
//       }, 2000);
