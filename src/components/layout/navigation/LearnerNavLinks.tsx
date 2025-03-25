
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HomeIcon, Compass, BookOpen, Users, Headphones, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface LearnerNavLinksProps {
  courseCategories?: string[];
}

const LearnerNavLinks: React.FC<LearnerNavLinksProps> = ({ 
  courseCategories = []
}) => {
  const [isDiscoverHovered, setIsDiscoverHovered] = useState(false);
  
  return (
    <>
      <Button variant="ghost" asChild size="sm">
        <Link to="/" className="flex items-center gap-1">
          <HomeIcon className="h-4 w-4" />
          <span>Home</span>
        </Link>
      </Button>
      
      {courseCategories.length > 0 ? (
        <DropdownMenu open={isDiscoverHovered} onOpenChange={setIsDiscoverHovered}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onMouseEnter={() => setIsDiscoverHovered(true)}
              onMouseLeave={() => setIsDiscoverHovered(false)}
              asChild
            >
              <Link to="/discover" className="flex items-center gap-1">
                <Compass className="h-4 w-4" />
                <span>Discover</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Link>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-56"
            onMouseEnter={() => setIsDiscoverHovered(true)}
            onMouseLeave={() => setIsDiscoverHovered(false)}
          >
            {courseCategories.map((category) => (
              <DropdownMenuItem key={category} asChild>
                <Link to={`/discover?category=${encodeURIComponent(category)}`}>
                  {category}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/discover">View All Categories</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" asChild size="sm">
          <Link to="/discover" className="flex items-center gap-1">
            <Compass className="h-4 w-4" />
            <span>Discover</span>
          </Link>
        </Button>
      )}
      
      <Button variant="ghost" asChild size="sm">
        <Link to="/my-learning" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>My Learning</span>
        </Link>
      </Button>
      <Button variant="ghost" asChild size="sm">
        <Link to="/my-team" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>My Team</span>
        </Link>
      </Button>
      <Button variant="ghost" asChild size="sm">
        <Link to="/mentoring" className="flex items-center gap-1">
          <Headphones className="h-4 w-4" />
          <span>Mentoring</span>
        </Link>
      </Button>
    </>
  );
};

export default LearnerNavLinks;
