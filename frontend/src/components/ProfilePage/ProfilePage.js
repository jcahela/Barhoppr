import Navigation from "../Navigation"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { updateProfilePic } from "../../store/userData";
import { restoreUser } from "../../store/session";
import { getAllCheckins } from "../../store/checkins";
import CheckinCard from "../CheckinCard/CheckinCard";
import './ProfilePage.css'

const ProfilePage = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const allUsers = useSelector(state => state.userData.users);
  const allCheckins = useSelector(state => state.checkins.allCheckins)
  const profilePicRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState('');

  const { id } = useParams();

  const profileUser = allUsers.find(user => user.id === +id);
  
  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    if (profilePicDiv) profilePicDiv.style.backgroundImage = `url(${profileUser?.profilePicture})`
  })

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);
  
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

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
    const userToUpdate = {
      image: profileImageFile,
      id: sessionUser.user.id
    }
    dispatch(updateProfilePic(userToUpdate))
    .then(() => dispatch(getAllCheckins()))
    .then(() => dispatch(restoreUser()))
    .then(() => closeMenu())
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImageFile(file);
  }

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      <div className="profile-body" id="profile-top"></div>
      <div className="profile-banner">
        <div className="profile-header-container">
          <div 
            ref={profilePicRef} 
            className="profile-picture"
          >
            {(sessionUser.user.id === +id) && <span onClick={openMenu} className="material-icons new-photo-icon">add_a_photo</span>}
          {showMenu && (
            <div className="new-profile-pic-form-container">
              <form className="new-profile-pic-form" onSubmit={onSubmit}>
                <span onClick={closeMenu} className="material-icons new-profile-pic-close-icon" id="close-login-icon-color">close</span>
                <label className="new-profile-pic-file-label">Update profile picture
                  <input 
                    className="new-profile-pic-file-button" 
                    id="profilePic" 
                    type="file"
                    onChange={updateFile}
                  />
                </label>
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
      <div className="profile-checkins">
        <h1 className="activity-title">{(sessionUser.user.id === +id) ? 'Your Activity' : `${profileUser.firstname}'s Activity`}</h1>
        <div className="activity-title-divider"></div>
        <div className="activity-divider"></div>
        {profileCheckins?.map(checkin => (
          <div key={checkin.id}>
            <CheckinCard checkin={checkin}/>
            <div className="activity-divider"></div>
          </div>
        ))}
      </div>
            <a className="scrollToTop" href="#profile-top"><span className="material-icons scroll-button-content">
arrow_upward
</span></a>
      
    </>
  )
}

export default ProfilePage;
