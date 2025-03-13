
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Compass, 
  BookOpen, 
  Bell, 
  HelpCircle,
  ChevronDown,
  LogOut,
  Users,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../ui/mode-toggle';
import { AuthContext } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

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
  const [isDiscoverHovered, setIsDiscoverHovered] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
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
          <Button variant="ghost" size="icon" asChild>
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
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
                <img 
                  src={user?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
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
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
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
