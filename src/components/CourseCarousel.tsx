
import React, { useState, useRef, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import CourseCard from './CourseCard';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  isBookmarked?: boolean;
  trainingCategory?: string;
  previewUrl?: string;
  isHot?: boolean;
  isNew?: boolean;
}

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  showSkillFilters?: boolean;
  showBadges?: boolean;
  onCourseClick?: (courseId: string) => void;
  onViewAllClick?: () => void;
  filterOptions?: string[];
}

// Default skills for filters - in a real app, these would come from an API
const defaultSkills = [
  "All Skills", "Leadership", "Management", "Communication", "Project Management", 
  "Data Analysis", "Marketing", "Programming", "Design", "Finance",
  "Problem Solving", "Critical Thinking", "Teamwork", "Innovation", "Strategy"
];

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses = [],
  showSkillFilters = false,
  showBadges = false,
  onCourseClick,
  onViewAllClick,
  filterOptions
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["All Skills"]);
  const [currentPage, setCurrentPage] = useState(0);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Use provided filter options or default to skills
  const skillFilters = filterOptions || defaultSkills;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const toggleSkill = (skill: string) => {
    if (skill === "All Skills" || skill === "All Categories") {
      // If "All Skills" is selected, clear other selections
      setSelectedSkills([skill]);
      return;
    }

    // If clicking a specific skill
    let newSelectedSkills = [...selectedSkills];
    
    // Remove "All Skills" if it's in the selection
    if (newSelectedSkills.includes("All Skills") || newSelectedSkills.includes("All Categories")) {
      newSelectedSkills = newSelectedSkills.filter(s => s !== "All Skills" && s !== "All Categories");
    }

    // Toggle the clicked skill
    if (newSelectedSkills.includes(skill)) {
      newSelectedSkills = newSelectedSkills.filter(s => s !== skill);
      // If no skills selected, revert to "All Skills"
      if (newSelectedSkills.length === 0) {
        newSelectedSkills = ["All Skills"];
      }
    } else {
      newSelectedSkills.push(skill);
    }

    setSelectedSkills(newSelectedSkills);
  };

  // Scroll skills container
  const scrollSkills = (direction: 'left' | 'right') => {
    if (skillsContainerRef.current) {
      const scrollAmount = 200;
      const container = skillsContainerRef.current;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Scroll carousel when the header navigation buttons are clicked
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!api) return;
    
    if (direction === 'left') {
      api.scrollPrev();
    } else {
      api.scrollNext();
    }
  };

  // Filter courses based on selected skills
  const filteredCourses = selectedSkills.includes("All Skills") || selectedSkills.includes("All Categories")
    ? courses
    : courses.filter(course => {
        // Check if the course matches any of the selected skills
        // First check category, then check trainingCategory if it exists
        return selectedSkills.includes(course.category) || 
               (course.trainingCategory && selectedSkills.includes(course.trainingCategory));
      });

  // Handle course click
  const handleCourseClick = (courseId: string) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    }
  };

  // Handle view all click
  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    }
  };

  // If there are no courses, create some mock data
  useEffect(() => {
    if (courses.length === 0) {
      console.log("No courses provided, using mock data would be appropriate here");
    }
  }, [courses]);

  // Calculate the total pages based on the number of items and items per page
  const totalPages = Math.ceil(filteredCourses.length / 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full bg-muted hover:bg-muted/80"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground mr-2">
            {current + 1} of {Math.max(1, count)}
          </div>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => scrollCarousel('left')}
            disabled={current === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => scrollCarousel('right')}
            disabled={current === count - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="link" 
            className="gap-1 text-primary"
            onClick={handleViewAllClick}
          >
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showSkillFilters && (
        <div className="relative">
          {/* Scroll left button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 rounded-full z-10 bg-background shadow-md"
            onClick={() => scrollSkills('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Skills bubbles container */}
          <div 
            ref={skillsContainerRef}
            className="flex overflow-x-auto py-2 px-2 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-2 whitespace-nowrap">
              {skillFilters.map((skill) => (
                <Button
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-sm px-4 transition-all ${
                    selectedSkills.includes(skill) ? "bg-primary text-white" : "bg-white"
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Scroll right button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 rounded-full z-10 bg-background shadow-md"
            onClick={() => scrollSkills('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CarouselItem key={course.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4 relative group">
                {/* Add a subtle indicator for items at the end of the carousel to improve information scent */}
                <div 
                  className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-muted/20 pointer-events-none transition-opacity ${
                    course.id === filteredCourses[filteredCourses.length - 1].id ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>
                <div onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                  <CourseCard 
                    {...course} 
                    previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" 
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            // Mock courses if no real data is provided
            Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={`mock-${index}`} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4 relative group">
                {/* Indicator for the last item */}
                {index === 7 && (
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-muted/20 pointer-events-none"></div>
                )}
                <div className="cursor-pointer">
                  <CourseCard 
                    id={`mock-${index}`}
                    title={`Sample Course ${index + 1}`}
                    description="This is a sample course description. It provides an overview of what you will learn."
                    imageUrl={`https://source.unsplash.com/random/300x200?learning&sig=${index}`}
                    category="Sample Category"
                    duration="2h 30m"
                    rating={4.5}
                    isNew={index < 3}
                    isHot={index >= 5}
                    previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
                  />
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-2" />
        <CarouselNext className="hidden sm:flex right-2" />
      </Carousel>
      
      {/* Pagination indicators */}
      {count > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-2 h-2 rounded-full p-0 ${
                index === current ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCarousel;
