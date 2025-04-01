
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, BrainCircuit, Users } from 'lucide-react';

const MainNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const isSkillsPage = location.pathname.includes('/skills');

  return (
    <nav className="hidden md:flex items-center gap-1">
      <Link 
        to="/" 
        className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
      >
        <Home className="mr-1 h-4 w-4" />
        Home
      </Link>
      <Link 
        to="/discover" 
        className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/discover') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
      >
        <BookOpen className="mr-1 h-4 w-4" />
        Discover
      </Link>
      <Link 
        to="/my-learning" 
        className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/my-learning') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
      >
        <Trophy className="mr-1 h-4 w-4" />
        My Learning
      </Link>
      <Link 
        to="/skills" 
        className={`flex items-center px-4 py-1.5 text-sm font-medium ${isSkillsPage ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
      >
        <BrainCircuit className="mr-1 h-4 w-4" />
        Skills
      </Link>
      <Link 
        to="/mentoring" 
        className={`flex items-center px-4 py-1.5 text-sm font-medium ${isActive('/mentoring') ? 'bg-secondary rounded-md' : 'text-foreground/60 hover:text-foreground'}`}
      >
        <Users className="mr-1 h-4 w-4" />
        Mentoring
      </Link>
    </nav>
  );
};

export default MainNav;
