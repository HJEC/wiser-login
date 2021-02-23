import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux';

import Dashboard from '../../pages/index';
import { IUser } from '../../store/modules/auth/types';

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

describe('Dashboard Page', () => {
  const mockedUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
  const mockedUseSelector = jest.spyOn(reactRedux, 'useSelector');

  beforeEach(() => {
    mockedUseDispatch.mockClear();
    mockedUseSelector.mockClear();
  });

  beforeAll(() => {
    mockedUseSelector.mockReturnValue(
      (): IUser => ({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      }),
    );
  });

  it('should be able to load user', async () => {
    render(<Dashboard />);

    expect(mockedUseSelector).toHaveReturnedWith({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    });
  });

  it('should be able to sign out', async () => {
    const dispatch = jest.fn();

    mockedUseDispatch.mockReturnValue(dispatch);

    const { getByText } = render(<Dashboard />);

    const buttonElement = getByText('Sair');

    fireEvent.click(buttonElement);

    expect(dispatch).toHaveBeenCalledWith({
      type: '@auth/SIGN_OUT',
    });
  });
});
