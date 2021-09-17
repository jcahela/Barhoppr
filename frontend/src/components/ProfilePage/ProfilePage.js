import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CheckinCard from "../CheckinCard/CheckinCard";
import './ProfilePage.css'

const ProfilePage = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const allUsers = useSelector(state => state.userData.users);
  const allCheckins = useSelector(state => state.checkins.allCheckins)
  const profilePicRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { id } = useParams();

  const profileUser = allUsers.find(user => user.id === +id);
  
  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    if (profilePicDiv) profilePicDiv.style.backgroundImage = `url(${profileUser?.profilePicture})`
  })

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (!profileUser) {
    return (
      <>
        <h1>That page doesn't exist</h1>
        <Link to="/bar-talk">Home</Link>
      </>
    )
  }

  const profileCheckins = allCheckins.filter(checkin => checkin.User.id === profileUser.id)

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }

  const openMenu = () => {
    setShowMenu(true);
  }

  const closeMenu = () => {
    setShowMenu(false)
  };

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      <div className="profile-banner">
        <div className="profile-header-container">
          <div 
            ref={profilePicRef} 
            className="profile-picture"
            onClick={openMenu}
          >
          {showMenu && (
            <div className="new-profile-pic-form">
              <form onSubmit={onSubmit}>
                <label htmlFor="profilePic">Choose new profile picture</label>
                <input id="profilePic" type="file" />
                <button className="new-profile-pic-button">Submit</button>
              </form>
            </div>
          )}
          </div>
          <div className="profile-header-info">
            <h1 className="profile-header profile-header-name">{profileUser.firstname} {profileUser.lastname}</h1>
            <h2 className="profile-header profile-header-username">@{profileUser.username}</h2>
          </div>
        </div>
      </div>
      <div onClick={closeMenu} className="profile-checkins">
        <h1 className="activity-title">{(sessionUser.user.id === +id) ? 'Your Activity' : `${profileUser.firstname}'s Activity`}</h1>
        <div className="activity-title-divider"></div>
        <div className="activity-divider"></div>
        {profileCheckins?.map(checkin => (
          <>
            <CheckinCard checkin={checkin}/>
            <div className="activity-divider"></div>
          </>
        ))}
      </div>
      
    </>
  )
}

export default ProfilePage;
