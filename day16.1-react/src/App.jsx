// //import { useState,useEffect, Children } from 'react';

// import { Children } from "react"

// function App(){
//  // const [showTimer,setShowTimer]=useState(true);
//     return(
//       <div style={{display:"flex",background:"grey"}}>

//         <CardComponent>
//           <div>
//             <h2>CARD 1</h2>
//           HI THERE
//           </div>
          
//           </CardComponent> 

//         <CardComponent>
//           <h2>CARD 2</h2>
//           <div style={{color:"green"}}>what do you want to post -<br></br>
//         <br></br>
//           <input type={"text"} placeholder="enter the post" ></input> </div>
//           </CardComponent> 

//           </div>
//     )
// }
// function CardComponent({children}){
//   return <div style={{boxShadow:"2px 2px 5px rgba(0,0,0,1)",background:"black",borderRadius:10,color:"white",margin:10,padding:10,border:"1px solid #ccc"}}>
//     {children}

//   </div>

// }


// export default App

// //child and parent structure with prop
// //use children it is the special reserved prop in React


//list in react need the id or a key to render 


// import React from "react";

// const App= () =>{
//   return (
//     <div style={{minHeight:"100vh",display:"flex",backgroundColor:"black", justifyContent: "center",
//         alignItems: "center"}}>
//       <div style={{color:"green"}}>
//               {[
//         <Todo key={1} title={"eat food"} done={false} />,
//         <Todo key={1} title={"go to gym"} done={true} />
//       ]}

//       </div>

//     </div>
//   )
// }
// function Todo({title,done}){
//   return(
//      <div>
//       {title}-{done ? "done!": "not done!"}
//       </div>
//   )
// }


// export default App

//class vs functional components now we people use functional components only 
//class component is like class component extends component  and at last render(){return()} to use state we use this.state
//functional component const functioncounter=()=>{
  //    }
  //return ()

  //error boundry uses life cycle how is it if a card has the error it does not propagate to other or simulate other due to its own eeror so its 
  //name is error boundry it uses class based component not the functional component
  //let say there are 2 child in the tree and child 1 cause error then whole tree faild if we dont use error boundry if we use then only child 1 will be effected not the tree
//<Fragment> </Fragments  fragments in react <> </> just use this if you dont want to use the parent div


import React from "react";

/* -------- Error Boundary -------- */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "20px",
          backgroundColor: "#300",
          color: "white",
          borderRadius: "10px"
        }}>
          ❌ Something went wrong in this card.
        </div>
      );
    }

    return this.props.children;
  }
}

/* -------- Card Component -------- */
const Card = ({ title, children }) => {
  return (
    <div style={{
      width: "200px",
      padding: "20px",
      margin: "10px",
      backgroundColor: "#111",
      color: "white",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

/* -------- Buggy Component -------- */
const BuggyComponent = () => {
  throw new Error("I crashed!");
};

/* -------- App -------- */
const App = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      alignItems: "center",
      backgroundColor: "black"
    }}>

      {/* Normal Card */}
      <ErrorBoundary>
        <Card title="Normal Card">
          <p>This card works fine ✅</p>
        </Card>
      </ErrorBoundary>

      {/* Buggy Card */}
      <ErrorBoundary>
        <Card title="Buggy Card">
          <BuggyComponent />
        </Card>
      </ErrorBoundary>

    </div>
  );
};

export default App;
