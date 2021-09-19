import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/session";
import './LandingPage.css'

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const sessionUser = useSelector(state => state.session.user.user);

  if(sessionUser) {
    history.push('/bar-talk');
    return null;
  }

  const getDemoUser = (e) => {
    e.preventDefault();
    dispatch(loginUser({
      credential: 'demo-guy',
      password: 'password'
    }))
    .then(() => history.push('/bar-talk'));
  }

  return (
    <div className="component-body">
      <div className="landing-darkener">
        <div className="landing-background-image"></div>
      </div>
      <div className="landing-links-container">
          <LoginFormModal className="landing-login"/>
          <div className="landing-container landing-signup-container">
            <NavLink to="/signup" id="landing-signup" >Sign Up</NavLink>
          </div>
      </div>
      
      <div className="landing-welcome-container">
        <img className="landing-logo" src="/images/landing-logo.png" alt="Beer mug graphic" />
        <h1 className="landing-welcome-title">BARHOPPR</h1>
        <div className="landing-divider"></div>
        <p className="landing-welcome-message">Share your favorite drinks with the world!</p>
        <div className="landing-welcome-signup-container" onClick={e => history.push('/signup')}>
          <NavLink className="landing-welcome-signup" to="/signup" id="landing-signup" >Sign Up Here</NavLink>
        </div>
        <NavLink onClick={getDemoUser} id="landing-welcome-demo" to="/bar-talk" >Log in as a demo user</NavLink>

      </div>
        
      
    </div>
  )
}

export default LandingPage;
 