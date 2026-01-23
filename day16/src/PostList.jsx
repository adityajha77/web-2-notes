import Post from "./Post";

function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          name={post.name}
          followers={post.followers}
          description={post.description}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default PostList;
