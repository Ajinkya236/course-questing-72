
import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const carouselRef = useRef(null);
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
    navigate('/recommended-mentors');
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current as any;
      carousel.scrollPrev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current as any;
      carousel.scrollNext();
    }
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
      <div className="mb-4">
        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            loop: true
          }}
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
          <CarouselPrevious className="left-0 bg-background" />
          <CarouselNext className="right-0 bg-background" />
        </Carousel>
      </div>
      
      {/* Mentors carousel */}
      <Carousel 
        ref={carouselRef}
        className="w-full"
        opts={{
          align: "start"
        }}
      >
        <CarouselContent>
          {filteredMentors.map(mentor => (
            <CarouselItem key={mentor.id} className={`
              basis-full 
              ${isMobile ? "" : "sm:basis-1/2 md:basis-1/3 lg:basis-1/4"}
            `}>
              <Card className="overflow-hidden">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default RecommendedMentorsCarousel;
