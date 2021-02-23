import { ToastContent, TypeOptions } from 'react-toastify';

export enum ToastActionTypes {
  SHOW_TOAST = '@toast/SHOW',
}

export interface IToastActionResponse<T = any> {
  type: ToastActionTypes;
  payload?: T;
}

export interface IToastState {
  message: ToastContent;
  type: TypeOptions;
}

export interface IToastParams {
  message: ToastContent;
  type: TypeOptions;
}
