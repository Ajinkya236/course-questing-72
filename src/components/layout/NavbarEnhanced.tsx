
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  BookOpen,
  Home,
  Search,
  Trophy,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  HelpCircle,
  Rss,
  MessageSquare,
  Users,
  ChevronDown,
  BrainCircuit,
  Newspaper
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { useMediaQuery } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import LMSUpdatesDialog from '@/components/newsletter/LMSUpdatesDialog';

// Correct import for NotificationsPanel
import NotificationsPanel from '@/components/NotificationsPanel';

const NavbarEnhanced = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
            <Link 
              to="/" 
              className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/discover" 
              className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/discover') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
            >
              <BookOpen className="mr-1 h-4 w-4" />
              Discover
            </Link>
            <Link 
              to="/my-learning" 
              className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/my-learning') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
            >
              <Trophy className="mr-1 h-4 w-4" />
              My Learning
            </Link>
            <Link 
              to="/mentoring" 
              className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/mentoring') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
            >
              <Users className="mr-1 h-4 w-4" />
              Mentoring
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg pl-8 bg-background"
              onFocus={() => navigate('/search')}
            />
          </div>
          
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
            
            {/* Add Theme Toggle */}
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <LMSUpdatesDialog trigger={
                      <div className="flex items-center w-full cursor-pointer">
                        <Newspaper className="mr-2 h-4 w-4" />
                        <span>LMS Updates</span>
                      </div>
                    } />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/my-learning')}>
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>My Learning</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/notifications')}>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notifications</span>
                    <Badge className="ml-auto h-4 px-1 text-[10px]">4</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/milestones')}>
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>Milestones</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/support')}>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/feedback')}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Send Feedback</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
        <div className="md:hidden border-t p-4">
          <nav className="grid gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive('/') ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to="/discover"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive('/discover') ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <BookOpen className="h-4 w-4" />
              Discover
            </Link>
            <Link
              to="/my-learning"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive('/my-learning') ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Trophy className="h-4 w-4" />
              My Learning
            </Link>
            <Link
              to="/mentoring"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive('/mentoring') ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Users className="h-4 w-4" />
              Mentoring
            </Link>
            <div className="relative w-full mt-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9"
                onFocus={() => {
                  navigate('/search');
                  setShowMobileMenu(false);
                }}
              />
            </div>
          </nav>
        </div>
      )}
      
      {/* Notifications panel */}
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
    </header>
  );
};

export default NavbarEnhanced;
