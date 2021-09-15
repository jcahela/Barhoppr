import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import './CheckinForm.css';


const CheckinSearch = ({ setCurrentDrink, setDrinkSelected }) => {
  const classRef = useRef();
  const [ searchVal, setSearchVal ] = useState('');
  const drinks = useSelector(state => state.drinks);
  const drinksArr = Object.values(drinks);
  
  const matches = () => {
    const inputLength = searchVal.length;
    const matches = [];

    if (inputLength === 0) return drinksArr;

    drinksArr.forEach(drink => {
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
            // TODO: change to drink card once drink cards are made
            <li 
              className="drink-result" 
              key={drink.id}
              onClick={showForm}
            >{drink.name}</li>
          )) : (
            <li className="no-match">No Matches</li>
          )
        }
        </ul>
      </div>
    </>
  )
}

export default CheckinSearch;
