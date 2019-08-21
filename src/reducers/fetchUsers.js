import { handleActions } from 'redux-actions';

import {
  fetchUsersStart,
  fetchUsersDataReceived,
  fetchUsersErrorOccured,
} from 'actions/fetchUsers';

const initialState = {
  loading: false,
  error: false,
  entries: {},
};

export const fetchUsersReducer = handleActions(
  {
    [fetchUsersStart]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [fetchUsersDataReceived]: (state, action) => {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [fetchUsersErrorOccured]: state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    },
  },
  initialState
);
