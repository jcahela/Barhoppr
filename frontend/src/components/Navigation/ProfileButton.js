import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { useState, useEffect, useRef } from "react";
import { logoutUser, restoreUser } from "../../store/session";
import { removeMyCheckins } from '../../store/checkins'

const ProfileButton = () => {
  const sessionUser = useSelector(state => state.session.user.user);
  const profilePicRef = useRef();
  const profilePicUrl = sessionUser.profilePicture;
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  const closeMenu = () => {
    setShowMenu(false)
  };

  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    profilePicDiv.style.backgroundImage = `url(${profilePicUrl})`
  })

  const logout = async (e) => {
    e.preventDefault();
    if (sessionUser) {
      await dispatch(removeMyCheckins());
      await dispatch(logoutUser());
      await dispatch(restoreUser());
      history.push('/');
    }
    return;
  }


  return (
    <div 
      onMouseLeave={closeMenu}
      onMouseEnter={openMenu}
    >
      <div ref={profilePicRef} className="profile-button"/>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{sessionUser.firstname} {sessionUser.lastname}</li>
          <li>Username: {sessionUser.username}</li>
          <li>Email: {sessionUser.email}</li>
          <button className="logout-button" onClick={logout}>Logout</button>
        </ul>
      )}
    </div>
  )
}

export default ProfileButton
