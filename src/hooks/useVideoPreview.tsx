
import { useState, useRef, useEffect } from 'react';

interface UseVideoPreviewProps {
  previewUrl?: string;
}

export const useVideoPreview = ({ previewUrl }: UseVideoPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter with delay to prevent unwanted preview triggering
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && previewUrl) {
      // Add a small delay before playing to avoid unwanted previews on quick mouse movements
      previewTimeout.current = setTimeout(() => {
        videoRef.current?.play().catch(err => console.log("Preview autoplay prevented:", err));
      }, 800);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
  };

  // Toggle mute state
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
      }
    };
  }, []);

  return {
    isHovered,
    isMuted,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMute
  };
};
