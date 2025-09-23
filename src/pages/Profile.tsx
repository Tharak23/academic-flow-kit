import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Building, 
  MapPin, 
  Link as LinkIcon, 
  Edit3, 
  Save, 
  Camera,
  Award,
  BookOpen,
  Users,
  Calendar,
  Settings
} from 'lucide-react';
import Navbar from '@/components/Navigation/Navbar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Dr. John',
    lastName: 'Smith',
    email: 'j.smith@university.edu',
    role: 'researcher',
    institution: 'Stanford University',
    department: 'Computer Science',
    location: 'Stanford, CA',
    bio: 'Passionate researcher in machine learning and artificial intelligence with over 10 years of experience in academic research. Focused on developing innovative solutions for complex problems.',
    website: 'https://johnsmith.research.edu',
    researchInterests: ['Machine Learning', 'Artificial Intelligence', 'Data Mining', 'Neural Networks'],
    orcid: '0000-0000-0000-0000'
  });

  const achievements = [
    { title: 'Outstanding Research Award 2024', organization: 'Stanford University', year: '2024' },
    { title: 'Best Paper Award - ICML 2023', organization: 'International Conference', year: '2023' },
    { title: 'Early Career Researcher Grant', organization: 'NSF', year: '2022' },
    { title: 'PhD in Computer Science', organization: 'MIT', year: '2020' }
  ];

  const publications = [
    {
      title: 'Advanced Neural Networks for Climate Prediction',
      journal: 'Nature Machine Intelligence',
      year: '2024',
      citations: 127
    },
    {
      title: 'Sustainable AI: Energy-Efficient Deep Learning Models',
      journal: 'Journal of AI Research',
      year: '2023',
      citations: 89
    },
    {
      title: 'Collaborative Learning in Multi-Agent Systems',
      journal: 'IEEE Transactions on AI',
      year: '2023',
      citations: 156
    }
  ];

  const projects = [
    {
      title: 'Climate Change Impact Analysis',
      status: 'Active',
      members: 8,
      progress: 78,
      startDate: 'Jan 2024'
    },
    {
      title: 'Machine Learning for Drug Discovery',
      status: 'Active',
      members: 12,
      progress: 45,
      startDate: 'Mar 2024'
    },
    {
      title: 'Sustainable Energy Solutions',
      status: 'Completed',
      members: 6,
      progress: 100,
      startDate: 'Sep 2023'
    }
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
    console.log('Saving profile data:', profileData);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive text-destructive-foreground';
      case 'researcher': return 'bg-primary text-primary-foreground';
      case 'student': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'researcher': return 'Researcher';
      case 'student': return 'Student';
      default: return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole={profileData.role as any} userName={`${profileData.firstName} ${profileData.lastName}`} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and research profile</p>
        </div>

        {/* Profile Header Card */}
        <Card className="glass-card border-card-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <Badge className={getRoleColor(profileData.role)}>
                    {getRoleLabel(profileData.role)}
                  </Badge>
                </div>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>{profileData.institution} • {profileData.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{profileData.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="btn-primary">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="btn-primary">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          value={profileData.institution}
                          onChange={(e) => handleInputChange('institution', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={profileData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Institution</p>
                        <p className="font-medium">{profileData.institution}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{profileData.department}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{profileData.location}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">ORCID</p>
                        <p className="font-medium">{profileData.orcid}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    About & Research Interests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <Label htmlFor="bio">Biography</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Biography</p>
                        <p className="text-sm leading-relaxed">{profileData.bio}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Research Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {profileData.researchInterests.map((interest, index) => (
                            <Badge key={index} variant="secondary">{interest}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Website</p>
                        <a 
                          href={profileData.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80"
                        >
                          <LinkIcon className="h-4 w-4 mr-1" />
                          {profileData.website}
                        </a>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.organization} • {achievement.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle>Publications</CardTitle>
                <CardDescription>Your published research work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publications.map((pub, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/30 border border-card-border">
                      <h4 className="font-semibold text-foreground mb-2">{pub.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                        <span>•</span>
                        <span>{pub.citations} citations</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle>Research Projects</CardTitle>
                <CardDescription>Your current and completed projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/30 border border-card-border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{project.title}</h4>
                        <Badge 
                          className={project.status === 'Active' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {project.members} members
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Started {project.startDate}
                        </span>
                        <span>{project.progress}% complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Manage email preferences</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div>
                    <h4 className="font-medium text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;