import LoginForm from './LoginForm'
import { useState } from 'react'
import { Modal } from '../../context/Modal'
import './LoginFormPage.css';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  const presentModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <button className={window.location.pathname === '/signup' ? 'signup-login':'nav-login'} onClick={presentModal}>{window.location.pathname === '/signup' ? 'Log in here' : 'Log In'}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    
    </>
  )
}

export default LoginFormModal;
