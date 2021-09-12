import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import './LandingPage.css'

const LandingPage = () => {
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);

  if(sessionUser.user) {
    history.push('/drinks');
    return null;
  }

  return (
    <div className="component-body">
      <div className="landing-darkener"><div className="landing-background-image"></div>
        </div>
        <div className="landing-links-container">
            <div className="landing-container landing-login-container" >
              <LoginFormModal />
            </div>
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
        </div>
        
      
    </div>
  )
}

export default LandingPage;
 