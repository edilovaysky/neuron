import { handleActions } from 'redux-actions';

import { loadStart, dataReceived, errorOccured } from 'actions/auth';

const initialState = {
  loading: false,
  error: false,
  entries: {},
};

export const reducer = handleActions(
  {
    [loadStart]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [dataReceived]: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [errorOccured]: state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
  initialState
);
