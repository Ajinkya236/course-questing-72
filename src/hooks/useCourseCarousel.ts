
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';

interface UseCourseCarouselProps {
  courses: Course[];
  filterOptions?: string[];
  subFilterOptions?: Record<string, string[]>;
  viewAllUrl?: string;
  onViewAllClick?: () => void;
  onCourseClick?: (courseId: string) => void;
}

export const useCourseCarousel = ({
  courses,
  filterOptions = [],
  subFilterOptions = {},
  viewAllUrl = '/view-all',
  onViewAllClick,
  onCourseClick
}: UseCourseCarouselProps) => {
  // Remove duplicates from filter options
  const uniqueFilterOptions = filterOptions.length > 0 ? [...new Set(filterOptions)] : [];
  
  const [selectedFilter, setSelectedFilter] = useState(uniqueFilterOptions[0] || 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    // Reset sub-filter when main filter changes
    if (subFilterOptions && subFilterOptions[filter]) {
      // Get the first unique sub-filter
      const uniqueSubFilters = [...new Set(subFilterOptions[filter])];
      setSelectedSubFilter(uniqueSubFilters[0]);
    } else {
      setSelectedSubFilter('All Sub-Academies');
    }
  };

  const handleSubFilterClick = (subFilter: string) => {
    setSelectedSubFilter(subFilter);
  };

  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      navigate(viewAllUrl);
    }
  };

  const handleCardClick = (courseId: string) => {
    // Remove any clone suffix for handling clicks on duplicated courses
    const originalId = courseId.split('-clone-')[0];
    if (onCourseClick) {
      onCourseClick(originalId);
    } else {
      navigate(`/course/${originalId}`);
    }
  };

  // Get available sub-filters based on selected main filter, removing duplicates
  const availableSubFilters = subFilterOptions[selectedFilter] ? 
    [...new Set(subFilterOptions[selectedFilter])] : 
    [];

  return {
    uniqueFilterOptions,
    selectedFilter,
    selectedSubFilter,
    isHovered,
    availableSubFilters,
    setIsHovered,
    handleFilterSelect,
    handleSubFilterClick,
    handleViewAll,
    handleCardClick
  };
};
