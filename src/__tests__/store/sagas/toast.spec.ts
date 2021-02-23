import { runSaga } from 'redux-saga';

import * as ToastSagas from '../../../store/modules/toast/sagas';
import { ToastActionTypes } from '../../../store/modules/toast/types';

const mockToast = jest.fn();

jest.mock('react-toastify', () => {
  return {
    toast: (message: string) => mockToast(message),
  };
});

describe('Toast Sagas', () => {
  it('should be able to show toast', async () => {
    await runSaga({}, ToastSagas.showToast, {
      payload: {
        message: 'Message text',
        type: 'error',
      },
      type: ToastActionTypes.SHOW_TOAST,
    }).toPromise();

    expect(mockToast).toHaveBeenCalledWith('Message text');
  });
});
