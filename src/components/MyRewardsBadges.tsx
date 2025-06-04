
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
        return <Award className="h-5 w-5" />;
      case 'medal':
        return <Medal className="h-5 w-5" />;
      case 'trophy':
        return <Trophy className="h-5 w-5" />;
      case 'star':
      default:
        return <Star className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="p-6 border rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">My Rewards</h3>
        <Badge variant="outline" className="bg-primary/10 text-primary font-semibold">
          {earnedBadges.length}/{totalBadges} Badges
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {earnedBadges.slice(0, 3).map(badge => (
          <div key={badge.id} className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border">
            <div className="text-primary">
              {renderIcon(badge.icon)}
            </div>
            <span className="text-sm font-semibold">{badge.name}</span>
          </div>
        ))}
        
        {earnedBadges.length > 3 && (
          <div className="p-3 rounded-lg bg-primary/5 border">
            <span className="text-sm font-semibold">+{earnedBadges.length - 3} more</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRewardsBadges;
