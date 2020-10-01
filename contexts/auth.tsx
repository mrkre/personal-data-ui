import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import api, { addBearerToken, removeBearerToken } from '../api/api';
import { routes } from '../api/routes';

interface Auth {
  user: { id: string };
  setToken: ({ token: string }) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext({} as Auth);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setToken({ token });
    }
  }, []);

  const updateUser = async () => {
    await api
      .get(routes.auth.token)
      .then(({ data: user }) => {
        setUser(user);
      })
      .catch((error) => {
        logout();
      });
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    removeBearerToken();
    redirectAfterLogout();
  };

  const setToken = async ({ token }) => {
    Cookies.set('token', token);
    addBearerToken(token);
    await updateUser();
    redirectAfterLogin();
  };

  const redirectAfterLogin = () => {
    Router.push('/profile');
  };

  const redirectAfterLogout = () => {
    Router.push('/');
  };

  return (
    <AuthContext.Provider value={{ setToken, user, isAuthenticated: !!user, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
