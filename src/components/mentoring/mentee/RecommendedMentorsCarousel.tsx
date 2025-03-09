
import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

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

const RecommendedMentorsCarousel: React.FC<RecommendedMentorsCarouselProps> = ({ 
  mentors, 
  selectedTopics = [] 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [topicsCarouselApi, setTopicsCarouselApi] = useState<any>(null);
  const isMobile = useIsMobile();
  
  // Extract all unique topics from mentors for filters
  const allTopics = selectedTopics.length > 0 
    ? selectedTopics 
    : Array.from(new Set(mentors.flatMap(mentor => mentor.topics)));
  
  // Add "All" as the first filter option
  const filterTopics = ["All", ...allTopics];
  
  // Reset active filter index if selected topics change
  useEffect(() => {
    setActiveFilterIndex(0);
  }, [selectedTopics]);
  
  // Filter mentors based on selected topic
  const filteredMentors = filterTopics[activeFilterIndex] === "All" 
    ? mentors 
    : mentors.filter(mentor => mentor.topics.includes(filterTopics[activeFilterIndex]));
  
  const handleViewAll = () => {
    navigate('/mentoring/recommended-mentors');
  };

  const handlePrevious = () => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  };

  const handleNext = () => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  };

  const handleTopicsPrevious = () => {
    if (topicsCarouselApi) {
      topicsCarouselApi.scrollPrev();
    }
  };

  const handleTopicsNext = () => {
    if (topicsCarouselApi) {
      topicsCarouselApi.scrollNext();
    }
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
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="link" size="sm" className="gap-1" onClick={handleViewAll}>
            <Search className="h-4 w-4" />
            View All
          </Button>
        </div>
      </div>
      
      {/* Topics filter carousel */}
      <div className="mb-4 relative group/filters">
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setTopicsCarouselApi}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {filterTopics.map((topic, index) => (
              <CarouselItem key={topic} className="pl-2 basis-auto">
                <Badge 
                  variant={activeFilterIndex === index ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setActiveFilterIndex(index)}
                >
                  {topic}
                </Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full z-10 opacity-0 group-hover/filters:opacity-100 transition-opacity"
            onClick={handleTopicsPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full z-10 opacity-0 group-hover/filters:opacity-100 transition-opacity"
            onClick={handleTopicsNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Carousel>
      </div>
      
      {/* Mentors carousel */}
      <div className="relative group/mentors">
        <Carousel 
          setApi={setCarouselApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {filteredMentors.map(mentor => (
              <CarouselItem 
                key={mentor.id} 
                style={{ 
                  flex: `0 0 ${getCardPercentage()}%`, 
                  maxWidth: `${getCardPercentage()}%`
                }}
              >
                <Card 
                  className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
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
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="opacity-0 group-hover/mentors:opacity-100 transition-opacity duration-300 -left-3" />
          <CarouselNext className="opacity-0 group-hover/mentors:opacity-100 transition-opacity duration-300 -right-3" />
        </Carousel>
      </div>
    </div>
  );
};

export default RecommendedMentorsCarousel;
