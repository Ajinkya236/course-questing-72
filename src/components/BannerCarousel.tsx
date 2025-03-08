
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  className?: string;
  smallSize?: boolean;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ 
  banners, 
  className = '',
  smallSize = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!banners || banners.length === 0) {
    return null;
  }
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div 
        className="relative bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${currentBanner.imageUrl})`,
          height: smallSize ? '180px' : '250px'
        }}
      >
        <CardContent className="flex items-center h-full">
          <div className="text-white z-10 p-4 md:p-6 max-w-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-2">{currentBanner.title}</h3>
            <p className="text-sm md:text-base opacity-90">{currentBanner.description}</p>
            
            {currentBanner.link && (
              <Button 
                variant="outline" 
                className="mt-4 text-white border-white hover:bg-white/20"
              >
                Learn More
              </Button>
            )}
          </div>
        </CardContent>
        
        {banners.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-black/20"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-black/20"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {banners.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;
