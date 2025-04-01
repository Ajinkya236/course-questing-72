
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import ThemeSelector from '@/components/ThemeSelector';
import { Badge } from '@/components/ui/badge';

const TopNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="md:hidden mr-2">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="hidden font-heading text-xl font-bold sm:inline-block">
              Jio Learning
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/discover" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Discover
            </Link>
            <Link to="/my-learning" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              My Learning
            </Link>
            <Link to="/my-team" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              My Team
            </Link>
          </nav>
        </div>

        <div className="flex-1 flex justify-center px-2">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-sm lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full rounded-md bg-background pl-8 focus-visible:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeSelector />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative" size="icon">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New course available</DropdownMenuItem>
              <DropdownMenuItem>Your course completed</DropdownMenuItem>
              <DropdownMenuItem>New team activity</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 bg-background shadow-lg animate-in slide-in-from-top-80 md:hidden">
          <div className="relative z-20 grid gap-6 p-4 rounded-md bg-card shadow-md">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <span className="font-heading text-xl font-bold">Jio Learning</span>
            </Link>
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              <Link
                to="/"
                className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/discover"
                className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Discover
              </Link>
              <Link
                to="/my-learning"
                className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                onClick={() => setIsOpen(false)}
              >
                My Learning
              </Link>
              <Link
                to="/my-team"
                className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                onClick={() => setIsOpen(false)}
              >
                My Team
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavigation;
