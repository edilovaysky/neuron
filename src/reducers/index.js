import { combineReducers } from 'redux';

import { reducer as authReducer } from 'reducers/auth';
import { reducer as unauthReducer } from 'reducers/unauth';

export const rootReducer = combineReducers({
  userAuth: authReducer,
  //userUnauth: unauthReducer,
});
