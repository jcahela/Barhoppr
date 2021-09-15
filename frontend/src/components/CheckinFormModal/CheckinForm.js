import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CheckinSearch from './CheckinSearch';
import { createCheckin } from '../../store/checkins';
import './CheckinForm.css'

const CheckinForm = ({ setShowCheckinModal, onClose }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [servingStyle, setServingStyle] = useState('');
  const [checkinErrors, setCheckinErrors] = useState([]);
  const [drinkSelected, setDrinkSelected] = useState(false);
  const [currentDrink, setCurrentDrink] = useState({});
  const imageRef = useRef();

  useEffect(() => {
    const image = imageRef.current;
    if (image) image.style.backgroundImage = `url(${currentDrink.drinkImageUrl})`;
  }, [currentDrink]);


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
      .then(() => setShowCheckinModal(false))
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
              <h2 className="checkin-drink-name">{currentDrink.name}</h2>

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
              <input 
                className="checkin-input-field rating"
                type="number" 
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                step="0.1"
                placeholder="Rating"
                min="0"
                max="5"
              />
              <label htmlFor="servingStyle" hidden></label>
            </div>
            <div className="form-row abv-submit-row">
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
