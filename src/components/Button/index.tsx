import React, { ButtonHTMLAttributes } from 'react';
import { Container, Loading } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? <Loading /> : children}
  </Container>
);

export default Button;
