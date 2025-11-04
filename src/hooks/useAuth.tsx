import { useUser, useClerk } from '@clerk/clerk-react';
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
 * Custom hook for authentication using Clerk
 * Provides user data, authentication status, and auth methods
 */
export const useAuth = () => {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();
  const { signOut, openSignIn } = useClerk();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      // Check if user has completed onboarding
      const onboardingComplete = clerkUser.unsafeMetadata?.onboardingComplete;
      const storedProfile = localStorage.getItem('userProfile');
      
      // Get role from metadata or localStorage
      let role = clerkUser.unsafeMetadata?.role as string;
      if (!role && storedProfile) {
        try {
          const profile = JSON.parse(storedProfile);
          role = profile.role;
        } catch (e) {
          console.error('Error parsing stored profile:', e);
        }
      }
      
      // If no role set and not on role-selection page, redirect there
      if (!onboardingComplete && !role && !storedProfile && window.location.pathname !== '/role-selection') {
        navigate('/role-selection');
        return;
      }

      // Get full profile data from metadata or localStorage
      let institution = clerkUser.unsafeMetadata?.institution as string;
      let department = clerkUser.unsafeMetadata?.department as string;
      
      // Fallback to localStorage if not in metadata
      if (!institution && storedProfile) {
        try {
          const profile = JSON.parse(storedProfile);
          role = role || profile.role;
          institution = institution || profile.institution;
          department = department || profile.department;
        } catch (e) {
          console.error('Error parsing stored profile:', e);
        }
      }

      // Map Clerk user to our User interface
      const mappedUser: User = {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        role: (role as 'admin' | 'researcher' | 'student') || 'student',
        institution: institution || '',
        imageUrl: clerkUser.imageUrl,
      };

      setUser(mappedUser);

      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mappedUser));

      // Store session token for API calls
      clerkUser.getSessions().then((sessions) => {
        if (sessions && sessions.length > 0) {
          const token = sessions[0]?.getToken();
          token?.then((t) => {
            if (t) localStorage.setItem('__clerk_session', t);
          });
        }
      });
    } else if (isLoaded && !isSignedIn) {
      setUser(null);
      // Keep userProfile for when they log back in
      // localStorage.removeItem('userProfile');
      localStorage.removeItem('user');
      localStorage.removeItem('__clerk_session');
    }
  }, [clerkUser, isLoaded, isSignedIn, navigate]);

  const login = () => {
    openSignIn();
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('__clerk_session');
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
    isAuthenticated: isSignedIn || false,
    isLoading: !isLoaded,
    redirectToDashboard,
  };
};