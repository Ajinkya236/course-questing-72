
import React, { useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';
import { useRecommendedMentors } from '@/hooks/useRecommendedMentors';
import MentorCard from './MentorCard';
import MentorTopicsFilter from './MentorTopicsFilter';
import MentorCarouselHeader from './MentorCarouselHeader';

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
  const isMobile = useIsMobile();
  const {
    filteredMentors,
    filterTopics,
    activeFilterIndex,
    setActiveFilterIndex,
    carouselRef,
    topicsCarouselRef,
    handleViewAll,
    handlePrevious,
    handleNext,
    handleTopicsPrevious,
    handleTopicsNext,
    handleMentorSelect
  } = useRecommendedMentors(mentors, selectedTopics);
  
  // Reset active filter index if selected topics change
  useEffect(() => {
    setActiveFilterIndex(0);
  }, [selectedTopics, setActiveFilterIndex]);
  
  return (
    <div className="space-y-6">
      <MentorCarouselHeader 
        onPrevious={handlePrevious}
        onNext={handleNext}
        onViewAll={handleViewAll}
      />
      
      {/* Topics filter carousel */}
      <MentorTopicsFilter 
        topics={filterTopics}
        activeIndex={activeFilterIndex}
        onSelectTopic={setActiveFilterIndex}
        carouselRef={topicsCarouselRef}
        onPrevious={handleTopicsPrevious}
        onNext={handleTopicsNext}
      />
      
      {/* Mentors carousel */}
      <Carousel 
        ref={carouselRef as React.RefObject<any>}
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
              <MentorCard 
                mentor={mentor} 
                onSelect={handleMentorSelect} 
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default RecommendedMentorsCarousel;
