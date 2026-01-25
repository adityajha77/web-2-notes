import { useEffect, useState } from "react";

function Linkdin(){
    const [currentTab,setCurrentTab]=useState("Feed");

    useEffect(function(){
        //send the backend req to get the data for the tab
        console.log("the req to backednd " + currentTab)
    },[currentTab])

    return<div>
        <button onClick={function(){
            setCurrentTab("Feed")
        }} style={{color:currentTab==="Feed"?"red":"black"}}>Feed</button>

     <button onClick={()=>{
        setCurrentTab("Notification")
     }} style={{color:currentTab==="Notification"?"red":"black"}}>Notification</button>


      <button onClick={()=>{
        setCurrentTab("Message")
     }} style={{color:currentTab==="Message"?"red":"black"}}>Message</button>


       <button onClick={()=>{
        setCurrentTab("Jobs")
     }} style={{color:currentTab==="Jobs"?"red":"black"}}>Jobs</button>
    </div>


}

export default Linkdin;