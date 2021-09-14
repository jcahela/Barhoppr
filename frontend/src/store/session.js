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

const removeUser = () => ({
  type: REMOVE_USER
})

export const logoutUser = () => async dispatch => {
  const response = await fetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
}

// For restoring a user session using token cookie
export const restoreUser = () => async dispatch => {
  const response = await fetch('/api/session');

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  }

  return response;
}

// For signing up a user
export const signupUser = (user) => async dispatch => {
  const { firstname, lastname, username, email, password, profilePicture } = user;
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstname,
      lastname,
      username,
      email,
      password,
      profilePicture
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  }
  return response;
}

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
  
  // debugger;
  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState.user.user = null;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
