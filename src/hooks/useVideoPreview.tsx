
import { useState, useRef, useEffect } from 'react';

interface UseVideoPreviewProps {
  previewUrl?: string;
}

export const useVideoPreview = ({ previewUrl }: UseVideoPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter with improved error handling
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (!previewUrl || !videoRef.current) return;
    
    // Add a small delay before playing to avoid unwanted previews on quick mouse movements
    previewTimeout.current = setTimeout(() => {
      if (videoRef.current) {
        try {
          videoRef.current.src = previewUrl;
          videoRef.current.load();
          
          // Set up onloadeddata event handler
          videoRef.current.onloadeddata = () => {
            setIsVideoLoaded(true);
            if (videoRef.current) {
              videoRef.current.play()
                .catch(err => console.log("Preview autoplay prevented:", err));
            }
          };
          
          // Handle error case for video loading
          videoRef.current.onerror = (e) => {
            console.error("Error loading video:", e);
            setIsVideoLoaded(false);
          };
        } catch (error) {
          console.error("Error setting up video:", error);
        }
      }
    }, 200); // Reduced delay for better responsiveness
  };

  // Handle mouse leave with improved cleanup
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideoLoaded(false);
    
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.src = '';
        videoRef.current.onloadeddata = null;
        videoRef.current.onerror = null;
      } catch (error) {
        console.error("Error cleaning up video:", error);
      }
    }
    
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
  };

  // Toggle mute state with improved error handling
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      try {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
      }
      
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.src = '';
          videoRef.current.onloadeddata = null;
          videoRef.current.onerror = null;
        } catch (error) {
          console.error("Error in cleanup:", error);
        }
      }
    };
  }, []);

  return {
    isHovered,
    isMuted,
    isVideoLoaded,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMute
  };
};
