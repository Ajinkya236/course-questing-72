
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Bell, Menu, X, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationsPanel from '@/components/NotificationsPanel';
import MainNav from './MainNav';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';

const NavbarEnhanced = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Improved detection of skills pages using regex
  const isSkillsListPage = location.pathname === '/skills';
  const isSkillDetailPage = /^\/skills\/\d+$/.test(location.pathname);
  const isSkillAssessmentPage = /^\/skills\/\d+\/assessment$/.test(location.pathname);
  
  // Only show skills search on the main skills list page or skill detail page, not on assessment page
  const showSkillsSearch = (isSkillsListPage || isSkillDetailPage) && !isSkillAssessmentPage;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-1 font-semibold">
            <BrainCircuit className="h-5 w-5 text-primary" /> 
            <span className="hidden md:inline">Learning Portal</span>
          </Link>
          
          <MainNav />
        </div>
        
        <div className="flex items-center gap-2">
          <SearchBar 
            isSkillsPage={showSkillsSearch} 
            onFocus={() => navigate('/search')} 
          />
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                4
              </Badge>
            </Button>
            
            <ThemeToggle />
            
            <UserMenu />
            
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
      
      <MobileMenu 
        isOpen={showMobileMenu}
        isSkillsPage={showSkillsSearch}
        onClose={() => setShowMobileMenu(false)}
        navigateToSearch={() => navigate('/search')}
      />
      
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </header>
  );
};

export default NavbarEnhanced;
