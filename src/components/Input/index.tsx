import React, {
  InputHTMLAttributes,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useField } from '@unform/core';
import { FiX } from 'react-icons/fi';

import { Container, Label, Field, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  disabled?: boolean;
  containerStyle?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({ name, label, disabled, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {label && <Label htmlFor={`input-${fieldName}`}>{label}</Label>}
      <Field
        isFocused={isFocused}
        isFilled={isFilled}
        isErrored={!!error}
        isDisabled={disabled}
        data-testid="input-container"
      >
        <input
          ref={inputRef}
          id={`input-${fieldName}`}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          disabled={disabled}
          {...rest}
        />

        {error && <FiX />}
      </Field>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Input;
