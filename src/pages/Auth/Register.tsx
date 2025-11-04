import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignUp, useUser } from '@clerk/clerk-react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Register = () => {
  const { isSignedIn } = useUser();
  const { redirectToDashboard } = useAuth();

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      redirectToDashboard();
    }
  }, [isSignedIn, redirectToDashboard]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <span className="text-2xl font-bold text-foreground">ResearchHub</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
          <p className="text-muted-foreground">Join the research collaboration revolution</p>
        </div>

        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <SignUp 
            routing="hash"
            signInUrl="/login"
            forceRedirectUrl="/dashboard"
            fallbackRedirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90',
                card: 'shadow-lg',
              }
            }}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;