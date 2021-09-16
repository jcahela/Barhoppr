import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session'
import { fetchEmails, fetchUsernames } from './store/userData'
import { getAllCheckins, getMyCheckins } from './store/checkins'
import { fetchDrinks, fetchTop5 } from './store/drinks'
import './App.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckinFormModal from './components/CheckinFormModal';
import SignupFormPage from './components/SignupFormPage';
import LandingPage from './components/LandingPage';
import DrinksPage from './components/DrinksPage';
import ProfilePage from './components/ProfilePage';
import BarTalkPage from './components/BarTalkPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => dispatch(fetchEmails()))
      .then(() => dispatch(fetchUsernames()))
      .then(() => dispatch(getAllCheckins()))
      .then(() => dispatch(getMyCheckins()))
      .then(() => dispatch(fetchDrinks()))
      .then(() => dispatch(fetchTop5()))
      .then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      {isLoaded && (
        
        <Switch>

          <Route exact path='/'>
            <LandingPage />
          </Route>

          <Route path='/signup'>
            <SignupFormPage />
          </Route>

          <Route path='/drinks'>
            <CheckinFormModal />  
            <DrinksPage isLoaded={isLoaded}/>
          </Route>

          <Route path='/users/:id'>
            <ProfilePage isLoaded={isLoaded}/>
            <h1>Profile Route</h1>
          </Route>

          <Route path='/bar-talk'>
            <CheckinFormModal />  
            <BarTalkPage isLoaded={isLoaded}/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
