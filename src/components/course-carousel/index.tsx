
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Course } from '@/types/course';
import { normalizeCourseData } from './CourseCarouselUtils';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCarouselCard from './CourseCarouselCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselFilters
} from '@/components/ui/carousel';

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  showSkillFilters?: boolean;
  onCourseClick?: (courseId: string) => void;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  viewAllUrl?: string;
  subFilterOptions?: Record<string, string[]>;
  showTrainingCategory?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses, 
  showSkillFilters = false,
  onCourseClick,
  onViewAllClick,
  filterOptions = [],
  viewAllUrl = '/view-all',
  subFilterOptions = {},
  showTrainingCategory = false
}) => {
  // Removing duplicates from filter options
  const uniqueFilterOptions = filterOptions.length > 0 ? [...new Set(filterOptions)] : [];
  
  const [selectedFilter, setSelectedFilter] = useState(uniqueFilterOptions[0] || 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const normalizedCourses = normalizeCourseData(courses);
  const carouselId = `${title.replace(/\s+/g, '-')}-carousel`;

  const handleCardClick = (courseId: string) => {
    // Remove any clone suffix for handling clicks on duplicated courses
    const originalId = courseId.split('-clone-')[0];
    if (onCourseClick) {
      onCourseClick(originalId);
    } else {
      navigate(`/course/${originalId}`);
    }
  };

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

  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    const newBookmarked = !isBookmarked;
    
    // Handle saving to localStorage
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    
    if (newBookmarked && !savedCourses.some((course: any) => course.id === courseId)) {
      // Find the course in the normalized courses array
      const courseToSave = normalizedCourses.find(course => course.id === courseId);
      if (courseToSave) {
        const courseData = {
          ...courseToSave,
          isBookmarked: true,
          savedAt: new Date().toISOString(),
          status: 'saved'
        };
        localStorage.setItem('savedCourses', JSON.stringify([...savedCourses, courseData]));
      }
    } else if (!newBookmarked) {
      const updatedSavedCourses = savedCourses.filter((course: any) => course.id !== courseId);
      localStorage.setItem('savedCourses', JSON.stringify(updatedSavedCourses));
    }
    
    toast({
      title: newBookmarked ? "Course Saved" : "Course Removed",
      description: newBookmarked 
        ? `"${title}" has been added to your saved courses` 
        : `"${title}" has been removed from your saved courses`,
    });
  };

  // Handle share button click
  const handleShareClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    // For now, just show a toast notification - actual dialog opening is handled in the CourseCard component
    const courseToShare = normalizedCourses.find(course => course.id === courseId);
    if (courseToShare) {
      // We'll use the course title in the dialog header
      localStorage.setItem('currentCourseToShare', JSON.stringify({
        id: courseId,
        title: courseToShare.title
      }));
    }
    
    // Open share dialog through CourseCard
    const shareDialogEvent = new CustomEvent('openShareDialog', { detail: { courseId } });
    document.dispatchEvent(shareDialogEvent);
  };

  // Handle assign button click
  const handleAssignClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    // For now, just show a toast notification - actual dialog opening is handled in the CourseCard component
    const courseToAssign = normalizedCourses.find(course => course.id === courseId);
    if (courseToAssign) {
      // We'll use the course title in the dialog header
      localStorage.setItem('currentCourseToAssign', JSON.stringify({
        id: courseId,
        title: courseToAssign.title
      }));
    }
    
    // Open assign dialog through CourseCard
    const assignDialogEvent = new CustomEvent('openAssignDialog', { detail: { courseId } });
    document.dispatchEvent(assignDialogEvent);
  };

  // Get available sub-filters based on selected main filter, removing duplicates
  const availableSubFilters = subFilterOptions[selectedFilter] ? 
    [...new Set(subFilterOptions[selectedFilter])] : 
    [];

  return (
    <div className="space-y-4">
      <CourseCarouselHeader 
        title={title}
        onViewAllClick={onViewAllClick}
        viewAllUrl={viewAllUrl}
        carouselId={carouselId}
      />
      
      {/* Main filters carousel with navigation buttons - left aligned */}
      {showSkillFilters && uniqueFilterOptions.length > 0 && (
        <CarouselFilters
          filters={uniqueFilterOptions}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
          className="justify-start"
        />
      )}
      
      {/* Sub-filters carousel with navigation buttons - left aligned */}
      {showSkillFilters && availableSubFilters.length > 0 && (
        <CarouselFilters
          filters={availableSubFilters}
          selectedFilter={selectedSubFilter}
          onFilterSelect={handleSubFilterClick}
          className="justify-start"
        />
      )}

      {/* Use the Carousel component with circular navigation */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full overflow-visible"
        id={carouselId}
      >
        <CarouselContent className="-ml-2 pr-4">
          {normalizedCourses.map((course) => (
            <CarouselItem 
              key={course.id} 
              className={isMobile ? "basis-full pl-2" : "basis-1/4 pl-2 md:last:pr-[70%]"} /* Show 4 cards per row with the 5th card ~30% visible */
              onMouseEnter={() => setHoveredCourseId(course.id)}
              onMouseLeave={() => setHoveredCourseId(null)}
            >
              <CourseCarouselCard
                course={course}
                hoveredCourseId={hoveredCourseId}
                handleCardClick={handleCardClick}
                handleShareClick={handleShareClick}
                handleBookmarkToggle={handleBookmarkToggle}
                handleAssignClick={handleAssignClick}
                showTrainingCategory={showTrainingCategory}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
