import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session'
import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch])

  return (
    <>
      <Switch>

        <Route exact path='/'>
          <Navigation />
          <h1>Hello from App</h1>
        </Route>

        <Route path='/signup'>
          <SignupFormPage />
        </Route>

        <Route path='/drinks'>
          <Navigation />
        </Route>

      </Switch>
    </>
  );
}

export default App;
