import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import './Navigation.css'

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  console.log(sessionUser);


  return (
    <nav className="nav-container">
      <div className="nav-logo-title">
        <NavLink className="nav-link" exact to="/">
          <img src="/images/navbar-logo.png" alt="A mug of beer logo" className="navbar-logo" />
        </NavLink>
        <h1 className="nav-barhoppr">BARHOPPR</h1>
      </div>

      <div className="nav-site-link-container">
        <NavLink className="nav-link" to='/drinks'>Drinks & Bars</NavLink>
        <NavLink className="nav-link" to='/drinks'>Checkins</NavLink>
        <NavLink className="nav-link" to='/drinks'>Profile</NavLink>
        <NavLink className="nav-link" to='/drinks'>My Feed</NavLink>
      </div>
      
      <div className="nav-link-container">
        {sessionUser ? 
          <>
            <ProfileButton />
          </>: 
          <>
            <LoginFormModal />
            {/* <NavLink className="nav-link login-link" to="/login">Login</NavLink> */}
            <NavLink className="nav-link signup-link" to="/signup">Signup</NavLink>
          </>
        }
      </div>

    </nav>
  )
}

export default Navigation;
