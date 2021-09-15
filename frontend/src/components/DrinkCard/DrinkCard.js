import { useEffect, useRef } from 'react';

import './DrinkCard.css'

const DrinkCard = ({ drink }) => {
  const drinkImageRef = useRef();

  // get average rating
  const ratingsArr = [];
  drink.Checkins.forEach(checkin => ratingsArr.push(Number(checkin.rating)));
  const avgRating = (ratingsArr.reduce((a, b) => (a + b)) / ratingsArr.length).toFixed(2);
  
  // get date the drink was created in the database
  const drinkCreatedAt = drink.createdAt;
  const drinkDate = new Date(drinkCreatedAt);
  const drinkDateFormatted = drinkDate.toLocaleDateString();

  useEffect(() => {
    drinkImageRef.current.style.backgroundImage = `url(${drink.drinkImageUrl})`
  })

  return (
    <div className="drinkcard-container">
      <div ref={drinkImageRef} className="drinkcard-image"></div>
      <div className="drinkcard-divider"></div>
      <div className="drinkcard-content">
        <h1 className="drinkcard-title">{drink.name}</h1>
        <p className="drinkcard-description">{drink.description}</p>
        <div className="drinkcard-info">
          <p className="drinkcard-info-section drinkcard-rating-avg">Rating: {avgRating}/5</p>
          <p className="drinkcard-info-section drinkcard-rating-total">{ratingsArr.length} Ratings</p>
          <p className="drinkcard-info-section drinkcard-added-date">Added: {drinkDateFormatted}</p>
        </div>
      </div>
      <img 
          className="drinkcard-checkin-button" 
          src="/images/checkin-button.png" 
          alt="plus symbol for creating a checkin" 
        />
    </div>
  )
}

export default DrinkCard;
