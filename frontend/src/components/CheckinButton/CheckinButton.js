import { useSelector } from "react-redux";
import { useRef } from "react";
import './CheckinButton.css'

const CheckinButton = ({ onOpen }) => {
  const sessionUser = useSelector(state => state.session.user);
  const sessionExists = !(JSON.stringify(sessionUser) === '{}');
  const modalButtonRef = useRef();

  const pathIsDrinks = window.location.pathname === '/drinks';

  return (
    <>
      {(sessionExists && !pathIsDrinks) && (
        <img 
          ref={modalButtonRef}
          onClick={onOpen}
          className="checkin-button" 
          src="/images/checkin-button.png" 
          alt="plus symbol for creating a checkin" 
        />
      )}
    </>
  )
}

export default CheckinButton;
