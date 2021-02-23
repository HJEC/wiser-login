import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';

import Login from '../../pages/login';
import { IAuthState } from '../../store/modules/auth/types';

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.useFakeTimers();

describe('Login Page', () => {
  const mockedUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
  const mockedUseSelector = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => {
    mockedUseDispatch.mockClear();
    mockedUseSelector.mockClear();
  });

  beforeAll(() => {
    mockedUseSelector.mockReturnValue({} as IAuthState);
  });

  it('should be able to sign in', async () => {
    const dispatch = jest.fn();

    mockedUseDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        payload: expect.objectContaining({
          email: 'johndoe@example.com',
        }),
        type: '@auth/SIGN_IN_REQUEST',
      });

      expect(global.window.location.pathname).toEqual('/');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    const dispatch = jest.fn();

    mockedUseDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
