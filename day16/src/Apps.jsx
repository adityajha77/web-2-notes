import { useState } from "react";
function Apps(){
    return (
        <div>
            <ToggleMessage />
            <ToggleMessage />
            <ToggleMessage />
        </div>
    )
}

// react not track the simple variable 
// it only track the state variable
//for rendering purpose
const ToggleMessage=()=>{
    let [isVisible,setIsVisible]=useState(true);       //let isVisible=true; is not the state variable
    //to update teh value of the state variable then use the second argument which use 

    function toggle(){
    setIsVisible(!isVisible)                                //isVisible=!isVisible; wrong
    }
    return (
        <div>
            <button onClick={toggle}>TOGGLE MESSAGE</button>
            {isVisible&&<p>this is the CONDITIONALly rendered!!!!</p>}
        </div>
    )
}

export default Apps;