import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  FolderOpen, 
  Activity, 
  TrendingUp, 
  UserPlus, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '@/components/Navigation/Navbar';

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,284",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: "247",
      change: "+8%",
      icon: FolderOpen,
      color: "text-green-600"
    },
    {
      title: "Platform Activity",
      value: "89%",
      change: "+3%",
      icon: Activity,
      color: "text-purple-600"
    },
    {
      title: "Growth Rate",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentUsers = [
    { name: "Dr. Sarah Chen", email: "s.chen@university.edu", role: "researcher", status: "active", joinDate: "2 hours ago" },
    { name: "Michael Rodriguez", email: "m.rodriguez@student.edu", role: "student", status: "pending", joinDate: "5 hours ago" },
    { name: "Prof. James Wilson", email: "j.wilson@research.org", role: "researcher", status: "active", joinDate: "1 day ago" },
    { name: "Emma Thompson", email: "e.thompson@grad.edu", role: "student", status: "active", joinDate: "2 days ago" }
  ];

  const recentProjects = [
    { name: "Climate Change Impact Analysis", members: 12, status: "active", progress: 78, lastUpdate: "2 hours ago" },
    { name: "Neural Network Optimization", members: 8, status: "active", progress: 45, lastUpdate: "4 hours ago" },
    { name: "Quantum Computing Research", members: 15, status: "review", progress: 92, lastUpdate: "1 day ago" },
    { name: "Biomedical Data Mining", members: 6, status: "active", progress: 23, lastUpdate: "1 day ago" }
  ];

  const systemAlerts = [
    { type: "warning", message: "Server maintenance scheduled for tonight", time: "1 hour ago" },
    { type: "success", message: "Backup completed successfully", time: "3 hours ago" },
    { type: "info", message: "New feature update available", time: "1 day ago" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-accent text-accent-foreground">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-warning border-warning">Pending</Badge>;
      case 'review':
        return <Badge variant="outline" className="text-primary border-primary">Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-accent" />;
      default:
        return <Clock className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="admin" userName="Admin User" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Administrator Dashboard</h1>
          <p className="text-muted-foreground">Manage platform operations, users, and projects</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="glass-card border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-accent font-medium">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Users */}
          <Card className="glass-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Users</CardTitle>
                <CardDescription>Latest user registrations and activities</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(user.status)}
                      <span className="text-xs text-muted-foreground">{user.joinDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card className="glass-card border-card-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Projects</CardTitle>
                <CardDescription>Latest project activities and updates</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{project.name}</h4>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{project.members} members</span>
                      <span>{project.lastUpdate}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Alerts & Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* System Alerts */}
          <Card className="glass-card border-card-border">
            <CardHeader>
              <CardTitle className="text-lg">System Alerts</CardTitle>
              <CardDescription>Important platform notifications and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card border-card-border">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Frequently used administrative functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="btn-primary justify-start h-12">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
                <Button className="btn-secondary justify-start h-12">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
                <Button className="btn-secondary justify-start h-12">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button className="btn-secondary justify-start h-12">
                  <Activity className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;