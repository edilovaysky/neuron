import { createAction } from 'redux-actions';

export const loadStart = createAction('[Auth], Load start');
export const dataReceived = createAction('[Auth], Data received');
export const errorOccured = createAction('[Auth], Error occured');

export const load = (firstName, lastName, password) => (dispatch, getState) => {
  dispatch(loadStart());
  fetch('http://localhost:8888/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, password }),
  })
    .then(respons => respons.json())
    .then(data => {
      dispatch(dataReceived(data));
    })
    .catch(() => {
      dispatch(errorOccured());
    });
};
