import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/session";
import { useHistory } from "react-router";
import ProfileButton from "./ProfileButton";

import './Navigation.css'

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(sessionUser);

  const logout = (e) => {
    e.preventDefault();
    if (sessionUser) {
      dispatch(logoutUser());
      history.push('/');
    }
  }

  return (
    <nav className="nav-container">
      <NavLink className="nav-link" exact to="/">Home</NavLink>
      {sessionUser ? 
        <>
          <a className="logout-button" onClick={logout} href="/">Logout</a>
          <ProfileButton />
        </>: 
        <>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/signup">Signup</NavLink>
        </>
      }
    </nav>
  )
}

export default Navigation;
