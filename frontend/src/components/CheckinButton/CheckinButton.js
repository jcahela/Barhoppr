import { useSelector } from "react-redux";
import './CheckinButton.css'

const CheckinButton = ({ onOpen }) => {
  const sessionUser = useSelector(state => state.session.user);
  console.log(sessionUser);
  console.log(!JSON.stringify(sessionUser) === '{}', 'INSIDE CHECKIN BUTTON');
  const sessionExists = !(JSON.stringify(sessionUser) === '{}');

  // const showCheckinForm = () => {
  //   alert('hi');
  // }

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
