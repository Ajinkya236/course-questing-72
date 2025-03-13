
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Star, Send } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MentorDiscoveryProps {
  selectedTopics?: string[];
}

interface Mentor {
  id: number;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  topics: string[];
  bio?: string;
  experience?: string;
  availability?: string;
  expectations?: string;
}

const MentorDiscovery: React.FC<MentorDiscoveryProps> = ({ selectedTopics = [] }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const recommendedMentors: Mentor[] = [
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
    }
  ];

  // Filter and sort mentors whenever search, filter or sort criteria change
  useEffect(() => {
    // Filter mentors based on search term and filters
    const filtered = recommendedMentors.filter(mentor => {
      // Search term filter
      if (searchTerm && !mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !mentor.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      
      // Expertise filter
      if (expertiseFilter !== "all") {
        const matchesExpertise = mentor.topics.some(topic => {
          switch (expertiseFilter) {
            case "technical":
              return ["Data Analysis", "Machine Learning", "Software Development", "Cloud Computing", "System Architecture"].includes(topic);
            case "leadership":
              return ["Leadership", "Communication", "Team Building"].includes(topic);
            case "career":
              return ["Career Development", "Professional Growth"].includes(topic);
            default:
              return true;
          }
        });
        
        if (!matchesExpertise) return false;
      }
      
      return true;
    });

    // Sort mentors based on sortBy
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "newest":
          // For this example, we're just using the id as a proxy for "newest"
          return a.id - b.id;
        default:
          // For relevance, prefer mentors with matching topics
          if (selectedTopics.length > 0) {
            const aMatchCount = a.topics.filter(topic => selectedTopics.includes(topic)).length;
            const bMatchCount = b.topics.filter(topic => selectedTopics.includes(topic)).length;
            return bMatchCount - aMatchCount;
          }
          return 0;
      }
    });

    setFilteredMentors(sorted);
  }, [searchTerm, expertiseFilter, sortBy, selectedTopics]);

  const handleMentorSelect = (mentor: Mentor) => {
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

  // Render mentor cards
  const renderMentorCards = () => {
    if (filteredMentors.length === 0) {
      return (
        <div className="py-8 text-center border rounded-lg bg-muted/30">
          <p className="text-muted-foreground">
            No mentors found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMentors.map(mentor => (
          <Card key={mentor.id} className="overflow-hidden transition-shadow group">
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
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {mentor.topics.map(topic => (
                    <span key={topic} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleMentorSelect(mentor)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
                    onClick={() => handleMentorSelect(mentor)}
                  >
                    <Send className="h-3 w-3" />
                    Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Search and filter section */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search mentors..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              defaultValue="all" 
              value={expertiseFilter}
              onValueChange={setExpertiseFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise Areas</SelectItem>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="career">Career Development</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              defaultValue="relevance" 
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mentors grid display */}
      {renderMentorCards()}

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
    </div>
  );
};

export default MentorDiscovery;
