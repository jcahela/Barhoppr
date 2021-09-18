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
  const allDrinks = useSelector(state => state.drinks.drinkList);
  const allDrinksArr = Object.values(allDrinks);
  const topFive = useSelector(state => state.drinks.top5);
  const [sortStyle, setSortStyle] = useState('newest-to-oldest');
  const [sortedArray, setSortedArray] = useState(allCheckins);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState('');
  const [filteredArray, setFilteredArray] = useState(allDrinksArr);
  const [filteredDrink, setFilteredDrink] = useState({})


  useEffect(() => {
    dispatch(fetchTop5());
  }, [dispatch])

  
  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('bartalk-background')
  }, [sortedArray])

  useEffect(() => {
    if (filter === 'all') {
      return;
    }
    if (sortStyle === 'newest-to-oldest') {
      if (filter === 'all') {
        return;
      }
      if (showFilter) {
        const filteredCheckins = allCheckins.filter(checkin => checkin.Drink.id === filteredDrink.id);
        setSortedArray(filteredCheckins);
        return;
      }
      setSortedArray(allCheckins);
    };
    if (sortStyle === 'oldest-to-newest') {
      if (filter === 'all') {
        const oldestToNewest = allCheckins.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
        setSortedArray(oldestToNewest);
        return;
      }
      if (showFilter) {
        const filteredCheckins = allCheckins.filter(checkin => checkin.Drink.id === filteredDrink.id);
        const sortedFilteredCheckins = filteredCheckins.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
        setSortedArray(sortedFilteredCheckins);
        return;
      }
    };
    if (sortStyle === 'highest-to-lowest') {
      const highestToLowest = allCheckins.sort((a, b) => a.rating < b.rating ? 1 : -1);
      setSortedArray(highestToLowest);
    };
    if (sortStyle === 'lowest-to-highest') {
      const lowestToHighest = allCheckins.sort((a, b) => a.rating > b.rating ? 1 : -1);
      setSortedArray(lowestToHighest);
      
    }
  }, [sortStyle, allCheckins, filter, showFilter])
  

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

  const filterCheckins = (e) => {
    setFilter(e.target.value)
    const drink = allDrinksArr.find(drink => drink.name === e.target.value);
    setFilteredDrink(drink);
    dispatch(getAllCheckins());
  }

  const toggleFilters = (e) => {
    setShowFilter(!showFilter);
    if (filter) {
      setFilter(null);
    } else {
      setFilter('all');
    }
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
            onChange={(e) => sortCheckins(e)}
          >
            <option value="newest-to-oldest">Newest to oldest</option>
            <option value="oldest-to-newest">Oldest to newest</option>
            <option value="highest-to-lowest">By Rating (highest to lowest)</option>
            <option value="lowest-to-highest">By Rating (lowest to highest)</option>
          </select>
          <div 
            className="filter-by-box"
            onClick={toggleFilters}
          >Filter By +</div>
          {showFilter && (
            <>
              <span className="sort-title">Drink: </span>
              <select 
                name="filter" 
                className="filter-selector"
                value={filter}
                onChange={filterCheckins}
              >
                <option value="all" selected default>All</option>
                {allDrinksArr.map(drink => (
                  <option className="filter-drink" value={drink.name} key={drink.id}>{drink.name}</option>
                  ))}
              </select>
            </>
          )}
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
