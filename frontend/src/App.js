import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session'
import { fetchEmails, fetchUsernames } from './store/userData'
import './App.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import SignupFormPage from './components/SignupFormPage';
import LandingPage from './components/LandingPage';
import DrinksPage from './components/DrinksPage';
import CheckinButton from './components/CheckinButton'
import CheckinForm from './components/CheckinFormModal';

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
      {/* <CheckinButton /> */}
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
            <CheckinForm />
          </Route>

          <Route path='/users/:id'>
            <h1>Profile Route</h1>
          </Route>

          <Route path='/bar-talk'>
            <h1>Bar Talk Route</h1>
          </Route>

        </Switch>
      
      )}
    </>
  );
}

export default App;
