import {
  ToastActionTypes,
  IToastParams,
  IToastState,
  IToastActionResponse,
} from './types';

export function showToast({
  message,
  type,
}: IToastParams): IToastActionResponse<IToastState> {
  return {
    type: ToastActionTypes.SHOW_TOAST,
    payload: { message, type },
  };
}
