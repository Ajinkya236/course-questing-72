
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
  },
  {
    id: 5,
    name: "Aisha Patel",
    title: "Marketing Director",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    rating: 4.6,
    reviews: 24,
    topics: ["Digital Marketing", "Content Strategy", "Brand Development"]
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
  
  const handleViewAll = () => {
    navigate('/mentoring/recommended-mentors');
  };

  const handleMentorSelect = (mentorId: number) => {
    toast({
      title: "Mentor Selected",
      description: "You've selected a mentor. You can now view their full profile."
    });
    // Would navigate to mentor profile in a real app
    // navigate(`/mentoring/mentor/${mentorId}`);
  };
  
  // Calculate card width to show proper number of items and partial next item
  const getCardPercentage = () => {
    if (isMobile) return 100; // Full width on mobile
    return 23; // Shows 4 mentors + 20% of the 5th one
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
          }}
        >
          <CarouselContent>
            {filteredMentors.length > 0 ? (
              filteredMentors.map(mentor => (
                <CarouselItem 
                  key={mentor.id} 
                  style={{ 
                    flex: `0 0 ${getCardPercentage()}%`, 
                    maxWidth: `${getCardPercentage()}%`
                  }}
                >
                  <Card 
                    className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer h-[300px]"
                    onClick={() => handleMentorSelect(mentor.id)}
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
                        
                        <div className="flex flex-wrap gap-1 justify-center">
                          {mentor.topics.slice(0, 2).map(topic => (
                            <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                          ))}
                          {mentor.topics.length > 2 && (
                            <Badge variant="outline" className="text-xs">+{mentor.topics.length - 2}</Badge>
                          )}
                        </div>
                        
                        <Button size="sm" className="w-full mt-3">Request Mentoring</Button>
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
          
          <CarouselPrevious className="opacity-0 group-hover/mentors:opacity-100 transition-opacity duration-300 -left-3" />
          <CarouselNext className="opacity-0 group-hover/mentors:opacity-100 transition-opacity duration-300 -right-3" />
        </Carousel>
      </div>
    </div>
  );
};

export default RecommendedMentorsCarousel;
