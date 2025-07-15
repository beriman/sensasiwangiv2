
// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Profile } from '@/lib/types';
import { profiles } from '@/data/profiles'; // Mock data
import { useToast } from '@/hooks/use-toast';

// Simulate API calls
const api = {
  login: async (email: string, password?: string): Promise<Profile | null> => {
    console.log(`Attempting to log in with email: ${email}`);
    // In a real app, you'd send the email and password to your server
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const user = profiles.find(p => p.email === email && p.moderatorRoles && p.moderatorRoles.length > 0);
    console.log(`User found: ${!!user}`);
    // Simple password check for demo purposes. In a real app, server handles this.
    if (user && password) {
      return user;
    }
    return null;
  },
  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};

interface AuthContextType {
  user: Profile | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
  userRoles: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Here you might check for a token in localStorage to keep the user logged in
    setLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    setLoading(true);
    try {
      const loggedInUser = await api.login(email, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        toast({
          title: 'Login Berhasil',
          description: `Selamat datang kembali, ${loggedInUser.name}!`,
        });
      } else {
        throw new Error('Kredensial tidak valid atau Anda tidak memiliki hak akses moderator.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat login.';
      toast({
        variant: 'destructive',
        title: 'Login Gagal',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await api.logout();
    setUser(null);
    setLoading(false);
    toast({
      title: 'Logout Berhasil',
      description: 'Anda telah berhasil keluar.',
    });
  };

  const userRoles = user?.moderatorRoles || [];
  const isAdmin = userRoles.includes('Admin');

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin, userRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
