import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './CheckinForm.css'

const CheckinForm = ({ onClose }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [servingStyle, setServingStyle] = useState('');
  const [abv, setAbv] = useState('');
  const [checkinErrors, setCheckinErrors] = useState([]);
  const [drinkSelected, setDrinkSelected] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    alert('hi');
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
            <div className="checkin-drink-image"/>
            <div className="checkin-drink-name-container">
              <h2 className="checkin-drink-name">Bud Lite Heineken</h2>

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
            </div>
            <div className="form-row abv-submit-row">
              <label htmlFor="abv" hidden></label>
              <input 
                className="checkin-input-field abv"
                type="number" 
                name="abv"
                value={abv}
                onChange={(e) => setAbv(e.target.value)}
                step="0.1"
                placeholder="ABV%"
                min="0"
                max="100"
              />
              <button className="checkin-submit-button">Checkin</button>
            </div>
          </form>
        </>
      )
      : (
        <>
          <label htmlFor="search" hidden></label>
          <input 
            onBlur={() => setDrinkSelected(true)} 
            className="checkin-search"
            placeholder="Search for a drink"
          />
        </>

        )}
    </div>
      
    </>
  )
}

export default CheckinForm;
