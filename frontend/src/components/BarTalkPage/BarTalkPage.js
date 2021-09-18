import Navigation from "../Navigation"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import CheckinCard from "../CheckinCard";
import { useEffect } from "react";
import { fetchTop5 } from "../../store/drinks";

import './BarTalkPage.css'

const BarTalkPage = ({ isLoaded }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const allCheckins = useSelector(state => state.checkins.allCheckins);
  const drinks = useSelector(state => state.drinks.drinkList)
  const topFive = useSelector(state => state.drinks.top5);

  useEffect(() => {
    dispatch(fetchTop5());
  }, [dispatch])

  
  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('bartalk-background')
  }, [])
  

  if (sessionUser['user'] === undefined) {
    history.push('/');
    return null;
  }
  

  topFive.forEach(drink => {
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
              <p className="top-rated-drink">{index + 1}. {drink.name} ({drink.avgRating} - {drink.Checkins.length > 1 ? `${drink.Checkins.length} reviews` : `${drink.Checkins.length} review`})</p>
            </div>
          )
        })}
      </div>
      <a className="scrollToTop" href="#bartalk-body"><span class="material-icons scroll-button-content">
arrow_upward
</span></a>
    </>
  )
}

export default BarTalkPage;
