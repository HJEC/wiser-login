/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { toast, ToastOptions } from 'react-toastify';
import { all, call, takeLatest } from 'redux-saga/effects';
import { ToastActionTypes, IToastActionResponse, IToastParams } from './types';

export function* showToast(action: IToastActionResponse<IToastParams>) {
  const { message, type } = action.payload;

  yield call(toast, message, {
    type,
    position: 'top-right',
    autoClose: 3000,
  } as ToastOptions);
}

export default all([takeLatest(ToastActionTypes.SHOW_TOAST, showToast)]);
