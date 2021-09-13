import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { logoutUser, restoreUser } from "../../store/session";

const ProfileButton = () => {
  const sessionUser = useSelector(state => state.session.user.user);
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
    if (!showMenu) return;
    

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  })

  const logout = async (e) => {
    e.preventDefault();
    if (sessionUser) {
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
      <button 
        className="profile-button"
      >
        <img className="profile-pic" src={profilePicUrl} alt="Smiling man" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Username: {sessionUser.username}</li>
          <li>Email: {sessionUser.email}</li>
          <button className="logout-button" onClick={logout}>Logout</button>
        </ul>
      )}
    </div>
  )
}

export default ProfileButton
