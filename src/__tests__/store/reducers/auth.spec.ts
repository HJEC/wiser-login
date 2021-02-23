import reducer, { INITIAL_STATE } from '../../../store/modules/auth/reducer';
import * as AuthActions from '../../../store/modules/auth/actions';
import { AuthActionTypes, IAuthState } from '../../../store/modules/auth/types';

describe('Auth Reducer', () => {
  it(AuthActionTypes.SIGN_IN_REQUEST, () => {
    const state = reducer(
      INITIAL_STATE,
      AuthActions.signInRequest({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    );

    const updatedState = {
      ...INITIAL_STATE,
      loading: true,
    } as IAuthState;

    expect(state).toStrictEqual(updatedState);
  });

  it(AuthActionTypes.SIGN_IN_SUCCESS, () => {
    const state = reducer(
      INITIAL_STATE,
      AuthActions.signInSuccess({
        token: 'token-example',
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com',
        },
      }),
    );

    const updatedState = {
      ...INITIAL_STATE,
      token: 'token-example',
      signed: true,
      user: { name: 'John Doe', email: 'johndoe@example.com' },
    } as IAuthState;

    expect(state).toStrictEqual(updatedState);
  });

  it(AuthActionTypes.SIGN_IN_FAILURE, () => {
    const state = reducer(INITIAL_STATE, AuthActions.signInFailure());

    const updatedState = {
      ...INITIAL_STATE,
      loading: false,
    } as IAuthState;

    expect(state).toStrictEqual(updatedState);
  });

  it(AuthActionTypes.SIGN_OUT, () => {
    const state = reducer(INITIAL_STATE, AuthActions.signOut());

    const updatedState = {
      ...INITIAL_STATE,
      token: null,
      user: {},
      signed: false,
      loading: false,
    } as IAuthState;

    expect(state).toStrictEqual(updatedState);
  });
});
