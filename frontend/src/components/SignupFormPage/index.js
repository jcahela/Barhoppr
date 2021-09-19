import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, restoreUser } from '../../store/session'
import { fetchUsers } from '../../store/userData';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import './SignupFormPage.css'

const SignupFormPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user.user)

  const history = useHistory();
  const dispatch = useDispatch();
  const emails = useSelector(state => state.userData.emails);
  const usernames = useSelector(state => state.userData.usernames)

  if (sessionUser) {
    return (
      <Redirect to="/drinks"></Redirect>
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstname,
      lastname,
      username,
      email,
      password,
      profilePicture: 'https://cdn.discordapp.com/attachments/886336420552269847/888852953950195812/default-profile-pic-e1513291410505.jpg'
    };
    
    setPassword('');
    setConfirmPassword('');
    setErrors([]);

    const emailExists = emails.find(existingEmail => email === existingEmail.email);
    const usernameExists = usernames.find(existingUsername => username === existingUsername.username)

    if (usernameExists) {
      setErrors(['That username is already in-use.']);
      return;
    }

    if (emailExists) {
      setErrors(['That email is already in-use.']);
      return;
    }
    
    if (confirmPassword !== password) {
      setErrors(['Confirm Password field must match Password']);
      return;
    }
      
    dispatch(signupUser(newUser))
      .then(() => dispatch(restoreUser()))
      .then(() => dispatch(fetchUsers()))
      .then(() => history.push('/bar-talk'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors)
          return;
        }
      })

  }

  return (
    <div className="component-body">
      <div className="body-cover-image">
        <div className="signup-form-container">
          <div className="sign-up-image" />
          <form 
            onSubmit={onSubmit} 
            className="signup-form">
            <h1 className="signup-title">Sign up to Barhoppr.</h1>
            {errors.length > 0 && <ul className="errors-container">
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>}
            <label htmlFor="firstname"></label>
            <input 
              className="signup-input-field"
              type="text" 
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
            />
            <label htmlFor="lastname"></label>
            <input 
              className="signup-input-field"
              type="text" 
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
            />
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
            <div className="signup-bottom-links">
              <span className="login-question">Already a user?  <LoginFormModal to="/login"></LoginFormModal></span>
              <Link className="signup-home-link" to="/">Back to Home</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default SignupFormPage
