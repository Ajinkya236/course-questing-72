
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ArrowRight, Play, Share2, Bookmark, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext,
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
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Function to ensure we have exactly 12 courses for the carousel
  const normalizeCoursesCount = (coursesArray: Course[]) => {
    if (coursesArray.length === 0) return [];
    
    // If less than 12 courses, duplicate to reach 12
    if (coursesArray.length < 12) {
      const repeatedCourses = [];
      let i = 0;
      while (repeatedCourses.length < 12) {
        repeatedCourses.push({
          ...coursesArray[i % coursesArray.length],
          id: `${coursesArray[i % coursesArray.length].id}-clone-${Math.floor(i / coursesArray.length)}`
        });
        i++;
      }
      return repeatedCourses.slice(0, 12);
    }
    
    // If more than 12 courses, take the first 12
    if (coursesArray.length > 12) {
      return coursesArray.slice(0, 12);
    }
    
    return coursesArray;
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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
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
    toast({
      title: "Share Course",
      description: "Sharing options are now available for this course",
    });
  };

  // Handle assign button click
  const handleAssignClick = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    toast({
      title: "Assign Course",
      description: "You can now assign this course to team members",
    });
  };

  // Get available sub-filters based on selected main filter, removing duplicates
  const availableSubFilters = subFilterOptions[selectedFilter] ? 
    [...new Set(subFilterOptions[selectedFilter])] : 
    [];

  // Create a fallback for courses that don't have all required properties
  const normalizedCourses = normalizeCoursesCount(courses.map(course => ({
    ...course,
    level: course.level || course.skillLevel || 'All Levels',
    instructor: course.instructor || {
      name: 'Instructor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  })));

  return (
    <div className="space-y-4">
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <ChevronRight 
            className="h-4 w-4 cursor-pointer ml-1" 
            onClick={onViewAllClick || (() => navigate(viewAllUrl))}
          />
          {isHovered && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-1 p-0" 
              onClick={onViewAllClick || (() => navigate(viewAllUrl))}
            >
              View All
            </Button>
          )}
        </div>
        
        {/* Navigation controls for carousel - displayed next to title */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => document.querySelector(`#${title.replace(/\s+/g, '-')}-carousel .embla__prev`)?.dispatchEvent(new Event('click'))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => document.querySelector(`#${title.replace(/\s+/g, '-')}-carousel .embla__next`)?.dispatchEvent(new Event('click'))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
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
        className="w-full"
        id={`${title.replace(/\s+/g, '-')}-carousel`}
      >
        <CarouselContent>
          {normalizedCourses.map((course) => (
            <CarouselItem 
              key={course.id} 
              className={isMobile ? "basis-full" : "basis-1/4"}
              onMouseEnter={() => setHoveredCourseId(course.id)}
              onMouseLeave={() => setHoveredCourseId(null)}
            >
              <Card
                className="overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-colors group mr-4"
                onClick={() => handleCardClick(course.id)}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                  />
                  {course.enrollmentStatus && (
                    <div className="absolute top-2 right-2">
                      <Badge className={getStatusColor(course.enrollmentStatus)} variant="secondary">
                        {course.enrollmentStatus}
                      </Badge>
                    </div>
                  )}
                  {/* Only show training category if showTrainingCategory is true and trainingCategory exists */}
                  {showTrainingCategory && course.trainingCategory && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-black/60 text-white border-none">
                        {course.trainingCategory}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-base line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                  {course.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{course.progress}%</span>
                      </div>
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Course actions that appear on hover */}
                  <div className={`pt-2 ${hoveredCourseId === course.id ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                    <div className="flex gap-1 mb-1">
                      <Button 
                        variant="default" 
                        className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] h-8 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(course.id);
                        }}
                      >
                        <Play className="h-3 w-3 mr-1" /> Watch
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={(e) => handleShareClick(e, course.id)}
                        aria-label="Share"
                        className="h-8 w-8"
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={(e) => handleBookmarkToggle(e, course.id, course.title, !!course.isBookmarked)}
                        aria-label="Bookmark"
                        className="h-8 w-8"
                      >
                        <Bookmark className={`h-3 w-3 ${course.isBookmarked ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full h-8 text-xs"
                      onClick={(e) => handleAssignClick(e, course.id)}
                    >
                      <UserPlus className="h-3 w-3 mr-1" /> Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Removed navigation buttons from here as they're now at the top */}
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
