// import {useState} from "react";



// function Notification(){
    
// const [count,setCount]=useState(1);
// function increaseCount(){
//     setCount(count+1);
// }
// setInterval(increaseCount,1000);
//     return(
//         <div>
//             <div style={{display:"flex"}}>
//             <div style={{background:"red",borderRadius:20,width:20,height:25,paddingLeft:10,paddingTop:5}}>
//                 {count}
//             </div>
//         </div>
//          <img style={{cursor:"pointer"}} src={""} width={40}/>
//         </div>
//     )
// }

// export default Notification;

//the better version with useEffect 
//useeffect runs only on mount when first time the component came after that no run of the line of code

// import {useEffect, useState} from "react";



// function Notification(){
    
// const [count,setCount]=useState(1);

// function increaseCount(){
//     console.log("increase the count called " + count)//but still the increaseCount function will hit and run buut the count value will increase once only 
//     //the reason this happen bucz of the empty array 
//         setCount(currentValue => currentValue + 1);

// }


// useEffect(function(){
//     console.log("count of useeffect")
//     setInterval(increaseCount,1000);//this is the side effect which is handel by the useeffect 
// }, [])  //first argument is the function and the second argument is the empty array

// useEffect(function(){
//     console.log("the count has been updated"+count);

// },[count]);
// //keep in mind remove the strict mode from the app.jsx
//     return(
//         <div>
//             <div style={{display:"flex"}}>
//             <div style={{background:"red",borderRadius:20,width:20,height:25,paddingLeft:10,paddingTop:5}}>
//                 {count}
//             </div>
//         </div>
//          <img style={{cursor:"pointer"}} src={""} width={40}/>
//         </div>
//     )
// }

// export default Notification;

//dependencies array means whene ever that count (with ref to this code ) changes then that function call again


import {useEffect, useState} from "react";



function Notification(){
    
const [count1,setCount1]=useState(1);
const [count2,setCount2]=useState(2);

function increaseCount(){
    console.log("increase the count called " + count1)//but still the increaseCount function will hit and run buut the count value will increase once only 
    //the reason this happen bucz of the empty array 
        setCount1(currentValue => currentValue + 1);

}

function decreaseCouont(){
    setCount2(currentValue2 => currentValue2 - 1);
}


useEffect(function(){
    console.log("count of useeffect")
    
    setInterval(increaseCount,2000);
    setInterval(decreaseCouont,3000);
    
    //this is the side effect which is handel by the useeffect 
}, [])  //first argument is the function and the second argument is the empty array

useEffect(function(){
    console.log("the count has been updated"+count1);

},[count1,count2]);
//keep in mind remove the strict mode from the app.jsx
    return(
        <div>
            <div style={{display:"flex"}}>
            <div style={{background:"red",borderRadius:20,width:20,height:25,paddingLeft:10,paddingTop:5}}>
                {count1}
                
            </div>
        </div>
         <img style={{cursor:"pointer"}} src={""} width={40}/>

           <div style={{display:"flex"}}>
            <div style={{background:"red",borderRadius:20,width:20,height:25,paddingLeft:10,paddingTop:5}}>
            
                 {count2}
            </div>
        </div>
         <img style={{cursor:"pointer"}} src={""} width={40}/>
        </div>
    )
}

export default Notification;