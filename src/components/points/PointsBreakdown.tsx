
import React from 'react';
import { PointsBreakdownItem } from './types';

interface PointsBreakdownProps {
  items: PointsBreakdownItem[];
  totalPoints: number;
}

const PointsBreakdown: React.FC<PointsBreakdownProps> = ({ items, totalPoints }) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Points Breakdown</h4>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.category}</span>
              <span>{item.points} pts</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-2 rounded-full"
                style={{ 
                  width: `${(item.points / totalPoints) * 100}%`,
                  backgroundColor: item.color 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsBreakdown;
