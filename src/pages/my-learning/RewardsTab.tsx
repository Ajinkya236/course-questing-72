
import React from 'react';

interface RewardsTabProps {
  teamMemberId?: string;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  // This would include logic to display rewards based on the team member ID if provided
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {teamMemberId ? "Team Member's Rewards" : "My Rewards"}
      </h2>
      {/* Rewards content would go here */}
      <p>Rewards content</p>
    </div>
  );
};

export default RewardsTab;
