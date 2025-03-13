
import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface User {
  name?: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => void;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticating: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  resetPassword: async () => {},
  isAuthenticating: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = (email: string, password: string, rememberMe = false) => {
    setIsAuthenticating(true);
    
    try {
      // In a real app, this would authenticate against an API
      const newUser = { email };
      setUser(newUser);
      
      // If rememberMe is false, we don't need to do anything as the user is already stored in localStorage
      // from the useLocalStorage hook which persists by default
      
      // In a real app with a backend, you'd set a session cookie with an appropriate expiry based on rememberMe
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsAuthenticating(true);
    
    try {
      // In a real app, this would make an API call to trigger password reset
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Success response is handled in the component
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, resetPassword, isAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
};
