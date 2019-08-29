import { handleActions } from 'redux-actions';

import {
  fetchClassesStart,
  fetchClassesDataReceived,
  fetchClassesErrorOccured,
} from 'actions/fetchClasses';

const initialState = {
  loading: false,
  error: false,
  entries: {},
};

export const fetchClassesReducer = handleActions(
  {
    [fetchClassesStart]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchClassesDataReceived]: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [fetchClassesErrorOccured]: state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
  initialState
);
