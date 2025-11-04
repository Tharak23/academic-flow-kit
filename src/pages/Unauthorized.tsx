import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Unauthorized = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <ShieldAlert className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription className="text-base">
            You don't have permission to access this page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Current Role:</strong> {user?.role || 'Not set'}
            </p>
            <p className="text-sm text-muted-foreground">
              This page requires specific permissions that your current role doesn't have.
            </p>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Link>
            </Button>

            {user?.role === 'admin' && (
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Admin Dashboard
                </Link>
              </Button>
            )}

            {user?.role === 'researcher' && (
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            )}

            {user?.role === 'student' && (
              <Button asChild variant="outline" className="w-full">
                <Link to="/student/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            )}

            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={logout}
            >
              Sign Out
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              Need different permissions? Contact your administrator.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;

