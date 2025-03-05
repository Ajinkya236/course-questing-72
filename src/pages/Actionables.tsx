
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, BookOpen, Star, Clock, AlertCircle, CheckCircle2, CalendarClock, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock actionables data
const actionablesData = {
  pending: [
    {
      id: "1",
      title: "Complete Leadership Course",
      description: "3 days remaining",
      type: "course",
      priority: "high",
      dueDate: "2023-10-28",
      courseId: "leadership101",
    },
    {
      id: "2",
      title: "Review Project Management Fundamentals",
      description: "5 days remaining",
      type: "course",
      priority: "medium",
      dueDate: "2023-10-30",
      courseId: "pm101",
    },
    {
      id: "3",
      title: "Submit Communication Skills Assessment",
      description: "2 days remaining",
      type: "assessment",
      priority: "high",
      dueDate: "2023-10-27",
      courseId: "comm101",
    },
    {
      id: "4",
      title: "Rate Marketing Strategy Course",
      description: "Feedback requested",
      type: "feedback",
      priority: "low",
      dueDate: "2023-11-05",
      courseId: "marketing101",
    },
    {
      id: "5",
      title: "Complete mandatory IT Security Training",
      description: "Required by company policy",
      type: "mandatory",
      priority: "critical",
      dueDate: "2023-10-25",
      courseId: "security101",
    },
    {
      id: "6",
      title: "Watch Introduction to Data Science",
      description: "Recommended for your role",
      type: "recommended",
      priority: "medium",
      dueDate: "2023-11-10",
      courseId: "data101",
    },
  ],
  completed: [
    {
      id: "7",
      title: "Python Programming Fundamentals",
      description: "Completed on Oct 15, 2023",
      type: "course",
      completedDate: "2023-10-15",
      courseId: "python101",
    },
    {
      id: "8",
      title: "Digital Marketing Certification",
      description: "Completed on Oct 10, 2023",
      type: "certification",
      completedDate: "2023-10-10",
      courseId: "digi101",
    },
    {
      id: "9",
      title: "Team Management Workshop",
      description: "Completed on Oct 5, 2023",
      type: "workshop",
      completedDate: "2023-10-05",
      courseId: "team101",
    },
    {
      id: "10",
      title: "Annual Compliance Training",
      description: "Completed on Sep 28, 2023",
      type: "mandatory",
      completedDate: "2023-09-28",
      courseId: "compliance101",
    },
  ]
};

const Actionables = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Actionables | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Actionables</h1>
        </div>
        
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Pending ({actionablesData.pending.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed ({actionablesData.completed.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {actionablesData.pending.map((actionable) => (
              <ActionableCard 
                key={actionable.id} 
                actionable={actionable} 
                status="pending"
                onAction={(id) => navigate(`/course/${actionable.courseId}`)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {actionablesData.completed.map((actionable) => (
              <ActionableCard 
                key={actionable.id} 
                actionable={actionable} 
                status="completed"
                onAction={(id) => navigate(`/course/${actionable.courseId}`)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

const ActionableCard = ({ 
  actionable, 
  status, 
  onAction 
}: { 
  actionable: any; 
  status: "pending" | "completed";
  onAction: (id: string) => void;
}) => {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-green-500 text-white";
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course": return <BookOpen className="h-5 w-5" />;
      case "assessment": return <Target className="h-5 w-5" />;
      case "feedback": return <Star className="h-5 w-5" />;
      case "mandatory": return <AlertCircle className="h-5 w-5" />;
      case "certification": return <Badge className="h-5 w-5" />;
      case "workshop": return <BookOpen className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };
  
  const getActionButton = (status: string, type: string) => {
    if (status === "completed") {
      return (
        <Button variant="outline" onClick={() => onAction(actionable.id)}>
          View Details
        </Button>
      );
    }
    
    switch (type) {
      case "course":
        return (
          <Button onClick={() => onAction(actionable.id)}>
            Resume
          </Button>
        );
      case "assessment":
        return (
          <Button onClick={() => onAction(actionable.id)}>
            Take Assessment
          </Button>
        );
      case "feedback":
        return (
          <Button variant="outline" onClick={() => onAction(actionable.id)}>
            Give Feedback
          </Button>
        );
      default:
        return (
          <Button onClick={() => onAction(actionable.id)}>
            Start
          </Button>
        );
    }
  };
  
  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${status === "completed" ? "bg-green-100 text-green-600" : "bg-secondary text-primary"}`}>
              {getTypeIcon(actionable.type)}
            </div>
            <div>
              <CardTitle className="text-base mb-1">{actionable.title}</CardTitle>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">{actionable.description}</div>
                {actionable.priority && (
                  <Badge className={`${getPriorityColor(actionable.priority)}`}>
                    {actionable.priority}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {status === "pending" && actionable.dueDate && (
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarClock className="h-4 w-4 mr-1" />
                Due: {new Date(actionable.dueDate).toLocaleDateString()}
              </div>
            )}
            {getActionButton(status, actionable.type)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Actionables;
