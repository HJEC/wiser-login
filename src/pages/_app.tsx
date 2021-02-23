import React from 'react';
import { AppProps } from 'next/app';
import { Store } from 'redux';
import { withReduxCookiePersist } from 'next-redux-cookie-wrapper';
import { Provider } from 'react-redux';
import withReduxSaga from 'next-redux-saga';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import withAuth from '../hoc/withAuth';
import GlobalStyle from '../styles/global';
import makeStore from '../store/makeStore';
import { IStoreState } from '../store/types';

export interface IMyAppProps extends AppProps {
  store: Store<IStoreState>;
}

function MyApp({ Component, pageProps, store }: IMyAppProps) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}

export default withReduxCookiePersist(makeStore)(
  withReduxSaga(withAuth(MyApp)),
);
