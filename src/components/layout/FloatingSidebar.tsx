
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Home as HomeIcon, 
  Compass, 
  BookOpen, 
  Users, 
  GraduationCap,
  Sparkles,
  PartyPopper,
  Menu,
  X
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
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
  {
    title: "Skills",
    url: "/skills",
    icon: Sparkles,
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

const FloatingSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <TooltipProvider>
      <div 
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              <Menu className="h-5 w-5 text-primary" />
              {isExpanded && (
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  Navigation
                </span>
              )}
            </div>
            {!isExpanded && (
              <Menu className="h-5 w-5 text-primary mx-auto" />
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.url);
              
              return (
                <Tooltip key={item.title} delayDuration={isExpanded ? 1000 : 300}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={active ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start h-12 transition-all duration-200 ${
                        isExpanded ? 'px-4' : 'px-0 justify-center'
                      } ${
                        active 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white'
                      }`}
                      asChild
                    >
                      <Link to={item.url}>
                        <Icon className={`h-5 w-5 ${isExpanded ? 'mr-3' : ''}`} />
                        <span className={`transition-opacity duration-300 ${
                          isExpanded ? 'opacity-100' : 'opacity-0 absolute'
                        }`}>
                          {item.title}
                        </span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {!isExpanded && (
                    <TooltipContent side="right" className="ml-2">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
};

export default FloatingSidebar;
