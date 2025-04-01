
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel/carousel-components';
import { Skill } from './types';
import SkillCard from './SkillCard';
import EmptySkillsState from './EmptySkillsState';

interface SkillCarouselProps {
  skills: Skill[];
  onSkillClick: (skillId: number) => void;
  emptyMessage?: string;
}

const SkillCarousel: React.FC<SkillCarouselProps> = ({ 
  skills, 
  onSkillClick,
  emptyMessage = "No skills found"
}) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="border rounded-lg p-8">
        <EmptySkillsState message={emptyMessage} />
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full relative"
    >
      <CarouselContent className="-ml-4">
        {skills.map((skill) => (
          <CarouselItem key={skill.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <SkillCard skill={skill} onSkillClick={onSkillClick} />
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
    </Carousel>
  );
};

export default SkillCarousel;
