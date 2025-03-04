
import React, { useState, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
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
}

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  showSkillFilters?: boolean;
}

// Mock skills for filters - in a real app, these would come from an API
const mockSkills = [
  "All Skills", "Leadership", "Management", "Communication", "Project Management", 
  "Data Analysis", "Marketing", "Programming", "Design", "Finance",
  "Problem Solving", "Critical Thinking", "Teamwork"
];

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses,
  showSkillFilters = false 
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const skillsContainerRef = useRef<HTMLDivElement>(null);

  const toggleSkill = (skill: string) => {
    if (skill === "All Skills") {
      setSelectedSkills([]);
      return;
    }
    
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const scrollSkills = (direction: 'left' | 'right') => {
    if (skillsContainerRef.current) {
      const scrollAmount = 200;
      const container = skillsContainerRef.current;
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  // Filter courses based on selected skills if any are selected
  const filteredCourses = selectedSkills.length > 0
    ? courses.filter(course => selectedSkills.includes(course.category))
    : courses;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Button variant="link" className="gap-1 text-primary">
          View All <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {showSkillFilters && (
        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md bg-white"
            onClick={() => scrollSkills('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div 
            ref={skillsContainerRef} 
            className="flex overflow-x-auto gap-2 py-2 px-10 scrollbar-hide scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <Button
              key="all-skills"
              variant={selectedSkills.length === 0 ? "default" : "outline"}
              size="sm"
              className="rounded-full text-sm px-4 whitespace-nowrap"
              onClick={() => toggleSkill("All Skills")}
            >
              All Skills
            </Button>
            {mockSkills.slice(1).map((skill) => (
              <Button
                key={skill}
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                size="sm"
                className="rounded-full text-sm px-4 whitespace-nowrap"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md bg-white"
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
              <CourseCard {...course} />
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
