
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Star, 
  BookOpen, 
  CheckCircle2, 
  Calendar, 
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Sample actionable data
const allActionables = [
  {
    id: '1',
    title: 'Complete Leadership Fundamentals',
    description: 'This course is due in 3 days. You have completed 2 out of 8 modules.',
    dueDate: '2023-08-15',
    type: 'course_due',
    priority: 'high',
    progress: 25,
    courseId: 'leadership-101',
    icon: BookOpen,
  },
  {
    id: '2',
    title: 'Rate Marketing Strategy Course',
    description: 'Your feedback is requested for the course you completed last week.',
    dueDate: '2023-08-12',
    type: 'feedback_requested',
    priority: 'medium',
    courseId: 'marketing-strategy',
    icon: Star,
  },
  {
    id: '3',
    title: 'Complete Compliance Training',
    description: 'Mandatory training required by company policy. Due in 5 days.',
    dueDate: '2023-08-17',
    type: 'course_due',
    priority: 'high',
    progress: 75,
    courseId: 'compliance-2023',
    icon: BookOpen,
  },
  {
    id: '4',
    title: 'Start Data Analysis Course',
    description: 'Recommended based on your career path. Should be completed within 4 weeks.',
    dueDate: '2023-09-01',
    type: 'course_recommended',
    priority: 'low',
    courseId: 'data-analysis',
    icon: BookOpen,
  },
  {
    id: '5',
    title: 'Complete Quarterly Assessment',
    description: 'Required assessment to track your progress. Due in 10 days.',
    dueDate: '2023-08-22',
    type: 'assessment_due',
    priority: 'medium',
    progress: 0,
    courseId: 'quarterly-assessment',
    icon: CheckCircle2,
  },
  {
    id: '6',
    title: 'Register for Leadership Workshop',
    description: 'Virtual workshop on effective leadership. Limited spots available.',
    dueDate: '2023-08-18',
    type: 'event_registration',
    priority: 'medium',
    courseId: 'leadership-workshop',
    icon: Calendar,
  },
  {
    id: '7',
    title: 'Update Learning Goals',
    description: 'Quarterly review of your learning goals and progress.',
    dueDate: '2023-08-30',
    type: 'learning_plan',
    priority: 'low',
    courseId: 'learning-goals',
    icon: CheckCircle2,
  },
  {
    id: '8',
    title: 'Complete Project Management Assessment',
    description: 'Assessment to evaluate your project management skills.',
    dueDate: '2023-08-25',
    type: 'assessment_due',
    priority: 'high',
    progress: 10,
    courseId: 'project-management-assessment',
    icon: CheckCircle2,
  }
];

const Actionables = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [actionables, setActionables] = useState(allActionables);
  
  const handleActionableClick = (actionable: any) => {
    navigate(`/course/${actionable.courseId}`);
  };
  
  const filteredActionables = actionables.filter(actionable => {
    const matchesSearch = actionable.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          actionable.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filter === 'all') return true;
    if (filter === 'high') return actionable.priority === 'high';
    if (filter === 'medium') return actionable.priority === 'medium';
    if (filter === 'low') return actionable.priority === 'low';
    return actionable.type === filter;
  });
  
  const sortedActionables = [...filteredActionables].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sortBy === 'priority') {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority as 'high' | 'medium' | 'low'] - priorityValue[a.priority as 'high' | 'medium' | 'low'];
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };
  
  const getDueDateText = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return <span className="text-red-500">Overdue</span>;
    }
    if (diffDays === 0) {
      return <span className="text-red-500">Due today</span>;
    }
    if (diffDays === 1) {
      return <span className="text-orange-500">Due tomorrow</span>;
    }
    if (diffDays <= 3) {
      return <span className="text-orange-500">Due in {diffDays} days</span>;
    }
    return <span className="text-green-500">Due in {diffDays} days</span>;
  };
  
  return (
    <>
      <Helmet>
        <title>Actionables | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Actionables</h1>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search actionables..."
              className="rounded-lg bg-secondary pl-9 pr-4 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-primary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actionables</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="course_due">Courses Due</SelectItem>
                <SelectItem value="assessment_due">Assessments</SelectItem>
                <SelectItem value="feedback_requested">Feedback Requested</SelectItem>
                <SelectItem value="event_registration">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {sortedActionables.length > 0 ? (
              sortedActionables.map((actionable) => {
                const IconComponent = actionable.icon;
                
                return (
                  <Card key={actionable.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleActionableClick(actionable)}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 flex-shrink-0 bg-primary/20">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{actionable.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{actionable.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {getPriorityBadge(actionable.priority)}
                              <span className="text-xs">{getDueDateText(actionable.dueDate)}</span>
                            </div>
                          </div>
                          
                          {actionable.progress !== undefined && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{actionable.progress}%</span>
                              </div>
                              <Progress value={actionable.progress} className="h-2" />
                            </div>
                          )}
                          
                          <div className="flex justify-end mt-3">
                            <Button variant="default" size="sm">
                              {actionable.type === 'feedback_requested' ? 'Provide Feedback' : 
                               actionable.type === 'event_registration' ? 'Register' : 
                               actionable.type === 'learning_plan' ? 'Update' : 
                               actionable.progress === 0 ? 'Start' : 'Continue'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No actionables</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No matching actionables found." : "You're all caught up!"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="courses">
            {/* Filter for course related actionables */}
            <div className="space-y-4">
              {sortedActionables
                .filter(a => ['course_due', 'course_recommended'].includes(a.type))
                .map((actionable) => {
                  const IconComponent = actionable.icon;
                  
                  return (
                    <Card key={actionable.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleActionableClick(actionable)}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full p-2 flex-shrink-0 bg-primary/20">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{actionable.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{actionable.description}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                {getPriorityBadge(actionable.priority)}
                                <span className="text-xs">{getDueDateText(actionable.dueDate)}</span>
                              </div>
                            </div>
                            
                            {actionable.progress !== undefined && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{actionable.progress}%</span>
                                </div>
                                <Progress value={actionable.progress} className="h-2" />
                              </div>
                            )}
                            
                            <div className="flex justify-end mt-3">
                              <Button variant="default" size="sm">
                                {actionable.progress === 0 ? 'Start' : 'Continue'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
          
          <TabsContent value="assessments">
            {/* Filter for assessment related actionables */}
            <div className="space-y-4">
              {sortedActionables
                .filter(a => ['assessment_due'].includes(a.type))
                .map((actionable) => {
                  const IconComponent = actionable.icon;
                  
                  return (
                    <Card key={actionable.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleActionableClick(actionable)}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full p-2 flex-shrink-0 bg-primary/20">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{actionable.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{actionable.description}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                {getPriorityBadge(actionable.priority)}
                                <span className="text-xs">{getDueDateText(actionable.dueDate)}</span>
                              </div>
                            </div>
                            
                            {actionable.progress !== undefined && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{actionable.progress}%</span>
                                </div>
                                <Progress value={actionable.progress} className="h-2" />
                              </div>
                            )}
                            
                            <div className="flex justify-end mt-3">
                              <Button variant="default" size="sm">
                                {actionable.progress === 0 ? 'Start' : 'Continue'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
          
          <TabsContent value="others">
            {/* Filter for other actionables */}
            <div className="space-y-4">
              {sortedActionables
                .filter(a => ['feedback_requested', 'event_registration', 'learning_plan'].includes(a.type))
                .map((actionable) => {
                  const IconComponent = actionable.icon;
                  
                  return (
                    <Card key={actionable.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleActionableClick(actionable)}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full p-2 flex-shrink-0 bg-primary/20">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{actionable.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{actionable.description}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                {getPriorityBadge(actionable.priority)}
                                <span className="text-xs">{getDueDateText(actionable.dueDate)}</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-end mt-3">
                              <Button variant="default" size="sm">
                                {actionable.type === 'feedback_requested' ? 'Provide Feedback' : 
                                 actionable.type === 'event_registration' ? 'Register' : 'Update'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Actionables;
