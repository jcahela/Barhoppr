import { csrfFetch as fetch } from './csrf'

const SET_MY_CHECKINS = 'checkins/setMyCheckins';
const SET_ALL_CHECKINS = 'checkins/setAllCheckins';
const REMOVE_MY_CHECKINS = 'checkins/removeMyCheckins';
const POST_CHECKIN = 'checkins/postCheckin';
const DELETE_CHECKIN = 'checkins/deleteCheckin'

const setMyCheckins = (myCheckins) => ({
  type: SET_MY_CHECKINS,
  myCheckins
})

const setAllCheckins = (allCheckins) => ({
  type: SET_ALL_CHECKINS,
  allCheckins
})

const postCheckin = (newCheckin) => ({
  type: POST_CHECKIN,
  newCheckin
})

const deleteCheckin = (checkinToDestroy) => ({
  type: DELETE_CHECKIN,
  checkinToDestroy
})

export const removeMyCheckins = () => ({
  type: REMOVE_MY_CHECKINS
})

export const getMyCheckins = () => async dispatch => {
  const response = await fetch('/api/checkins');
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

export const createCheckin = (newCheckin) => async dispatch => {
  const { drinkId, comment, rating, servingStyle } = newCheckin;
  const response = await fetch('/api/checkins', {
    method: 'POST',
    body: JSON.stringify({
      drinkId,
      comment,
      rating,
      servingStyle
    })
  });

  if (response.ok) {
    const createdCheckin = await response.json();
    dispatch(postCheckin(createdCheckin));
  }
  return response;
}

export const destroyCheckin = (checkinId) => async dispatch => {
  const response = await fetch('/api/checkins', {
    method: 'DELETE',
    body: JSON.stringify({
      checkinId
    })
  });

  if (response.ok) {
    const checkinToDelete = await response.json();
    dispatch(deleteCheckin(checkinToDelete));
  }
  return response;
}

// State of checkins in redux checkin slice of state

// {
//   myCheckins: [checkin1, checkin2, checkin3, etc.],
//   allCheckins: [checkin1, checkin2, checkin3, etc.]
// }

const initialState = {
  allCheckins: [],
  myCheckins: []
};

const checkinsReducer = (state = initialState, action) => {
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
      newState['myCheckins'] = [];
      return newState;
    case POST_CHECKIN:
      newState['myCheckins'] = [action.newCheckin, ...newState['myCheckins']];
      newState['allCheckins'] = [action.newCheckin, ...newState['allCheckins']];
      return newState;
    case DELETE_CHECKIN:
      const newMyCheckins = newState['myCheckins'].filter(checkin => checkin.id !== action.checkinToDestroy.id)
      const newAllCheckins = newState['allCheckins'].filter(checkin => checkin.id !== action.checkinToDestroy.id)
      newState['myCheckins'] = newMyCheckins;
      newState['allCheckins'] = newAllCheckins;
      return newState;
    default:
      return state;
  }
}

export default checkinsReducer;
