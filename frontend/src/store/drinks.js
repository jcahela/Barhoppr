import { csrfFetch as fetch } from './csrf'

const SET_DRINKS = 'drinks/setDrinks';
const SET_TOP_5 = 'drinks/setTop5'

const setDrinks = (drinks) => ({
  type: SET_DRINKS,
  drinks
});

const setTop5 = (top5) => ({
  type: SET_TOP_5,
  top5
})

export const fetchDrinks = () => async dispatch => {
  const response = await fetch('/api/drinks');

  if (response.ok) {
    const drinks = await response.json();
    dispatch(setDrinks(drinks));
  }
  return response;
}

export const fetchTop5 = () => async dispatch => {
  const response = await fetch('/api/drinks/top-5');

  if (response.ok) {
    const top5 = await response.json();
    dispatch(setTop5(top5));
    return top5;
  }
}

const initialState = {};

const drinksReducer = (state = initialState, action) => {
  Object.freeze(state);

  const newState = {...state};

  switch (action.type) {
    case SET_DRINKS:
      const normalizedState = {};
      action.drinks.forEach(drink => normalizedState[drink.id] = drink)
      newState['drinkList'] = normalizedState;
      return newState;
    case SET_TOP_5:
      newState['top5'] = action.top5;
      return newState;
    default:
      return state;
  }
}

export default drinksReducer;
