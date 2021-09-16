import { useEffect, useRef } from 'react';
import { useDrinkSelected } from '../../context/DrinkSelected';
import { fetchDrinks } from '../../store/drinks'
import { useDispatch } from 'react-redux';

import './DrinkCard.css'

const DrinkCard = ({ drink }) => {
  const drinkImageRef = useRef();
  const dispatch = useDispatch();
  const { setDrinkSelected, setCurrentDrink, setShowCheckinModal } = useDrinkSelected();

  // get average rating
  let avgRating;
  const ratingsArr = [];
  if (drink.Checkins.length) {
    drink.Checkins?.forEach(checkin => ratingsArr.push(Number(checkin.rating)));
    avgRating = (ratingsArr.reduce((a, b) => (a + b)) / ratingsArr.length).toFixed(2);
  }

  useEffect(() => {
    drinkImageRef.current.style.backgroundImage = `url(${drink.drinkImageUrl})`
  })

  useEffect(() => {
    dispatch(fetchDrinks())
  }, [dispatch])

  // On clicking the drinkcard checkin button, I want to:
  // 1. Open the checkin modal
  // 2. Set drinkSelected to true
  // 3. Set currentDrink to the drink prop above

  const showForm = () => {
    setDrinkSelected(true);
    setShowCheckinModal(true);
    setCurrentDrink(drink);
    return
  }

  return (
    <div className="drinkcard-container">
      <div ref={drinkImageRef} className="drinkcard-image"></div>
      <div className="drinkcard-divider"></div>
      <div className="drinkcard-content">
        <h1 className="drinkcard-title">{drink.name}</h1>
        <p className="drinkcard-description">{drink.description}</p>
        <div className="drinkcard-info">
          <p className="drinkcard-info-section drinkcard-rating-avg">Rating: {avgRating ? `${avgRating}/5` : 'N/A'}</p>
          <p className="drinkcard-info-section drinkcard-rating-total">{ratingsArr.length} Ratings</p>
          <p className="drinkcard-info-section drinkcard-added-date">{drink.abv}% ABV</p>
        </div>
      </div>
      <img
        onClick={showForm}  
        className="drinkcard-checkin-button" 
        src="/images/checkin-button.png" 
        alt="plus symbol for creating a checkin" 
      />
    </div>
  )
}

export default DrinkCard;
