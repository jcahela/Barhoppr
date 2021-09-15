import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import './CheckinCard.css'

const CheckinCard = ({ checkin }) => {
  const profilePicRef = useRef();
  const drinkPicRef = useRef();
  const checkins = useSelector(state => state.checkins.allCheckins);

  const myCheckins = useSelector(state => state.checkins.myCheckins);

  const currentCheckin = myCheckins[0];

  const currentUser = currentCheckin?.User;
  const currentDrink = currentCheckin?.Drink;

  const checkinCreatedAt = currentCheckin?.createdAt;

  const checkinDate = checkinCreatedAt?.toLocaleString();

  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    const drinkPicDiv = drinkPicRef.current;

    if (profilePicDiv) profilePicDiv.style.backgroundImage = `url(${currentUser?.profilePicture})`
    if (drinkPicDiv) drinkPicDiv.style.backgroundImage = `url(${currentDrink?.drinkImageUrl})`
  })

  console.log(currentCheckin);
  return (
    <>
      <div className="checkincard-container">
        {currentCheckin && (<div className="checkincard-header">
          <div ref={profilePicRef} className="checkincard-profile-pic"></div>
          <div className="checkincard-title-container">
            <h2 className="checkincard-title"><span className="checkincard-user-name">{currentUser?.firstname} {currentUser?.lastname}</span> is drinking a {currentDrink?.name}</h2>
            <p className="checkincard-rating"><span className="checkincard-user-name">{currentUser?.firstname}</span> rated it a {currentCheckin?.rating}/5!</p>
          </div>
          <div ref={drinkPicRef} className="checkincard-drink-pic"></div>
        </div>)}

        <div className="checkincard-comment-container">
          <p className="checkincard-comment">{currentCheckin?.comment}</p>
        </div>
        <p className="checkincard-time">{currentCheckin?.createdAt}</p>
      </div>
    </>
  )
}

export default CheckinCard;
