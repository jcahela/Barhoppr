import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import './ProfilePage.css'
import { useEffect, useRef } from "react";

const ProfilePage = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const allUsers = useSelector(state => state.userData.users);
  const profilePicRef = useRef();
  const { id } = useParams();

  const profileUser = allUsers.find(user => user.id === +id);

  console.log(profileUser, 'PROFILE USER IN PROFILE PAGE');

  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    profilePicDiv.style.backgroundImage = `url(${profileUser?.profilePicture})`

  })

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      <div className="profile-banner">
        <div ref={profilePicRef} className="profile-picture"></div>
      </div>
      <h1>{profileUser.name} 123</h1>
    </>
  )
}

export default ProfilePage;
