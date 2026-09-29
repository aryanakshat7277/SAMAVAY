import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { authApi } from '../services/api';

export type PersonaType = 'CITIZEN' | 'OFFICER' | 'SUPER_ADMIN';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<void>;
  loginAsDemo: () => Promise<void>;
  switchPersona: (persona: PersonaType) => void;
  register: (fullName: string, email: string, mobile: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('samavay_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default demo citizen user logged in for immediate testing experience
    return {
      id: 1,
      fullName: 'Aarav Sharma',
      email: 'citizen.demo@samavay.gov.in',
      mobileNumber: '9876543210',
      role: 'CITIZEN' as Role
    };
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('samavay_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('samavay_user');
      localStorage.removeItem('samavay_token');
    }
  }, [user]);

  const login = async (identifier: string, pass: string) => {
    setIsLoading(true);
    try {
      const resp = await authApi.login(identifier, pass);
      localStorage.setItem('samavay_token', resp.token);
      const newUser: User = {
        id: resp.userId,
        fullName: resp.fullName,
        email: resp.email,
        mobileNumber: resp.mobileNumber,
        role: resp.role
      };
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async () => {
    setIsLoading(true);
    try {
      const resp = await authApi.demoLogin();
      localStorage.setItem('samavay_token', resp.token);
      const newUser: User = {
        id: resp.userId,
        fullName: resp.fullName,
        email: resp.email,
        mobileNumber: resp.mobileNumber,
        role: resp.role
      };
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const switchPersona = (persona: PersonaType) => {
    if (persona === 'CITIZEN') {
      const citizenUser: User = {
        id: 1,
        fullName: 'Aarav Sharma',
        email: 'citizen.demo@samavay.gov.in',
        mobileNumber: '9876543210',
        role: 'CITIZEN'
      };
      setUser(citizenUser);
      localStorage.setItem('samavay_token', 'demo-citizen-token-jwt');
    } else if (persona === 'OFFICER') {
      const officerUser: User = {
        id: 2,
        fullName: 'Priya Singh (Municipal Officer)',
        email: 'officer.admin@samavay.gov.in',
        mobileNumber: '9811223344',
        role: 'DEPARTMENT_ADMIN'
      };
      setUser(officerUser);
      localStorage.setItem('samavay_token', 'demo-officer-token-jwt');
    } else if (persona === 'SUPER_ADMIN') {
      const superAdminUser: User = {
        id: 3,
        fullName: 'Dr. Rajesh Kumar (Mission Director)',
        email: 'super.admin@samavay.gov.in',
        mobileNumber: '9800112233',
        role: 'SUPER_ADMIN'
      };
      setUser(superAdminUser);
      localStorage.setItem('samavay_token', 'demo-superadmin-token-jwt');
    }
  };

  const register = async (fullName: string, email: string, mobile: string, pass: string) => {
    setIsLoading(true);
    try {
      const resp = await authApi.register(fullName, email, mobile, pass);
      localStorage.setItem('samavay_token', resp.token);
      const newUser: User = {
        id: resp.userId,
        fullName: resp.fullName,
        email: resp.email,
        mobileNumber: resp.mobileNumber,
        role: resp.role
      };
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('samavay_user');
    localStorage.removeItem('samavay_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        switchPersona,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
