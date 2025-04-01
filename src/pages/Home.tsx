
import React from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';

// Mock banner data for BannerCarousel
const mockBanners = [
  {
    id: 1,
    title: "New Leadership Course Available",
    description: "Enhance your leadership skills with our new comprehensive course",
    imageUrl: "/placeholder.svg",
    link: "/discover"
  },
  {
    id: 2,
    title: "Technical Certification Paths",
    description: "Advance your career with industry recognized certifications",
    imageUrl: "/placeholder.svg",
    link: "/discover"
  }
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Banner Carousel */}
        <BannerCarousel banners={mockBanners} />
        
        {/* Placeholder content */}
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Learning Platform</h2>
          <p className="text-muted-foreground">
            Your courses and learning content will appear here once loaded. 
            Please check back in a moment.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
