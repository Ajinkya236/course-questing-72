
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Flag, Clock } from 'lucide-react';

interface AssessmentSidebarProps {
  skillName: string;
  passRate: number;
}

const AssessmentSidebar: React.FC<AssessmentSidebarProps> = ({
  skillName,
  passRate
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-archivo-black text-gray-700">Assessment Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-sm">
          <p>This assessment tests your knowledge and proficiency in {skillName}.</p>
          
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-red-500" />
            <span>You can flag questions to review later</span>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span>Time Limit</span>
              <span>None</span>
            </div>
            <div className="flex items-center justify-between mb-1">
              <span>Passing Score</span>
              <span className="font-medium text-green-600">{passRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Attempts</span>
              <span>Unlimited</span>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <h4 className="font-medium mb-2">Question Types</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Multiple Choice</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>True/False</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                <span>Short Answer</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>Document Analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span>Video Response</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentSidebar;
