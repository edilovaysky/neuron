import { createAction } from 'redux-actions';

export const authStart = createAction('[Auth], Auth start');
export const authDataReceived = createAction('[Auth], authData received');
export const authErrorOccured = createAction('[Auth], authError occured');

export const load = (firstName, lastName, password) => (dispatch, getState) => {
  firstName = firstName.replace(/\s/g, '');
  lastName = lastName.replace(/\s/g, '');
  password = password.replace(/\s/g, '');
  dispatch(authStart());
  fetch('http://localhost:8888/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, password }),
  })
    .then(respons => respons.json())
    .then(data => {
      dispatch(authDataReceived(data));
    })
    .catch(() => {
      dispatch(authErrorOccured());
    });
};

export const unAuth = () => (dispatch, getState) => {
  dispatch(authStart());
  const data = {};
  dispatch(authDataReceived(data));
};
