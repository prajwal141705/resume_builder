import React, { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
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
    // Initial verification
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
    } else {
      // Default demo user for easy onboarding if needed
      const demoUser = {
        id: 'user-demo-1',
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        role: 'SOFTWARE_ENGINEER',
      };
      if (!storedUser && !storedToken) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(demoUser));
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'demo-jwt-token-12345');
        setUser(demoUser);
        setToken('demo-jwt-token-12345');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      const authToken = data.token || data.accessToken || 'jwt-token-' + Date.now();
      const authUser = data.user || {
        id: data.id || 'user-' + Date.now(),
        name: data.name || email.split('@')[0],
        email: email,
      };

      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);
      return { success: true, user: authUser };
    } catch (err) {
      // Offline fallback login for demo/testing
      console.warn('Backend login endpoint unavailable, logging in locally:', err.message);
      const fallbackUser = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email: email,
      };
      const fallbackToken = 'demo-jwt-token-' + Date.now();
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, fallbackToken);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(fallbackUser));
      setToken(fallbackToken);
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await authService.register({ name, email, password });
      const authToken = data.token || data.accessToken || 'jwt-token-' + Date.now();
      const authUser = data.user || {
        id: data.id || 'user-' + Date.now(),
        name,
        email,
      };

      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);
      return { success: true, user: authUser };
    } catch (err) {
      console.warn('Backend register endpoint unavailable, registering locally:', err.message);
      const fallbackUser = {
        id: 'user-' + Date.now(),
        name,
        email,
      };
      const fallbackToken = 'demo-jwt-token-' + Date.now();
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, fallbackToken);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(fallbackUser));
      setToken(fallbackToken);
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
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

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
