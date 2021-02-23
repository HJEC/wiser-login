import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
}

function Button({
  children,
  loading,
  loadingText,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <Container {...rest} disabled={loading}>
      {loading ? loadingText : children}
    </Container>
  );
}

Button.defaultProps = {
  loading: false,
  loadingText: 'Carregando...',
};

export default Button;
