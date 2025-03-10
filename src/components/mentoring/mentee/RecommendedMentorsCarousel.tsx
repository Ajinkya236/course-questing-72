
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for recommended mentors
const recommendedMentors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Data Scientist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviews: 38,
    topics: ["Data Analysis", "Machine Learning", "Statistics"]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 27,
    topics: ["Product Management", "UX Design", "Agile Methodologies"]
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Executive Coach",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5.0,
    reviews: 42,
    topics: ["Leadership", "Communication", "Career Development"]
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Software Engineering Lead",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 4.7,
    reviews: 31,
    topics: ["Software Development", "Cloud Computing", "System Architecture"]
  }
];

const RecommendedMentorsCarousel: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const scrollToCard = (index: number) => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.mentor-card');
      if (cards[index]) {
        containerRef.current.scrollTo({
          left: cards[index].getBoundingClientRect().left + containerRef.current.scrollLeft - containerRef.current.getBoundingClientRect().left,
          behavior: 'smooth'
        });
        setCurrentIndex(index);
      }
    }
  };

  const handlePrevClick = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToCard(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = Math.min(recommendedMentors.length - 1, currentIndex + 1);
    scrollToCard(newIndex);
  };

  const handleViewAllClick = () => {
    navigate('/mentoring/recommended-mentors');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recommended Mentors</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleNextClick}
            disabled={currentIndex === recommendedMentors.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleViewAllClick}
          >
            View All
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory', scrollPaddingLeft: '16px' }}
      >
        {recommendedMentors.map((mentor, index) => (
          <Card 
            key={mentor.id}
            className={`mentor-card flex-shrink-0 w-[280px] scroll-snap-align-start ${index < recommendedMentors.length - 1 ? 'mr-4' : ''}`}
            style={{ 
              scrollSnapAlign: 'start',
              transform: index === currentIndex ? 'scale(1)' : 'scale(0.95)',
              transition: 'transform 0.3s ease',
              // Add padding to show a partial view of the next card
              position: 'relative',
              right: index === currentIndex ? '-20px' : '0'
            }}
          >
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="font-medium text-lg">{mentor.name}</h3>
                <p className="text-muted-foreground mb-2">{mentor.title}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-sm text-muted-foreground">({mentor.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {mentor.topics.slice(0, 2).map(topic => (
                    <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                  ))}
                  {mentor.topics.length > 2 && (
                    <Badge variant="secondary" className="text-xs">+{mentor.topics.length - 2} more</Badge>
                  )}
                </div>
                <Button className="mt-4 w-full" size="sm">Request Mentorship</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default RecommendedMentorsCarousel;
