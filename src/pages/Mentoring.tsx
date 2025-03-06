import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  UserCog, 
  Search, 
  Users, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Plus,
  Briefcase,
  GraduationCap,
  BookOpen,
  FilePlus
} from 'lucide-react';
import MenteePreferences from '@/components/mentoring/mentee/MenteePreferences';
import MenteeJourney from '@/components/mentoring/MenteeJourney';
import MentorJourney from '@/components/mentoring/MentorJourney';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import BannerCarousel from '@/components/BannerCarousel';

const Mentoring = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mentee');
  const [showPreferencesDialog, setShowPreferencesDialog] = useState(false);
  const [showMentorPreferencesDialog, setShowMentorPreferencesDialog] = useState(false);
  
  // Mock mentor preferences data
  const [mentorPreferences, setMentorPreferences] = useState({
    bio: "Senior technology professional with 15+ years of experience in software development and leadership roles.",
    topics: ["Software Development", "Leadership", "Career Growth"],
    idealMentee: "Ambitious professionals looking to grow their technical and leadership skills.",
    philosophy: "I believe in practical, hands-on learning and focusing on real-world applications."
  });
  
  // Mock HR and user guide banner data - this is now a shared banner for both mentee and mentor tabs
  const banners = [
    {
      id: 1,
      title: "HR Update: New Mentoring Guidelines",
      description: "Learn about the updated mentoring program policies and best practices.",
      imageUrl: "/lovable-uploads/a0e176e9-79b3-47b4-8e35-d6e6d19e40fc.png"
    },
    {
      id: 2,
      title: "Mentoring Excellence Workshop",
      description: "Join our upcoming workshop to enhance your mentoring skills - Thursday at 2 PM.",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
    },
    {
      id: 3,
      title: "Mentoring Resources Hub",
      description: "Access our updated knowledge base with templates and guides for effective mentoring.",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    }
  ];

  // For adding/removing topics
  const [newTopic, setNewTopic] = useState('');

  const handleAddTopic = () => {
    if (newTopic.trim() && !mentorPreferences.topics.includes(newTopic.trim())) {
      setMentorPreferences({
        ...mentorPreferences,
        topics: [...mentorPreferences.topics, newTopic.trim()]
      });
      setNewTopic('');
    }
  };

  const handleRemoveTopic = (topic) => {
    setMentorPreferences({
      ...mentorPreferences,
      topics: mentorPreferences.topics.filter(t => t !== topic)
    });
  };

  const handleMentorPreferencesSave = () => {
    setShowMentorPreferencesDialog(false);
    toast({
      title: "Preferences Saved",
      description: "Your mentor preferences have been updated successfully."
    });
  };

  const handleDiscoverRedirect = () => {
    navigate('/discover');
  };

  // Mock recommended mentors data
  const recommendedMentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior Data Scientist",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.9,
      reviews: 38,
      topics: ["Data Analysis", "Machine Learning", "Statistics"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      reviews: 27,
      topics: ["Product Management", "UX Design", "Agile Methodologies"]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "Executive Coach",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5.0,
      reviews: 42,
      topics: ["Leadership", "Communication", "Career Development"]
    },
    {
      id: 4,
      name: "James Wilson",
      title: "Software Engineering Lead",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      rating: 4.7,
      reviews: 31,
      topics: ["Software Development", "Cloud Computing", "System Architecture"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Mentoring | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Mentoring</h1>
        
        <Tabs defaultValue="mentee" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="mentee">Mentee Journey</TabsTrigger>
            <TabsTrigger value="mentor">Mentor Journey</TabsTrigger>
          </TabsList>
          
          {/* Shared banner - moved outside of tab content to be shown for both tabs */}
          <Card className="mb-6 overflow-hidden">
            <BannerCarousel banners={banners} />
          </Card>
          
          <TabsContent value="mentee">
            {/* Banner removed and moved above tabs */}
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to Your Mentee Journey</h2>
                  <p className="text-muted-foreground">Set your preferences, connect with mentors, and track your progress</p>
                </div>
                <Dialog open={showPreferencesDialog} onOpenChange={setShowPreferencesDialog}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 md:mt-0 gap-2">
                      <UserCog className="h-4 w-4" />
                      Set Preferences
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Mentee Preferences</DialogTitle>
                      <DialogDescription>
                        Configure your mentoring preferences to help us match you with the right mentors
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <MenteePreferences inDialog={true} onSave={() => setShowPreferencesDialog(false)} />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
            {/* Recommended Mentors - keep this section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recommended Mentors</h2>
                <Button variant="link" size="sm" className="gap-1">
                  <Search className="h-4 w-4" />
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {recommendedMentors.map(mentor => (
                  <Card key={mentor.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                          <img 
                            src={mentor.image} 
                            alt={mentor.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <h3 className="font-medium">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                          <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {mentor.topics.slice(0, 2).map(topic => (
                            <span key={topic} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                          {mentor.topics.length > 2 && (
                            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                              +{mentor.topics.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Mentee Journey */}
            <MenteeJourney />
          </TabsContent>
          
          <TabsContent value="mentor">
            <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Welcome to Your Mentor Journey</h2>
                  <p className="text-muted-foreground">Set up your mentor profile, manage requests, and guide your mentees to success</p>
                </div>
                <Dialog open={showMentorPreferencesDialog} onOpenChange={setShowMentorPreferencesDialog}>
                  <DialogTrigger asChild>
                    <Button className="mt-4 md:mt-0 gap-2">
                      <UserCog className="h-4 w-4" />
                      Set Preferences
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Mentor Preferences</DialogTitle>
                      <DialogDescription>
                        Configure your mentoring profile to attract the right mentees
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="bio">
                          Professional Bio
                        </label>
                        <Textarea
                          id="bio"
                          placeholder="Share your professional background and expertise..."
                          value={mentorPreferences.bio}
                          onChange={(e) => setMentorPreferences({...mentorPreferences, bio: e.target.value})}
                          className="resize-none"
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Mentoring Topics
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {mentorPreferences.topics.map(topic => (
                            <Badge key={topic} variant="secondary" className="px-2 py-1 text-xs flex items-center gap-1">
                              {topic}
                              <X 
                                className="h-3.5 w-3.5 ml-1 cursor-pointer" 
                                onClick={() => handleRemoveTopic(topic)}
                              />
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a topic..."
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTopic();
                              }
                            }}
                          />
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleAddTopic}
                            disabled={!newTopic.trim()}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="ideal-mentee">
                          Ideal Mentee
                        </label>
                        <Textarea
                          id="ideal-mentee"
                          placeholder="Describe your ideal mentee..."
                          value={mentorPreferences.idealMentee}
                          onChange={(e) => setMentorPreferences({...mentorPreferences, idealMentee: e.target.value})}
                          className="resize-none"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="philosophy">
                          Mentoring Philosophy
                        </label>
                        <Textarea
                          id="philosophy"
                          placeholder="Share your approach to mentoring..."
                          value={mentorPreferences.philosophy}
                          onChange={(e) => setMentorPreferences({...mentorPreferences, philosophy: e.target.value})}
                          className="resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowMentorPreferencesDialog(false)}>Cancel</Button>
                      <Button onClick={handleMentorPreferencesSave}>Save Preferences</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
            {/* Mentor Journey */}
            <MentorJourney />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Mentoring;
