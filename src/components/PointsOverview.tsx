
import React from 'react';
import MainStatsCard from './points/MainStatsCard';
import StreakCard from './points/StreakCard';
import RedeemablePointsCard from './points/RedeemablePointsCard';
import { PointsOverviewProps } from './points/types';

const PointsOverview: React.FC<PointsOverviewProps> = ({ 
  data, 
  onViewStreakDetails,
  onRedeemPoints
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Stats Card */}
      <MainStatsCard data={data} />
      
      {/* Secondary Stats Cards */}
      <div className="flex flex-col gap-6">
        {/* Streak Card */}
        <StreakCard streakDays={data.streakDays} onViewDetails={onViewStreakDetails} />
        
        {/* Redeemable Points Card */}
        <RedeemablePointsCard points={data.redeemablePoints} onRedeem={onRedeemPoints} />
      </div>
    </div>
  );
};

export default PointsOverview;
