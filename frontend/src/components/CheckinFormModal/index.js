import CheckinForm from './CheckinForm';
import CheckinButton from '../CheckinButton';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import './CheckinForm.css';

const CheckinFormModal = () => {
  const [showCheckinModal, setShowCheckinModal] = useState(false);

  const onOpen = (e) => {
    e.preventDefault();
    setShowCheckinModal(true);
  };

  const onClose = (e) => {
    e.preventDefault();
    setShowCheckinModal(false);
  };

  return (
    <>
      <CheckinButton onOpen={onOpen}/>
      {showCheckinModal && (
        <Modal onClose={onClose}>
          <CheckinForm setShowCheckinModal={setShowCheckinModal} onClose={onClose} />
        </Modal>
      )}
    </>
  )
}

export default CheckinFormModal;
