
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  BookOpen,
  Home,
  Search,
  Trophy,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  HelpCircle,
  MessageSquare,
  Users,
  ChevronDown,
  BrainCircuit
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationsPanel from '@/components/NotificationsPanel';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavbarWithSidebar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Implement your logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  useEffect(() => {
    // Close mobile menu when route changes
    setShowMobileMenu(false);
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/discover', label: 'Discover', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/my-learning', label: 'My Learning', icon: <Trophy className="h-5 w-5" /> },
    { path: '/mentoring', label: 'Mentoring', icon: <Users className="h-5 w-5" /> },
    { path: '/my-team', label: 'My Team', icon: <Users className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const renderSidebarContent = () => (
    <div className={cn(
      "h-full flex flex-col bg-background border-r",
      sidebarCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        <div className={cn(
          "flex items-center gap-2",
          sidebarCollapsed && "justify-center"
        )}>
          <BrainCircuit className="h-6 w-6 text-primary" />
          {!sidebarCollapsed && <span className="font-semibold">Learning Portal</span>}
        </div>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full"
          >
            {sidebarCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 rotate-180" />}
          </Button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted",
                  sidebarCollapsed && "justify-center px-2"
                )}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {!sidebarCollapsed && (
        <div className="p-4 border-t mt-auto">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Product Manager</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-full min-h-screen">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className={cn(
          "hidden md:block sticky top-0 h-screen",
          sidebarCollapsed ? "w-16" : "w-64"
        )}>
          {renderSidebarContent()}
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[250px]">
            {renderSidebarContent()}
          </SheetContent>
        </Sheet>
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 flex-1 justify-between">
              <div className="relative hidden md:block w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg pl-8 bg-background"
                  onFocus={() => navigate('/search')}
                />
              </div>
              
              <div className="flex items-center gap-1 ml-auto">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative" 
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    4
                  </Badge>
                </Button>
                
                <ThemeToggle />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SC</AvatarFallback>
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          
          {/* Mobile search */}
          {isMobile && (
            <div className="md:hidden px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-9"
                  onFocus={() => navigate('/search')}
                />
              </div>
            </div>
          )}
        </header>
          
        {/* Notifications panel */}
        {showNotifications && (
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        )}
        
        <main className="flex-1">
          <div className="container py-6">
            {/* Page content will be rendered here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NavbarWithSidebar;
