
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import ProfileMenu from './navigation/ProfileMenu';
import LearnerNavLinks from './navigation/LearnerNavLinks';
import AdminNavLinks from './navigation/AdminNavLinks';

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
            {!isAdmin ? (
              <LearnerNavLinks courseCategories={courseCategories} />
            ) : (
              <AdminNavLinks />
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
          
          <ProfileMenu 
            imgSrc="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
            fallback="JD"
            onLogout={handleLogout}
            showAdminToggle={true}
            isAdmin={isAdmin}
            onToggleAdminMode={toggleAdminMode}
          />
          
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
