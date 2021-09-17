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
    <nav className="nav-container">
      <div className="nav-logo-title">
        <NavLink className="nav-link" exact to="/bar-talk">
          <img src="/images/landing-logo.png" alt="A mug of beer logo" className="navbar-logo" />
        </NavLink>
        <h1 className="nav-barhoppr">BARHOPPR</h1>
      </div>

      {isLoaded && (<div className="nav-site-link-container">
        <NavLink className="nav-link" to='/bar-talk'>Bar Talk</NavLink>
        <NavLink className="nav-link" to={`/users/${currentUser?.id}`}>My Profile</NavLink>
        <NavLink className="nav-link" to='/drinks'>Drinks</NavLink>
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
  )
}

export default Navigation;
