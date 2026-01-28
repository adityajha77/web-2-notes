// do same as linkdin for todo and use fetch and take data from the jsonplaceholder website
//use loading also stat variable
//and the tab data also



import { useEffect, useState } from "react"

function App(){
    const [storedData,dataTobeStored]=useState(null);
    const [getTodo,setTodo]=useState(null);
    const [loading,setloading]=useState(false);


    useEffect(()=>{
        if (getTodo === null) return;
        
         async function ggetTodo(id){
            setloading(true);
        const res= await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data= await res.json();
            dataTobeStored(data);
            setloading(false);
    }
    ggetTodo(getTodo);
},[getTodo])
    


    return (
        <div style={{padding:20}}>
            
                <button onClick={()=>setTodo(1)}>Todo1</button>
                <button onClick={()=>setTodo(2)}>Todo2</button>
                <button onClick={()=>setTodo(3)}>Todo3</button>
                <button onClick={()=>setTodo(4)}>Todo4</button>
            {loading ? ( "LOADING..." ) :
                storedData ? (
                <div style={{marginTop:20}}>
                    <p>TITLE={storedData.title}</p>
                    <p>Id={storedData.id}</p>
                    <p>USERID={storedData.userId}</p>
                </div>
            ) : null}
        </div>
    )
}

export default App;


