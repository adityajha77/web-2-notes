//map,arrow,filter in js

// //same
// function sum(a,b){
//     return a+b;
// }
// //same but different in different way
// const sum =(a,b)=>{
//     return a+b;
// }



//different in sonme part wee will talk eventually 
// app.get('/', function(req,res){

// })

// app.get('/',(req,res)=>{

// })

//lets say given problem statement you have given the array and give me the multiply 2 format of the array

// const array=[1,2,3,4,5];
// let newarray=[];

// for(let i=0;i<array.length;i++){
//     newarray.push(array[i]*2);

// }
// console.log(newarray);

//lets use map and make things simple

// const array=[1,2,3,4,5];
// function transform(i){
//     return i*2;
// }
// const ans=input.map(transform);
// console.log(ans);

// //or

// const ans = input.map(function (i){
//     return i*2;
// });

// console.log(ans)


//filterring
//filter even numbers from the array 

// const array=[1,2,3,4,5];
// let newarray=[];
// for(let i=0;i<array.length;i++){
//      if(array[i]%2===0){
//         newarray.push(array[i]);
//      }
//  }
//  console.push(newarray);


 //or using filterring


//  const array=[1,2,3,4,5];
//  function filteringlogic(n){
//     if(n%2==0){
//         return true;
//     }
//     else{
//         return false;
//     }
//  }
//  const ans=array.filter(filteringlogic);
//  console.log(ans);


 //or

  const array=[1,2,3,4,5];
 const ans=array.filter((n) =>{  //or use function(n)
    if(n%2==0){
        return true;
    }
    else{
        return false;
    }
 });
 console.log(ans);
