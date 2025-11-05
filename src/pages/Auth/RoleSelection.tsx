import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GraduationCap, User, Building, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get email from localStorage (set during registration)
  const tempEmail = localStorage.getItem('tempEmail') || 'user@example.com';
  const tempName = localStorage.getItem('tempName') || 'User';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    institution: '',
    department: '',
    bio: ''
  });

  const roles = [
    {
      value: 'student',
      label: 'Student',
      icon: <GraduationCap className="h-8 w-8" />,
      description: 'I am a student looking to participate in research projects'
    },
    {
      value: 'researcher',
      label: 'Researcher',
      icon: <User className="h-8 w-8" />,
      description: 'I am a researcher leading projects and collaborating with others'
    },
    {
      value: 'professor',
      label: 'Professor',
      icon: <Building className="h-8 w-8" />,
      description: 'I am a professor managing courses and research initiatives'
    },
    {
      value: 'admin',
      label: 'Administrator',
      icon: <Building className="h-8 w-8" />,
      description: 'I manage the platform and oversee all activities'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.role) {
      toast({
        title: 'Role Required',
        description: 'Please select your role to continue',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store user data in localStorage
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: tempEmail,
        firstName: tempName.split(' ')[0] || 'User',
        lastName: tempName.split(' ')[1] || '',
        role: formData.role,
        institution: formData.institution,
        department: formData.department,
        bio: formData.bio,
        imageUrl: ''
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userProfile', JSON.stringify(userData));
      
      // Clear temp data
      localStorage.removeItem('tempEmail');
      localStorage.removeItem('tempName');

      toast({
        title: 'Profile Updated!',
        description: 'Your role and information have been saved.',
      });

      // Redirect based on role
      setTimeout(() => {
        if (formData.role === 'admin') navigate('/admin/dashboard');
        else if (formData.role === 'student') navigate('/student/dashboard');
        else if (formData.role === 'professor') navigate('/dashboard');
        else navigate('/dashboard');
      }, 500);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userName = tempName;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl">Welcome, {userName}!</CardTitle>
          <CardDescription>Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection - Minimalistic */}
            <RadioGroup
              value={formData.role}
              onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              className="grid grid-cols-2 gap-3"
            >
              {roles.map((role) => (
                <label
                  key={role.value}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.role === role.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={role.value} className="mb-2" />
                  <div className="text-primary mb-1">{role.icon}</div>
                  <span className="text-sm font-medium">{role.label}</span>
                </label>
              ))}
            </RadioGroup>

            {/* Optional Fields */}
            <div className="space-y-3 pt-2">
              <Input
                placeholder="Institution (optional)"
                value={formData.institution}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
              />
              <Input
                placeholder="Department (optional)"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !formData.role}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Continuing...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelection;

