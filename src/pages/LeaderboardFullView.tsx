
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import LeaderboardEnhanced from '@/components/LeaderboardEnhanced';

// Mock data for leaderboard users
const mockLeaderboardUsers = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User ${i + 1}`,
  avatar: `https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${(i % 70) + 1}.jpg`,
  points: Math.floor(10000 - i * (100 + Math.random() * 50)),
  position: i + 1,
  positionChange: i % 5 === 0 ? 2 : i % 7 === 0 ? -1 : 0,
  department: ['Engineering', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations'][i % 6],
  team: ['Frontend', 'Backend', 'DevOps', 'Design', 'Content', 'Support'][i % 6],
  location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Berlin'][i % 6],
  role: ['Developer', 'Manager', 'Director', 'VP', 'C-Level', 'Analyst'][i % 6],
  jobFamily: ['Technology', 'Business', 'Creative', 'Support', 'Leadership'][i % 5],
  details: {
    assessmentScore: Math.floor(70 + Math.random() * 30),
    engagementScore: Math.floor(60 + Math.random() * 40),
    completionRate: Math.floor(75 + Math.random() * 25)
  }
}));

// Current user is the one at position 15
const currentUser = mockLeaderboardUsers.find(user => user.position === 15);

const LeaderboardFullView = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Leaderboard | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </div>
        
        <div className="h-[calc(100vh-200px)]">
          <LeaderboardEnhanced 
            users={mockLeaderboardUsers} 
            currentUser={currentUser} 
            isFullView={true} 
          />
        </div>
      </div>
    </>
  );
};

export default LeaderboardFullView;
