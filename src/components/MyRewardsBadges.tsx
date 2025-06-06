
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Award, Medal, Trophy, Star } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  icon: 'award' | 'medal' | 'trophy' | 'star';
  category: string;
  earned: boolean;
  date?: string;
}

const mockBadges: BadgeItem[] = [
  { id: 'b1', name: 'First Course', icon: 'award', category: 'Enrollment', earned: true, date: '2023-08-15' },
  { id: 'b2', name: 'Perfect Score', icon: 'star', category: 'Assessment', earned: true, date: '2023-09-02' },
  { id: 'b3', name: 'Leadership Pro', icon: 'trophy', category: 'Skill', earned: false },
  { id: 'b4', name: 'Team Builder', icon: 'medal', category: 'Collaboration', earned: true, date: '2023-10-10' },
  { id: 'b5', name: 'Quick Learner', icon: 'award', category: 'Progress', earned: true, date: '2023-11-05' },
];

const MyRewardsBadges: React.FC = () => {
  const earnedBadges = mockBadges.filter(badge => badge.earned);
  const totalBadges = mockBadges.length;
  
  // Function to render the appropriate icon
  const renderIcon = (iconType: string) => {
    switch(iconType) {
      case 'award':
        return <Award className="h-4 w-4" />;
      case 'medal':
        return <Medal className="h-4 w-4" />;
      case 'trophy':
        return <Trophy className="h-4 w-4" />;
      case 'star':
      default:
        return <Star className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="modern-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-archivo-black">My Rewards</h3>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          {earnedBadges.length}/{totalBadges} Badges
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {earnedBadges.slice(0, 3).map(badge => (
          <div key={badge.id} className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-primary">
              {renderIcon(badge.icon)}
            </div>
            <span className="text-xs font-medium">{badge.name}</span>
          </div>
        ))}
        
        {earnedBadges.length > 3 && (
          <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
            <span className="text-xs font-medium">+{earnedBadges.length - 3} more</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRewardsBadges;
