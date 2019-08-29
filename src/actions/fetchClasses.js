import { createAction } from 'redux-actions';

export const fetchClassesStart = createAction(
  '[FetchClasses], fetchClasses start'
);
export const fetchClassesDataReceived = createAction(
  '[FetchClasses], fetchClassesData received'
);
export const fetchClassesErrorOccured = createAction(
  '[FetchClasses], fetchClassesError occured'
);

export const loadClasses = () => (dispatch, getState) => {
  dispatch(fetchClassesStart());
  fetch(`http://localhost:8888/classes`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(respons => respons.json())
    .then(data => {
      dispatch(fetchClassesDataReceived(data));
    })
    .catch(error => {
      dispatch(fetchClassesErrorOccured(error));
    });
};
