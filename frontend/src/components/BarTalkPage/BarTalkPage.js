import Navigation from "../Navigation"
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CheckinCard from "../CheckinCard";
import { useEffect } from "react";

import './BarTalkPage.css'

const BarTalkPage = ({ isLoaded }) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const allCheckins = useSelector(state => state.checkins.allCheckins);
  const drinks = useSelector(state => state.drinks);

  const drinksArr = Object.values(drinks);

  drinksArr.forEach(drink => {
    const ratingsArr = [];
    drink.Checkins.forEach(checkin => ratingsArr.push(Number(checkin.rating)));
    let avgRating;
    if (ratingsArr.length > 0) {
      avgRating = (ratingsArr.reduce((a, b) => (a + b)) / ratingsArr.length).toFixed(2);
    } else {
      avgRating = 0;
    }
    drink['avgRating'] = avgRating;
  })

  drinksArr.sort((a, b) => (a.avgRating < b.avgRating ? 1 : -1));

  const topFive = drinksArr.slice(0, 5);

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('bartalk-background')
  }, [])

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }

  return (
    <>
      <div className="bartalk-body" />
      <Navigation isLoaded={isLoaded}/>
      <div className="bartalk-feed-container">
        <h1 className="bartalk-title">Recent Bar Talk</h1>
        <div className="bartalk-divider"></div>
        {allCheckins.map(checkin => (
          <CheckinCard key={checkin.id} checkin={checkin}/>
        ))}

      </div>
      <div className="top-rated-drinks-container">
        <h2 className="top-rated-title">Top 5 Rated Drinks</h2>
        {topFive.map((drink, index) => {
          return (
            <div className="mini-drink-container" key={drink.id}>
              <p className="top-rated-drink">{index + 1}. {drink.name}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default BarTalkPage;
