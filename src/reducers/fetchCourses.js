import { handleActions } from 'redux-actions';

import {
  fetchCoursesStart,
  fetchCoursesDataReceived,
  fetchCoursesErrorOccured,
} from 'actions/fetchCourses';

const initialState = {
  loading: false,
  error: false,
  entries: {},
};

export const fetchCoursesReducer = handleActions(
  {
    [fetchCoursesStart]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchCoursesDataReceived]: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [fetchCoursesErrorOccured]: state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
  initialState
);
