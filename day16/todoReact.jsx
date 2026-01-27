// do same as linkdin for todo and use fetch and take data from the jsonplaceholder website
//use loading also stat variable
//and the tab data also



import { useState } from "react"

function App(){
    const [currentTab,setCurrentTab]=useState(null);
    async function getTodo(id){
        const res= await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data= await res.json();
            setCurrentTab(data);
    }
    


    return (
        <div style={{padding:20}}>
            
                <button onClick={()=>getTodo(1)}>Todo1</button>
                <button onClick={()=>getTodo(2)}>Todo2</button>
                <button onClick={()=>getTodo(3)}>Todo3</button>
                <button onClick={()=>getTodo(4)}>Todo4</button>
            {currentTab && (
                <div style={{marginTop:20}}>
                    <p>TITLE={currentTab.title}</p>
                    <p>Id={currentTab.id}</p>
                    <p>USERID={currentTab.userId}</p>
                </div>
            )}
        </div>
    )
}

export default App;


