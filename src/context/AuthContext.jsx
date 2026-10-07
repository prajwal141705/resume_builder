import React, { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, ROLES } from '../utils/constants';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH_USER);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    const authToken = data.token || data.accessToken;
    const authUser = data.user || {
      id: data.id || 'user-' + Date.now(),
      name: data.name || (email.toLowerCase() === 'prajwal@gmail.com' ? 'Prajwal Admin' : email.split('@')[0]),
      email: email,
      roles: data.roles || (email.toLowerCase() === 'prajwal@gmail.com' || email.toLowerCase().includes('admin') ? ['ROLE_ADMIN', 'ROLE_USER'] : ['ROLE_USER']),
      status: data.status || 'ACTIVE',
    };

    if (authToken) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
    }
    if (authUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
    }
    setToken(authToken);
    setUser(authUser);
    return { success: true, user: authUser };
  };

  const register = async (name, email, password) => {
    const data = await authService.register({ name, email, password });
    const authToken = data.token || data.accessToken;
    const authUser = data.user || {
      id: data.id || 'user-' + Date.now(),
      name,
      email,
      roles: ['ROLE_USER'],
      status: 'ACTIVE',
    };

    if (authToken) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
    }
    if (authUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
    }
    setToken(authToken);
    setUser(authUser);
    return { success: true, user: authUser };
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(updated));
  };

  const isAdmin = Boolean(
    user?.roles?.includes(ROLES.ADMIN) ||
    user?.roles?.includes('ADMIN') ||
    user?.role === 'ADMIN' ||
    user?.role === 'ROLE_ADMIN' ||
    user?.email?.toLowerCase() === 'prajwal@gmail.com' ||
    user?.email?.toLowerCase().includes('admin')
  );

  const value = {
    user,
    token,
    isAdmin,
    isAuthenticated: !!user && !!token,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
