import { handleActions } from 'redux-actions';

import { cleanStart, dataCleaned, errorOccured } from 'actions/unauth';

const initialState = {
  error: false,
  entries: {},
};

export const reducer = handleActions(
  {
    [cleanStart]: state => {
      return {
        ...state,
      };
    },
    [dataCleaned]: (state, action) => {
      const data = state.entries;
      console.log(data);
      return {
        ...state,
        loading: false,
        entries: data,
      };
    },
    [errorOccured]: state => {
      return {
        ...state,
        error: true,
      };
    },
  },
  initialState
);
