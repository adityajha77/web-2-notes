import { useState } from "react";
import Profile from "./Profile";
import PostList from "./PostList";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "aditya",
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
        name: "aditya",
        followers: "400 followers",
        description: "My name is KRATOS from NMAMIT OFFICIALLY FROM GOD OF WAR",
        image: "kratos.jpg",
      },
    ]);
  }

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", padding: 20 }}>
      <button onClick={addPost}>Add Post</button>

      <Profile name="KRATOS" />

      <PostList posts={posts} />
    </div>
  );
}

export default App;
