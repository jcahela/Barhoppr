import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/session'
import { useHistory, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import './SignupFormPage.css'

const SignupFormPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (
      <Redirect to="/" />
    )
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password
    };

    setPassword('');
    setConfirmPassword('');

    if (confirmPassword !== password) {
      return setErrors(['Confirm Password field must match Password'])
    } else {
      return dispatch(signupUser(newUser))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors)
          } else {
            history.push('/')
          }
        })
    }
  }

  return (
    <div className="body-cover-image">
      <div className="signup-form-container">
        <div className="sign-up-image" />
        <form 
          onSubmit={onSubmit} 
          className="signup-form">
          <h1 className="signup-title">Sign up to Barhoppr.</h1>
          <ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <label htmlFor="username"></label>
          <input 
            className="signup-input-field"
            type="text" 
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <label htmlFor="email"></label>
          <input 
            className="signup-input-field"
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label htmlFor="password"></label>
          <input 
            className="signup-input-field"
            type="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label htmlFor="confirmPassword"></label>
          <input 
            className="signup-input-field"
            type="password" 
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <button className="signup-button">Signup</button>
          <span className="login-question">Already a user?  <LoginFormModal to="/login"></LoginFormModal></span>
          <Link className="signup-home-link" to="/">Back to Home</Link>
        </form>

      </div>
    </div>
  )
}

export default SignupFormPage
