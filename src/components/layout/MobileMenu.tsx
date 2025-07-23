
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, Users, Calendar, Award, User, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SearchBar from './SearchBar';

interface MobileMenuProps {
  isOpen: boolean;
  isSkillsPage: boolean;
  onClose: () => void;
  navigateToSearch: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  isSkillsPage, 
  onClose, 
  navigateToSearch 
}) => {
  const location = useLocation();

  if (!isOpen) return null;

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/discover', label: 'Discover', icon: Search },
    { href: '/my-learning', label: 'My Learning', icon: BookOpen },
    { href: '/my-team', label: 'My Team', icon: Users },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/skills', label: 'Skills', icon: Award },
    { href: '/mentoring', label: 'Mentoring', icon: User },
    { href: '/notifications', label: 'Notifications', icon: Bell, badge: 4 },
  ];

  return (
    <div className="md:hidden bg-background border-b">
      <div className="container py-4 space-y-4">
        <SearchBar 
          isSkillsPage={isSkillsPage} 
          onFocus={navigateToSearch}
        />
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={onClose}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
