import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import DrinkCard from "../DrinkCard";

import './DrinksPage.css'

const DrinksPage = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const drinks = useSelector(state => state.drinks.drinkList);

  const drinksArr = Object.values(drinks);

  const sortedDrinksArr = drinksArr.sort((a, b) => a.id < b.id ? 1 : -1)

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }

  return (
    <>
      <div className="drinks-body" />
      <Navigation isLoaded={isLoaded}/>
      <div className="drinks-feed-container">
        <h1 className="drinks-title">Drinks</h1>
        <div className="drinks-divider"></div>
        {sortedDrinksArr.map(drink => (
          <DrinkCard key={drink.id} drink={drink}/>
        ))}

      </div>
    </>
  )
}

export default DrinksPage;
