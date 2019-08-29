import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { fetchUsersReducer } from './fetchUsers';
import { fetchClassesReducer } from './fetchClasses';

export const rootReducer = combineReducers({
  userAuth: authReducer,
  fetchUsers: fetchUsersReducer,
  fetchClasses: fetchClassesReducer,
});
