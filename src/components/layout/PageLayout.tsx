
import React from 'react';
import TopNavigation from './TopNavigation';
import { Toaster } from "@/components/ui/toaster";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <TopNavigation />
      
      <div className="flex-1 py-8 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-10">
          {children}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default PageLayout;
