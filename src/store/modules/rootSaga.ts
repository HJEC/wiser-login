import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import toast from './toast/sagas';

export default function* rootSaga(): Generator {
  return yield all([auth, toast]);
}
