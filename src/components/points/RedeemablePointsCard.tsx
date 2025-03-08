
import React from 'react';
import { Gift, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RedeemablePointsCardProps {
  points: number;
  onRedeem?: () => void;
}

const RedeemablePointsCard: React.FC<RedeemablePointsCardProps> = ({ points, onRedeem }) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Gift className="h-5 w-5 mr-2 text-green-500" />
          <h4 className="font-medium">Redeemable Points</h4>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold">{points.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground mt-1">Available to redeem</p>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full"
            onClick={onRedeem}
          >
            Redeem Points
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RedeemablePointsCard;
