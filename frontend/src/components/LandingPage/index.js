import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import './LandingPage.css'

const LandingPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (
      <Redirect to="/drinks"></Redirect>
    )
  }

  return (
    <div className="component-body">
      <div className="landing-background-image">
        <div className="landing-darkener">
          <div className="landing-links-container">
            <div className="landing-container landing-login-container" >
              <LoginFormModal />
            </div>
            <div className="landing-container landing-signup-container">
              <NavLink to="/signup" id="landing-signup" >Sign Up</NavLink>
            </div>
          </div>
          <div className="landing-welcome-container">
            <h1 className="landing-welcome-title">BARHOPPR</h1>
            <p className="landing-welcome-message">Share your favorite drinks with the world</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
 