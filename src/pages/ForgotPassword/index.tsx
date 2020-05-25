import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/apiClient';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  // const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData): Promise<void> => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().email('Digite um e-mail válido').required('Email é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação de senha enviado com sucesso.',
          description: 'Cheque sua caixa de entrada e recupere sua senha.',
        });

        // history.push('/dashboard'); ??
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha.',
          description: 'Ocorreu um erro ao tentar recuperar a senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>
          <Input name="email" placeholder="E-mail" icon={FiMail} autoFocus />
          <Button loading={loading} type="submit">
            Recuperar
          </Button>
        </Form>

        <Link to="/">
          <FiLogIn />
          Voltar para o logon
        </Link>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
