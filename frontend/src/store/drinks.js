import { csrfFetch as fetch } from './csrf'

const SET_DRINKS = 'drinks/setDrinks';
const SET_TOP_5 = 'drinks/setTop5'
const POST_DRINK = 'drinks/postDrink'

const setDrinks = (drinks) => ({
  type: SET_DRINKS,
  drinks
});

const setTop5 = (top5) => ({
  type: SET_TOP_5,
  top5
})

const postDrink = (drink) => ({
  type: POST_DRINK,
  drink
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

export const createDrink = (drink) => async dispatch => {
  const { name, drinkImageFile, description, abv } = drink;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("abv", abv);

  if (drinkImageFile) formData.append("image", drinkImageFile)

  const response = await fetch('/api/drinks', {
    method: 'POST',
    headers: {
      "Content-Type":"multipart/form-data"
    },
    body: formData
  });

  if (response.ok) {
    const newDrink = response.json();
    dispatch(postDrink(newDrink));
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
    case POST_DRINK:
      const newDrink = action.drink;
      newState.drinkList[newDrink.id] = newDrink;
      return newState; 
    case SET_TOP_5:
      newState['top5'] = action.top5;
      return newState;
    default:
      return state;
  }
}

export default drinksReducer;
