import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100%;
  min-height: 100%;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 45% auto;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: 50% auto;
  }

  @media screen and (min-width: 1366px) {
    grid-template-columns: 55% auto;
  }
`;

export const FeaturedImage = styled.div`
  background-image: linear-gradient(
      to top,
      #130525 50%,
      rgba(105, 57, 153, 0) 100%
    ),
    url('bg-login.jpg');
  background-position: top center;
  background-size: cover, 100% auto;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 768px) {
    flex: 1;
    background-image: linear-gradient(
        to top,
        #130525 0%,
        rgba(105, 57, 153, 0) 100%
      ),
      url('bg-login.jpg');
    position: relative;
    height: auto;
    background-size: cover, cover;
  }
`;

export const Main = styled.main`
  position: relative;
  z-index: 2;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;

  @media screen and (min-width: 768px) {
    flex: 1;
    text-align: left;
    padding: 80px;
  }
`;

export const Card = styled.div`
  background: #faf5ff;
  border-radius: 8px;
  padding: 28px 28px 0 28px;

  h1 {
    font-weight: 400;
    color: #383e71;
    font-size: 24px;
    margin-bottom: 16px;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  button {
    display: flex;
    width: 100%;
    max-width: 168px;

    margin: 32px auto -24px auto;
  }

  @media screen and (min-width: 768px) {
    padding: 0;

    h1 {
      font-size: 40px;
    }

    h2 {
      margin-bottom: 42px;
      font-size: 16px;
    }

    button {
      max-width: none;
      margin: 32px 0 0;

      box-shadow: 0px 10px 25px #cf99db;

      &:hover {
        box-shadow: 0px 5px 12px #cf99db;
      }
    }
  }
`;
