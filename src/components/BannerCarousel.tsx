
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
  videoUrl?: string; // Add video URL for video banners
  isVideo?: boolean; // Flag to identify video banners
}

interface BannerCarouselProps {
  banners: Banner[];
  className?: string;
  smallSize?: boolean;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ 
  banners, 
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
                {isCurrentVideo ? 'Watch Now' : 'HR Update'}
              </Badge>
              <h3 className={`font-bold mb-2 ${smallSize ? 'text-xl' : 'text-3xl md:text-4xl'}`}>{banner.title}</h3>
              <p className={`${smallSize ? 'text-sm' : 'text-base md:text-lg'} max-w-xl opacity-90 mb-6`}>{banner.description}</p>
              
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
