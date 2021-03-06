import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './CheckinForm.css';


const CheckinSearch = ({ setCurrentDrink, setDrinkSelected }) => {
  const classRef = useRef();
  const [ searchVal, setSearchVal ] = useState('');
  const drinks = useSelector(state => state.drinks.drinkList);
  const drinksArr = Object.values(drinks);

  const sortedDrinksArr = drinksArr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  
  const matches = () => {
    const inputLength = searchVal.length;
    const matches = [];

    if (inputLength === 0) return sortedDrinksArr;

    sortedDrinksArr.forEach(drink => {
      const drinkSegment = drink.name.slice(0, inputLength);
      if (drinkSegment.toLowerCase() === searchVal.toLowerCase()) {
        matches.push(drink);
      }
    });

    return matches;
  }

  const showResults = () => {
    const resultsList = classRef.current;
    resultsList.classList.remove("hidden");
  }

  const showForm = (e) => {
    setDrinkSelected(true);
    const drink = drinksArr.find(drink => drink.name === e.target.innerText);
    setCurrentDrink(drink);
  }

  return (
    <>
      <label htmlFor="search" hidden></label>
      <input 
        className="checkin-search"
        placeholder="Search for a drink"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        onFocus={showResults}
      />
      <div className="results-container">
        <ul 
          ref={classRef} 
          className="hidden"
        >
          {matches().length ? matches().map(drink => (
            <div 
              className="drink-result-container" 
              key={drink.id} 
              
            >
              <img className="drink-result-image" src={drink.drinkImageUrl} alt="" />
              <div onClick={showForm} className="drink-result-name-container">
                <li className="drink-result-name">{drink.name}</li>
              </div>
            </div>
          )) : (
            <li className="no-match">Don't see your drink? <Link to="/new-drink">Create one here</Link></li>
          )
        }
        </ul>
      </div>
    </>
  )
}

export default CheckinSearch;
