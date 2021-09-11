import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session'
import { fetchEmails, fetchUsernames } from './store/userData'
import './App.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';

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
            <div className="component-body">
              <Navigation isLoaded={isLoaded}/>
            </div>
          </Route>

        </Switch>
      
      )}
    </>
  );
}

export default App;
