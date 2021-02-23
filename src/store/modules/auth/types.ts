export enum AuthActionTypes {
  SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = '@auth/SIGN_IN_FAILURE',
  SIGN_OUT = '@auth/SIGN_OUT',
}

export interface IAuthActionResponse<T = any> {
  type: AuthActionTypes | 'persist/REHYDRATE';
  payload?: T;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IAuthState {
  token: string;
  signed: boolean;
  loading: boolean;
  user: IUser;
}

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IAuthSignInSuccess {
  token: string;
  user: IUser;
}
