
import React, { createContext, useContext, useState } from 'react';

/**
 * Authentication Context Interface
 * Defines the shape of our auth state and methods.
 */
interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * Manages the global authentication state.
 * Uses localStorage to persist the session across page reloads.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state based on existing local storage entry
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  /**
   * Simple Password-based Login
   * @param password - The password entered by the user.
   * @returns boolean - success or failure.
   */
  const login = (password: string) => {
    // SECURITY NOTE: In a production environment, this should be handled 
    // by a secure backend and use JWT/OIDC tokens.
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  /**
   * Clears the session and logs the user out.
   */
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

/**
 * Custom Hook: useAuth
 * Provides easy access to auth context throughout the application.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
