
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Info, Volume2, VolumeX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  videoUrl?: string;
  isVideo?: boolean;
}

interface BannerCarouselProps {
  banners: Banner[];
  className?: string;
  smallSize?: boolean;
}

// Real banner images with proper URLs
const defaultBanners: Banner[] = [
  {
    id: 1,
    title: "Leadership Excellence Program",
    description: "Develop your leadership skills with our comprehensive training program designed for modern leaders.",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "/courses/leadership"
  },
  {
    id: 2,
    title: "Data Science Masterclass",
    description: "Master data science fundamentals and advanced techniques in this intensive workshop series.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "/courses/data-science"
  },
  {
    id: 3,
    title: "Digital Transformation Workshop",
    description: "Learn how to lead digital transformation initiatives and drive innovation in your organization.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    link: "/courses/digital-transformation"
  }
];

const BannerCarousel: React.FC<BannerCarouselProps> = ({ 
  banners = defaultBanners, 
  className = '',
  smallSize = true
}) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Toggle video mute state
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Handle mouse enter/leave for video
  useEffect(() => {
    const banner = banners[currentBanner];
    
    if (isHovered && banner?.isVideo && videoRef.current) {
      // Play video on hover
      videoRef.current.play()
        .then(() => setIsVideoPlaying(true))
        .catch(err => console.log("Video play prevented:", err));
    } else if (!isHovered && isVideoPlaying) {
      // Pause video on mouse leave
      if (videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  }, [isHovered, currentBanner, banners, isVideoPlaying]);

  // Auto-advance carousel every 5 seconds unless hovered
  useEffect(() => {
    if (banners.length <= 1 || isHovered) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    // Setup auto-advance
    intervalRef.current = setInterval(() => {
      nextBanner();
    }, 5000);
    
    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentBanner, banners.length, isHovered]);

  // If no banners or banners is empty, return null
  if (!banners || banners.length === 0) {
    return null;
  }

  const banner = banners[currentBanner];

  // Check if the current banner is a video
  const isCurrentVideo = banner.isVideo && banner.videoUrl;

  return (
    <Card 
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 relative">
        <div 
          className="relative group"
          style={{ height: smallSize ? '180px' : '320px' }}
        >
          {/* Video background (if isVideo and videoUrl exist) */}
          {isCurrentVideo && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={banner.videoUrl}
              loop
              muted={isMuted}
              playsInline
            />
          )}
          
          {/* Image background (if not video or as fallback) */}
          {(!isCurrentVideo || !isVideoPlaying) && (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ 
                backgroundImage: `url(${banner.imageUrl})`,
                filter: 'brightness(0.7)'
              }}
            ></div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          
          {/* Banner content */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 text-white">
            <div className="max-w-2xl">
              <Badge className="mb-2 bg-primary text-white">
                {isCurrentVideo ? 'Watch Now' : 'Featured'}
              </Badge>
              <h3 className={`font-bold mb-2 text-white ${smallSize ? 'text-xl' : 'text-3xl md:text-4xl'}`}>{banner.title}</h3>
              <p className={`${smallSize ? 'text-sm' : 'text-base md:text-lg'} max-w-xl opacity-90 mb-6 text-white`}>{banner.description}</p>
              
              {banner.link && (
                <Button 
                  variant="secondary" 
                  size={smallSize ? "sm" : "default"}
                  className="hover:bg-white"
                  asChild
                >
                  <a href={banner.link}>
                    <Info className="h-4 w-4 mr-2" />
                    Learn More
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          {/* Video controls */}
          {isCurrentVideo && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 left-4 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 z-10 backdrop-blur-sm"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-white" />
              ) : (
                <Volume2 className="h-5 w-5 text-white" />
              )}
            </Button>
          )}
          
          {/* Navigation controls */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {/* Dots indicator */}
              <div className="flex items-center gap-1.5 mr-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentBanner 
                        ? 'w-6 bg-white' 
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Arrow controls */}
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                onClick={prevBanner}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                onClick={nextBanner}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BannerCarousel;
