import { csrfFetch as fetch } from './csrf'

// For logging in a user
const SET_USER = 'session/setUser'

const setUser = (user) => ({
  type: SET_USER,
  user
})

export const loginUser = (user) => async dispatch => {
  const { credential, password } = user;
  const response = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    })
  });
  
  if (response.ok) {
    const sessionUser = await response.json();
    dispatch(setUser(sessionUser));
  }
  return response;
}

// For logging out a user
const REMOVE_USER = 'session/logout';

export const removeUser = () => ({
  type: REMOVE_USER
})


// state of session when a user is stored in redux session store slice of state
// {
  //   user: {
    //     id,
    //     email,
    //     username,
    //     createdAt,
    //     updatedAt
    //   }
    // }
    
const initialState = {
  user: null
}

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);

  const newState = {...state}
  
  switch (action.type) {
    case SET_USER:
      return newState.user = action.user;
    case REMOVE_USER:
      return newState.user = null;
    default:
      return state;
  }
}

export default sessionReducer;
