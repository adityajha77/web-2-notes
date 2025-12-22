// //ASSIGNMENT PROMISIFIED VERSSION OF HTTP READ FILE AND TIME OUT

// //promise classs give the promise that i will  return something in future 
// //like callback based approach.
// //promises are same but cleaner way to do
// //callback version setTimeout(function_name,3000);
// function setTimeoutPromisified(ms){
//     let p = new Promise(resolve=>setTimeout(resolve ,ms));//same as we do earlier const now = new Date(); we using date class and now we are using promise class so we use this 
//     return p;
// }
// function callback(){
//     console.log("3 sec pause ")
// }
// setTimeoutPromisified(3000).then(callback);//promise ka object bhejata hai.
 
// function promiseCallBack(resolve){
//   setTimeout(resolve,3000);
// }
// function main(){
//     console.log("main is called ");//actually ame main function gaya hai resolve mae.
// }
// promiseCallBack(main);


//promisified aur normal ma e sirf yeah antar hai ki normal call back sirf value leta hai function name ka aur promisified .then laga deta  hai sirf .
//promises bolata hai ki hum ek function lenge aur ausko pass karenge . then()  mae 
//means promise bolta hai ki jo bhi value mere ko mile ga aur auske pass ja ke auska bhi jo first value ho ga tho hum .then use karenge .


// function random(resolve){
//    // console.log("promise end")
//    setTimeout(resolve,5000);
// }
// let p = new Promise(random);//when does the eventual condition end
// //something initially or eventually dega , 
// function callback(){
//     console.log("promise completed completed ")
// }
// p.then(callback);
//in this resolve is callback.
//who ever creating the Promise have to complete and tell that i am over please call the signal means .then so means promise->function->.then
//create the promisified version of fs.read  and clean file .


 //lets start the main question how the promise class will look like 
 class myPromise{
    constructor(fn){
        const afterDone=()=>{//4 tho isko call karega 
            this.resolve();//5 aur resolve tho callback tha step 2 mae dekho tho callback mae jo bhi run hai wo run ho jai ga
        }; 
        fn(afterDone);//3 yeah he na call hua ho ga promise mae
    }
    then(callback){ //1
        this.resolve=callback;//2  value daal dega es mae.
    }
 }


 const fs=require ("fs");
 console.log("start of code");
 function readmyfile(resolve){
    console.log("inside the function who has created the promise and i am asynchronous so i will turn on and go to next work")
     setTimeout(resolve,3000);
 }
  console.log("object promise created ");
 let p= new myPromise(readmyfile);//you can use you default Promise also

function callback(){
    let q=fs.readFileSync("a.txt","utf-8");
     console.log(q);
     console.log("readed the file completely")
 }
 console.log("after hitting setTimeout i have turn on the set time out ")
 p.then(callback);
 console.log("----end of code-----")

//await is also a same thing we can use
// async function solve(){
//     await myPromise();
//     console.log("hiii")
// }

//application of http server mango database is some application