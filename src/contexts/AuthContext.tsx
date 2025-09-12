import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'practitioner' | 'patient';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: role === 'practitioner' ? 'prac-1' : 'patient-1',
      name: role === 'practitioner' ? 'Dr. Priya Sharma' : 'Raj Patel',
      role,
      email: role === 'practitioner' ? 'dr.priya@ayurveda.com' : 'raj.patel@email.com'
    };
    setUser(mockUser);
    localStorage.setItem('ayur_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ayur_user');
  };

  // Check for existing session on load
  React.useEffect(() => {
    const savedUser = localStorage.getItem('ayur_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};