
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  User,
  Search,
  Menu,
  X,
  Home,
  BookOpen,
  Compass,
  Trophy,
  CheckSquare,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import SidebarNavigation from './SidebarNavigation';
import { useMediaQuery } from '@/hooks/use-mobile';

const NavbarEnhanced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useMediaQuery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Sidebar Navigation for mobile and desktop */}
          <SidebarNavigation />
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
            <span className="hidden md:inline-block ml-2 text-lg font-semibold">
              Learning Portal
            </span>
          </Link>
        </div>

        {/* Desktop navigation moved to sidebar */}
        
        {/* Search bar */}
        <div className="relative hidden md:flex md:flex-1 md:items-center md:justify-center px-2">
          <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
            <Input
              type="search"
              placeholder="Search courses, skills, mentors..."
              className="pl-9 pr-4 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate('/search')}>
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                  5
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">New course recommendation</span>
                  <span className="text-xs text-muted-foreground">Based on your interests</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Course completion</span>
                  <span className="text-xs text-muted-foreground">You've earned a certificate</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Learning streak</span>
                  <span className="text-xs text-muted-foreground">You're on a 3-day streak!</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/notifications')}>
                <div className="w-full text-center text-primary">View all notifications</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/my-learning')}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>My Learning</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/milestones')}>
                <Trophy className="mr-2 h-4 w-4" />
                <span>Milestones</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/actionables')}>
                <CheckSquare className="mr-2 h-4 w-4" />
                <span>Actionables</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavbarEnhanced;
