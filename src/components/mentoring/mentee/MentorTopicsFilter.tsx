
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MentorTopicsFilterProps {
  topics: string[];
  activeIndex: number;
  onSelectTopic: (index: number) => void;
  carouselRef: React.RefObject<any>;
  onPrevious: () => void;
  onNext: () => void;
}

const MentorTopicsFilter: React.FC<MentorTopicsFilterProps> = ({
  topics,
  activeIndex,
  onSelectTopic,
  carouselRef,
  onPrevious,
  onNext
}) => {
  return (
    <div className="mb-4 relative">
      <Carousel 
        ref={carouselRef}
        className="w-full"
        opts={{
          align: "start",
          loop: true
        }}
      >
        <CarouselContent className="-ml-2">
          {topics.map((topic, index) => (
            <CarouselItem key={topic} className="pl-2 basis-auto">
              <Badge 
                variant={activeIndex === index ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => onSelectTopic(index)}
              >
                {topic}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10"
          onClick={onNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Carousel>
    </div>
  );
};

export default MentorTopicsFilter;
