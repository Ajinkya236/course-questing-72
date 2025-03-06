
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight, MessageCircle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Mentor {
  id: number;
  name: string;
  title: string;
  topics: string[];
  rating: number;
  reviewCount: number;
  availability: string;
  imageUrl: string;
}

interface MentorCarouselProps {
  mentors: Mentor[];
}

const MentorCarousel: React.FC<MentorCarouselProps> = ({ mentors }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {mentors.map((mentor) => (
          <CarouselItem key={mentor.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden h-full transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                      <img 
                        src={mentor.imageUrl} 
                        alt={mentor.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                      <div className="flex items-center gap-1 text-amber-500 mb-2">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                        <span className="text-xs text-muted-foreground">({mentor.reviewCount} reviews)</span>
                      </div>
                      <div>
                        <Badge 
                          variant={mentor.availability.includes('Available') ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {mentor.availability}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Topics</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {mentor.topics.map(topic => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button size="sm" className="gap-1">
                    <MessageCircle className="h-4 w-4" />
                    Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
};

export default MentorCarousel;
