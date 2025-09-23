import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  CheckCircle, 
  Clock, 
  Star, 
  FileText, 
  MessageSquare,
  Calendar,
  Award,
  TrendingUp,
  Target,
  PlayCircle
} from 'lucide-react';
import Navbar from '@/components/Navigation/Navbar';

const StudentDashboard = () => {
  const assignedProjects = [
    {
      title: "Climate Data Analysis",
      supervisor: "Dr. Sarah Chen",
      description: "Analyzing temperature trends in coastal regions",
      progress: 65,
      dueDate: "Dec 20, 2024",
      status: "active",
      tasks: 8,
      completedTasks: 5
    },
    {
      title: "Machine Learning Fundamentals",
      supervisor: "Prof. James Wilson",
      description: "Learning and implementing basic ML algorithms",
      progress: 30,
      dueDate: "Jan 15, 2025",
      status: "active",
      tasks: 12,
      completedTasks: 4
    },
    {
      title: "Research Methodology Course",
      supervisor: "Dr. Emily Brown",
      description: "Understanding research design and data collection",
      progress: 85,
      dueDate: "Nov 30, 2024",
      status: "review",
      tasks: 6,
      completedTasks: 5
    }
  ];

  const learningResources = [
    {
      title: "Introduction to Statistical Analysis",
      type: "Course",
      duration: "4 weeks",
      difficulty: "Beginner",
      progress: 40
    },
    {
      title: "Academic Writing Workshop",
      type: "Workshop",
      duration: "2 weeks",
      difficulty: "Intermediate",
      progress: 75
    },
    {
      title: "Data Visualization with Python",
      type: "Tutorial",
      duration: "1 week",
      difficulty: "Advanced",
      progress: 0
    },
    {
      title: "Research Ethics Guidelines",
      type: "Reading",
      duration: "3 days",
      difficulty: "Beginner",
      progress: 100
    }
  ];

  const achievements = [
    { title: "First Project Completion", date: "Nov 15, 2024", type: "milestone" },
    { title: "Excellent Literature Review", date: "Nov 10, 2024", type: "recognition" },
    { title: "Team Collaboration Award", date: "Oct 28, 2024", type: "award" },
    { title: "Research Skills Certificate", date: "Oct 15, 2024", type: "certificate" }
  ];

  const upcomingDeadlines = [
    { task: "Submit methodology draft", project: "Climate Data Analysis", dueDate: "Dec 8", priority: "high" },
    { task: "Complete ML assignment #3", project: "ML Fundamentals", dueDate: "Dec 12", priority: "medium" },
    { task: "Peer review submissions", project: "Research Methodology", dueDate: "Dec 15", priority: "low" },
    { task: "Final presentation prep", project: "Climate Data Analysis", dueDate: "Dec 18", priority: "high" }
  ];

  const quickStats = [
    { label: "Active Projects", value: "3", icon: BookOpen },
    { label: "Completed Tasks", value: "14", icon: CheckCircle },
    { label: "Learning Hours", value: "127", icon: Clock },
    { label: "Achievements", value: "8", icon: Award }
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

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-accent text-accent-foreground">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-warning text-warning-foreground">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-destructive text-destructive-foreground">Advanced</Badge>;
      default:
        return <Badge variant="secondary">{difficulty}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="student" userName="Alex Johnson" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your learning progress and research contributions.</p>
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
          {/* Assigned Projects */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">My Research Projects</CardTitle>
                <CardDescription>Projects assigned by your supervisors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assignedProjects.map((project, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/30 border border-card-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {project.supervisor}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Due {project.dueDate}
                            </span>
                            <span className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {project.completedTasks}/{project.tasks} tasks
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(project.status)}
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

          {/* Upcoming Deadlines */}
          <div className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                <CardDescription>Tasks requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((item, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-foreground text-sm">{item.task}</h4>
                        {getPriorityBadge(item.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{item.project}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Due {item.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Resources */}
        <Card className="glass-card border-card-border mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Learning Resources</CardTitle>
              <CardDescription>Courses, tutorials, and materials to enhance your skills</CardDescription>
            </div>
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {learningResources.map((resource, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/30 border border-card-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-2">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.duration}</span>
                      </div>
                    </div>
                    {getDifficultyBadge(resource.difficulty)}
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{resource.progress}%</span>
                    </div>
                    <Progress value={resource.progress} className="h-2" />
                  </div>
                  <Button size="sm" className="w-full" variant={resource.progress === 0 ? "default" : "outline"}>
                    {resource.progress === 0 ? (
                      <>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Learning
                      </>
                    ) : resource.progress === 100 ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;