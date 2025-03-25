
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, LogOut, HelpCircle, Settings, Newspaper } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import LMSUpdatesDialog from '@/components/newsletter/LMSUpdatesDialog';

interface ProfileMenuProps {
  imgSrc?: string;
  fallback?: string;
  onLogout?: () => void;
  className?: string;
  showAdminToggle?: boolean;
  isAdmin?: boolean;
  onToggleAdminMode?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  imgSrc = "https://github.com/shadcn.png",
  fallback = "SC",
  onLogout,
  className = "",
  showAdminToggle = false,
  isAdmin = false,
  onToggleAdminMode
}) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`relative h-8 w-8 rounded-full ${className}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={imgSrc} alt="User avatar" />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')} className="flex items-center">
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
        <DropdownMenuItem onClick={() => navigate('/faq')} className="flex items-center">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>FAQ</span>
        </DropdownMenuItem>
        
        {showAdminToggle && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onToggleAdminMode}>
              {isAdmin ? "Switch to Learner Mode" : "Switch to Admin Mode"}
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
