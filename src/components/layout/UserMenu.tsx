
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Settings, 
  HelpCircle, 
  MessageSquare, 
  Trophy, 
  Bell,
  ClipboardList
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { useUserRole } from '@/hooks/useUserRole';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

interface UserMenuProps {
  avatarSrc?: string;
  avatarFallback?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  avatarSrc = "https://github.com/shadcn.png", 
  avatarFallback = "SC" 
}) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isEvaluator } = useUserRole();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
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
        {isEvaluator && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/evaluator')}>
                <ClipboardList className="mr-2 h-4 w-4" />
                <span>Evaluator Dashboard</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
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
  );
};

export default UserMenu;
