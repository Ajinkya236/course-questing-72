
import React from 'react';
import { CardContent } from '@/components/ui/card';

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
  // Banner component is now empty as per requirements to remove banners across the platform
  return null;
};

export default BannerCarousel;
