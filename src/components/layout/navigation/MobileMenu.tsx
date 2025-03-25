
import React from 'react';
import NavigationLink from './NavigationLink';
import { Search, Home, BookOpen, Trophy, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MobileMenuProps {
  onClose: () => void;
  onSearchFocus: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, onSearchFocus }) => {
  return (
    <div className="md:hidden border-t p-4">
      <nav className="grid gap-2">
        <NavigationLink 
          to="/" 
          label="Home" 
          icon={Home}
          onClick={onClose}
        />
        <NavigationLink 
          to="/discover" 
          label="Discover" 
          icon={BookOpen}
          onClick={onClose}
        />
        <NavigationLink 
          to="/my-learning" 
          label="My Learning" 
          icon={Trophy}
          onClick={onClose}
        />
        <NavigationLink 
          to="/mentoring" 
          label="Mentoring" 
          icon={Users}
          onClick={onClose}
        />
        <div className="relative w-full mt-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9"
            onFocus={() => {
              onSearchFocus();
              onClose();
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
