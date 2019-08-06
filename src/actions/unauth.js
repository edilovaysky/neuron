import { createAction } from 'redux-actions';

export const cleanStart = createAction('[UnAuth], Clean start');
export const dataCleaned = createAction('[UnAuth], Data cleaned');
export const errorOccured = createAction('[UnAuth], Error occured');

export const cleanStorage = token => token => (dispatch, getState) => {
  dispatch(cleaneStart());
  console.log(token);
  console.log(getState);
  dispatch(dataCleaned());

  dispatch(errorOccured());
};
