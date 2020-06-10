import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setupInvalidateSessionInterceptor();

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);
  const setupInvalidateSessionInterceptor = useCallback(async () => {
    api.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        const { response } = error;

        if (response.data.message === 'Invalid JWT token') {
          signOut();
        }

        return Promise.reject(error);
      },
    );
  }, [signOut]);
  const signIn = useCallback(
    async ({ email, password }) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('@GoBarber:token', token);
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setupInvalidateSessionInterceptor();
      setData({ token, user });
    },
    [setupInvalidateSessionInterceptor],
  );

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [data.token],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
