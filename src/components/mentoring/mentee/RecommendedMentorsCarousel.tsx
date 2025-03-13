
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { CarouselFilters } from '@/components/ui/carousel/carousel-filters';
import MentorCard from './MentorCard';
import MentorDetailsDialog from './MentorDetailsDialog';
import { sampleMentors } from './sampleMentors';
import { Mentor, RecommendedMentorsCarouselProps } from './types';

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
  
  const allTopics = selectedTopics.length > 0 
    ? selectedTopics 
    : Array.from(new Set(mentors.flatMap(mentor => mentor.topics)));
  
  const filterTopics = ["All", ...allTopics];
  
  const filteredMentors = activeFilter === "All" 
    ? mentors 
    : mentors.filter(mentor => mentor.topics.includes(activeFilter));
  
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
      
      <div className="mb-4 relative">
        <CarouselFilters
          filters={filterTopics}
          selectedFilter={activeFilter}
          onFilterSelect={setActiveFilter}
          className="justify-start"
        />
      </div>
      
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
                  className="mentor-carousel-item"
                >
                  <MentorCard
                    mentor={mentor}
                    onSelectMentor={handleMentorSelect}
                    isHovered={hoveredMentorId === mentor.id}
                    onMouseEnter={() => setHoveredMentorId(mentor.id)}
                    onMouseLeave={() => setHoveredMentorId(null)}
                  />
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
          
          <CarouselPrevious className="z-10 group-hover/mentors:opacity-100" />
          <CarouselNext className="z-10 group-hover/mentors:opacity-100" />
        </Carousel>
      </div>

      <MentorDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mentor={selectedMentor}
        onSendRequest={handleSendRequest}
      />
    </div>
  );
};

export default RecommendedMentorsCarousel;
