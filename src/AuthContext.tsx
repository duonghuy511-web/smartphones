import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0],
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        resolve();
      }, 800);
    });
  };

  const signup = async (name: string, email: string, phone: string, password: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          email,
          name,
          phone,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
