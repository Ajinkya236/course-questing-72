
import React from 'react';
import { Helmet } from 'react-helmet';
import BannerCarousel from '@/components/BannerCarousel';
import { mockBanners } from './data/homepageData';
import ContinueLearningSection from './sections/ContinueLearningSection';
import AssignedCoursesSection from './sections/AssignedCoursesSection';
import SkillsActionablesSection from './sections/SkillsActionablesSection';
import RecommendedCoursesSection from './sections/RecommendedCoursesSection';
import InterestBasedCoursesSection from './sections/InterestBasedCoursesSection';
import RoleBasedCoursesSection from './sections/RoleBasedCoursesSection';
import TrendingCoursesSection from './sections/TrendingCoursesSection';
import PopularCoursesSection from './sections/PopularCoursesSection';
import DomainCatalog from '@/components/homepage/DomainCatalog';
import AboutPlatformSection from './sections/AboutPlatformSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Banner Carousel */}
        <BannerCarousel banners={mockBanners} />
        
        {/* Continue Learning Carousel */}
        <ContinueLearningSection />
        
        {/* Assigned Courses Carousel */}
        <AssignedCoursesSection />
        
        {/* Skills, Actionables and Rewards Section */}
        <SkillsActionablesSection />
        
        {/* Chosen For You Carousel */}
        <RecommendedCoursesSection />
        
        {/* Based on Your Interest Carousel */}
        <InterestBasedCoursesSection />
        
        {/* For Your Role Carousel */}
        <RoleBasedCoursesSection />
        
        {/* Trending Now Carousel */}
        <TrendingCoursesSection />
        
        {/* Popular with Similar Users Carousel */}
        <PopularCoursesSection />
        
        {/* Domains Catalog Section */}
        <DomainCatalog />
        
        {/* About the Platform Section */}
        <AboutPlatformSection />
      </div>
    </>
  );
};

export default HomePage;
