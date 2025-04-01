
import React from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';

// Mock banner data for BannerCarousel
const mockBanners = [
  {
    id: 1,
    title: "Welcome to Learning Management System",
    description: "Explore courses and enhance your skills",
    imageUrl: "/placeholder.svg",
    link: "/discover"
  },
  {
    id: 2,
    title: "Start Your Learning Journey",
    description: "Discover new courses tailored for you",
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
        
        {/* Main Content */}
        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Learning Platform</h2>
          <p className="text-muted-foreground">
            Your personalized learning journey begins here. Explore courses, develop skills, and track your progress.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
