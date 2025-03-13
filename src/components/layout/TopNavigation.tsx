
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Home as HomeIcon, 
  Compass, 
  BookOpen, 
  Users, 
  Headphones,
  Bell, 
  HelpCircle,
  ChevronDown,
  LogOut
} from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProfile } from '@/hooks/useUserProfile';

const courseCategories = [
  "Leadership & Management",
  "Technical Skills",
  "Data & Analytics",
  "Marketing & Digital",
  "Product Management",
  "Design & Innovation",
  "Soft Skills",
  "Project Management",
  "Compliance & Safety"
];

const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [isDiscoverHovered, setIsDiscoverHovered] = useState(false);
  const { signOut, user } = useAuth();
  const { unreadCount, fetchNotifications } = useNotifications();
  const { profile } = useUserProfile();

  // Fetch unread notifications count when component mounts
  React.useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="w-full border-b bg-background sticky top-0 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-lg">Jio Learning</h1>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild size="sm">
              <Link to="/" className="flex items-center gap-1">
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>
            
            <DropdownMenu open={isDiscoverHovered} onOpenChange={setIsDiscoverHovered}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onMouseEnter={() => setIsDiscoverHovered(true)}
                  onMouseLeave={() => setIsDiscoverHovered(false)}
                  asChild
                >
                  <Link to="/discover" className="flex items-center gap-1">
                    <Compass className="h-4 w-4" />
                    <span>Discover</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Link>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-56"
                onMouseEnter={() => setIsDiscoverHovered(true)}
                onMouseLeave={() => setIsDiscoverHovered(false)}
              >
                {courseCategories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link to={`/discover?category=${encodeURIComponent(category)}`}>
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/discover">View All Categories</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" asChild size="sm">
              <Link to="/my-learning" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>My Learning</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/my-team" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>My Team</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to="/mentoring" className="flex items-center gap-1">
                <Headphones className="h-4 w-4" />
                <span>Mentoring</span>
              </Link>
            </Button>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/faq">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatarUrl} alt="Profile" />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/faq">FAQs</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
