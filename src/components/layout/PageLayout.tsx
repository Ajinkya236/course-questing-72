
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
      
      <div className="flex-1 py-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default PageLayout;
