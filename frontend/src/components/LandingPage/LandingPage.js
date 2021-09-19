import { NavLink } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/session";
import { useDrinkSelected } from "../../context/DrinkSelected";
import './LandingPage.css'
import { useRef } from "react";

const LandingPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const { prevHost } = useDrinkSelected();
  const history = useHistory();
  const dispatch = useDispatch();

  if (sessionUser['user'] !== undefined) {
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
  };

//  className={`landing-divider ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'arrive-up-1' : ''}`}
  return (
    <div className="component-body">
      <div className="landing-darkener">
        <div className="landing-background-image"></div>
      </div>
      <div className="landing-links-container">
          <LoginFormModal className="landing-login"/>
          <div className={`landing-container landing-signup-container ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'fadein-3' : ''}`}>
            <NavLink to="/signup" id="landing-signup" >Sign Up</NavLink>
          </div>
      </div>
      
      <div className={`landing-welcome-container ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'background-3' : ''}`}>
        <img className={`landing-logo ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'arrive-right-1' : ''}`} src="/images/landing-logo.png" alt="Beer mug graphic" />
        <h1 className={`landing-welcome-title ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'arrive-left-1' : ''}`}>BARHOPPR</h1>
        <div className={`landing-divider ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'arrive-up-1' : ''}`}></div>
        <p className={`landing-welcome-message ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'fadein-2' : ''}`}>Share your favorite drinks with the world!</p>
        <div className={`landing-welcome-signup-container ${(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'fadein-3' : ''}`} onClick={e => history.push('/signup')}>
          <NavLink className="landing-welcome-signup" to="/signup" id="landing-signup" >Sign Up Here</NavLink>
        </div>
        <NavLink onClick={getDemoUser} id={(window.location.pathname === '/') && (prevHost !== 'localhost') ? 'landing-welcome-demo' : 'landing-welcome-demo-no-animation'} to="/bar-talk" >Log in as a demo user</NavLink>

      </div>
        
      
    </div>
  )
}

export default LandingPage;
 