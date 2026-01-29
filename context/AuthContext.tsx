
import React, { createContext, useContext, useState } from 'react';
import { db } from '../lib/db';

/**
 * Authentication Context Interface
 */
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  /**
   * Login using email and password from DB settings
   */
  const login = (email: string, password: string) => {
    // Fetch settings from DB
    const settings = db.getSingle('settings');
    
    // Default credentials if settings haven't been seeded yet (fallback for first-time login)
    const storedEmail = settings?.adminEmail || 'admin@survey-af.com';
    const storedPassword = settings?.adminPassword || 'survey-af.com';

    if (email === storedEmail && password === storedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
