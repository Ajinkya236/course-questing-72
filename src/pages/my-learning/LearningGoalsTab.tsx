
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Plus, Clock, Check, Target } from 'lucide-react';

interface LearningGoalsTabProps {
  teamMemberId?: string;
}

const LearningGoalsTab: React.FC<LearningGoalsTabProps> = ({ teamMemberId }) => {
  // Mock data - in a real app, we'd fetch data based on teamMemberId if provided
  const goals = [
    {
      id: 1,
      title: 'Complete Data Analysis Course',
      description: 'Finish the advanced data analysis course and apply skills to current project.',
      progress: 75,
      dueDate: '2023-12-31',
      status: 'in-progress',
      tags: ['Technical', 'Data', 'Priority']
    },
    {
      id: 2,
      title: 'Improve Leadership Skills',
      description: 'Take leadership workshops and apply learnings in team meetings.',
      progress: 40,
      dueDate: '2024-02-15',
      status: 'in-progress',
      tags: ['Soft Skills', 'Leadership']
    },
    {
      id: 3,
      title: 'Obtain Project Management Certification',
      description: 'Study for and pass the PMP certification exam.',
      progress: 100,
      dueDate: '2023-10-01',
      status: 'completed',
      tags: ['Certification', 'Project Management']
    },
    {
      id: 4,
      title: 'Learn JavaScript Frameworks',
      description: 'Complete training on React, Vue, and Angular.',
      progress: 0,
      dueDate: '2024-04-30',
      status: 'not-started',
      tags: ['Technical', 'Web Development']
    }
  ];

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const inProgressGoals = goals.filter(goal => goal.status === 'in-progress').length;
  const notStartedGoals = goals.filter(goal => goal.status === 'not-started').length;
  const completionPercentage = Math.round((completedGoals / totalGoals) * 100);

  return (
    <div className="space-y-8">
      {/* Goals Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-2">Goals Progress</h3>
          <div className="flex items-center gap-4">
            <Progress value={completionPercentage} className="h-2 flex-1" />
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{notStartedGoals}</p>
              <p className="text-sm text-muted-foreground">Not Started</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{inProgressGoals}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{completedGoals}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button - Don't show when viewing team member's goals */}
      {!teamMemberId && (
        <div className="flex justify-end">
          <Button><Plus className="mr-2 h-4 w-4" /> Set New Goal</Button>
        </div>
      )}
      
      {/* Goals List */}
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map(goal => (
          <Card key={goal.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                {goal.status === 'completed' ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">Completed</Badge>
                ) : goal.status === 'in-progress' ? (
                  <Badge variant="secondary">In Progress</Badge>
                ) : (
                  <Badge variant="outline">Not Started</Badge>
                )}
              </div>
              <CardDescription>{goal.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
                <div className="flex gap-1 mt-3 flex-wrap">
                  {goal.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>Due {new Date(goal.dueDate).toLocaleDateString()}</span>
              </div>
              {!teamMemberId && (
                <Button size="sm" variant="ghost">Update</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningGoalsTab;
