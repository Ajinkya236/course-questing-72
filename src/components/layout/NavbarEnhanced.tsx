
import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  BookOpen, 
  ChevronDown, 
  Home, 
  Layers, 
  LogOut, 
  Menu,
  Search,
  Settings,
  Star,
  User,
  HelpCircle,
  BarChart3,
  Trophy,
  GraduationCap,
  Award,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import NotificationsPanel from '@/components/NotificationsPanel';

const NavbarEnhanced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const notificationsRef = useRef<HTMLButtonElement>(null);
  
  // Mock unread notifications count
  const unreadNotificationsCount = 3;
  
  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { 
      href: '/discover', 
      label: 'Discover', 
      icon: <Search className="h-4 w-4" />,
      dropdown: true,
      dropdownItems: [
        { label: 'Role-based Skills', href: '/view-all/role-based-skills', icon: <Target className="h-4 w-4" /> },
        { label: 'Assigned Courses', href: '/view-all/assigned-courses', icon: <BookOpen className="h-4 w-4" /> },
        { label: 'Based on Your Interests', href: '/view-all/based-on-interests', icon: <Star className="h-4 w-4" /> },
        { label: 'Top Picks for You', href: '/view-all/top-picks', icon: <Zap className="h-4 w-4" /> },
        { label: 'Popular with Similar Learners', href: '/view-all/similar-learners', icon: <TrendingUp className="h-4 w-4" /> },
      ]
    },
    { href: '/my-learning', label: 'My Learning', icon: <Layers className="h-4 w-4" /> },
    { href: '/leaderboard', label: 'Leaderboard', icon: <Trophy className="h-4 w-4" /> }
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleNotificationsPanel = () => {
    setIsNotificationsPanelOpen(!isNotificationsPanelOpen);
  };
  
  const closeNotificationsPanel = () => {
    setIsNotificationsPanelOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Learning Platform
            </span>
          </Link>
          <NavigationMenu className="ml-6">
            <NavigationMenuList>
              {navLinks.map((link) => 
                link.dropdown ? (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        "h-auto px-4 py-2",
                        isActive(link.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {link.icon}
                        <span>{link.label}</span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {link.dropdownItems?.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                  {item.icon}
                                  {item.label}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.href}>
                    <Link to={link.href}>
                      <NavigationMenuLink
                        className={cn(
                          "flex items-center gap-1 px-4 py-2",
                          isActive(link.href) && "bg-accent text-accent-foreground"
                        )}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="mr-2 md:hidden"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold">Learning Platform</span>
            </Link>
            <div className="grid gap-2 py-4">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant={isActive(link.href) ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => navigate(link.href)}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-2">
            <Button
              ref={notificationsRef}
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="relative"
              onClick={toggleNotificationsPanel}
            >
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                >
                  {unreadNotificationsCount}
                </Badge>
              )}
            </Button>
            
            {isNotificationsPanelOpen && (
              <div className="absolute top-14 right-16 z-50 w-80 md:w-96 shadow-lg rounded-md border bg-card overflow-hidden">
                <NotificationsPanel onClose={closeNotificationsPanel} />
              </div>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/faq')}>
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQs</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarEnhanced;
