import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { restoreUser } from "../../store/session";
import { getMyCheckins } from '../../store/checkins'
import './Navigation.css'
import { useEffect } from "react";

const Navigation = ({ isLoaded }) => {
  const currentUser = useSelector(state => state.session.user.user)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
    dispatch(getMyCheckins());
  }, [dispatch])


  return (
    <>
      <nav className={window.location.pathname === '/drinks' || window.location.pathname === '/new-drink' ? "drink-nav-container" : "nav-container"}>
        <div className="nav-logo-title">
          <NavLink className="nav-link" exact to="/bar-talk">
            <img src="/images/landing-logo.png" alt="A mug of beer logo" className="navbar-logo" />
          </NavLink>
          <h1 className="nav-barhoppr">BARHOPPR</h1>
        </div>

        {isLoaded && (<div className="nav-site-link-container">
          <NavLink style={{color: 'white'}} className="nav-link" to='/bar-talk'>Bar Talk</NavLink>
          <NavLink style={{color: 'white'}} className="nav-link" to={`/users/${currentUser?.id}`}>My Profile</NavLink>
          <NavLink style={{color: 'white'}} className="nav-link" to='/drinks'>Drinks</NavLink>
        </div>)}
        
        <div className="nav-link-container">
          {currentUser && isLoaded ? 
            <>
              <ProfileButton />
            </>: 
            <>
              <LoginFormModal />
              <NavLink className="nav-link signup-link" to="/signup">Signup</NavLink>
            </>
          }
        </div>
      </nav>
      <div className={window.location.pathname === '/drinks' || window.location.pathname === '/new-drink' ? "drink-footer-container" : "footer-container"}>
        <a href="https://github.com/jcahela" target="_blank" rel="noreferrer" className="github-link"><div className="github-logo"></div></a>
        <span className={window.location.pathname === '/drinks' || window.location.pathname === '/new-drink' ? "drink-github-logo-text" : "github-logo-text"}>Github</span>
        <a href="https://www.linkedin.com/in/jason-cahela/" target="_blank" rel="noreferrer" className="linkedin-link"><div className="linkedin-logo"></div></a>
        <span className={window.location.pathname === '/drinks' || window.location.pathname === '/new-drink' ? "drink-github-logo-text" : "github-logo-text"}>LinkedIn</span>
      </div>
    </>
  )
}

export default Navigation;
