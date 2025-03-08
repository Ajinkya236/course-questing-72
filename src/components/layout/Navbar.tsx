
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronDown,
  BookOpen,
  Compass,
  Award,
  TrendingUp,
  UserPlus,
  Star,
  Users,
  User,
  LogOut,
  HelpCircle,
  GraduationCap,
  Sun,
  Moon
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";
import NotificationsPanel from '../NotificationsPanel';
import { useTheme } from '@/components/ThemeProvider';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/view-all/${category.toLowerCase().replace(/\s+/g, '-')}`);
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
            
            <HoverCard openDelay={100} closeDelay={200}>
              <HoverCardTrigger asChild>
                <Link 
                  to="/discover" 
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                    isActive('/discover') ? 'text-primary' : 'text-foreground/60'
                  }`}
                >
                  Discover <ChevronDown className="h-4 w-4" />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick('Top Picks for You')}
                  >
                    <div className="font-medium flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      Top Picks
                    </div>
                    <p className="text-xs text-muted-foreground">Curated courses just for you</p>
                  </div>
                  
                  <div 
                    className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick('Based on Your Interests')}
                  >
                    <div className="font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Your Interests
                    </div>
                    <p className="text-xs text-muted-foreground">Matches your followed skills</p>
                  </div>
                  
                  <div 
                    className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick('Role-based Skills')}
                  >
                    <div className="font-medium flex items-center gap-2">
                      <Compass className="h-4 w-4 text-primary" />
                      Role-based
                    </div>
                    <p className="text-xs text-muted-foreground">Skills for your current role</p>
                  </div>
                  
                  <div 
                    className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick('Popular with Similar Learners')}
                  >
                    <div className="font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Similar Learners
                    </div>
                    <p className="text-xs text-muted-foreground">Popular with peers like you</p>
                  </div>
                  
                  <div 
                    className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick('Assigned Courses')}
                  >
                    <div className="font-medium flex items-center gap-2">
                      <UserPlus className="h-4 w-4 text-primary" />
                      Assigned
                    </div>
                    <p className="text-xs text-muted-foreground">Mandatory and recommended</p>
                  </div>
                  
                  <div 
                    className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => handleCategoryClick('Trending')}
                  >
                    <div className="font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Trending
                    </div>
                    <p className="text-xs text-muted-foreground">What's popular right now</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => navigate('/discover')}
                  >
                    View all categories
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
            
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
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search courses..."
              className="rounded-full bg-secondary px-9 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?img=22" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>View My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/faq')} className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
