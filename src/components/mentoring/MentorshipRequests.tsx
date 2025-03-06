
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Users,
  UserPlus, 
  GraduationCap
} from 'lucide-react';

const MentorshipRequests = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-lg border mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="md:flex-1">
          <h3 className="text-xl font-semibold mb-2">Get Started with Mentoring</h3>
          <p className="text-muted-foreground mb-4">
            Connect with experienced professionals who can guide your career growth or share your knowledge by becoming a mentor.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Find a Mentor
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Become a Mentor
            </Button>
          </div>
        </div>
        <div className="rounded-lg bg-primary/10 p-4 md:w-[280px]">
          <h4 className="font-medium mb-2">Benefits of Mentoring</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-1" />
              <span className="text-sm">Personalized guidance and feedback</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-1" />
              <span className="text-sm">Accelerated skill development</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-1" />
              <span className="text-sm">Expanded professional network</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-1" />
              <span className="text-sm">Knowledge sharing opportunities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequests;
