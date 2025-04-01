
import React, { useState, useContext } from 'react';
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
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an issue logging you out",
        variant: "destructive",
      });
    }
  };

  const toggleAdminMode = () => {
    const newMode = !isAdmin;
    setIsAdmin(newMode);
    if (newMode) {
      navigate('/admin/dashboard');
      toast({
        title: "Switched to Admin Mode",
        description: "You are now in admin mode"
      });
    } else {
      navigate('/');
      toast({
        title: "Switched to Learner Mode",
        description: "You are now in learner mode"
      });
    }
  };

  return (
    <div className="w-full border-b bg-background sticky top-0 z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-lg">Jio Learning</h1>
          <nav className="flex items-center space-x-2">
            {!isAdmin && (
              <>
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
              </>
            )}
            
            {isAdmin && (
              <>
                <Button variant="ghost" asChild size="sm">
                  <Link to="/admin/dashboard" className="flex items-center gap-1">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link to="/admin/courses" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Courses</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link to="/admin/modules" className="flex items-center gap-1">
                    <Compass className="h-4 w-4" />
                    <span>Modules</span>
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="sm">
                  <Link to="/admin/activities" className="flex items-center gap-1">
                    <Headphones className="h-4 w-4" />
                    <span>Activities</span>
                  </Link>
                </Button>
              </>
            )}
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
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" 
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
              <DropdownMenuItem onClick={toggleAdminMode}>
                {isAdmin ? "Switch to Learner Mode" : "Switch to Admin Mode"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
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
