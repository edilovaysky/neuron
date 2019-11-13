import { createAction } from 'redux-actions';

export const authStart = createAction('[Auth], Auth start');
export const authDataReceived = createAction('[Auth], authData received');
export const authErrorOccured = createAction('[Auth], authError occured');

export const load = (email, firstName, lastName, password) => (
  dispatch,
  getState
) => {
  let authData;
  if (firstName && lastName) {
    firstName = firstName.replace(/\s/g, '');
    lastName = lastName.replace(/\s/g, '');
    password = password.replace(/\s/g, '');
    authData = {
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
  }
  if (email && password) {
    email = email.replace(/\s/g, '');
    password = password.replace(/\s/g, '');
    authData = {
      email: email,
      password: password,
    };
  }
  dispatch(authStart());
  fetch('http://localhost:8888/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
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

export const reAuth = data => (dispatch, getState) => {
  dispatch(authStart());
  console.log('reauth: ', data);
  dispatch(authDataReceived(data));
};
