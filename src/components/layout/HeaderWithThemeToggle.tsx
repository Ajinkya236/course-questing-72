
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, User, MessageSquare, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';
import NotificationsPanel from '@/components/NotificationsPanel';

const HeaderWithThemeToggle = () => {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  
  return (
    <header className="border-b sticky top-0 z-30 bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">LMS</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
              <Link to="/discover">Discover</Link>
            </Button>
            <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
              <Link to="/my-learning">My Learning</Link>
            </Button>
            <Button asChild variant="link" className="text-muted-foreground hover:text-primary">
              <Link to="/mentoring">Mentoring</Link>
            </Button>
          </nav>
        </div>
        
        <div className="hidden md:block ml-auto mr-4">
          <form className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 rounded-full bg-muted"
            />
          </form>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setNotificationsPanelOpen(true)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-1.5">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex">Alex Johnson</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Alex Johnson</p>
                  <p className="text-xs leading-none text-muted-foreground">alex.johnson@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <Link to="/mentoring">My Mentorships</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <NotificationsPanel open={notificationsPanelOpen} onOpenChange={setNotificationsPanelOpen} />
    </header>
  );
};

export default HeaderWithThemeToggle;
