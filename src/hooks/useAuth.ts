'use client';

import { useEffect, useState } from 'react';
import { authStorage, authAPI, type User, type AuthToken } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = authStorage.getToken();
    const storedUser = authStorage.getUser();
    
    if (token && storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (emailOrPhone: string, code: string) => {
    try {
      const response = await authAPI.verifyCode(emailOrPhone, code);
      
      const authToken: AuthToken = {
        token: response.token,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + (response.expiresIn * 1000),
      };

      authStorage.setToken(authToken);
      authStorage.setUser(response.user);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const sendCode = async (emailOrPhone: string) => {
    return authAPI.sendVerificationCode(emailOrPhone);
  };

  const logout = () => {
    authStorage.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const getAuthHeaders = () => {
    const token = authStorage.getToken();
    if (!token) return {};
    
    return {
      Authorization: `Bearer ${token.token}`,
    };
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    sendCode,
    logout,
    getAuthHeaders,
  };
}