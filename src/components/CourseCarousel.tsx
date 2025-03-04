
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
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
  "Leadership", "Management", "Communication", "Project Management", 
  "Data Analysis", "Marketing", "Programming", "Design", "Finance",
  "Problem Solving", "Critical Thinking", "Teamwork"
];

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses,
  showSkillFilters = false 
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
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
        <div className="flex flex-wrap gap-2 mb-4">
          {mockSkills.map((skill) => (
            <Button
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              size="sm"
              className="rounded-full text-sm px-4"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Button>
          ))}
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
