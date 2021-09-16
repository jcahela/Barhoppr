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
    default:
      return newState;
  }
}

export default userDataReducer
