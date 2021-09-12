import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session'
import { fetchEmails, fetchUsernames } from './store/userData'
import './App.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import SignupFormPage from './components/SignupFormPage';
import LandingPage from './components/LandingPage';
import DrinksPage from './components/DrinksPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => dispatch(fetchEmails()))
      .then(() => dispatch(fetchUsernames()))
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
            <DrinksPage isLoaded={isLoaded}/>
          </Route>

        </Switch>
      
      )}
    </>
  );
}

export default App;
