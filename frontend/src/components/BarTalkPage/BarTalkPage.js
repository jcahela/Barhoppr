import Navigation from "../Navigation"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CheckinCard from "../CheckinCard";
import { useEffect, useState } from "react";
import { fetchTop5 } from "../../store/drinks";
import { getAllCheckins } from "../../store/checkins";

import './BarTalkPage.css'

const BarTalkPage = ({ isLoaded }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const allCheckins = useSelector(state => state.checkins.allCheckins);
  const topFive = useSelector(state => state.drinks.top5);
  const [sortStyle, setSortStyle] = useState('newest-to-oldest')
  const [sortedArray, setSortedArray] = useState(allCheckins)

  useEffect(() => {
    dispatch(fetchTop5());
  }, [dispatch])

  
  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('bartalk-background')
  }, [sortedArray])

  useEffect(() => {
    if (sortStyle === 'newest-to-oldest') {
      setSortedArray(allCheckins);
    };
    if (sortStyle === 'oldest-to-newest') {
      const oldestToNewest = allCheckins.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
      setSortedArray(oldestToNewest);
    };
    if (sortStyle === 'highest-to-lowest') {
      const highestToLowest = allCheckins.sort((a, b) => a.rating < b.rating ? 1 : -1);
      setSortedArray(highestToLowest);
    };
    if (sortStyle === 'lowest-to-highest') {
      const lowestToHighest = allCheckins.sort((a, b) => a.rating > b.rating ? 1 : -1);
      setSortedArray(lowestToHighest);
      
    }
  }, [sortStyle, allCheckins])
  

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

  const sortCheckins = (e) => {
    setSortStyle(e.target.value);
    dispatch(getAllCheckins());
  }


  return (
    <>
      <div className="bartalk-body" />
      <Navigation isLoaded={isLoaded}/>
      <div className="bartalk-feed-container">
        <h1 className="bartalk-title">Recent Bar Talk</h1>
        <div className="bartalk-divider"></div>
        <div className="sort-container">
          <span className="sort-title">Sort By: </span>
          <select 
            name="sortStyle" 
            className="sort-selector"
            value={sortStyle}
            onChange={sortCheckins}
          >
            <option value="newest-to-oldest">Newest to oldest</option>
            <option value="oldest-to-newest">Oldest to newest</option>
            <option value="highest-to-lowest">By Rating (highest to lowest)</option>
            <option value="lowest-to-highest">By Rating (lowest to highest)</option>
          </select>
        </div>
        {sortedArray.map(checkin => (
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
      <a className="scrollToTop" href="#bartalk-body"><span className="material-icons scroll-button-content">
arrow_upward
</span></a>
    </>
  )
}

export default BarTalkPage;
