import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/session'
import { useHistory } from 'react-router-dom';
import './LoginFormPage.css'

const LoginFormPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([])

  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user)

  if (sessionUser) {
    history.push('/');
  }

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      credential,
      password,
    };

    setPassword('');

    return dispatch(loginUser(user))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors)
        } else {
          history.push('/');
        }
      })
  }

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <ul>
          {errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
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
    </div>
  )
}

export default LoginFormPage;
