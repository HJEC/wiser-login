import styled from 'styled-components';
import { saturate } from 'polished';

export const Container = styled.button`
  appearance: none;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  background: linear-gradient(260deg, #383e71 0%, #9d25b0 100%);
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  padding: 14px;

  svg {
    margin-right: 16px;
  }

  &:hover {
    background: linear-gradient(
      260deg,
      ${saturate(0.2, '#383e71')} 0%,
      ${saturate(0.2, '#9d25b0')} 100%
    );
  }
`;
