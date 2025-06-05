
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Search,
  Users,
  LayoutDashboard,
  LogOut,
  BrainCircuit
} from "lucide-react";
import ThemeSelector from "@/components/ThemeSelector";
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const TopNavigation: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionCode, setSessionCode] = useState('');
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
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

  const handleJoinSession = () => {
    if (!sessionCode.trim()) {
      toast({
        title: "Invalid Session Code",
        description: "Please enter a correct session code",
        variant: "destructive",
      });
      return;
    }

    // Simple validation - you can make this more sophisticated
    if (sessionCode.length < 6) {
      toast({
        title: "Invalid Session Code",
        description: "Please enter a correct session code",
        variant: "destructive",
      });
      return;
    }

    // Open JioMeet in new tab with session code
    window.open(`https://jiomeet.jio.com/join/${sessionCode}`, '_blank');
    setIsJoinDialogOpen(false);
    setSessionCode('');
    
    toast({
      title: "Joining Session",
      description: "Opening meeting in new tab",
    });
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
            <Link to="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          
          <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Users className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Join Meeting Session</DialogTitle>
                <DialogDescription>
                  Enter your session code to join the meeting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sessionCode" className="text-right">
                    Session Code
                  </Label>
                  <Input
                    id="sessionCode"
                    value={sessionCode}
                    onChange={(e) => setSessionCode(e.target.value)}
                    placeholder="Enter session code"
                    className="col-span-3"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleJoinSession();
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsJoinDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleJoinSession}>
                  Join Session
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10">
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
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
