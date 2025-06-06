
import React from 'react';
import TopNavigation from './TopNavigation';
import FloatingSidebar from './FloatingSidebar';
import MobileFooterNav from './MobileFooterNav';
import { Toaster } from "@/components/ui/toaster";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavigation />
      
      {/* Hide floating sidebar on mobile */}
      <div className="hidden md:block">
        <FloatingSidebar />
      </div>
      
      <div className="flex-1 py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-auto ml-0 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto content-spacing">
          {children}
        </div>
        <Toaster />
      </div>
      
      {/* Mobile footer navigation */}
      <MobileFooterNav />
    </div>
  );
};

export default PageLayout;
