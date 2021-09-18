import Navigation from "../Navigation"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createDrink } from "../../store/drinks";
import { useDrinkSelected } from "../../context/DrinkSelected";
import { useHistory } from "react-router-dom";
import { fetchDrinks } from "../../store/drinks";
import { Link } from "react-router-dom";
import './DrinkForm.css'

function DrinkForm({ isLoaded }) {
  const { setShowCheckinModal } = useDrinkSelected();
  const [drinkName, setDrinkName] = useState('');
  const [description, setDescription] = useState('');
  const [abv, setAbv] = useState('');
  const [drinkImageFile, setDrinkImageFile] = useState('');
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setShowCheckinModal(false);
  })

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setDrinkImageFile(file);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newDrink = {
      name: drinkName,
      drinkImageFile,
      description,
      abv
    };

    dispatch(createDrink(newDrink))
      .then(() => dispatch(fetchDrinks()))
      .then(() => history.push('/drinks'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          console.log(errors);
          return;
        }
      })
  }

  const goBack = () => {
    history.goBack();
  }

  return (
    <>
      <div className="new-drink-body">
        <div className="form-container">
          <p className="go-back" onClick={goBack}>Go back</p>
          <form
            onSubmit={onSubmit}
            className="new-drink-form"  
          >
            <h1 className="new-drink-title">Create a New Drink!</h1>
            {errors.length > 0 && <ul className="drink-errors">
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>}
            <label htmlFor="drinkName">
              <input 
                className="new-drink-input drink-name"
                type="text" 
                id="drinkName" 
                value={drinkName} 
                placeholder="Drink Name"
                onChange={(e) => setDrinkName(e.target.value)} 
              />
            </label>
            <label htmlFor="description">
              <textarea 
                className="new-drink-input drink-description"
                type="text" 
                id="description" 
                value={description} 
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)} 
              />
            </label>
            <label htmlFor="abv">
              <input 
                className="new-drink-input drink-abv"
                type="number" 
                id="abv" 
                value={abv} 
                placeholder="ABV"
                onChange={(e) => setAbv(e.target.value)} 
                step="0.1"
                min="0"
                max="70"
              /> <span className="abv-label-text">%</span>
            </label>
            <label className="new-drink-input">Got a pic? Add it here!
            </label>
            <input className="new-drink-input new-drink-image" type="file" onChange={updateFile} />
            <button className="new-drink-input new-drink-button">Create</button>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default DrinkForm;
