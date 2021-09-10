import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { logoutUser } from "../../store/session";

const ProfileButton = () => {
  const sessionUser = useSelector(state => state.session.user);
  const profilePicUrl = sessionUser.profilePicture;
  const history = useHistory();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }

  useEffect(() => {
    if (!showMenu) return;
    
    const closeMenu = () => {
      setShowMenu(false)
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  })

  const logout = (e) => {
    e.preventDefault();
    if (sessionUser) {
      dispatch(logoutUser());
      history.push('/');
    }
  }


  return (
    <>
      <button 
        className="profile-button"
        onClick={openMenu}
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
    </>
  )
}

export default ProfileButton
