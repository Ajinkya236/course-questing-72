
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ title, courses }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {courses.map((course) => (
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
