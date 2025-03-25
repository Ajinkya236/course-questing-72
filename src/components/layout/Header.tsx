import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './navigation/Logo';
import NavigationLink from './navigation/NavigationLink';
import ProfileMenu from './navigation/ProfileMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'My Learning', path: '/my-learning' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationLinks.map((link) => (
              <NavigationLink
                key={link.path}
                to={link.path}
                label={link.name}
                activeClassName="bg-primary/10 text-primary font-medium"
                inactiveClassName="text-foreground/80 hover:text-primary hover:bg-primary/5"
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full transition-all duration-200">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full transition-all duration-200">
              <Bell className="h-5 w-5" />
            </Button>
            
            <ProfileMenu 
              imgSrc="https://i.pravatar.cc/150?img=32"
              fallback="JD"
              className="transition-all duration-200 ring-2 ring-transparent hover:ring-primary cursor-pointer"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg rounded-b-2xl animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navigationLinks.map((link) => (
                <NavigationLink
                  key={link.path}
                  to={link.path}
                  label={link.name}
                  activeClassName="bg-primary/10 text-primary font-medium"
                  inactiveClassName="text-foreground/80 hover:text-primary hover:bg-primary/5"
                />
              ))}
            </nav>
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full ml-auto">
                <User className="h-5 w-5 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Import these at the top of the file to fix the missing imports
import { User } from 'lucide-react';

export default Header;
