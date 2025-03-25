
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell, Menu, GraduationCap, Users, Sun, Moon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { useTheme } from '@/components/ThemeProvider';
import NotificationsPanel from '../NotificationsPanel';
import ProfileMenu from './navigation/ProfileMenu';
import DiscoverHoverCard from './navigation/DiscoverHoverCard';
import SearchInput from './navigation/SearchInput';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, you would handle actual logout logic here
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-primary">Jio Learning</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Home
            </Link>
            
            <DiscoverHoverCard isActive={isActive('/discover')} />
            
            <Link 
              to="/my-learning" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/my-learning') ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              My Learning
            </Link>

            <Link 
              to="/mentoring" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/mentoring') ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              <span className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Mentoring
              </span>
            </Link>

            <Link 
              to="/my-team" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/my-team') ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                My Team
              </span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <SearchInput 
            className="relative hidden sm:flex items-center"
            placeholder="Search courses..."
          />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <NotificationsPanel onClose={() => setNotificationsOpen(false)} />
            </PopoverContent>
          </Popover>
          
          <ProfileMenu 
            imgSrc="https://i.pravatar.cc/150?img=22"
            fallback="JD"
            onLogout={handleLogout}
          />
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
