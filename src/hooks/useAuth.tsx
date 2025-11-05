import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'researcher' | 'student';
  institution?: string;
  imageUrl?: string;
}

/**
 * Custom hook for authentication using local storage
 * Provides user data, authentication status, and auth methods
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // Simple login - in real app, validate credentials
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  const redirectToDashboard = () => {
    if (!user) return;
    
    // Redirect based on role
    switch (user.role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'researcher':
        navigate('/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    redirectToDashboard,
  };
};