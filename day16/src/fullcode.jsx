import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "harkirat",
      followers: "400 followers",
      description: "My name is KRATOS from NMAMIT OFFICIALLY FROM GOD OF WAR",
      image: "kratos.jpg",
    },
  ]);

  function addPost() {
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        name: "harkirat",
        followers: "400 followers",
        description: "My name is KRATOS from NMAMIT OFFICIALLY FROM GOD OF WAR",
        image: "kratos.jpg",
      },
    ]);
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "black", padding: 20 }}>
      <button onClick={addPost}>Add Post</button>

      {/* PROFILE */}
      <ProfileComponent name={"KRATOS"} />

      {/* POSTS */}
      <div>
        {posts.map((post) => (
          <PostComponent
            key={post.id}          // ✅ IMPORTANT
            name={post.name}
            followers={post.followers}
            description={post.description}
            image={post.image}
          />
        ))}
      </div>
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
  marginTop: 20,
};

function PostComponent({ name, followers, description, image }) {
  return (
    <div style={Poststyle}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <img
          src={image}
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
          {(name !== undefined) ? (
            <b style={{ fontSize: 16 }}>{name}</b>
          ) : null}

          <div style={{ fontSize: 12, color: "black" }}>
            {(followers !== undefined) ? followers : null}
          </div>
        </div>
      </div>

      <div style={{ fontSize: 14 }}>
        {(description !== undefined) ? <b>{description}</b> : null}
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
  marginTop: 20,
};

function ProfileComponent({ name }) {
  return (
    <div style={Profilestyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
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
          {(name !== undefined) ? (
            <b style={{ fontSize: 16 }}>{name}</b>
          ) : null}

          <div style={{ fontSize: 12, color: "black" }}>
            400 followers · 20:00 PM
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
