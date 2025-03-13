
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Star, Filter, ChevronLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for recommended mentors
const recommendedMentors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 38,
    topics: ["Data Analysis", "Machine Learning", "Statistics"],
    bio: "I'm passionate about helping others understand complex data concepts and apply them to real-world problems.",
    experience: "15+ years of experience in data science and analytics across various industries.",
    availability: "Available for 1-hour sessions weekly",
    expectations: "Looking for dedicated mentees who are willing to complete assignments between sessions."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 27,
    topics: ["Product Management", "UX Design", "Agile Methodologies"],
    bio: "Product leader focused on building user-centric experiences and coaching the next generation of product thinkers.",
    experience: "Led product teams at several tech startups and Fortune 500 companies.",
    availability: "Available biweekly for mentoring sessions",
    expectations: "I expect mentees to come prepared with specific questions or challenges they're facing."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Executive Coach",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5.0,
    reviews: 42,
    topics: ["Leadership", "Communication", "Career Development"],
    bio: "Helping professionals navigate career transitions and develop leadership skills.",
    experience: "20+ years in HR leadership and executive coaching.",
    availability: "Flexible scheduling, typically 45-60 minute sessions",
    expectations: "Open to both short-term and long-term mentoring relationships."
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Software Engineering Lead",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.7,
    reviews: 31,
    topics: ["Software Development", "Cloud Computing", "System Architecture"],
    bio: "Engineer turned leader who loves helping others grow their technical and leadership skills.",
    experience: "15 years building and leading engineering teams at tech companies.",
    availability: "Weekly 30-minute check-ins or biweekly deep dives",
    expectations: "Looking for mentees who have clear goals and are passionate about technology."
  },
  {
    id: 5,
    name: "Aisha Patel",
    title: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 4.6,
    reviews: 24,
    topics: ["Digital Marketing", "Content Strategy", "Brand Development"],
    bio: "Marketing strategist specializing in digital transformation and content marketing.",
    experience: "12+ years in marketing across B2B and B2C sectors.",
    availability: "Monthly sessions with email support in between",
    expectations: "Prefer mentees who are currently working in marketing roles."
  },
  {
    id: 6,
    name: "Thomas Wright",
    title: "Finance Advisor",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.9,
    reviews: 36,
    topics: ["Financial Planning", "Investment Strategies", "Risk Management"],
    bio: "Experienced finance professional helping others navigate complex financial decisions.",
    experience: "18+ years in finance and investment management.",
    availability: "Available for 1-hour sessions biweekly",
    expectations: "Looking for mentees interested in growing their financial acumen."
  },
  {
    id: 7,
    name: "Sophia Kim",
    title: "UX Research Lead",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    rating: 4.8,
    reviews: 29,
    topics: ["User Research", "Usability Testing", "Design Thinking"],
    bio: "UX researcher passionate about creating user-centered digital experiences.",
    experience: "10+ years in UX research and digital product design.",
    availability: "Weekly hour-long sessions available",
    expectations: "Prefer mentees with some basic understanding of UX principles."
  },
  {
    id: 8,
    name: "David Nguyen",
    title: "AI Engineer",
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 4.9,
    reviews: 33,
    topics: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
    bio: "AI specialist helping the next generation of engineers build ethical, effective AI systems.",
    experience: "12+ years working with machine learning and AI systems.",
    availability: "Available for monthly deep dive sessions",
    expectations: "Looking for mentees with programming experience and a passion for AI."
  }
];

// Extract all unique topics from mentors for filters
const allTopics = Array.from(
  new Set(recommendedMentors.flatMap(mentor => mentor.topics))
);

const RecommendedMentorsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<typeof recommendedMentors[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredMentorId, setHoveredMentorId] = useState<number | null>(null);

  const handleTopicFilter = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const filteredMentors = recommendedMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTopics = selectedTopics.length === 0 || 
                         selectedTopics.some(topic => mentor.topics.includes(topic));
    
    return matchesSearch && matchesTopics;
  });

  const handleMentorSelect = (mentor: typeof recommendedMentors[0]) => {
    setSelectedMentor(mentor);
    setDialogOpen(true);
  };

  const handleSendRequest = () => {
    if (selectedMentor) {
      toast({
        title: "Mentorship Request Sent",
        description: `Your request has been sent to ${selectedMentor.name}.`
      });
      setDialogOpen(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recommended Mentors | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => navigate('/mentoring')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Recommended Mentors</h1>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, title, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 border rounded-lg">
            <h2 className="text-sm font-medium mb-3">Filter by Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {allTopics.map(topic => (
                <Badge 
                  key={topic} 
                  variant={selectedTopics.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTopicFilter(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMentors.map(mentor => (
            <Card 
              key={mentor.id} 
              className="overflow-hidden transition-all duration-300 cursor-pointer hover:border-primary hover:shadow-md group"
              onMouseEnter={() => setHoveredMentorId(mentor.id)}
              onMouseLeave={() => setHoveredMentorId(null)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                        target.onerror = null;
                      }}
                    />
                  </div>
                  <h3 className="font-medium text-lg">{mentor.name}</h3>
                  <p className="text-muted-foreground mb-2">{mentor.title}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mentor.topics.map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                  <Button 
                    className={`mt-4 w-full transition-all duration-300 ${
                      hoveredMentorId === mentor.id ? 'opacity-100' : 'opacity-0'
                    }`} 
                    size="sm"
                    onClick={() => handleMentorSelect(mentor)}
                  >
                    <Send className="h-3 w-3 mr-1" /> Request Mentorship
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredMentors.length === 0 && (
          <div className="p-8 text-center border rounded-lg">
            <p className="text-lg font-medium">No mentors found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Mentor Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mentor Details</DialogTitle>
            <DialogDescription>
              Review mentor information before sending a request
            </DialogDescription>
          </DialogHeader>
          
          {selectedMentor && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={selectedMentor.image} 
                    alt={selectedMentor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{selectedMentor.name}</h3>
                  <p className="text-muted-foreground">{selectedMentor.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-sm">{selectedMentor.rating}</span>
                    <span className="text-xs text-muted-foreground">({selectedMentor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold">Bio</h4>
                  <p className="text-sm">{selectedMentor.bio}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold">Experience</h4>
                  <p className="text-sm">{selectedMentor.experience}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold">Availability</h4>
                  <p className="text-sm">{selectedMentor.availability}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold">Expectations</h4>
                  <p className="text-sm">{selectedMentor.expectations}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold">Topics</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedMentor.topics.map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendRequest}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecommendedMentorsPage;
