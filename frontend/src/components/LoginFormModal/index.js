import LoginForm from './LoginForm'
import { useState } from 'react'
import { Modal } from '../../context/Modal'
import './LoginFormPage.css';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  const onOpen = (e) => {
    e.preventDefault();
    setShowModal(true);
    const componentBody = document.querySelector(".component-body");
    if (componentBody) {
      componentBody.classList.add('blur');
    }
  }

  const onClose = (e) => {
    e.preventDefault();
    setShowModal(false);
    const componentBody = document.querySelector(".component-body");
    if (componentBody) {
      componentBody.classList.remove('blur');
    }
  }

  let logInMainClass;

  if (window.location.pathname === '/signup') {
    logInMainClass = 'signup-login'
  } else if (window.location.pathname ==='/') {
    logInMainClass = 'landing-page-login'
  } else {
    logInMainClass = 'nav-login'
  }
  

  return (
    <>
      <button className={`${logInMainClass} hover-pointer ${window.location.pathname === '/' ? 'landing-login' : ''}`} onClick={onOpen}>{window.location.pathname === '/signup' ? 'Log in here' : 'Log In'}</button>
      {showModal && (
        <Modal onClose={onClose}>
          <LoginForm onClose={onClose} />
        </Modal>
      )}
    
    </>
  )
}

export default LoginFormModal;
