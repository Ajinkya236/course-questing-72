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
import { supabase } from "@/integrations/supabase/client";

const RecommendedMentorsCarousel: React.FC<RecommendedMentorsCarouselProps> = ({ 
  mentors = [], 
  selectedTopics = [] 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState('All');
  const isMobile = useIsMobile();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredMentorId, setHoveredMentorId] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [loadedMentors, setLoadedMentors] = useState<Mentor[]>(mentors.length > 0 ? mentors : sampleMentors);
  
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const { data, error } = await supabase
          .from('mentors')
          .select('*');
        
        if (error) {
          console.error('Error fetching mentors:', error);
          return;
        }
        
        if (data && data.length > 0) {
          const mentorsData: Mentor[] = data.map(item => ({
            id: parseInt(item.id.replace(/-/g, '').substring(0, 8), 16),
            name: item.name,
            title: item.title,
            image: item.image,
            rating: Number(item.rating),
            reviews: item.reviews,
            topics: item.topics,
            bio: item.bio,
            experience: item.experience,
            availability: item.availability,
            expectations: item.expectations
          }));
          setLoadedMentors(mentorsData);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    if (mentors.length === 0) {
      fetchMentors();
    }
  }, [mentors]);
  
  const allTopics = selectedTopics.length > 0 
    ? selectedTopics 
    : Array.from(new Set(loadedMentors.flatMap(mentor => mentor.topics)));
  
  const filterTopics = ["All", ...allTopics];
  
  const filteredMentors = activeFilter === "All" 
    ? loadedMentors 
    : loadedMentors.filter(mentor => mentor.topics.includes(activeFilter));
  
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
          setApi={setCarouselApi}
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
          
          <CarouselPrevious className="z-10 opacity-0 group-hover/mentors:opacity-100 transition-opacity duration-300" />
          <CarouselNext className="z-10 opacity-0 group-hover/mentors:opacity-100 transition-opacity duration-300" />
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
