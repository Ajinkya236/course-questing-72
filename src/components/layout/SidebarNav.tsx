
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, BrainCircuit, Users, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Discover',
    href: '/discover',
    icon: BookOpen,
  },
  {
    name: 'My Learning',
    href: '/my-learning',
    icon: Trophy,
  },
  {
    name: 'Skills',
    href: '/skills',
    icon: BrainCircuit,
  },
  {
    name: 'My Team',
    href: '/my-team',
    icon: UserCheck,
  },
  {
    name: 'Mentoring',
    href: '/mentoring',
    icon: Users,
  },
];

const SidebarNav: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo area */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">L</span>
            </div>
            {isExpanded && (
              <span className="ml-3 text-sidebar-foreground font-archivo-black text-lg">
                Learning
              </span>
            )}
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-all duration-200",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      active 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                        : "text-sidebar-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {isExpanded && (
                      <span className="ml-3 font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNav;
