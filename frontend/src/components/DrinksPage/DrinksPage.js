import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import DrinkCard from "../DrinkCard";

import './DrinksPage.css'

const DrinksPage = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const drinks = useSelector(state => state.drinks);

  const drinksArr = Object.values(drinks);

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }

  drinksArr.forEach(drink => {
    const ratingsArr = [];
    drink.Checkins.forEach(checkin => ratingsArr.push(Number(checkin.rating)));
    const avgRating = (ratingsArr.reduce((a, b) => (a + b)) / ratingsArr.length).toFixed(2);
    drink['avgRating'] = avgRating;
  })

  drinksArr.sort((a, b) => (a.avgRating < b.avgRating ? 1 : -1));

  const topFive = drinksArr.slice(0, 5);

  return (
    <>
      <div className="drinks-body" />
      <Navigation isLoaded={isLoaded}/>
      <div className="drinks-feed-container">
        <h1 className="drinks-title">Drinks</h1>
        <div className="drinks-divider"></div>
        {drinksArr.map(drink => (
          <DrinkCard key={drink.id} drink={drink}/>
        ))}

      </div>
      <div className="top-rated-drinks">
        <h2 className="top-rated-title">Top 5 Rated Drinks</h2>
        {topFive.map((drink, index) => {
          return (
            <div className="mini-drink-container">
              <div className={`img-${drink.id} top-rated-drink-image`}></div>
              <p>{index + 1}. {drink.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DrinksPage;
