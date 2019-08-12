import { handleActions } from 'redux-actions';

import { authStart, authDataReceived, authErrorOccured } from 'actions/auth';

const initialState = {
  loading: false,
  error: false,
  entries: {},
};

export const authReducer = handleActions(
  {
    [authStart]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [authDataReceived]: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [authErrorOccured]: state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
  initialState
);
