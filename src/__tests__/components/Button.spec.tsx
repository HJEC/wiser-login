import { render } from '@testing-library/react';
import React from 'react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to show children', () => {
    const { getByText } = render(<Button type="button">Text</Button>);

    expect(getByText('Text')).toBeTruthy();
  });

  it('should be able to show loading state', () => {
    const { getByText } = render(
      <Button loading type="button">
        Text
      </Button>,
    );

    expect(getByText('Carregando...')).toBeTruthy();
  });

  it('should be able to show loading state with custom text', () => {
    const { getByText } = render(
      <Button loading loadingText="Entrando..." type="button">
        Text
      </Button>,
    );

    expect(getByText('Entrando...')).toBeTruthy();
  });
});
