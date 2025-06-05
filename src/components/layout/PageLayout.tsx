
import React from 'react';
import NavbarEnhanced from './NavbarEnhanced';
import SidebarNav from './SidebarNav';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <SidebarNav />
      
      <div className="flex flex-col flex-1 ml-16">
        <NavbarEnhanced />
        
        <main className={`flex-1 ${className}`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
