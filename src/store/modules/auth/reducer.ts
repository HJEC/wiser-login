import { Reducer } from 'redux';
import produce from 'immer';

import { AuthActionTypes, IAuthState, IUser } from './types';

export const INITIAL_STATE: IAuthState = {
  token: null,
  signed: false,
  loading: false,
  user: {} as IUser,
};

const auth: Reducer<IAuthState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActionTypes.SIGN_IN_REQUEST: {
        draft.loading = true;

        break;
      }
      case AuthActionTypes.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.signed = true;
        draft.loading = false;

        break;
      }
      case AuthActionTypes.SIGN_IN_FAILURE: {
        draft.loading = false;

        break;
      }
      case AuthActionTypes.SIGN_OUT: {
        draft.token = null;
        draft.user = {} as IUser;
        draft.signed = false;
        draft.loading = false;

        break;
      }
      default:
    }

    return draft;
  });
};

export default auth;
