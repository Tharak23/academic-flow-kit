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
  User, 
  FileText, 
  Star,
  MessageSquare,
  Eye,
  Download,
  Loader2,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  keywords: string[];
  category: string;
  publicationDate: string;
  uploadedBy: string;
  uploadedByName: string;
  reviews: Review[];
  views: number;
  downloads: number;
  createdAt: string;
}

const ResearchPapers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newPaper, setNewPaper] = useState({
    title: '',
    abstract: '',
    authors: '',
    keywords: '',
    category: 'computer-science'
  });
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = () => {
    try {
      setIsLoading(true);
      const storedPapers = localStorage.getItem('researchPapers');
      
      if (storedPapers) {
        const parsedPapers = JSON.parse(storedPapers);
        setPapers(parsedPapers);
      } else {
        loadMockPapers();
      }
    } catch (error) {
      console.error('Error loading papers:', error);
      loadMockPapers();
    } finally {
      setIsLoading(false);
    }
  };

  const savePapers = (papersToSave: ResearchPaper[]) => {
    try {
      localStorage.setItem('researchPapers', JSON.stringify(papersToSave));
    } catch (error) {
      console.error('Error saving papers:', error);
    }
  };

  const loadMockPapers = () => {
    const mockPapers: ResearchPaper[] = [
      {
        id: '1',
        title: 'Deep Learning Applications in Climate Science',
        abstract: 'This paper explores the application of deep learning models to predict climate patterns and assess environmental changes over time.',
        authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Dr. Emma Wilson'],
        keywords: ['Deep Learning', 'Climate Science', 'Machine Learning', 'Environmental Modeling'],
        category: 'computer-science',
        publicationDate: '2024-01-15',
        uploadedBy: 'user1',
        uploadedByName: 'Dr. Sarah Johnson',
        reviews: [
          {
            id: 'rev1',
            reviewerId: 'user2',
            reviewerName: 'Prof. David Martinez',
            rating: 5,
            comment: 'Excellent research with practical applications. Well-structured methodology.',
            createdAt: new Date().toISOString()
          }
        ],
        views: 145,
        downloads: 32,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Sustainable Urban Development Strategies',
        abstract: 'A comprehensive analysis of sustainable practices in urban planning and their impact on environmental conservation.',
        authors: ['Prof. David Martinez', 'Dr. Lisa Park'],
        keywords: ['Urban Planning', 'Sustainability', 'Environmental Science'],
        category: 'environmental-science',
        publicationDate: '2024-02-20',
        uploadedBy: 'user2',
        uploadedByName: 'Prof. David Martinez',
        reviews: [],
        views: 89,
        downloads: 18,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Quantum Computing Breakthroughs in Material Science',
        abstract: 'Recent advances in quantum computing applications for material discovery and molecular simulation.',
        authors: ['Dr. Alex Kumar', 'Dr. Rachel Adams'],
        keywords: ['Quantum Computing', 'Material Science', 'Physics'],
        category: 'physics',
        publicationDate: '2024-03-10',
        uploadedBy: 'user3',
        uploadedByName: 'Dr. Alex Kumar',
        reviews: [
          {
            id: 'rev2',
            reviewerId: 'user1',
            reviewerName: 'Dr. Sarah Johnson',
            rating: 4,
            comment: 'Interesting findings, but could benefit from more experimental validation.',
            createdAt: new Date().toISOString()
          }
        ],
        views: 203,
        downloads: 67,
        createdAt: new Date().toISOString()
      }
    ];
    setPapers(mockPapers);
    savePapers(mockPapers);
  };

  const handleCreatePaper = () => {
    if (!newPaper.title || !newPaper.abstract) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both title and abstract.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const authorsArray = newPaper.authors.split(',').map(a => a.trim()).filter(a => a);
      const keywordsArray = newPaper.keywords.split(',').map(k => k.trim()).filter(k => k);

      const paperData: ResearchPaper = {
        id: `paper_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: newPaper.title,
        abstract: newPaper.abstract,
        authors: authorsArray.length > 0 ? authorsArray : [user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Anonymous'],
        keywords: keywordsArray,
        category: newPaper.category,
        publicationDate: new Date().toISOString().split('T')[0],
        uploadedBy: user?.id || '',
        uploadedByName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Anonymous',
        reviews: [],
        views: 0,
        downloads: 0,
        createdAt: new Date().toISOString()
      };

      const updatedPapers = [...papers, paperData];
      setPapers(updatedPapers);
      savePapers(updatedPapers);

      toast({
        title: 'Paper Added',
        description: 'Your research paper has been added successfully.',
      });
      
      setNewPaper({
        title: '',
        abstract: '',
        authors: '',
        keywords: '',
        category: 'computer-science'
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Error creating paper:', error);
      toast({
        title: 'Error',
        description: 'Failed to add paper. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleAddReview = () => {
    if (!selectedPaper || !newReview.comment.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a review comment.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const review: Review = {
        id: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        reviewerId: user?.id || '',
        reviewerName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: new Date().toISOString()
      };

      const updatedPapers = papers.map(paper => 
        paper.id === selectedPaper.id
          ? { ...paper, reviews: [...paper.reviews, review] }
          : paper
      );

      setPapers(updatedPapers);
      savePapers(updatedPapers);

      // Update views
      const updatedPaper = updatedPapers.find(p => p.id === selectedPaper.id);
      if (updatedPaper) {
        setSelectedPaper(updatedPaper);
      }

      toast({
        title: 'Review Added',
        description: 'Your review has been added successfully.',
      });

      setNewReview({
        rating: 5,
        comment: ''
      });
      setIsReviewDialogOpen(false);
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: 'Error',
        description: 'Failed to add review. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleViewPaper = (paper: ResearchPaper) => {
    setSelectedPaper(paper);
    // Increment views
    const updatedPapers = papers.map(p => 
      p.id === paper.id ? { ...p, views: p.views + 1 } : p
    );
    setPapers(updatedPapers);
    savePapers(updatedPapers);
    setSelectedPaper(updatedPapers.find(p => p.id === paper.id) || paper);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'computer-science':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'environmental-science':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'physics':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'biology':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || paper.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const averageRating = (reviews: Review[]) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  };

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Research Papers</h1>
            <p className="text-muted-foreground">
              Browse, upload, and review academic research papers
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 mt-4 md:mt-0">
                <Plus className="h-4 w-4" />
                <span>Add Paper</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Research Paper</DialogTitle>
                <DialogDescription>
                  Share your research paper with the academic community.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Paper Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter paper title"
                    value={newPaper.title}
                    onChange={(e) => setNewPaper(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="abstract">Abstract *</Label>
                  <Textarea
                    id="abstract"
                    placeholder="Provide a brief summary of your research"
                    value={newPaper.abstract}
                    onChange={(e) => setNewPaper(prev => ({ ...prev, abstract: e.target.value }))}
                    rows={6}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="authors">Authors (comma-separated)</Label>
                  <Input
                    id="authors"
                    placeholder="e.g., Dr. John Smith, Prof. Jane Doe"
                    value={newPaper.authors}
                    onChange={(e) => setNewPaper(prev => ({ ...prev, authors: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., Machine Learning, AI, Data Science"
                    value={newPaper.keywords}
                    onChange={(e) => setNewPaper(prev => ({ ...prev, keywords: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newPaper.category} onValueChange={(value) => setNewPaper(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="environmental-science">Environmental Science</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePaper}
                  disabled={!newPaper.title || !newPaper.abstract}
                >
                  Add Paper
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
              placeholder="Search papers by title, author, keywords..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="computer-science">Computer Science</SelectItem>
              <SelectItem value="environmental-science">Environmental Science</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getCategoryColor(paper.category)}>
                    {paper.category.replace('-', ' ')}
                  </Badge>
                  {paper.reviews.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {averageRating(paper.reviews).toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2 mb-2">
                  {paper.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm mb-3">
                  {paper.abstract}
                </CardDescription>
                <div className="flex flex-wrap gap-1 mb-3">
                  {paper.keywords.slice(0, 3).map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {paper.keywords.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{paper.keywords.length - 3}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Authors */}
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="line-clamp-1">
                      {paper.authors.slice(0, 2).join(', ')}
                      {paper.authors.length > 2 && ` +${paper.authors.length - 2}`}
                    </span>
                  </div>

                  {/* Uploaded by */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">Uploaded by:</span>
                    <span className="font-medium">{paper.uploadedByName}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{paper.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{paper.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{paper.reviews.length} reviews</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewPaper(paper)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedPaper(paper);
                        setIsReviewDialogOpen(true);
                      }}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No papers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== 'all' 
                ? 'No papers match your current filters.' 
                : 'Get started by adding your first research paper.'}
            </p>
            {!searchTerm && categoryFilter === 'all' && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Paper
              </Button>
            )}
          </div>
        )}

        {/* View Paper Dialog */}
        {selectedPaper && (
          <Dialog open={!!selectedPaper && !isReviewDialogOpen} onOpenChange={(open) => !open && setSelectedPaper(null)}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedPaper.title}</DialogTitle>
                <DialogDescription>
                  Published on {new Date(selectedPaper.publicationDate).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold">Abstract</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedPaper.abstract}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Authors</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedPaper.authors.join(', ')}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Keywords</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPaper.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Reviews ({selectedPaper.reviews.length})</Label>
                  <div className="space-y-3 mt-2">
                    {selectedPaper.reviews.length > 0 ? (
                      selectedPaper.reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {review.reviewerName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{review.reviewerName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Review Dialog */}
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Review</DialogTitle>
              <DialogDescription>
                {selectedPaper && `Review: ${selectedPaper.title}`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Rating</Label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={newReview.rating >= rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                      className="flex items-center space-x-1"
                    >
                      <Star className={`h-4 w-4 ${newReview.rating >= rating ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      <span>{rating}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment">Comment *</Label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts on this paper..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows={6}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsReviewDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddReview}
                disabled={!newReview.comment.trim()}
              >
                Submit Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResearchPapers;

