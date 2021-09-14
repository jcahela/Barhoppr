import { csrfFetch as fetch } from './csrf'

const SET_DRINKS = 'drinks/setDrinks';

const setDrinks = (drinks) => ({
  type: SET_DRINKS,
  drinks
});

export const fetchDrinks = () => async dispatch => {
  const response = await fetch('/api/drinks');

  if (response.ok) {
    const drinks = await response.json();
    dispatch(setDrinks(drinks));
  }
}

const initialState = {};

const drinksReducer = (state = initialState, action) => {
  Object.freeze(state);

  const newState = {...state};

  switch (action.type) {
    case SET_DRINKS:
      const normalizedState = {...newState};
      action.drinks.forEach(drink => normalizedState[drink.id] = drink)
      return normalizedState;
    default:
      return state;
  }
}

export default drinksReducer;
