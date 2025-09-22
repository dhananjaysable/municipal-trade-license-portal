import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeData, getUsers, updateUser } from '../utils/localStorageHelpers';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (userData) => {
    const users = getUsers();
    
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const forgotPassword = async (email) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      // Simulate password reset
      const resetToken = Math.random().toString(36).substring(7);
      foundUser.resetToken = resetToken;
      foundUser.resetTokenExpiry = Date.now() + 3600000; // 1 hour
      
      const updatedUsers = users.map(u => u.id === foundUser.id ? foundUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return { success: true, message: 'Password reset link sent to your email' };
    }
    
    return { success: false, error: 'Email not found' };
  };

  const resetPassword = async (email, newPassword) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      foundUser.password = newPassword;
      delete foundUser.resetToken;
      delete foundUser.resetTokenExpiry;
      
      const updatedUsers = users.map(u => u.id === foundUser.id ? foundUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return { success: true, message: 'Password reset successfully' };
    }
    
    return { success: false, error: 'User not found' };
  };

  const value = {
    user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
