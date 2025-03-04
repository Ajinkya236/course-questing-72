
import React, { useState, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
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
}

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  showSkillFilters?: boolean;
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
  courses,
  showSkillFilters = false,
  onCourseClick,
  onViewAllClick,
  filterOptions
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["All Skills"]);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  // Use provided filter options or default to skills
  const skillFilters = filterOptions || defaultSkills;

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => scrollSkills('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full"
            onClick={() => scrollSkills('right')}
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
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {filteredCourses.map((course) => (
            <CarouselItem key={course.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div onClick={() => handleCourseClick(course.id)} className="cursor-pointer">
                <CourseCard 
                  {...course} 
                  previewUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
