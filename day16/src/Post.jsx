const postStyle = {
  width: 350,
  borderRadius: 12,
  padding: 15,
  background: "#ff5d80",
  marginTop: 20,
};

function Post({ name, followers, description, image }) {
  return (
    <div style={postStyle}>
      <img src={image} alt="post" width={60} />

      {(name !== undefined) ? <b>{name}</b> : null}
      <div>{(followers !== undefined) ? followers : null}</div>
      {(description !== undefined) ? <p>{description}</p> : null}
    </div>
  );
}

export default Post;
