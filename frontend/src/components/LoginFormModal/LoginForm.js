import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/session'
import { useHistory } from 'react-router-dom';
import './LoginFormPage.css'
import { Link } from 'react-router-dom';

const LoginForm = ({ onClose }) => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState([])
  const history = useHistory();
  const dispatch = useDispatch();
  
  const onLogin = (e) => {
    e.preventDefault();
    const user = {
      credential,
      password,
    };

    setPassword('');

    dispatch(loginUser(user))
    .then(() => history.push('/bar-talk') )
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setLoginErrors(data.errors)
        return;
      }
    })
  }

  const getDemoUser = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({
      credential: 'demo-guy',
      password: '!LOLwow808'
    }));
    // await dispatch(restoreUser());
    history.push('/bar-talk');
  }


  return (
    <div className="login-container">
      <span onClick={onClose} className="material-icons close-icon" id="close-login-icon-color">close</span>
      <h1 className="login-title-barhoppr">BARHOPPR</h1>
      <div className="login-line-divider"></div>
      <img src="/images/logo-login.png" alt="A mug of beer logo" className="logo-login" />
      <h2 className="login-title-login">Login</h2>
      <form onSubmit={onLogin} className="login-form">
        {loginErrors.length > 0 && <ul className="login-error-container">
          {loginErrors.map(error => (
            <li className="login-errors" key={error}>{error}</li>
          ))}
        </ul>}
        <label htmlFor="credential"></label>
        <input 
          className="login-input-field"
          type="text" 
          name="credential"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Username/Email"
        />
        <label htmlFor="password"></label>
        <input 
          className="login-input-field"
          type="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login-button">Login</button>
      </form>
      <Link id="demo-user-link" to="/" onClick={getDemoUser}>Log in as a demo user</Link>
      {(window.location.pathname !== '/signup') && (
        <span className="signup-question">Need a Barhoppr account?  <Link className="signup-link" to="/signup">Sign up here</Link></span>
      )}
    </div>
  )
}

export default LoginForm;
