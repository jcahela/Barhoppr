import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import { restoreUser } from './store/session'
import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch])

  return (

   <Switch>
      <Route exact path='/'>
      <h1>Hello from App</h1>
      </Route>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
   </Switch>

  );
}

export default App;
