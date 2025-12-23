// function setTimeOutPromisified(ms){
//     return new Promise(function(resolve){
//  setTimeout(resolve,ms);
//     });
// }

// function callback(){
//     console.log("5 sec passed");
// }

// setTimeOutPromisified(3000).then(callback);//calling promisified function 


// function callback(){
//     console.log("hello its callback")
// }
// setTimeout(callback,5000);

//callBack hell
//problem statement says that first print with waiting 5 sec and then again 5 sec and print  
// setTimeout(function(){ //this is the type of Async  but ugly code
//     console.log("hii anaonmous function");
//     setTimeout(function(){
//         console.log("hii i am here again ");
//     },5000);
// },5000);
//to get rid of callbackHell use promise

function setTimeOutPromisified(ms){
    return new Promise(function(resolve){
        setTimeout(resolve,ms);
    });
}

// setTimeOutPromisified(5000).then(function(){
//     console.log("hiii");
//     return setTimeOutPromisified(3000)
// }).then(function(){
//      console.log("hollaaa");
//     return setTimeOutPromisified(2000);
// }).then(function(){
//     console.log("namaste");
//     return setTimeOutPromisified(1000);
// });
//promise chaining example but still ugly but fyn 


//async await is the sugar on promise just look sync but actually async with await 
// async  function adit(){
//     console.log("start")
//      setTimeOutPromisified(1000);
//     console.log("asyn await term 1");
//     await setTimeOutPromisified(3000);
//     console.log("asyn await term 2")
//     await setTimeOutPromisified(5000);
//     console.log("asnc await term 3")
// };
// adit();
// console.log("end")
//err and catch to solve errors in promise for example.

function readFileAsync(){
    return new Promise(function(accept,reject){
        fs.readFile("ankannsakn.txt","utf-8",function(err,data){
            if(err){
            reject("file not found error")
        }
        else{
            accept(data);
        }
        });
    });
}
readFileAsync().then(function(x){
    console.log("file readed success");
}).catch(function(e){
    console.log("file not created error")
});
