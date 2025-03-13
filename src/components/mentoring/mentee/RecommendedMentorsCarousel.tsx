
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Search, Star, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { CarouselFilters } from '@/components/ui/carousel/carousel-filters';

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

interface RecommendedMentorsCarouselProps {
  mentors: Mentor[];
  selectedTopics?: string[];
}

// Sample mentors data if none provided
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

const RecommendedMentorsCarousel: React.FC<RecommendedMentorsCarouselProps> = ({ 
  mentors = sampleMentors, 
  selectedTopics = [] 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState('All');
  const isMobile = useIsMobile();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredMentorId, setHoveredMentorId] = useState<number | null>(null);
  
  // Extract all unique topics from mentors for filters
  const allTopics = selectedTopics.length > 0 
    ? selectedTopics 
    : Array.from(new Set(mentors.flatMap(mentor => mentor.topics)));
  
  // Add "All" as the first filter option
  const filterTopics = ["All", ...allTopics];
  
  // Filter mentors based on selected topic
  const filteredMentors = activeFilter === "All" 
    ? mentors 
    : mentors.filter(mentor => mentor.topics.includes(activeFilter));
  
  // Initialize active filter with the first selected topic if available
  useEffect(() => {
    if (selectedTopics && selectedTopics.length > 0) {
      setActiveFilter(selectedTopics[0]);
    }
  }, [selectedTopics]);

  const handleViewAll = () => {
    navigate('/mentoring/recommended-mentors');
  };

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
  
  // Calculate card width to show proper number of items and partial next item
  const getCardPercentage = () => {
    if (isMobile) return 85; // Full width on mobile with a hint of the next card
    return 23; // Shows partial hint of the next mentor card
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Recommended Mentors</h2>
        <div className="flex items-center gap-2">
          <Button variant="link" size="sm" className="gap-1" onClick={handleViewAll}>
            <Search className="h-4 w-4" />
            View All
          </Button>
        </div>
      </div>
      
      {/* Topics filter carousel */}
      <div className="mb-4 relative">
        <CarouselFilters
          filters={filterTopics}
          selectedFilter={activeFilter}
          onFilterSelect={setActiveFilter}
          className="justify-start"
        />
      </div>
      
      {/* Mentors carousel */}
      <div className="relative group/mentors">
        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
          }}
        >
          <CarouselContent>
            {filteredMentors.length > 0 ? (
              filteredMentors.map(mentor => (
                <CarouselItem 
                  key={mentor.id} 
                  className="mentor-carousel-item" // Use the custom class for proper sizing
                >
                  <Card 
                    className="overflow-hidden transition-all duration-300 cursor-pointer h-[300px] group hover:border-primary hover:shadow-md"
                    onMouseEnter={() => setHoveredMentorId(mentor.id)}
                    onMouseLeave={() => setHoveredMentorId(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
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
                          {mentor.topics.slice(0, 2).map(topic => (
                            <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                          ))}
                          {mentor.topics.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{mentor.topics.length - 2}</Badge>
                          )}
                        </div>
                        
                        <Button 
                          size="sm" 
                          onClick={() => handleMentorSelect(mentor)}
                          className={`w-full mt-3 transition-all duration-300 flex items-center justify-center gap-2 ${
                            hoveredMentorId === mentor.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Send className="h-3 w-3" /> 
                          Request Mentoring
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="w-full">
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground">No mentors found for this topic.</p>
                </Card>
              </CarouselItem>
            )}
          </CarouselContent>
          
          <CarouselPrevious className="z-10 opacity-70 hover:opacity-100 -left-3" />
          <CarouselNext className="z-10 opacity-70 hover:opacity-100 -right-3" />
        </Carousel>
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

export default RecommendedMentorsCarousel;
