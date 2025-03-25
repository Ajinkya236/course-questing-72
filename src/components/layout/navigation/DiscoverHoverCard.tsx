
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Star, BookOpen, Compass, Users, UserPlus, TrendingUp } from 'lucide-react';

interface CategoryItem {
  title: string;
  path: string;
  icon: React.FC<any>;
  description: string;
}

const categories: CategoryItem[] = [
  {
    title: "Top Picks",
    path: "/view-all/top-picks-for-you",
    icon: Star,
    description: "Curated courses just for you"
  },
  {
    title: "Your Interests",
    path: "/view-all/based-on-your-interests",
    icon: BookOpen,
    description: "Matches your followed skills"
  },
  {
    title: "Role-based",
    path: "/view-all/role-based-skills",
    icon: Compass,
    description: "Skills for your current role"
  },
  {
    title: "Similar Learners",
    path: "/view-all/popular-with-similar-learners",
    icon: Users,
    description: "Popular with peers like you"
  },
  {
    title: "Assigned",
    path: "/view-all/assigned-courses",
    icon: UserPlus,
    description: "Mandatory and recommended"
  },
  {
    title: "Trending",
    path: "/view-all/trending",
    icon: TrendingUp,
    description: "What's popular right now"
  }
];

interface DiscoverHoverCardProps {
  isActive: boolean;
}

const DiscoverHoverCard: React.FC<DiscoverHoverCardProps> = ({ isActive }) => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <Link 
          to="/discover" 
          className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
            isActive ? 'text-primary' : 'text-foreground/60'
          }`}
        >
          Discover <ChevronDown className="h-4 w-4" />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div 
              key={category.title}
              className="flex flex-col gap-1 p-2 hover:bg-secondary rounded-md cursor-pointer"
              onClick={() => handleCategoryClick(category.path)}
            >
              <div className="font-medium flex items-center gap-2">
                <category.icon className="h-4 w-4 text-primary" />
                {category.title}
              </div>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t">
          <Button 
            variant="link" 
            className="p-0 h-auto" 
            onClick={() => navigate('/discover')}
          >
            View all categories
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default DiscoverHoverCard;
