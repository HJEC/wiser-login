import React from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from '../store/modules/auth/actions';
import { IStoreState } from '../store/types';

import { Container, FeaturedImage, Main, Card } from '../styles/pages/index';
import Button from '../components/Button';
import { IUser } from '../store/modules/auth/types';

function Dashboard(): JSX.Element {
  const user = useSelector<IStoreState, IUser>(selector => selector.auth.user);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Main>
        <Card>
          <h1>
            Bem-vindo, <br /> {user.name}!
          </h1>
          <h2>Você agora está dentro da plataforma.</h2>
          <Button type="button" onClick={handleSignOut}>
            <FiLogOut />
            Sair
          </Button>
        </Card>
      </Main>
      <FeaturedImage />
    </Container>
  );
}

export default Dashboard;
