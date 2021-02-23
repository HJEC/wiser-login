import { Reducer } from 'redux';
import produce from 'immer';

import { IToastState, ToastActionTypes } from './types';

export const INITIAL_STATE: IToastState = {
  message: null,
  type: 'default',
};

const toast: Reducer<IToastState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ToastActionTypes.SHOW_TOAST: {
        draft.message = action.payload.message;
        draft.type = action.payload.type;

        break;
      }
      default:
    }

    return draft;
  });
};

export default toast;
