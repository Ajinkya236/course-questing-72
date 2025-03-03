
import React from 'react';
import PointsOverview from '@/components/PointsOverview';
import LeaderboardCard from '@/components/LeaderboardCard';

// Mock data for points overview
const pointsData = {
  totalPoints: 12465,
  coursesCompleted: 28,
  hoursSpent: 142,
  pointsThisWeek: 450,
  pointsLastWeek: 380,
  pointsBreakdown: [
    {
      category: 'Course Completion',
      points: 6500,
      color: '#3b82f6', // blue-500
    },
    {
      category: 'Quizzes & Assessments',
      points: 2800,
      color: '#8b5cf6', // violet-500
    },
    {
      category: 'Engagement & Activities',
      points: 1850,
      color: '#10b981', // emerald-500
    },
    {
      category: 'Daily Logins',
      points: 915,
      color: '#f97316', // orange-500
    },
    {
      category: 'Bonus Points',
      points: 400,
      color: '#ef4444', // red-500
    },
  ],
  streakDays: 18,
  nextMilestone: {
    name: 'Gold Achiever',
    points: 15000,
  },
  redeemablePoints: 8000,
};

// Mock data for leaderboard
const leaderboardUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    points: 18750,
    position: 1,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    points: 16320,
    position: 2,
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    points: 15480,
    position: 3,
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?img=4',
    points: 13950,
    position: 4,
  },
  {
    id: '5',
    name: 'Jessica Liu',
    avatar: 'https://i.pravatar.cc/150?img=5',
    points: 13240,
    position: 5,
  },
];

// Current user data for leaderboard
const currentUser = {
  id: '8',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=22',
  points: 12465,
  position: 8,
};

const RewardsTab = () => {
  return (
    <div className="space-y-8">
      <PointsOverview data={pointsData} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LeaderboardCard users={leaderboardUsers} currentUser={currentUser} />
        </div>
        
        <div className="space-y-6">
          {/* Additional stats or rewards info could go here */}
        </div>
      </div>
    </div>
  );
};

export default RewardsTab;
