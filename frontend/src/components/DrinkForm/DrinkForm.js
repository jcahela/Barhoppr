import Navigation from "../Navigation"
import { useState } from "react";
import './DrinkForm.css'

function DrinkForm({ isLoaded }) {
  const [drinkName, setDrinkName] = useState('')
  const [description, setDescription] = useState('')
  const [abv, setAbv] = useState('')
  const [drinkImageUrl, setDrinkImageUrl] = useState('')

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setDrinkImageUrl(file);
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      <div className="new-drink-body">
        <div className="form-container">
          <form
            onSubmit={onSubmit}
            className="new-drink-form"  
          >
            <h1 className="new-drink-title">Create a New Drink!</h1>
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
                placeholder="ABV%"
                onChange={(e) => setAbv(e.target.value)} 
              />
            </label>
            <label className="new-drink-input">Got an image? Add it here!
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
