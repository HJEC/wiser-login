/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import App, { AppContext } from 'next/app';
import Router from 'next/router';
import api from '../services/api';
import { IStoreState } from '../store/types';

const withAuth = (WrappedComponent: any) => {
  WrappedComponent.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    const { ctx } = appContext;
    const isServer = ctx.res;

    const redirectAuth = (isSigned: boolean) => {
      const loginRoute = '/login';
      const isLoginRoute = ctx.pathname === loginRoute;
      let redirectRoute: string;

      if (isLoginRoute && isSigned) redirectRoute = '/';

      if (!isLoginRoute && !isSigned) redirectRoute = loginRoute;

      if (redirectRoute) {
        if (isServer) {
          ctx.res
            .writeHead(302, {
              Location: redirectRoute,
            })
            .end();
        } else {
          Router.push(redirectRoute);
        }
      }
    };

    const setAuthToken = (token: string) => {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    };

    const state = ctx.store.getState() as IStoreState;

    const token = state.auth?.token;
    const isSigned = state.auth?.signed;

    redirectAuth(isSigned);
    setAuthToken(token);

    return { ...appProps };
  };

  return WrappedComponent;
};

export default withAuth;
