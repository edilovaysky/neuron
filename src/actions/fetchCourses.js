import { createAction } from 'redux-actions';

export const fetchCoursesStart = createAction(
  '[FetchCourses], fetchCourses start'
);
export const fetchCoursesDataReceived = createAction(
  '[FetchCourses], fetchCoursesData received'
);
export const fetchCoursesErrorOccured = createAction(
  '[FetchCourses], fetchCoursesError occured'
);

export const loadCourses = () => (dispatch, getState) => {
  dispatch(fetchCoursesStart());
  fetch(`http://localhost:8888/courses`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(respons => respons.json())
    .then(data => {
      dispatch(fetchCoursesDataReceived(data));
    })
    .catch(error => {
      dispatch(fetchCoursesErrorOccured(error));
    });
};
