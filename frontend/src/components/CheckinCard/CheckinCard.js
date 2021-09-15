import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyCheckin, getMyCheckins, getAllCheckins } from '../../store/checkins';

import './CheckinCard.css'

const CheckinCard = ({ checkin }) => {
  const profilePicRef = useRef();
  const drinkPicRef = useRef();
  const iconRef = useRef();
  const canRef = useRef();
  const currentUser = useSelector(state => state.session.user.user);
  const dispatch = useDispatch();

  const checkinUser = checkin?.User;
  const checkinDrink = checkin?.Drink;
  const checkinDateLongString = checkin?.createdAt;
  const checkinDate = new Date(checkinDateLongString);
  const checkinDateFormatted = checkinDate.toLocaleString();
  
  const ownedCard = currentUser?.id === checkinUser?.id

  useEffect(() => {
    const profilePicDiv = profilePicRef.current;
    const drinkPicDiv = drinkPicRef.current;
    profilePicDiv.style.backgroundImage = `url(${checkinUser?.profilePicture})`
    drinkPicDiv.style.backgroundImage = `url(${checkinDrink?.drinkImageUrl})`

    // Wine icon
    // <span class="material-icons">wine_bar</span>

    // Can icon
    // <img src="https://img.icons8.com/material/50/000000/beer-can--v2.png"/>

    // Draft beer icon
    // <span class="fas fa-beer"></span>

    // Bottle icon
    // <span class="fas fa-wine-bottle"></span>

    if (checkin.servingStyle === 'can') {
      iconRef.current.classList.add('hidden');
      canRef.current.classList.remove('hidden');
    } else if (checkin.servingStyle === 'bottle') {
      iconRef.current.classList.add('fas')
      iconRef.current.classList.add('fa-wine-bottle')
    } else if (checkin.servingStyle === 'glass') {
      iconRef.current.innerText = 'wine_bar'
      iconRef.current.classList.add('wine-sizing')
    } else if (checkin.servingStyle === 'draft') {
      iconRef.current.classList.add('fas')
      iconRef.current.classList.add('fa-beer')
    }
  });

  const deleteCheckin = (e) => {
    dispatch(destroyCheckin(checkin.id))
      .then(() => dispatch(getMyCheckins()))
      .then(() => dispatch(getAllCheckins()));
  }

  return (
    <>
      <div className="checkincard-container">
        {checkin && (<div className="checkincard-header">
          <div ref={profilePicRef} className="checkincard-profile-pic"></div>
          <div className="checkincard-title-container">
            <h2 className="checkincard-title"><span className="checkincard-user-name">{checkinUser?.firstname} {checkinUser?.lastname}</span> is drinking a {checkinDrink?.name}</h2>
            <p className="checkincard-rating"><span className="checkincard-user-name">{checkinUser?.firstname}</span> rated it a {checkin?.rating}/5!</p>
          </div>
          <div ref={drinkPicRef} className="checkincard-drink-pic"></div>
        </div>)}

        <div className="checkincard-comment-container">
          <p className="checkincard-comment">{checkin?.comment}</p>
        </div>
        <p className="checkincard-time">{checkinDateFormatted}</p>
        {ownedCard && (
          <p className="delete-checkin-button" onClick={deleteCheckin}>delete</p>
        )}
        <span ref={iconRef} className="material-icons drink-icon"></span>
        <img ref={canRef} className="hidden can-img drink-icon" src="https://img.icons8.com/material/50/000000/beer-can--v2.png" alt=""/>
      </div>
    </>
  )
}

export default CheckinCard;
