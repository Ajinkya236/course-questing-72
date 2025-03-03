
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award, Medal } from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  points: number;
  position: number;
}

interface LeaderboardCardProps {
  users: LeaderboardUser[];
  currentUser?: LeaderboardUser;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ users, currentUser }) => {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="font-medium text-muted-foreground">{position}</span>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.slice(0, 5).map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-2 rounded-lg ${
                user.id === currentUser?.id ? "bg-primary/10" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {getPositionIcon(user.position)}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="badge-glow">
                <span className="font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {user.points.toLocaleString()} pts
                </span>
              </div>
            </div>
          ))}

          {currentUser && currentUser.position > 5 && (
            <>
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">
                    Your Ranking
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    <span className="font-medium text-muted-foreground">{currentUser.position}</span>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{currentUser.name}</span>
                </div>
                <div className="badge-glow">
                  <span className="font-bold bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {currentUser.points.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
