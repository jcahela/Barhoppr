import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import userDataReducer from './userData';
import checkinsReducer from './checkins';
import drinksReducer from './drinks';

const rootReducer = combineReducers({
  session: sessionReducer,
  userData: userDataReducer,
  checkins: checkinsReducer,
  drinks: drinksReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;
