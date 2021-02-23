import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body{
    background: #FAF5FF;
    color: #989FDB;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, select{
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
  }

  button{
    cursor: pointer;
  }
`;
