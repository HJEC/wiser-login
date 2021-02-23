/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Router from 'next/router';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { showToast } from '../toast/actions';
import { signInFailure, signInSuccess } from './actions';
import {
  AuthActionTypes,
  IAuthActionResponse,
  IAuthCredentials,
  IAuthState,
} from './types';

export function* signIn(action: IAuthActionResponse<IAuthCredentials>) {
  try {
    const { email, password } = action.payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    } as IAuthCredentials);

    const { token, user } = response.data as IAuthState;

    yield put(signInSuccess({ token, user }));

    yield call(Router.push, '/');
  } catch (error) {
    yield put(
      showToast({
        message: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        type: 'error',
      }),
    );

    yield put(signInFailure());
  }
}

export function* signOut() {
  yield call(Router.push, '/login');
}

// eslint-disable-next-line require-yield
export function* setToken(
  action: IAuthActionResponse<{
    auth: IAuthState;
  }>,
) {
  if (!action.payload) return;

  const { token } = action.payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthActionTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthActionTypes.SIGN_OUT, signOut),
]);
