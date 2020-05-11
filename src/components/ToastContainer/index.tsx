import React from 'react';
import { useTransition } from 'react-spring';
import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, message => message.id, {
    from: { right: '-120%', opacity: 0 },
    enter: [{ right: '10%', opacity: 1 }, { right: '0%' }],
    leave: [{ right: '10%', opacity: 1 }, { right: '-120%' }],
  });

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
