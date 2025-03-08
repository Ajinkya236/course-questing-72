
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor, 
  bgColor 
}) => {
  return (
    <div className="bg-secondary/30 rounded-lg p-4">
      <div className="flex items-center">
        <div className={`rounded-full ${bgColor} p-2 mr-3`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-bold">{value}</h4>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
