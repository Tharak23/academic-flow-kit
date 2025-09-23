import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Target,
  ArrowLeft,
  Share2,
  Settings,
  Download,
  Upload,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navigation/Navbar';

const ProjectOverview = () => {
  const projectData = {
    title: "Climate Change Impact Analysis",
    description: "A comprehensive study analyzing the effects of climate change on coastal ecosystems and biodiversity patterns across different geographical regions.",
    status: "active",
    priority: "high",
    progress: 78,
    startDate: "January 15, 2024",
    dueDate: "December 15, 2024",
    leader: "Dr. Sarah Chen",
    members: [
      { name: "Dr. Sarah Chen", role: "Project Leader", avatar: "", initials: "SC" },
      { name: "Michael Rodriguez", role: "Data Analyst", avatar: "", initials: "MR" },
      { name: "Emma Thompson", role: "Research Assistant", avatar: "", initials: "ET" },
      { name: "Prof. James Wilson", role: "Advisor", avatar: "", initials: "JW" },
      { name: "Alex Johnson", role: "Student Researcher", avatar: "", initials: "AJ" }
    ]
  };

  const recentDocuments = [
    { name: "Literature Review v3.2", type: "PDF", size: "2.4 MB", lastModified: "2 hours ago", author: "Dr. Sarah Chen" },
    { name: "Data Collection Methods", type: "DOCX", size: "1.8 MB", lastModified: "1 day ago", author: "Michael Rodriguez" },
    { name: "Preliminary Results", type: "XLSX", size: "3.1 MB", lastModified: "3 days ago", author: "Emma Thompson" },
    { name: "Project Timeline", type: "PDF", size: "892 KB", lastModified: "1 week ago", author: "Dr. Sarah Chen" }
  ];

  const tasks = [
    { id: 1, title: "Complete data analysis for Q3", assignee: "Michael Rodriguez", status: "in-progress", priority: "high", dueDate: "Dec 10" },
    { id: 2, title: "Review literature survey draft", assignee: "Dr. Sarah Chen", status: "pending", priority: "medium", dueDate: "Dec 12" },
    { id: 3, title: "Prepare methodology section", assignee: "Emma Thompson", status: "completed", priority: "high", dueDate: "Dec 8" },
    { id: 4, title: "Update project timeline", assignee: "Alex Johnson", status: "in-progress", priority: "low", dueDate: "Dec 15" }
  ];

  const milestones = [
    { title: "Project Kickoff", date: "Jan 15, 2024", status: "completed" },
    { title: "Literature Review Complete", date: "Mar 30, 2024", status: "completed" },
    { title: "Data Collection Phase", date: "Jun 15, 2024", status: "completed" },
    { title: "Analysis & Results", date: "Sep 30, 2024", status: "in-progress" },
    { title: "Final Report & Presentation", date: "Dec 15, 2024", status: "pending" }
  ];

  const recentActivity = [
    { action: "uploaded", item: "Literature Review v3.2", user: "Dr. Sarah Chen", time: "2 hours ago" },
    { action: "commented on", item: "Data Collection Methods", user: "Michael Rodriguez", time: "4 hours ago" },
    { action: "completed task", item: "Prepare methodology section", user: "Emma Thompson", time: "1 day ago" },
    { action: "joined project", item: "", user: "Alex Johnson", time: "2 days ago" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-accent text-accent-foreground">Active</Badge>;
      case 'completed':
        return <Badge className="bg-accent text-accent-foreground">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-muted-foreground">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="researcher" userName="Dr. John Smith" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {/* Project Header */}
        <Card className="glass-card border-card-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{projectData.title}</h1>
                  {getStatusBadge(projectData.status)}
                  {getPriorityBadge(projectData.priority)}
                </div>
                <p className="text-muted-foreground mb-4 max-w-3xl">{projectData.description}</p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {projectData.members.length} members
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {projectData.startDate} - {projectData.dueDate}
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {projectData.progress}% complete
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Project Progress</span>
                <span className="font-medium">{projectData.progress}%</span>
              </div>
              <Progress value={projectData.progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Project Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Project Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          milestone.status === 'completed' ? 'bg-accent' :
                          milestone.status === 'in-progress' ? 'bg-warning' : 'bg-muted'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{milestone.title}</p>
                          <p className="text-sm text-muted-foreground">{milestone.date}</p>
                        </div>
                        {getStatusBadge(milestone.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projectData.members.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Project Documents</CardTitle>
                  <CardDescription>Shared files and resources for this project</CardDescription>
                </div>
                <Button className="btn-primary">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.size} • Modified {doc.lastModified} by {doc.author}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Project Tasks</CardTitle>
                  <CardDescription>Track and manage project deliverables</CardDescription>
                </div>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-lg bg-muted/30 border border-card-border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{task.title}</h4>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(task.status)}
                          {getPriorityBadge(task.priority)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Assigned to {task.assignee}</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Due {task.dueDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>Manage project team members and permissions</CardDescription>
                </div>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes in this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          {activity.item && <span className="font-medium">{activity.item}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectOverview;