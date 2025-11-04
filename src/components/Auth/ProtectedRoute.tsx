import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<'admin' | 'researcher' | 'student'>;
}

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Optionally checks for specific roles
 */
export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has a role set
  if (user && !user.role) {
    useEffect(() => {
      toast({
        title: 'Role Not Set',
        description: 'Please contact an administrator to set your user role.',
        variant: 'destructive',
        duration: 5000,
      });
    }, []);
  }

  // Check role-based access if roles are specified
  if (allowedRoles && user) {
    // If user doesn't have a role, allow access but show warning
    if (!user.role) {
      console.warn('User role not set. Allowing access but this should be configured in Clerk.');
    } else if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

