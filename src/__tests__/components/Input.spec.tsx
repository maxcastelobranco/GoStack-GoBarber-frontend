import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return { fieldName: 'email', defaultValue: '', error: '', registerField: jest.fn() };
    },
  };
});

describe('Input component', () => {
  it('should render the input', () => {
    const { getByPlaceholderText } = render(<Input name="email" placeholder="E-mail" />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should highlight the input on focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputElementContainer = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(inputElementContainer).toHaveStyle('border-color: #ff9000;');
      expect(inputElementContainer).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(inputElementContainer).not.toHaveStyle('border-color: #ff9000;');
      expect(inputElementContainer).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep the highlight on the input when said input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputElementContainer = getByTestId('input-container');

    fireEvent.change(inputElement, {
      target: { value: 'test@test.com' },
    });

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(inputElementContainer).toHaveStyle('color: #ff9000;');
    });
  });
});
