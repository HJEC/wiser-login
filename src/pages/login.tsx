import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import * as Yup from 'yup';

import { signInRequest } from '../store/modules/auth/actions';

import Input from '../components/Input';
import Button from '../components/Button';

import {
  Container,
  FeaturedImage,
  Main,
  Form,
  ForgotPassword,
} from '../styles/pages/login';
import { IStoreState } from '../store/types';
import getValidationErrors from '../utils/getValidationErros';
import { IAuthState } from '../store/modules/auth/types';

function Login(): JSX.Element {
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const { loading } = useSelector<IStoreState, IAuthState>(
    selector => selector.auth,
  );

  const handleSignIn = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        dispatch(signInRequest({ email: data.email, password: data.password }));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [dispatch],
  );

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <FeaturedImage />
      <Main>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <h1>
            Olá, seja <br /> bem-vindo!
          </h1>
          <h2>Para acessar a plataforma, faça seu login.</h2>
          <Input
            label="E-mail"
            name="email"
            type="text"
            placeholder="E-mail"
            disabled={loading}
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            placeholder="Senha"
            disabled={loading}
          />
          <Button type="submit" loading={loading} loadingText="Entrando...">
            Entrar
          </Button>
        </Form>
        <ForgotPassword>
          Esqueceu seu login ou senha? <br />
          Clique{' '}
          <Link href="/forgot-password">
            <a>aqui</a>
          </Link>
        </ForgotPassword>
      </Main>
    </Container>
  );
}

export default Login;
