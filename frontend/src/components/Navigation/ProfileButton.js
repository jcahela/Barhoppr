import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router";
import { useState, useEffect, useRef } from "react";
import { logoutUser, restoreUser } from "../../store/session";
import { removeMyCheckins } from '../../store/checkins'
import { useDrinkSelected } from "../../context/DrinkSelected";

const ProfileButton = () => {
  const sessionUser = useSelector(state => state.session.user.user);
  const profilePicRef = useRef();
  const profilePicUrl = sessionUser.profilePicture;
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const { setPrevHost } = useDrinkSelected();

  const toggleMenu = () => {
    console.log(showMenu)
    if (showMenu) {
      setShowMenu(false)
    } else {
      setShowMenu(true);
    }
  }


  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    profilePicDiv.style.backgroundImage = `url(${profilePicUrl})`
  })

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
        setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    if (sessionUser) {
      await dispatch(removeMyCheckins());
      await dispatch(logoutUser());
      await dispatch(restoreUser());
      setPrevHost(window.location.hostname)
      history.push(`/`);
      
    }
    return;
  }


  return (
      <>
        <div onClick={toggleMenu} ref={profilePicRef} className="profile-button"/>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>{sessionUser.firstname} {sessionUser.lastname}</li>
            <li>Username: {sessionUser.username}</li>
            <li>Email: {sessionUser.email}</li>
            <button className="logout-button" onClick={logout}>Logout</button>
          </ul>
        )}
      </>
  )
}

export default ProfileButton
