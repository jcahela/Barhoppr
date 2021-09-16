import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { destroyCheckin, getMyCheckins, getAllCheckins, updateCheckin } from '../../store/checkins';

import './CheckinCard.css'

const CheckinCard = ({ checkin }) => {
  const profilePicRef = useRef();
  const drinkPicRef = useRef();
  const iconRef = useRef();
  const canRef = useRef();
  const currentUser = useSelector(state => state.session.user.user);
  const dispatch = useDispatch();
  const [beingEdited, setBeingEdited] = useState(false);
  const [editServingStyle, setEditServingStyle] = useState(checkin.servingStyle);
  const [editDrinkId, setEditDrinkId] = useState(checkin.Drink?.id);
  const [editRating, setEditRating] = useState(checkin.rating);
  const [editComment, setEditComment] = useState(checkin.comment);


  const drinks = useSelector(state => state.drinks);
  const drinksArr = Object.values(drinks);

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

  const onEdit = (e) => {
    e.preventDefault();
    // create checkin to be sent to DB:
    // userId, drinkId, servingStyle, rating, comment
    const editedCheckin = {
      checkinId: checkin.id,
      editDrinkId,
      servingStyle: editServingStyle,
      rating: editRating,
      comment: editComment
    };

    console.log(editedCheckin);

    dispatch(updateCheckin(editedCheckin))
      .then(() => dispatch(getMyCheckins()))
      .then(() => dispatch(getAllCheckins()))
      .then(() => setBeingEdited(false));
  }

  if (beingEdited) {
    return (
      <div className="checkincard-container">
        <form onSubmit={onEdit}>
          {checkin && (<div className="checkincard-header">
            <div ref={profilePicRef} className="checkincard-profile-pic"></div>
            <div className="checkincard-title-container">
              <h2 className="checkincard-title inline-block"><span className="checkincard-user-name">{checkinUser?.firstname} {checkinUser?.lastname}</span> is drinking a</h2>
              {/* First form element change - drinks */}
              <label htmlFor="drinkId" hidden></label>
              <select 
                className="checkin-input-field edit-drinks"
                name="drinkId"
                value={editDrinkId}
                onChange={(e) => setEditDrinkId(e.target.value)}
              >
                <option value="" disabled>--Select Drink--</option>
                {drinksArr.map(drink => (
                  <option key={drink.id} value={drink.id}>{drink.name}</option>
                ))}
              </select>
              <p className="checkincard-rating"><span className="checkincard-user-name">{checkinUser?.firstname}</span> rated it a</p>
              {/* Second form element change - rating */}
              <label htmlFor="rating" hidden></label>
              <select 
                className="checkin-input-field edit-rating"
                name="rating"
                value={editRating}
                onChange={(e) => setEditRating(e.target.value)}
              >
                <option value="" disabled>--Rating--</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div ref={drinkPicRef} className="checkincard-drink-pic"></div>
          </div>)}
          {/* Third form element - serving style */}
          <label className="edit-serving-style-label" htmlFor="servingStyle">Serving Style: </label>
          <select 
                className="checkin-input-field serving-style"
                name="servingStyle"
                value={editServingStyle}
                onChange={(e) => setEditServingStyle(e.target.value)}
              >
                <option value="" disabled>--Serving Style--</option>
                <option value="draft">Draft</option>
                <option value="glass">Glass</option>
                <option value="bottle">Bottle</option>
                <option value="can">Can</option>
              </select>
          {/* Fourth form element - comment */}
          <label htmlFor="comment" hidden></label>
            <textarea 
              className="edit-comment-field"
              name="comment"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
          <p className="checkincard-time">{checkinDateFormatted}</p>
          <p className="edit-checkin-button" onClick={() => setBeingEdited(false)}>cancel</p>
          <span ref={iconRef} className="hidden material-icons drink-icon"></span>
          <img ref={canRef} className="hidden can-img drink-icon" src="https://img.icons8.com/material/50/000000/beer-can--v2.png" alt=""/>
          <button className="edit-submit">confirm</button>
          <p className="delete-checkin-button" onClick={deleteCheckin}>delete</p>
        </form>
    </div>
    )
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
          <p className="edit-checkin-button" onClick={() => setBeingEdited(true)}>edit</p>
        )}
        <span ref={iconRef} className="material-icons drink-icon"></span>
        <img ref={canRef} className="hidden can-img drink-icon" src="https://img.icons8.com/material/50/000000/beer-can--v2.png" alt=""/>
      </div>
    </>
  )
}

export default CheckinCard;
