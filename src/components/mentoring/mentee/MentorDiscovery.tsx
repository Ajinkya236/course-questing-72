
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, Filter, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import types we need
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

// Sample mentors data
const sampleMentors: Mentor[] = [
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
  }
];

// Component for mentor discovery
const MentorDiscovery: React.FC<{selectedTopics?: string[]}> = ({ selectedTopics = [] }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('Any');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredMentorId, setHoveredMentorId] = useState<number | null>(null);
  
  // All unique topics from mentors
  const allTopics = Array.from(
    new Set(sampleMentors.flatMap(mentor => mentor.topics))
  );
  
  // Filter mentors based on search, topic, and rating
  const filteredMentors = sampleMentors.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTopic = topicFilter === 'All' || mentor.topics.includes(topicFilter);
    
    const matchesRating = 
      ratingFilter === 'Any' ||
      (ratingFilter === '4+' && mentor.rating >= 4.0) ||
      (ratingFilter === '4.5+' && mentor.rating >= 4.5) ||
      (ratingFilter === '5' && mentor.rating === 5.0);
    
    return matchesSearch && matchesTopic && matchesRating;
  });
  
  // Handle opening the details dialog
  const handleMentorSelect = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setDialogOpen(true);
  };
  
  // Handle sending a mentorship request
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
    <div className="space-y-8">
      {/* Search and Filters */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Find a Mentor</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or skill..."
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
          <div className="flex flex-wrap gap-3 mb-6 p-4 border rounded-lg">
            <div className="min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Topic</label>
              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Topics</SelectItem>
                  {allTopics.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any Rating</SelectItem>
                  <SelectItem value="4+">4.0 and above</SelectItem>
                  <SelectItem value="4.5+">4.5 and above</SelectItem>
                  <SelectItem value="5">5.0 only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
        {filteredMentors.length > 0 ? (
          filteredMentors.map(mentor => (
            <Card 
              key={mentor.id} 
              className="overflow-hidden transition-all duration-300 cursor-pointer h-[340px] group hover:border-primary hover:shadow-md"
              onMouseEnter={() => setHoveredMentorId(mentor.id)}
              onMouseLeave={() => setHoveredMentorId(null)}
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
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
                  <h3 className="font-medium">{mentor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{mentor.title}</p>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-sm">{mentor.rating}</span>
                    <span className="text-xs text-muted-foreground">({mentor.reviews})</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {mentor.topics.slice(0, 3).map(topic => (
                      <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                    {mentor.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{mentor.topics.length - 3}</Badge>
                    )}
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  onClick={() => handleMentorSelect(mentor)}
                  className="w-full mt-auto transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="h-3 w-3" /> 
                  Request Mentoring
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full p-8 text-center border rounded-lg">
            <p className="text-lg font-medium mb-2">No mentors found</p>
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
    </div>
  );
};

export default MentorDiscovery;
