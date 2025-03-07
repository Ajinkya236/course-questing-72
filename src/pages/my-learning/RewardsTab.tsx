
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Award, Gift, Trophy, Coins, Ticket, GiftIcon, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useSpinTheWheel } from '@/contexts/SpinTheWheelContext';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import MysteryBox from '@/components/gamification/MysteryBox';
import SpinTheWheel from '@/components/gamification/SpinTheWheel';

const rewards = [
  { id: 1, name: "500 Points", value: 500, type: "points", color: "#4CAF50" },
  { id: 2, name: "Leadership Badge", value: "Leadership", type: "badge", color: "#2196F3" },
  { id: 3, name: "100 Points", value: 100, type: "points", color: "#FFC107" },
  { id: 4, name: "2x Multiplier", value: "2x", type: "multiplier", color: "#9C27B0" },
  { id: 5, name: "200 Points", value: 200, type: "points", color: "#F44336" },
  { id: 6, name: "Premium Course", value: "Premium", type: "course", color: "#3F51B5" },
  { id: 7, name: "50 Points", value: 50, type: "points", color: "#FF9800" },
  { id: 8, name: "Mystery Reward", value: "Mystery", type: "mystery", color: "#607D8B" },
];

const RewardsTab = () => {
  const [activeRewardsTab, setActiveRewardsTab] = useState('activities');
  const { openSpinTheWheel } = useSpinTheWheel();
  const [openMysteryBox, setOpenMysteryBox] = useState(false);
  const [mysteryBoxSpinning, setMysteryBoxSpinning] = useState(false);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  
  // Current points balance
  const currentPoints = 3750;
  // Points needed for next level
  const pointsForNextLevel = 5000;
  
  // Calculate progress percentage
  const progressPercentage = (currentPoints / pointsForNextLevel) * 100;
  
  return (
    <div className="space-y-6">
      {/* Mystery Box Dialog */}
      <MysteryBoxDialog open={openMysteryBox} onOpenChange={setOpenMysteryBox} />
      
      {/* Points Overview Card */}
      <Card className="bg-gradient-to-r from-primary/20 to-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold flex items-center">
                <Coins className="mr-2 h-6 w-6 text-primary" />
                <span>{currentPoints.toLocaleString()}</span>
                <Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30">Level 8</Badge>
              </h3>
              <p className="text-muted-foreground">Learning Points</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={openSpinTheWheel} className="gap-1">
                <Trophy className="h-4 w-4" />
                Spin Wheel
              </Button>
              <Button onClick={() => setOpenMysteryBox(true)} variant="outline" className="gap-1">
                <Gift className="h-4 w-4" />
                Mystery Box
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level 9</span>
              <span>{currentPoints} / {pointsForNextLevel}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      {/* Reward Activities and Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Spin the Wheel Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Spin the Wheel</CardTitle>
            <CardDescription>Spin to win amazing rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative">
              <SpinTheWheel 
                spinning={wheelSpinning} 
                segments={rewards} 
                onSpinComplete={() => setWheelSpinning(false)}
              />
              <Button 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                onClick={() => {
                  setWheelSpinning(true);
                  setTimeout(() => openSpinTheWheel(), 300);
                }}
              >
                Spin Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Mystery Box Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Mystery Box</CardTitle>
            <CardDescription>Open to discover surprise rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square relative">
              <MysteryBox isOpening={mysteryBoxSpinning} />
              <Button 
                variant="outline"
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                onClick={() => {
                  setMysteryBoxSpinning(true);
                  setTimeout(() => {
                    setOpenMysteryBox(true);
                    setMysteryBoxSpinning(false);
                  }, 300);
                }}
              >
                Open Box
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Rewards Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-md">Daily Rewards</CardTitle>
            <CardDescription>Check in daily for bonus rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {Array.from({ length: 7 }, (_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-md flex items-center justify-center border ${
                    i < 3 ? 'bg-primary/10 border-primary' : 'bg-muted/50 border-border'
                  }`}
                >
                  {i < 3 && <Sparkles className="h-5 w-5 text-primary" />}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4">3/7 days completed this week</p>
            <Button className="w-full gap-1">
              <GiftIcon className="h-4 w-4" />
              Claim Daily Reward
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Rewards Tabs */}
      <Tabs value={activeRewardsTab} onValueChange={setActiveRewardsTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activities">Reward Activities</TabsTrigger>
          <TabsTrigger value="history">Reward History</TabsTrigger>
          <TabsTrigger value="redeem">Redeem Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Complete Leadership Course</h3>
                    <p className="text-sm text-muted-foreground mb-2">Finish all modules to earn bonus points</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="gap-1">
                        <Coins className="h-3 w-3" />
                        500 Points
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wheel Spin Reward</h3>
                      <p className="text-sm text-muted-foreground">200 Points</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    May 15, 2023
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="redeem" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                    <Gift className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Premium Course Access</h3>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="gap-1">
                      <Coins className="h-3 w-3" />
                      1500 Points
                    </Badge>
                    <Button size="sm">Redeem</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsTab;
