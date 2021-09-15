import { useSelector } from "react-redux";
import './CheckinButton.css'

const CheckinButton = ({ onOpen }) => {
  const sessionUser = useSelector(state => state.session.user);
  const sessionExists = !(JSON.stringify(sessionUser) === '{}');

  return (
    <>
      {sessionExists && (
        <img 
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
