import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  Home,
  FolderOpen,
  CheckSquare,
  MessageSquare,
  Users,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DashboardNavbar = () => {
  const { user, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (isLoading || !user) return null;

  const getNavigationItems = () => {
    const commonItems = [
      { name: 'Dashboard', href: user.role === 'admin' ? '/admin/dashboard' : user.role === 'student' ? '/student/dashboard' : '/dashboard', icon: Home },
      { name: 'Projects', href: '/projects', icon: FolderOpen },
      { name: 'Tasks', href: '/tasks', icon: CheckSquare },
      { name: 'Messages', href: '/messages', icon: MessageSquare },
    ];

    const roleBasedItems = {
      admin: [
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      ],
      researcher: [
        { name: 'My Projects', href: '/my-projects', icon: FolderOpen },
        { name: 'Resources', href: '/resources', icon: BookOpen },
      ],
      student: [
        { name: 'Learning', href: '/learning', icon: BookOpen },
        { name: 'Progress', href: '/progress', icon: BarChart3 },
      ]
    };

    return [...commonItems, ...roleBasedItems[user.role]];
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-foreground">ResearchHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* User Menu - Using Clerk's UserButton with custom styling */}
            <div className="flex items-center space-x-3">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 rounded-full",
                    userButtonPopoverCard: "shadow-xl",
                    userButtonPopoverActions: "gap-2"
                  }
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Profile"
                    labelIcon={<User className="h-4 w-4" />}
                    href="/profile"
                  />
                  <UserButton.Action
                    label="Settings"
                    labelIcon={<Settings className="h-4 w-4" />}
                    onClick={() => {/* Add settings modal */}}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;