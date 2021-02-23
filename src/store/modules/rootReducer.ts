import { combineReducers } from 'redux';

import auth from './auth/reducer';
import toast from './toast/reducer';

const rootReducer = combineReducers({
  auth,
  toast,
});

export default rootReducer;
