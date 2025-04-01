
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import RedeemPointsDialog from '@/components/RedeemPointsDialog';
import PointsOverviewCard from '@/components/rewards/PointsOverviewCard';
import LeaderboardHeader from '@/components/rewards/LeaderboardHeader';
import LeaderboardFilters from '@/components/rewards/LeaderboardFilters';
import LeaderboardDisplay from '@/components/rewards/LeaderboardDisplay';
import { 
  generateMockLeaderboardData, 
  generateMockTeamLeaderboard, 
  getFilterValues, 
  getLeaderboardTitle, 
  getLeaderboardDescription, 
  getActiveLeaderboard,
  getMockRewardsData
} from '@/components/rewards/LeaderboardUtils';
import { RewardsTabProps } from '@/components/rewards/types';

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  // State for various leaderboard filters and types
  const [activeLeaderboardType, setActiveLeaderboardType] = useState('individual');
  const [teamLeaderboardScope, setTeamLeaderboardScope] = useState('intra');
  const [leaderboardFilter, setLeaderboardFilter] = useState('all');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('month');
  const [filterValueSelect, setFilterValueSelect] = useState('all');
  const [showDetails, setShowDetails] = useState(true);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for current user position (for relative leaderboard)
  const currentUserPosition = 15;

  // Generate mock data
  const allUsers = generateMockLeaderboardData();
  const allTeams = generateMockTeamLeaderboard();
  const currentUser = allUsers.find(user => user.position === currentUserPosition);
  const rewardsData = getMockRewardsData();

  // Get filter values
  const filterValues = getFilterValues(allUsers, leaderboardFilter);

  // Get leaderboard data
  const leaderboardData = getActiveLeaderboard(
    activeLeaderboardType, 
    teamLeaderboardScope, 
    leaderboardFilter, 
    allUsers, 
    allTeams, 
    filterValueSelect, 
    currentUser
  );

  // Get leaderboard title and description
  const title = getLeaderboardTitle(activeLeaderboardType, teamLeaderboardScope, leaderboardFilter);
  const description = getLeaderboardDescription(activeLeaderboardType, teamLeaderboardScope, leaderboardFilter);

  // Handle back button
  const handleBack = () => {
    navigate('/my-team');
  };

  // Handle redeem points click
  const handleRedeemPoints = () => {
    setShowRedeemDialog(true);
  };

  return (
    <div className="space-y-8">
      {/* Back button for team member view */}
      {teamMemberId && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4" 
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Team
        </Button>
      )}

      {/* Points Overview */}
      <PointsOverviewCard 
        rewardsData={rewardsData} 
        onRedeemClick={handleRedeemPoints} 
      />

      {/* Leaderboards Section */}
      <div>
        <LeaderboardHeader 
          activeLeaderboardType={activeLeaderboardType}
          setActiveLeaderboardType={setActiveLeaderboardType}
          teamLeaderboardScope={teamLeaderboardScope}
          setTeamLeaderboardScope={setTeamLeaderboardScope}
          leaderboardPeriod={leaderboardPeriod}
          setLeaderboardPeriod={setLeaderboardPeriod}
        />
        
        <LeaderboardFilters 
          activeLeaderboardType={activeLeaderboardType}
          leaderboardFilter={leaderboardFilter}
          setLeaderboardFilter={setLeaderboardFilter}
          filterValueSelect={filterValueSelect}
          setFilterValueSelect={setFilterValueSelect}
          filterValues={filterValues}
        />

        <LeaderboardDisplay 
          activeLeaderboardType={activeLeaderboardType}
          teamLeaderboardScope={teamLeaderboardScope}
          leaderboardFilter={leaderboardFilter}
          currentUserId={currentUser?.id || ''}
          title={title}
          description={description}
          leaderboardData={leaderboardData}
          showDetails={showDetails}
        />
      </div>

      {/* Redeem Points Dialog */}
      {showRedeemDialog && (
        <RedeemPointsDialog 
          open={showRedeemDialog}
          onOpenChange={setShowRedeemDialog}
          availablePoints={rewardsData.totalPoints}
        />
      )}
    </div>
  );
};

export default RewardsTab;
