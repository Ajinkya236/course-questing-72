
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRank, RewardsData } from '@/components/rewards/types';
import { Trophy, Award, Star, Clock } from 'lucide-react';

interface RewardsTabProps {
  teamMemberId?: string;
}

// Sample user data for leaderboard
const sampleUsers: UserRank[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    points: 950,
    position: 1,
    positionChange: 0,
    department: 'Engineering',
    segment: 'Tech',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    points: 820,
    position: 2,
    positionChange: 1,
    department: 'Marketing',
    segment: 'Business',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126',
    points: 760,
    position: 3,
    positionChange: -1,
    department: 'Sales',
    segment: 'Business',
  },
  {
    id: '4',
    name: 'Emily Williams',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    points: 710,
    position: 4,
    positionChange: 2,
    department: 'HR',
    segment: 'Operations',
  },
  {
    id: '5',
    name: 'David Brown',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    points: 690,
    position: 5,
    positionChange: -1,
    department: 'Finance',
    segment: 'Operations',
  },
];

// Sample rewards data
const rewardsData: RewardsData = {
  points: 1250,
  rank: 3,
  badges: 12,
  streakDays: 24,
  completedCourses: 15,
  totalPoints: 1250,
  nextRewardThreshold: 2000,
  multiplier: 2,
  nextMilestone: {
    points: 2000,
    reward: 'Gold Badge'
  },
  streak: {
    current: 24,
    longest: 30
  },
  pointsBreakdown: {
    courses: 500,
    quizzes: 300,
    assignments: 200,
    engagement: 150,
    special: 100,
    coursesCompleted: 500,
    quizzesPassed: 300,
    dailyLogins: 150,
    voluntaryActivities: 200,
    streakBonus: 100
  },
  courseWisePoints: [
    {
      id: 'c1',
      courseName: 'Leadership Essentials',
      points: 250,
      totalPoints: 250,
      breakdown: {
        completion: 100,
        quizzes: 75,
        assignments: 50,
        participation: 25
      }
    },
    {
      id: 'c2',
      courseName: 'Data Science Fundamentals',
      points: 200,
      totalPoints: 200,
      breakdown: {
        completion: 100,
        quizzes: 50,
        assignments: 25,
        participation: 25
      }
    }
  ],
  redeemablePoints: 1000
};

// Sample badges/achievements
const badges = [
  {
    id: '1',
    name: 'Quick Learner',
    description: 'Completed 5 courses in your first month',
    icon: <Award className="h-10 w-10 text-primary" />,
    earnedDate: '2023-06-15',
  },
  {
    id: '2',
    name: 'Consistent Learner',
    description: 'Maintained a 30-day learning streak',
    icon: <Clock className="h-10 w-10 text-orange-500" />,
    earnedDate: '2023-07-10',
  },
  {
    id: '3',
    name: 'Expert Communicator',
    description: 'Completed all Communication pathway courses',
    icon: <Star className="h-10 w-10 text-yellow-500" />,
    earnedDate: '2023-08-22',
  },
];

const RewardsTab: React.FC<RewardsTabProps> = ({ teamMemberId }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Learning Rewards</CardTitle>
          <CardDescription>
            Track your learning achievements, points, and badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <Trophy className="h-12 w-12 text-yellow-500 mb-2" />
                <p className="text-3xl font-bold">{rewardsData.points}</p>
                <p className="text-sm text-muted-foreground">Learning Points</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <Award className="h-12 w-12 text-primary mb-2" />
                <p className="text-3xl font-bold">{rewardsData.badges}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                <Star className="h-12 w-12 text-orange-500 mb-2" />
                <p className="text-3xl font-bold">{rewardsData.streakDays}</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="leaderboard">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="badges">My Badges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leaderboard">
              <div className="space-y-4">
                {sampleUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-bold w-6 text-center">{user.position}</span>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.department}</p>
                      </div>
                    </div>
                    <div className="font-semibold">{user.points} pts</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge) => (
                  <Card key={badge.id}>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="mt-2 mb-3">{badge.icon}</div>
                      <h3 className="font-bold">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                      <p className="text-xs">Earned: {new Date(badge.earnedDate).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsTab;
