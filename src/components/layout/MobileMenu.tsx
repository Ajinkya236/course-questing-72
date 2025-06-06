
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BrainCircuit, Trophy, Users, Search, UserCheck, CalendarDays } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SkillSearch from '../skills/SkillSearch';

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
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const isSkillsActive = location.pathname.includes('/skills');

  return (
    <div className="md:hidden border-t p-4">
      <nav className="grid gap-2">
        <Link
          to="/"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            isActive('/') ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
          onClick={onClose}
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          to="/discover"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            isActive('/discover') ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
          onClick={onClose}
        >
          <BookOpen className="h-4 w-4" />
          Discover
        </Link>
        <Link
          to="/my-learning"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            isActive('/my-learning') ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
          onClick={onClose}
        >
          <Trophy className="h-4 w-4" />
          My Learning
        </Link>
        <Link
          to="/skills"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            isSkillsActive ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
          onClick={onClose}
        >
          <BrainCircuit className="h-4 w-4" />
          Skills
        </Link>
        <Link
          to="/my-team"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            isActive('/my-team') ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
          onClick={onClose}
        >
          <Users className="h-4 w-4" />
          My Team
        </Link>
        <Link
          to="/mentoring"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            isActive('/mentoring') ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
          onClick={onClose}
        >
          <UserCheck className="h-4 w-4" />
          Mentoring
        </Link>
        <Link
          to="/events"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            isActive('/events') ? 'bg-secondary' : 'hover:bg-secondary/50'
          }`}
          onClick={onClose}
        >
          <CalendarDays className="h-4 w-4" />
          Events
        </Link>
        <div className="relative w-full mt-2">
          {isSkillsPage ? (
            <SkillSearch />
          ) : (
            <>
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9"
                onFocus={() => {
                  navigateToSearch();
                  onClose();
                }}
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
