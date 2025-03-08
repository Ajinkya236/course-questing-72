
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Home, 
  BookOpen, 
  Compass, 
  Users, 
  BarChart3,
  X
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery();
  
  const menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      path: '/' 
    },
    { 
      id: 'discover', 
      label: 'Discover', 
      icon: Compass, 
      path: '/discover' 
    },
    { 
      id: 'my-learning', 
      label: 'My Learning', 
      icon: BookOpen, 
      path: '/my-learning' 
    },
    { 
      id: 'mentoring', 
      label: 'Mentoring', 
      icon: Users, 
      path: '/mentoring' 
    },
    { 
      id: 'my-team', 
      label: 'My Team', 
      icon: BarChart3, 
      path: '/my-team' 
    }
  ];
  
  const navigateTo = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
          <div className="flex flex-col h-full bg-background">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-lg">Navigation</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 py-4">
              <div className="space-y-1 px-3">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                    className={`w-full justify-start text-base ${
                      location.pathname === item.path ? 'font-medium' : ''
                    }`}
                    onClick={() => navigateTo(item.path)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t text-sm text-muted-foreground">
              © 2023 Learning Management System
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Desktop version - visible only on larger screens */}
      {!isMobile && (
        <div className="hidden md:flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] w-[220px] bg-background border-r p-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={`w-full justify-start text-base ${
                  location.pathname === item.path ? 'font-medium' : ''
                }`}
                onClick={() => navigateTo(item.path)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarNavigation;
