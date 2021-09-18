import { csrfFetch as fetch } from './csrf'

// Load all user emails and usernames into store

const LOAD_EMAILS = 'userData/loadEmails'

const loadEmails = (emails) => ({
  type: LOAD_EMAILS,
  emails
})

export const fetchEmails = () => async dispatch => {
  const response = await fetch('/api/users/emails');

  if (response.ok) {
    const emails = await response.json();
    dispatch(loadEmails(emails));
  }

  return response;
}

const LOAD_USERNAMES = 'userData/loadUsernames';

const loadUsernames = (usernames) => ({
  type: LOAD_USERNAMES,
  usernames
})

export const fetchUsernames = () => async dispatch => {
  const response = await fetch('/api/users/usernames');

  if (response.ok) {
    const usernames = await response.json();
    dispatch(loadUsernames(usernames));
  }
}

const LOAD_USERS = 'users/loadUsers'

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users
})

export const fetchUsers = () => async dispatch => {
  const response = await fetch('/api/users/all');

  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  }
}

const SET_PROFILE_PIC = 'users/setProfilePic';

const setProfilePic = (user) => ({
  type: SET_PROFILE_PIC,
  user
});

export const updateProfilePic = (user) => async dispatch => {
  const {image, id} = user;
  const formData = new FormData();
  if (image) formData.append("image", image);

  const response = await fetch(`/api/users/${id}/update-profile-pic`, {
    method: 'PATCH',
    headers: {
      "Content-Type":"multipart/form-data"
    },
    body: formData
  });

  if (response.ok) {
    const updatedUser = await response.json();
    dispatch(setProfilePic(updatedUser));
  }
}

const initialState = {
  emails: null,
  usernames: null
}

const userDataReducer = (state = initialState, action) => {
  Object.freeze(state);

  const newState = {...state};

  switch (action.type) {
    case LOAD_EMAILS:
      return {...newState, emails: action.emails};
    case LOAD_USERNAMES:
      return {...newState, usernames: action.usernames}
    case LOAD_USERS:
      return {...newState, users: action.users}
    case SET_PROFILE_PIC:
      const index = newState.users.findIndex(user => user.id === action.user.id)
      newState.users[index] = action.user;
      return newState;
    default:
      return newState;
  }
}

export default userDataReducer
