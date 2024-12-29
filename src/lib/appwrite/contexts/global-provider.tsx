import React, { createContext, ReactNode, useContext } from 'react';

import { useAppwrite } from '../hooks/useAppwrite';
import { getCurrentUser } from '../services/auth';

interface AuthContextType {
  isLogged: boolean;
  user: User | null | undefined;
  loading: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLogged = !!user;

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuthContext must be used within a AuthProvider');

  return context;
};

export default AuthProvider;
