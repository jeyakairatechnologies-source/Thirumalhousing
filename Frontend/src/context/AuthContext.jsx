import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('thirumal_admin_token');
      const savedUser = localStorage.getItem('thirumal_admin_user');

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          // Optionally verify with /api/auth/me
          const freshUser = await api.getMe();
          if (freshUser) {
            setUser(freshUser);
            localStorage.setItem('thirumal_admin_user', JSON.stringify(freshUser));
          }
        } catch {
          // Token expired or invalid
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    localStorage.setItem('thirumal_admin_token', data.token);
    const userInfo = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role
    };
    localStorage.setItem('thirumal_admin_user', JSON.stringify(userInfo));
    setUser(userInfo);
    return userInfo;
  };

  const logout = () => {
    localStorage.removeItem('thirumal_admin_token');
    localStorage.removeItem('thirumal_admin_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
