import {
  IAuthActionResponse,
  IAuthCredentials,
  IAuthSignInSuccess,
  AuthActionTypes,
} from './types';

export function signInRequest({
  email,
  password,
}: IAuthCredentials): IAuthActionResponse<IAuthCredentials> {
  return {
    type: AuthActionTypes.SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess({
  token,
  user,
}: IAuthSignInSuccess): IAuthActionResponse<IAuthSignInSuccess> {
  return {
    type: AuthActionTypes.SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signInFailure(): IAuthActionResponse {
  return {
    type: AuthActionTypes.SIGN_IN_FAILURE,
  };
}

export function signOut(): IAuthActionResponse {
  return {
    type: AuthActionTypes.SIGN_OUT,
  };
}
