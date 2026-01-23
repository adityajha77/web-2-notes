const profileStyle = {
  width: 350,
  padding: 15,
  background: "#1fa8e2",
  marginTop: 20,
};

function Profile({ name }) {
  return (
    <div style={profileStyle}>
      {(name !== undefined) ? <b>{name}</b> : null}
      <div>400 followers · 20:00 PM</div>
    </div>
  );
}

export default Profile;
