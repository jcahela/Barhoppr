import { csrfFetch as fetch } from './csrf'

const SET_MY_CHECKINS = 'checkins/setMyCheckins';
const SET_ALL_CHECKINS = 'checkins/setAllCheckins';
const REMOVE_MY_CHECKINS = 'checkins/removeMyCheckins';

const setMyCheckins = (myCheckins) => ({
  type: SET_MY_CHECKINS,
  myCheckins
})

const setAllCheckins = (allCheckins) => ({
  type: SET_ALL_CHECKINS,
  allCheckins
})

export const removeMyCheckins = (myCheckins) => ({
  type: REMOVE_MY_CHECKINS
})

export const getMyCheckins = () => async dispatch => {
  const response = await fetch('/api/checkins');
  debugger;
  if (response.ok) {
    const checkins = await response.json();
    dispatch(setMyCheckins(checkins));
  }
}
export const getAllCheckins = () => async dispatch => {
  const response = await fetch('/api/checkins/all');

  if (response.ok) {
    const allCheckins = await response.json();
    dispatch(setAllCheckins(allCheckins));
  }
}

// State of checkins in redux checkin slice of state

// {
//   myCheckins: [checkin1, checkin2, checkin3, etc.],
//   allCheckins: [checkin1, checkin2, checkin3, etc.]
// }

const initialState = {};

export const checkinsReducer = (state = initialState, action) => {
  Object.freeze(state);

  const newState = {...state};

  switch (action.type) {
    case SET_MY_CHECKINS:
      newState['myCheckins'] = action.myCheckins;
      return newState;
    case SET_ALL_CHECKINS:
      newState['allCheckins'] = action.allCheckins;
      return newState;
    case REMOVE_MY_CHECKINS:
      delete newState['myCheckins'];
      return newState;
    default:
      return state;
  }
}
