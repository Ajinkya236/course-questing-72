
import React from 'react';
import { Award, TrendingUp, BookOpen, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import PointsBreakdown from './PointsBreakdown';
import { PointsData } from './types';

interface MainStatsCardProps {
  data: PointsData;
}

const MainStatsCard: React.FC<MainStatsCardProps> = ({ data }) => {
  const percentChange = ((data.pointsThisWeek - data.pointsLastWeek) / data.pointsLastWeek) * 100;
  
  return (
    <div className="md:col-span-2 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div className="flex items-center">
            <Award className="h-6 w-6 mr-2 text-primary" />
            <h3 className="text-lg font-semibold">Your Learning Points</h3>
          </div>
          
          <div className="mt-2 md:mt-0 flex items-center bg-secondary/50 px-3 py-1 rounded-full text-sm">
            <TrendingUp className={`h-4 w-4 mr-1 ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            <span className={percentChange >= 0 ? 'text-green-600' : 'text-red-600'}>
              {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
            </span>
            <span className="text-muted-foreground ml-1">from last week</span>
          </div>
        </div>
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatsCard 
            title="Total Points" 
            value={data.totalPoints.toLocaleString()} 
            icon={Award} 
            iconColor="text-primary" 
            bgColor="bg-primary/10" 
          />
          <StatsCard 
            title="Courses Completed" 
            value={data.coursesCompleted} 
            icon={BookOpen} 
            iconColor="text-blue-500" 
            bgColor="bg-blue-500/10" 
          />
          <StatsCard 
            title="Hours Spent" 
            value={data.hoursSpent} 
            icon={Clock} 
            iconColor="text-purple-500" 
            bgColor="bg-purple-500/10" 
          />
        </div>
        
        {/* Points Breakdown */}
        <PointsBreakdown items={data.pointsBreakdown} totalPoints={data.totalPoints} />
      </div>
    </div>
  );
};

export default MainStatsCard;
