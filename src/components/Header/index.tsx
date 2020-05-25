import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container, HeaderContent, Profile } from './styles';
import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <img src={logo} alt="GoBarber" />
        <Profile>
          <Link to="/profile">
            <img src={user.avatar_url} alt={user.name} />
          </Link>
          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">
              <strong>{user.name}.</strong>
            </Link>
          </div>
        </Profile>
        <button type="button" onClick={signOut}>
          <FiPower size={28} />
        </button>
      </HeaderContent>
    </Container>
  );
};

export default Header;
