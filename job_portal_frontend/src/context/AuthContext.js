import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (authToken) {
      // Optionally fetch user info from backend here
      const payload = JSON.parse(atob(authToken.split('.')[1]));
      setUser({ ...payload, token: authToken });
    } else {
      setUser(null);
    }
  }, [authToken]);

  // PUBLIC_INTERFACE
  const login = async (credentials) => {
    const res = await api.login(credentials);
    setAuthToken(res.access_token);
    localStorage.setItem('token', res.access_token);
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  // PUBLIC_INTERFACE
  const signup = async (userType, payload) => {
    await api.signup(userType, payload);
    // Optionally auto-login or redirect after signup
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, token: authToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
