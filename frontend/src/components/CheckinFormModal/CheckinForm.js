import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CheckinSearch from './CheckinSearch';
import { createCheckin, getMyCheckins, getAllCheckins } from '../../store/checkins';
import { fetchDrinks, fetchTop5 } from '../../store/drinks';
import { useDrinkSelected } from '../../context/DrinkSelected';
import './CheckinForm.css'


const CheckinForm = ({ onClose }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [servingStyle, setServingStyle] = useState('');
  const [checkinErrors, setCheckinErrors] = useState([]);
  const { drinkSelected, setDrinkSelected, currentDrink, setCurrentDrink, setShowCheckinModal } = useDrinkSelected();
  const imageRef = useRef();
  const iconRef = useRef();
  const canRef = useRef();

  useEffect(() => {
    const image = imageRef.current;
    if (image) image.style.backgroundImage = `url(${currentDrink.drinkImageUrl})`;
  }, [currentDrink]);

  useEffect(() => {
    if (servingStyle === 'can') {
      iconRef.current.innerText="";
      iconRef.current.classList.add('hidden');
      canRef.current.classList.remove('hidden');
    } else if (servingStyle === 'bottle') {
      iconRef.current.innerText="";
      canRef.current.classList.add('hidden');
      iconRef.current.className = 'fas fa-wine-bottle';
    } else if (servingStyle === 'glass') {
      iconRef.current.innerText="";
      canRef.current.classList.add('hidden');
      iconRef.current.className = 'material-icons';
      iconRef.current.innerText = 'wine_bar'
    } else if (servingStyle === 'draft') {
      iconRef.current.innerText="";
      canRef.current.classList.add('hidden');
      iconRef.current.className = 'fas fa-beer';
    }
  }, [servingStyle])


  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const checkin = {
      drinkId: currentDrink.id,
      comment,
      rating,
      servingStyle
    };

    if (rating < 0 || rating > 5) {
      setCheckinErrors([...checkinErrors, 'Rating must be between 0 and 5.']);
      return
    };
    
    dispatch(createCheckin(checkin))
      .then(() => dispatch(getMyCheckins()))
      .then(() => setShowCheckinModal(false))
      .then(() => setDrinkSelected(false))
      .then(() => dispatch(fetchDrinks()))
      .then(() => setCurrentDrink({}))
      .then(() => dispatch(getAllCheckins()))
      .then(() => dispatch(fetchTop5()))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setCheckinErrors(data.errors)
          return;
        }
      })
  }
  

  return (
    <>
    <div className="checkin-container">
      <span onClick={onClose} className="material-icons checkin-close-icon" id="close-login-icon-color">close</span>
      <h1 className="checkin-title">Checkin</h1>
      <div className="checkin-divider"></div>
      {drinkSelected ? (
        <>
          <div className="drink-header">
            <div ref={imageRef} className="checkin-drink-image"/>
            <div className="checkin-drink-name-container">
              <h2 className="checkin-drink-name">{currentDrink?.name}</h2>
            </div>
          </div>
          <form onSubmit={onSubmit} className="checkin-form">
            <ul>
              {checkinErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
            <label htmlFor="comment"></label>
            <textarea 
              className="form-row checkin-input-field comment-field"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How'd you like the drink?"
            />
            <div className="form-row rating-serving-row">
              <label htmlFor="rating" hidden></label>
              <select 
                className="checkin-input-field serving-style"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
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
            <div className="form-row abv-submit-row">
              <label htmlFor="servingStyle" hidden></label>
              <select 
                className="checkin-input-field serving-style"
                name="servingStyle"
                value={servingStyle}
                onChange={(e) => setServingStyle(e.target.value)}
              >
                <option value="" disabled>--Serving Style--</option>
                <option value="draft">Draft</option>
                <option value="glass">Glass</option>
                <option value="bottle">Bottle</option>
                <option value="can">Can</option>
              </select>
              <button className="checkin-submit-button">Checkin</button>
              <span ref={iconRef} className="material-icons" id="drink-icon"></span>
              <img ref={canRef} className="hidden can-img" id="drink-icon" style={{height: '30px', width: '30px'}} src="https://img.icons8.com/material/50/000000/beer-can--v2.png" alt=""/>
            </div>
          </form>
        </>
      )
      : <CheckinSearch setCurrentDrink={setCurrentDrink} setDrinkSelected={setDrinkSelected}/>}
    </div>
      
    </>
  )
}

export default CheckinForm;
