import reducer, { INITIAL_STATE } from '../../../store/modules/toast/reducer';
import * as ToastActions from '../../../store/modules/toast/actions';
import {
  IToastState,
  ToastActionTypes,
} from '../../../store/modules/toast/types';

describe('Auth Reducer', () => {
  it(ToastActionTypes.SHOW_TOAST, () => {
    const state = reducer(
      INITIAL_STATE,
      ToastActions.showToast({
        message: 'A message example',
        type: 'error',
      }),
    );

    const updatedState = {
      message: 'A message example',
      type: 'error',
    } as IToastState;

    expect(state).toStrictEqual(updatedState);
  });
});
