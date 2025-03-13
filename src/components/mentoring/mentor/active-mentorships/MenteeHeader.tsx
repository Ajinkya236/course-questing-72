
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface MenteeData {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastActive: string;
}

interface MenteeHeaderProps {
  menteeData: MenteeData;
}

const MenteeHeader: React.FC<MenteeHeaderProps> = ({ menteeData }) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={menteeData?.avatar} alt={menteeData?.name} />
            <AvatarFallback>{menteeData?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{menteeData?.name}</CardTitle>
            <CardDescription>
              {menteeData?.role} · Last active: {menteeData?.lastActive}
            </CardDescription>
          </div>
        </div>
        <Badge variant="outline" className="px-2 py-0.5">Active</Badge>
      </div>
    </CardHeader>
  );
};

export default MenteeHeader;
