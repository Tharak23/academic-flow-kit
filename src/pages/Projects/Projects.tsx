import React, { useState, useEffect } from 'react';
import DashboardNavbar from '@/components/Navigation/DashboardNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  FileText, 
  MoreHorizontal,
  FolderOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  priority?: 'low' | 'medium' | 'high';
  startDate?: string;
  endDate?: string;
  progress?: number;
  leaderId?: string;
  teamMembers?: string[];
  members?: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  tasksCount?: number;
  documentsCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const Projects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'planning' as 'active' | 'completed' | 'on-hold' | 'planning',
    teamMembers: [] as string[]
  });

  // Load projects from API
  useEffect(() => {
    loadProjects();
  }, []);
      
  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const response = await api.projects.getAll();
      
      if (response.success && response.data) {
        // Map API data to expected format with mock data for display
        const projectsWithMockData = response.data.map((project: any) => ({
          ...project,
          priority: 'medium' as const,
          progress: 0,
          members: [],
          tasksCount: 0,
          documentsCount: 0,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }));
        setProjects(projectsWithMockData);
      } else {
        // Fallback to mock data if API fails or returns no data
        loadMockProjects();
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: 'Using Mock Data',
        description: 'Could not connect to API. Showing sample projects.',
        variant: 'default'
      });
      loadMockProjects();
      } finally {
        setIsLoading(false);
      }
    };

  const loadMockProjects = () => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'AI-Powered Climate Modeling',
        description: 'Developing machine learning models to predict climate change impacts on coastal regions.',
        status: 'active',
        priority: 'high',
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        progress: 65,
        members: [
          { id: '1', name: 'Dr. Sarah Johnson', role: 'Principal Investigator' },
          { id: '2', name: 'Mike Chen', role: 'Data Scientist' },
          { id: '3', name: 'Emma Wilson', role: 'Research Assistant' }
        ],
        tasksCount: 24,
        documentsCount: 18
      },
      {
        id: '2',
        title: 'Urban Sustainability Analysis',
        description: 'Comprehensive study of sustainable practices in major metropolitan areas.',
        status: 'active',
        priority: 'medium',
        startDate: '2024-03-01',
        endDate: '2024-11-30',
        progress: 40,
        members: [
          { id: '4', name: 'Prof. David Martinez', role: 'Lead Researcher' },
          { id: '5', name: 'Lisa Park', role: 'Environmental Analyst' }
        ],
        tasksCount: 16,
        documentsCount: 12
      },
      {
        id: '3',
        title: 'Renewable Energy Storage',
        description: 'Research into next-generation battery technologies for renewable energy systems.',
        status: 'completed',
        priority: 'high',
        startDate: '2023-06-01',
        endDate: '2024-02-28',
        progress: 100,
        members: [
          { id: '6', name: 'Dr. Alex Kumar', role: 'Principal Investigator' },
          { id: '7', name: 'Rachel Adams', role: 'Materials Scientist' }
        ],
        tasksCount: 32,
        documentsCount: 28
      }
    ];
    setProjects(mockProjects);
  };

  const handleCreateProject = async () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both title and description.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsCreating(true);
      const response = await api.projects.create({
        title: newProject.title,
        description: newProject.description,
        status: newProject.status,
        teamMembers: newProject.teamMembers
      });

      if (response.success && response.data) {
        toast({
          title: 'Project Created',
          description: 'Your project has been created successfully.',
        });
      
        // Add the new project to the list with mock data for display
        const projectWithMockData = {
          ...response.data,
          priority: 'medium' as const,
        progress: 0,
        members: [],
        tasksCount: 0,
        documentsCount: 0,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

        setProjects([...projects, projectWithMockData]);
      
      setNewProject({
        title: '',
        description: '',
          status: 'planning',
          teamMembers: []
      });
      setIsCreateDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'on-hold':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <FolderOpen className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Manage and collaborate on research projects
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 mt-4 md:mt-0">
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Start a new research project and invite collaborators.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project goals and objectives"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
                  <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newProject.status} onValueChange={(value: any) => setNewProject(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateProject}
                  disabled={isCreating || !newProject.title || !newProject.description}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Project'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(project.status)}
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                  </div>
                    {project.priority && (
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                    )}
                </div>
                  <CardTitle className="text-lg hover:text-primary transition-colors">
                    {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                {project.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
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
                )}

                {/* Members */}
                {project.members && project.members.length > 0 && (
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.members.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">
                            +{project.members.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {project.members.length} member{project.members.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                )}

                {/* Stats */}
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>{project.tasksCount || 0} tasks</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{project.documentsCount || 0} docs</span>
                  </div>
                  {project.endDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {!project.endDate && project.createdAt && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            </Link>
            ))}
          </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'No projects match your current filters.' 
                : 'Get started by creating your first project.'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;