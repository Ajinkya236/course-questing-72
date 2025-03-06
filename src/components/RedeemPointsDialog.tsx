
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Gift, ShoppingBag, Backpack, BookOpen, Zap, Check, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RedeemPointsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePoints: number;
}

const rewardCategories = [
  { id: 'all', name: 'All Rewards' },
  { id: 'gift-cards', name: 'Gift Cards' },
  { id: 'learning', name: 'Learning' },
  { id: 'merchandise', name: 'Merchandise' },
  { id: 'experiences', name: 'Experiences' },
];

const rewards = [
  {
    id: '1',
    title: 'Amazon Gift Card',
    points: 5000,
    imageUrl: 'https://placehold.co/200x100/e5f7ff/0369a1?text=Amazon',
    category: 'gift-cards',
    description: 'Redeem your points for an Amazon gift card worth $50.'
  },
  {
    id: '2',
    title: 'Premium Course Access',
    points: 3000,
    imageUrl: 'https://placehold.co/200x100/fdf2f8/be185d?text=Course',
    category: 'learning',
    description: 'Get access to a premium course of your choice.'
  },
  {
    id: '3',
    title: 'Company Branded Mug',
    points: 1500,
    imageUrl: 'https://placehold.co/200x100/f0fdf4/166534?text=Mug',
    category: 'merchandise',
    description: 'Get a high-quality company branded mug delivered to your desk.'
  },
  {
    id: '4',
    title: 'Lunch with CEO',
    points: 10000,
    imageUrl: 'https://placehold.co/200x100/fef3c7/92400e?text=Lunch',
    category: 'experiences',
    description: 'Have lunch with the CEO and discuss your ideas and career.'
  },
  {
    id: '5',
    title: 'LinkedIn Learning Subscription',
    points: 6000,
    imageUrl: 'https://placehold.co/200x100/ede9fe/7c3aed?text=LinkedIn',
    category: 'learning',
    description: '3-month LinkedIn Learning subscription.'
  },
  {
    id: '6',
    title: 'Company Hoodie',
    points: 2500,
    imageUrl: 'https://placehold.co/200x100/dbeafe/1d4ed8?text=Hoodie',
    category: 'merchandise',
    description: 'Comfortable company branded hoodie, perfect for those cold office days.'
  },
  {
    id: '7',
    title: 'Conference Ticket',
    points: 8000,
    imageUrl: 'https://placehold.co/200x100/fce7f3/db2777?text=Conference',
    category: 'experiences',
    description: 'Ticket to a relevant industry conference of your choice.'
  },
  {
    id: '8',
    title: 'Starbucks Gift Card',
    points: 2000,
    imageUrl: 'https://placehold.co/200x100/ecfccb/4d7c0f?text=Starbucks',
    category: 'gift-cards',
    description: 'Redeem your points for a $20 Starbucks gift card.'
  },
];

const RedeemPointsDialog: React.FC<RedeemPointsDialogProps> = ({ 
  open, 
  onOpenChange,
  availablePoints
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [redeemingReward, setRedeemingReward] = useState<string | null>(null);
  const { toast } = useToast();
  
  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);
  
  const handleRedeem = (reward: typeof rewards[0]) => {
    if (availablePoints < reward.points) {
      toast({
        title: "Not enough points",
        description: `You need ${reward.points - availablePoints} more points to redeem this reward.`,
        variant: "destructive",
      });
      return;
    }
    
    setRedeemingReward(reward.id);
    
    // Simulate redemption process
    setTimeout(() => {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.title} for ${reward.points} points.`,
      });
      setRedeemingReward(null);
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Gift className="h-5 w-5 text-primary" />
            Redeem Your Points
          </DialogTitle>
          <DialogDescription>
            You have <span className="font-bold text-primary">{availablePoints.toLocaleString()}</span> points available to redeem.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
          <div className="px-6">
            <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-transparent justify-start">
              {rewardCategories.map(category => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={selectedCategory} className="mt-0 p-0">
            <ScrollArea className="flex-1 h-[440px] px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {filteredRewards.map(reward => (
                  <div 
                    key={reward.id} 
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-32 bg-secondary/20 flex items-center justify-center p-2">
                      <img 
                        src={reward.imageUrl} 
                        alt={reward.title} 
                        className="h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{reward.title}</h3>
                        <Badge variant="outline" className="bg-primary/10">
                          {reward.points.toLocaleString()} pts
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {reward.description}
                      </p>
                      <Button 
                        className="w-full" 
                        disabled={availablePoints < reward.points || redeemingReward === reward.id}
                        onClick={() => handleRedeem(reward)}
                      >
                        {redeemingReward === reward.id ? (
                          <>Processing...</>
                        ) : availablePoints < reward.points ? (
                          <>Not Enough Points</>
                        ) : (
                          <>Redeem Now</>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        <div className="p-6 pt-2 border-t">
          <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RedeemPointsDialog;
