import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, FileText, MessageSquare, CheckCircle, BookOpen, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserButton } from '@clerk/clerk-react';

const Landing = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Collaborative Research",
      description: "Work together seamlessly with researchers and students from around the world"
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Document Management",
      description: "Version control, commenting, and secure sharing of research documents"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Task Tracking",
      description: "Organize milestones, assign tasks, and track project progress efficiently"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "In-Context Communication",
      description: "Discuss projects, documents, and tasks with contextual messaging"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Learning Resources",
      description: "Access tutorials, guides, and shared knowledge library"
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Role-Based Access",
      description: "Tailored experiences for admins, researchers, and students"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">ResearchHub</span>
            </div>
            <div className="flex items-center space-x-4">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <>
                      <Button 
                        variant="ghost" 
                        onClick={() => {
                          if (user?.role === 'admin') navigate('/admin/dashboard');
                          else if (user?.role === 'student') navigate('/student/dashboard');
                          else navigate('/dashboard');
                        }}
                      >
                        Go to Dashboard
                      </Button>
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "h-8 w-8"
                          }
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild>
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button asChild>
                        <Link to="/register">Get Started</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="mb-6 text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
            Academic Research
            <span className="text-primary block">Collaboration Platform</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Streamline your research workflow with powerful project management, 
            document collaboration, and communication tools designed for academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button 
                size="lg"
                onClick={() => {
                  if (user?.role === 'admin') navigate('/admin/dashboard');
                  else if (user?.role === 'student') navigate('/student/dashboard');
                  else navigate('/dashboard');
                }}
                className="inline-flex items-center"
              >
                Go to Your Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/register" className="inline-flex items-center">
                    Start Your Research Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-foreground">
              Everything You Need for Research Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for academic research collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-card-border hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Transform Your Research?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of researchers already using ResearchHub to collaborate and achieve breakthrough results.
          </p>
          {isAuthenticated ? (
            <Button 
              size="lg"
              onClick={() => {
                if (user?.role === 'admin') navigate('/admin/dashboard');
                else if (user?.role === 'student') navigate('/student/dashboard');
                else navigate('/dashboard');
              }}
              className="inline-flex items-center text-lg px-8 py-4"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button size="lg" asChild className="inline-flex items-center text-lg px-8 py-4">
              <Link to="/register">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">R</span>
                </div>
                <span className="font-bold text-foreground">ResearchHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering academic research through collaboration and innovation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-sm text-muted-foreground hover:text-foreground">Help Center</Link></li>
                <li><Link to="/tutorials" className="text-sm text-muted-foreground hover:text-foreground">Tutorials</Link></li>
                <li><Link to="/community" className="text-sm text-muted-foreground hover:text-foreground">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
                <li><Link to="/status" className="text-sm text-muted-foreground hover:text-foreground">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ResearchHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;