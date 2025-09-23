import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  FolderOpen, 
  Users, 
  CheckCircle, 
  Clock, 
  Plus, 
  FileText, 
  MessageSquare,
  Calendar,
  Zap,
  TrendingUp,
  Target
} from 'lucide-react';
import Navbar from '@/components/Navigation/Navbar';

const ResearcherDashboard = () => {
  const myProjects = [
    {
      title: "Climate Change Impact Analysis",
      description: "Analyzing the effects of climate change on coastal ecosystems",
      members: 8,
      progress: 78,
      dueDate: "Dec 15, 2024",
      status: "active",
      priority: "high"
    },
    {
      title: "Machine Learning for Drug Discovery",
      description: "Using AI to accelerate pharmaceutical research",
      members: 12,
      progress: 45,
      dueDate: "Jan 30, 2025",
      status: "active",
      priority: "medium"
    },
    {
      title: "Sustainable Energy Solutions",
      description: "Research on renewable energy optimization",
      members: 6,
      progress: 92,
      dueDate: "Nov 20, 2024",
      status: "review",
      priority: "high"
    }
  ];

  const recentTasks = [
    { title: "Review literature survey draft", project: "Climate Analysis", priority: "high", dueDate: "Today" },
    { title: "Prepare methodology section", project: "Drug Discovery", priority: "medium", dueDate: "Tomorrow" },
    { title: "Schedule team meeting", project: "Energy Solutions", priority: "low", dueDate: "Dec 5" },
    { title: "Update project timeline", project: "Climate Analysis", priority: "medium", dueDate: "Dec 8" }
  ];

  const recentActivity = [
    { action: "Document updated", project: "Climate Analysis", user: "Dr. Sarah Chen", time: "2 hours ago" },
    { action: "New comment added", project: "Drug Discovery", user: "Michael Rodriguez", time: "4 hours ago" },
    { action: "Task completed", project: "Energy Solutions", user: "You", time: "1 day ago" },
    { action: "Team member invited", project: "Climate Analysis", user: "Emma Thompson", time: "2 days ago" }
  ];

  const quickStats = [
    { label: "Active Projects", value: "3", icon: FolderOpen },
    { label: "Team Members", value: "26", icon: Users },
    { label: "Completed Tasks", value: "47", icon: CheckCircle },
    { label: "Pending Reviews", value: "8", icon: Clock }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-destructive text-destructive-foreground">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case 'low':
        return <Badge className="bg-muted text-muted-foreground">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-accent text-accent-foreground">Active</Badge>;
      case 'review':
        return <Badge variant="outline" className="text-primary border-primary">Review</Badge>;
      case 'completed':
        return <Badge className="bg-accent text-accent-foreground">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="researcher" userName="Dr. John Smith" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Research Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="glass-card border-card-border">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* My Projects */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">My Research Projects</CardTitle>
                  <CardDescription>Your active research initiatives</CardDescription>
                </div>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {myProjects.map((project, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/30 border border-card-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {project.members} members
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due {project.dueDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(project.status)}
                          {getPriorityBadge(project.priority)}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Tasks */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full btn-primary justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Start New Project
                  </Button>
                  <Button className="w-full btn-secondary justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button className="w-full btn-secondary justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Invite Collaborator
                  </Button>
                  <Button className="w-full btn-secondary justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
                <CardDescription>Your priority tasks and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTasks.map((task, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-foreground text-sm">{task.title}</h4>
                        {getPriorityBadge(task.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{task.project}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Due {task.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="glass-card border-card-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your projects and team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.action}</span> in {activity.project}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearcherDashboard;