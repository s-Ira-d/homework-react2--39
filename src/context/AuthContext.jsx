import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { api } from '../api/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { data } = await api.get('/users/current');
      setUser(data);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser().finally(() => setLoading(false));
  }, [fetchCurrentUser]);

  const register = async credentials => {
    const { data } = await api.post('/users/signup', credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const login = async credentials => {
    const { data } = await api.post('/users/login', credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await api.post('/users/logout');
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const updateUser = async updates => {
    const { data } = await api.patch('/users/current', updates);
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateUser,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
