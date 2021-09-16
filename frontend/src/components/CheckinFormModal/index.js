import CheckinForm from './CheckinForm';
import CheckinButton from '../CheckinButton';
import { Modal } from '../../context/Modal';
import { useDrinkSelected } from '../../context/DrinkSelected';
import './CheckinForm.css';

const CheckinFormModal = () => {
  const { setDrinkSelected, setCurrentDrink, showCheckinModal, setShowCheckinModal } = useDrinkSelected();

  if (showCheckinModal === true) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';

  }

  const onOpen = (e) => {
    e.preventDefault();
    setShowCheckinModal(true);
  };

  const onClose = (e) => {
    e.preventDefault();
    setDrinkSelected(false);
    setCurrentDrink({});
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
