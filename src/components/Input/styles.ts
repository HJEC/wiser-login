import styled, { css } from 'styled-components';

interface InputProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  isDisabled: boolean;
}

export const Container = styled.div`
  & + div {
    margin-top: 16px;
  }
`;

export const Label = styled.label`
  text-transform: uppercase;
  color: #383e71;
  font-size: 10px;
  margin: 0 16px 8px 16px;
  display: block;
  text-align: left;
`;

export const Field = styled.div<InputProps>`
  background: #faf5ff;
  border-radius: 8px;
  width: 100%;

  border: 1px solid #989fdb;

  transition: border-color 0.2s;

  position: relative;
  display: flex;
  align-items: center;

  ${props =>
    props.isFilled &&
    css`
      border-color: #383e71;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #ff377f;
    `}

    ${props =>
    props.isFocused &&
    css`
      border-color: #9d25b0;
    `}

    ${props =>
    props.isDisabled &&
    css`
      border-color: #989fdb;
      opacity: 0.7;
      cursor: default;
    `}

  input {
    background: transparent;
    border: 0;
    flex: 1;
    border-radius: inherit;
    color: inherit;
    padding: 16px;
    color: #383e71;
    font-size: 10px;

    &::placeholder {
      color: #989fdb;
    }

    /* Hack for autocomplete fields */
    &:-internal-autofill-selected,
    &:-webkit-autofill {
      border: 0;
      -webkit-text-fill-color: #383e71;
      box-shadow: 0 0 0px 1000px #faf5ff inset;
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  > svg {
    margin: auto 20px;
    color: #ff377f;
    width: 14px;
    height: 14px;

    & + input {
      padding-left: 48px;
    }
  }
`;

export const Error = styled.label`
  margin: 8px 16px 0 16px;
  color: #ff377f;
  display: block;
  text-align: left;
  font-size: 10px;
`;
