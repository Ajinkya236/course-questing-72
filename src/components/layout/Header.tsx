
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, Bell, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
            <NavLink 
              to="/" 
              className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    className="fill-primary"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    className="stroke-primary"
                    strokeWidth="2"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    className="stroke-primary"
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-foreground">EduSphere</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
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
            <Avatar className="h-8 w-8 transition-all duration-200 ring-2 ring-transparent hover:ring-primary">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
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
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
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

export default Header;
