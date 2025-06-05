
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  isVideo?: boolean;
  link: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Real banner images
  const realBanners: Banner[] = [
    {
      id: 1,
      title: "Master Advanced Leadership Skills",
      description: "Transform your leadership capabilities with our comprehensive executive training program",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80",
      link: "/discover"
    },
    {
      id: 2,
      title: "Data Science & Analytics Certification",
      description: "Become a data expert with hands-on training in Python, R, and machine learning",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80",
      link: "/discover"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      description: "Learn cutting-edge digital marketing strategies and tools to drive business growth",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80",
      link: "/discover"
    },
    {
      id: 4,
      title: "Project Management Excellence",
      description: "Master agile methodologies and become a certified project management professional",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80",
      isVideo: true,
      link: "/course/project-management-101"
    }
  ];

  const bannersToShow = banners.length > 0 ? banners : realBanners;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannersToShow.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, bannersToShow.length]);

  const handleBannerClick = (banner: Banner) => {
    navigate(banner.link);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {bannersToShow.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div 
                className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => handleBannerClick(banner)}
              >
                {banner.isVideo && banner.videoUrl ? (
                  <div className="relative w-full h-full">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                    >
                      <source src={banner.videoUrl} type="video/mp4" />
                    </video>
                    
                    {/* Video controls */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 lg:p-12">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-archivo-black text-white mb-4 leading-tight">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                      {banner.description}
                    </p>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBannerClick(banner);
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {bannersToShow.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      {/* Play/Pause control */}
      <div className="absolute bottom-4 left-4">
        <Button
          variant="secondary"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default BannerCarousel;
