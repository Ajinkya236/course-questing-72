
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

export const useRecommendedMentors = (mentors: Mentor[], selectedTopics: string[] = []) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const carouselRef = useRef<{ scrollPrev: () => void; scrollNext: () => void } | null>(null);
  const topicsCarouselRef = useRef<{ scrollPrev: () => void; scrollNext: () => void } | null>(null);
  
  // Extract all unique topics from mentors for filters
  const allTopics = selectedTopics.length > 0 
    ? selectedTopics 
    : Array.from(new Set(mentors.flatMap(mentor => mentor.topics)));
  
  // Add "All" as the first filter option
  const filterTopics = ["All", ...allTopics];
  
  // Filter mentors based on selected topic
  const filteredMentors = filterTopics[activeFilterIndex] === "All" 
    ? mentors 
    : mentors.filter(mentor => mentor.topics.includes(filterTopics[activeFilterIndex]));
  
  const handleViewAll = () => {
    navigate('/recommended-mentors');
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollPrev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollNext();
    }
  };

  const handleTopicsPrevious = () => {
    if (topicsCarouselRef.current) {
      topicsCarouselRef.current.scrollPrev();
    }
  };

  const handleTopicsNext = () => {
    if (topicsCarouselRef.current) {
      topicsCarouselRef.current.scrollNext();
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

  return {
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
  };
};
