import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
  clearAuthSession,
  loginUser,
  registerUser,
  checkBackendHealth,
} from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [isLoading, setIsLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });

  const verifyBackend = useCallback(async () => {
    setBackendStatus((prev) => ({ ...prev, checking: true }));
    const health = await checkBackendHealth();
    setBackendStatus({ online: health.online, checking: false, message: health.message });
  }, []);

  useEffect(() => {
    // Check initial auth state & backend health
    const savedToken = getStoredToken();
    const savedUser = getStoredUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);

    verifyBackend();
    // Periodic check every 30 seconds
    const interval = setInterval(verifyBackend, 30000);
    return () => clearInterval(interval);
  }, [verifyBackend]);

  const login = async (email, password) => {
    setIsLoading(true);
    const result = await loginUser({ email, password });
    setIsLoading(false);

    if (result.success) {
      setToken(result.token);
      setUser(result.user);
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message };
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    const result = await registerUser({ name, email, password });
    setIsLoading(false);

    return result;
  };

  const logout = () => {
    clearAuthSession();
    setToken(null);
    setUser(null);
  };

  const updateUserProfile = (updatedData) => {
    const updated = { ...user, ...updatedData };
    setUser(updated);
    setStoredUser(updated);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    backendStatus,
    verifyBackend,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
