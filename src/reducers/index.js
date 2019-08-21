import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { fetchUsersReducer } from './fetchUsers';

export const rootReducer = combineReducers({
  userAuth: authReducer,
  fetchUsers: fetchUsersReducer,
});
