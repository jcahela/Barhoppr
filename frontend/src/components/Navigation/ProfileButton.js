import { useSelector } from "react-redux"
import { useHistory } from "react-router";

const ProfileButton = () => {
  const sessionUser = useSelector(state => state.session.user);
  const profilePicUrl = sessionUser.profilePicture;

  const history = useHistory()

  const profile = () => {
    history.push('/profile');
  }

  return (
    <div 
      className="profile-button"
      onClick={profile}
    >
      <img className="profile-pic" src={profilePicUrl} alt="Smiling man" />
    </div>
  )
}

export default ProfileButton
