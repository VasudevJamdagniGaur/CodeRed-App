import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '../types';

const AUTH_TOKEN_KEY = '@bloodconnect_token';
const USER_KEY = '@bloodconnect_user';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStoredAuth = useCallback(async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUserState(JSON.parse(storedUser));
      }
    } catch (e) {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadStoredAuth();
    const t = setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 2000);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [loadStoredAuth]);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (u) AsyncStorage.setItem(USER_KEY, JSON.stringify(u));
    else AsyncStorage.removeItem(USER_KEY);
  }, []);

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    const mockToken = `token_${Date.now()}`;
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role,
    };
    await Promise.all([
      AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(mockUser)),
    ]);
    setToken(mockToken);
    setUserState(mockUser);
  }, []);

  const logout = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(AUTH_TOKEN_KEY),
      AsyncStorage.removeItem(USER_KEY),
    ]);
    setToken(null);
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
