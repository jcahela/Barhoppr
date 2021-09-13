import CheckinForm from './CheckinForm';
import CheckinButton from '../CheckinButton';
import { useState } from 'react';
import { CheckinModal } from '../../context/CheckinModal';
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
        <CheckinModal onClose={onClose}>
          <CheckinForm onClose={onClose} />
        </CheckinModal>
      )}
    </>
  )
}

export default CheckinFormModal;
