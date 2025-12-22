// function sum(a,b){
//     return parseInt(a)+parseInt(b);
// }
// function sub(a,b){
//     return a-b;
// }
// let ans =sum("5","10");
// console.log(ans);
// let adit=sub(20,10);
//console.log(adit);

// function loopsum(x){
//     let sum=0;
//     for(let i=0;i<=x;i++){ //aur just use formula n*(n+1)
//         sum=sum+i;
//     }
//     return sum;
// }
// console.log(loopsum(10));//syncronesd bucz every line compile line by line ;
//reading a file;
// const fsaaa = require("fs");
// const content= fsaaa.readFileSync("bbb.txt","utf-8");//use readFile for async
// console.log(content);
// const con= fsaaa.readFileSync("a.txt","utf8");
// console.log(con);
//asysn below code
// const fs=require("fs");
// const read=function(err,data){
//     if(err){
//         console.log("there is an error ")
//     }
//     else{
//         console.log(data);
//     }
// }
// const contents=fs.readFile("bbb.txt","utf8",read);
// const contentss=fs.readFile("a.txt","utf8",read);
// const contentsss=fs.readFile("abbb.txt","utf8",read);
// console.log("hello hila dala na");
// //top to bottom on kar kar ke neeche jate hai

//remember call stack->webapi(browser)-> queue. and if cpu is busy he will keep doing and other thing will be in the queue