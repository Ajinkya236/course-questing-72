
import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  HelpCircle,
  LayoutDashboard,
  LogOut,
  BrainCircuit
} from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const TopNavigation: React.FC = () => {
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
    <div className="top-navigation w-full">
      <div className="container max-w-full mx-auto flex h-14 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-white">
            <BrainCircuit className="h-6 w-6" />
            <span className="text-lg">LearnForge Enterprise</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
            <Link to="/faq">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </Button>
          
          <ThemeSelector />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden hover:bg-white/10">
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
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
