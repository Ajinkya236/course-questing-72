
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Search,
  UsersRound,
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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search expands
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchHover = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

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
          {/* Expandable Search */}
          <div 
            ref={searchRef}
            className={`transition-all duration-300 ease-in-out ${
              isSearchExpanded ? 'w-64' : 'w-10'
            }`}
            onMouseEnter={handleSearchHover}
          >
            {isSearchExpanded ? (
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search courses, skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={(e) => {
                    // Only close if not clicking within the search container
                    if (!searchRef.current?.contains(e.relatedTarget as Node)) {
                      setIsSearchExpanded(false);
                    }
                  }}
                  className="w-full h-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              </form>
            ) : (
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 w-10 h-10" onClick={handleSearchFocus}>
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <UsersRound className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Join Learning Session</DialogTitle>
                <DialogDescription>
                  Enter your session code to join the group learning session.
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
