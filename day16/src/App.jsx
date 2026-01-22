function App() {
  return (
    <div style={{ height: "100vh", position: "relative" ,backgroundColor:"black" }}>
       <ProfileComponent
      name={"KRATOS"} //CONDITIONAL RENDRING OF NAME TAKES PLACE GO AND SEE PROFILE COMPONENT
       />
      <PostComponent 
      name={"KRATOSSSSS"}/>
    </div>
     
  );
}

const Poststyle = {
  width: 350,
  borderRadius: 12,
  border: "1px solid #000000",
  padding: 15,
  fontFamily: "Arial, sans-serif",
  background: "#ff5d80",

  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};


function PostComponent({name}) {
  return (
    <div style={Poststyle}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <img
          src="kratos.jpg"
          alt="profile"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 10,
          }}
        />

        <div>
          <b style={{ fontSize: 16 }}>{name}</b>
          <div style={{ fontSize: 12, color: "black" }}>
            400 followers · 20:00 PM 
          </div>
        </div>
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
        <b>My name is KRATOS</b> from NMAMIT.  
        <br />
        OFFICIALLY FROM <span style={{ color: "#d32f2f" }}>GOD OF WAR</span>.
      </div>
    </div>
  );
}


const Profilestyle = {
  width: 350,
  borderRadius: 12,
  border: "1px solid #000000",
  padding: 15,
  fontFamily: "Arial, sans-serif",
  background: "#1fa8e2",

  position: "absolute",
  top: 20,
  left: 20,
};


function ProfileComponent({name}){
  return (
    <div style={Profilestyle}>
       <div style={{ display: "flex", marginBottom: 10 }}>
        <img
          src="kratos.jpg"
          alt="profile"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 10,
          }}
        />

        <div>  
          {(name!==undefined) ? <b style={{ fontSize: 16 }}>{name}</b>:null}
          <div style={{ fontSize: 12, color: "black" }}>
            400 followers · 20:00 PM
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
