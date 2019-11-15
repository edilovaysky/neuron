import { createAction } from 'redux-actions';

export const fetchUsersStart = createAction('[FetchUsers], fetchUsers start');
export const fetchUsersDataReceived = createAction(
  '[FetchUsers], fetchUsersData received'
);
export const fetchUsersErrorOccured = createAction(
  '[FetchUsers], fetchUsersError occured'
);

export const loadUsers = fetchStatus => (dispatch, getState) => {
  dispatch(fetchUsersStart());
  fetch(`http://localhost:8888/users?status=${fetchStatus}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(respons => respons.json())
    .then(data => {
      dispatch(fetchUsersDataReceived(data));
    })
    .catch(error => {
      dispatch(fetchUsersErrorOccured(error));
    });
};
