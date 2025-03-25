
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { useMediaQuery } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import NavigationLink from './navigation/NavigationLink';
import NotificationButton from './navigation/NotificationButton';
import ProfileMenu from './navigation/ProfileMenu';
import SearchInput from './navigation/SearchInput';
import MobileMenu from './navigation/MobileMenu';
import NotificationsPanel from '@/components/NotificationsPanel';

const NavbarEnhanced = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery();

  const handleLogout = () => {
    // Implement your logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-1 font-semibold">
            <BrainCircuit className="h-5 w-5 text-primary" /> 
            <span className="hidden md:inline">Learning Portal</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <NavigationLink to="/" label="Home" icon={Home} />
            <NavigationLink to="/discover" label="Discover" icon={BookOpen} />
            <NavigationLink to="/my-learning" label="My Learning" icon={Trophy} />
            <NavigationLink to="/mentoring" label="Mentoring" icon={Users} />
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <SearchInput 
            className="hidden md:block w-48 lg:w-64" 
            onFocus={() => navigate('/search')}
          />
          
          <div className="flex items-center gap-1">
            <NotificationButton 
              count={4} 
              onClick={() => setShowNotifications(!showNotifications)} 
            />
            
            <ThemeToggle />
            
            <ProfileMenu 
              imgSrc="https://github.com/shadcn.png" 
              fallback="SC" 
              onLogout={handleLogout}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <MobileMenu 
          onClose={() => setShowMobileMenu(false)}
          onSearchFocus={() => navigate('/search')}
        />
      )}
      
      {/* Notifications panel */}
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </header>
  );
};

// Import these at the top of the file to fix the missing imports
import { Home, BookOpen, Trophy, Users } from 'lucide-react';

export default NavbarEnhanced;
