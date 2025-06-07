
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Compass, 
  BookOpen, 
  MoreHorizontal,
  BrainCircuit,
  Users,
  GraduationCap,
  PartyPopper,
  ChevronUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MobileFooterNav: React.FC = () => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const mainNavItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Discover",
      url: "/discover",
      icon: Compass,
    },
    {
      title: "My Learning",
      url: "/my-learning",
      icon: BookOpen,
    },
  ];

  const moreNavItems = [
    {
      title: "Skills",
      url: "/skills",
      icon: BrainCircuit,
    },
    {
      title: "My Team",
      url: "/my-team",
      icon: Users,
    },
    {
      title: "Mentoring",
      url: "/mentoring",
      icon: GraduationCap,
    },
    {
      title: "Events",
      url: "/events",
      icon: PartyPopper,
    },
  ];

  const isAnyMoreItemActive = moreNavItems.some(item => isActive(item.url));

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {/* Main navigation items */}
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.url);
          
          return (
            <Button
              key={item.title}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                active 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              asChild
            >
              <Link to={item.url}>
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.title}</span>
              </Link>
            </Button>
          );
        })}

        {/* More dropdown */}
        <DropdownMenu open={isMoreOpen} onOpenChange={setIsMoreOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isAnyMoreItemActive || isMoreOpen
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isMoreOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <MoreHorizontal className="h-5 w-5" />
              )}
              <span className="text-xs font-medium">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            side="top" 
            className="w-48 mb-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
          >
            {moreNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.url);
              
              return (
                <DropdownMenuItem key={item.title} asChild>
                  <Link 
                    to={item.url}
                    className={`flex items-center gap-3 px-3 py-2 ${
                      active ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => setIsMoreOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MobileFooterNav;
