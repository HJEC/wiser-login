import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';

import api from '../../../services/api';
import * as AuthSagas from '../../../store/modules/auth/sagas';
import * as AuthActions from '../../../store/modules/auth/actions';
import { AuthActionTypes, IAuthState } from '../../../store/modules/auth/types';

const apiMock = new MockAdapter(api, { delayResponse: 0 });
const mockRouterPush = jest.fn();

jest.mock('next/router', () => {
  return {
    push: (pathname: string) => mockRouterPush(pathname),
  };
});

describe('Auth Sagas', () => {
  beforeEach(() => {
    mockRouterPush.mockClear();
    api.defaults.headers.Authorization = null;
  });

  it('should be able to sign in', async () => {
    const dispatch = jest.fn();

    const apiResponse = {
      token: 'token-example',
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
    } as IAuthState;

    apiMock.onPost('sessions').reply(200, apiResponse);

    await runSaga({ dispatch }, AuthSagas.signIn, {
      payload: {
        email: apiResponse.user.email,
        password: '123456',
      },
      type: AuthActionTypes.SIGN_IN_REQUEST,
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      AuthActions.signInSuccess(apiResponse),
    );
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const dispatch = jest.fn();

    apiMock.onPost('sessions').reply(400);

    await runSaga({ dispatch }, AuthSagas.signIn, {
      payload: {
        email: 'wrong-email',
        password: 'wrong-password',
      },
      type: AuthActionTypes.SIGN_IN_REQUEST,
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(AuthActions.signInFailure());
  });

  it('should be able to sign out', async () => {
    await runSaga({}, AuthSagas.signOut).toPromise();

    expect(mockRouterPush).toHaveBeenCalledWith('/login');
  });

  it('should be able to rehydrate token authorization', async () => {
    await runSaga({}, AuthSagas.setToken, {
      payload: {
        auth: {
          token: 'fake-token-example',
          signed: true,
          loading: false,
          user: {
            name: 'John Doe',
            email: 'johndoe@example.com',
          },
        } as IAuthState,
      },
      type: 'persist/REHYDRATE',
    }).toPromise();

    expect(api.defaults.headers.Authorization).toBe(
      'Bearer fake-token-example',
    );
  });

  it('should not be able to rehydrate token authorization', async () => {
    await runSaga({}, AuthSagas.setToken, {} as any).toPromise();

    expect(api.defaults.headers.Authorization).toBeNull();
  });
});
