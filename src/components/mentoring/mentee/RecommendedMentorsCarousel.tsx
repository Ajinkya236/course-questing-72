
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Sparkles } from 'lucide-react';
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
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
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
          setLoadedMentors([...mentorsData, ...extendedMentors]);
        } else {
          // If no mentors in database, use our extended sample list
          setLoadedMentors([...sampleMentors, ...extendedMentors]);
        }
      } catch (error) {
        console.error('Error:', error);
        // Fallback to extended samples if error
        setLoadedMentors([...sampleMentors, ...extendedMentors]);
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
  
  // Extended mentors data to add more variety to the carousel
  const extendedMentors: Mentor[] = [
    {
      id: 101,
      name: "Dr. Lisa Thompson",
      title: "AI Ethics Specialist",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 4.9,
      reviews: 47,
      topics: ["AI Ethics", "Machine Learning", "Data Governance"],
      bio: "Specializing in ethical AI implementation and policy development.",
      experience: "10+ years at leading AI research institutes and tech companies.",
      availability: "Weekly sessions available",
      expectations: "Looking for mentees interested in the ethical dimensions of AI."
    },
    {
      id: 102,
      name: "Robert Chen",
      title: "Engineering Director",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.8,
      reviews: 39,
      topics: ["Engineering Leadership", "System Design", "Team Building"],
      bio: "Experienced engineering leader passionate about developing technical talent.",
      experience: "15+ years leading engineering teams in fintech and e-commerce.",
      availability: "Biweekly mentoring slots",
      expectations: "Seeking motivated engineers looking to grow into leadership roles."
    },
    {
      id: 103,
      name: "Maya Williams",
      title: "UX Research Lead",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 5.0,
      reviews: 28,
      topics: ["User Research", "Design Thinking", "Usability Testing"],
      bio: "Helping designers and product managers understand their users better.",
      experience: "12 years in UX research across multiple industries.",
      availability: "Flexible scheduling",
      expectations: "Prefer mentees with specific research questions or challenges."
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Recommended Mentors</h2>
          <div className="hidden md:flex items-center bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            <Sparkles className="h-3 w-3 mr-1" />
            Top rated
          </div>
        </div>
        <Button variant="link" size="sm" className="gap-1" onClick={handleViewAll}>
          <Search className="h-4 w-4" />
          View All
        </Button>
      </div>
      
      <div className="mb-4 relative">
        <CarouselFilters
          filters={filterTopics}
          selectedFilter={activeFilter}
          onFilterSelect={setActiveFilter}
          className="justify-start"
        />
      </div>
      
      <div 
        className="relative group/mentors"
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
      >
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
          
          <div className={`absolute inset-y-0 left-0 flex items-center transition-opacity duration-300 ${isCarouselHovered ? 'opacity-100' : 'opacity-0'}`}>
            <CarouselPrevious className="z-10 h-10 w-10 rounded-full border-none shadow-md hover:bg-primary hover:text-white transition-all -ml-5" />
          </div>
          
          <div className={`absolute inset-y-0 right-0 flex items-center transition-opacity duration-300 ${isCarouselHovered ? 'opacity-100' : 'opacity-0'}`}>
            <CarouselNext className="z-10 h-10 w-10 rounded-full border-none shadow-md hover:bg-primary hover:text-white transition-all -mr-5" />
          </div>
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
