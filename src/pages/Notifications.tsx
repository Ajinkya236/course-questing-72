
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  Bell, 
  BookOpen, 
  Award, 
  Calendar, 
  Gift, 
  ChevronRight, 
  UserPlus,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  RefreshCw,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Sample notification data
const allNotifications = [
  {
    id: '1',
    type: 'course_assigned',
    title: 'New Course Assigned',
    description: 'Leadership Fundamentals has been assigned to you',
    time: '2 hours ago',
    isRead: false,
    icon: UserPlus,
    link: '/course/leadership-101',
    accentColor: 'bg-blue-500'
  },
  {
    id: '2',
    type: 'course_due',
    title: 'Course Due Soon',
    description: 'Complete "Compliance Training" by end of week',
    time: '1 day ago',
    isRead: false,
    icon: Clock,
    link: '/course/compliance-2023',
    accentColor: 'bg-orange-500'
  },
  {
    id: '3',
    type: 'badge_earned',
    title: 'New Badge Earned',
    description: 'You earned the "Fast Learner" badge',
    time: '3 days ago',
    isRead: true,
    icon: Award,
    link: '/my-learning/badges',
    accentColor: 'bg-purple-500'
  },
  {
    id: '4',
    type: 'course_completed',
    title: 'Course Completed',
    description: "You've completed \"Data Analysis Basics\"",
    time: '1 week ago',
    isRead: true,
    icon: CheckCircle2,
    link: '/course/data-analysis-basics',
    accentColor: 'bg-green-500'
  },
  {
    id: '5',
    type: 'reward_available',
    title: 'Redeem Your Points',
    description: 'You have 5000 points ready to redeem',
    time: '1 week ago',
    isRead: true,
    icon: Gift,
    link: '/my-learning/rewards',
    accentColor: 'bg-pink-500'
  },
  {
    id: '6',
    type: 'course_recommendation',
    title: 'Recommended Course',
    description: 'Based on your interests: "Advanced Data Visualization"',
    time: '2 weeks ago',
    isRead: true,
    icon: BookOpen,
    link: '/course/data-visualization',
    accentColor: 'bg-cyan-500'
  },
  {
    id: '7',
    type: 'course_update',
    title: 'Course Updated',
    description: '"Project Management Fundamentals" has been updated with new content',
    time: '2 weeks ago',
    isRead: true,
    icon: RefreshCw,
    link: '/course/project-management',
    accentColor: 'bg-indigo-500'
  },
  {
    id: '8',
    type: 'deadline_approaching',
    title: 'Deadline Approaching',
    description: 'Complete "Security Awareness" in the next 3 days',
    time: '3 weeks ago',
    isRead: true,
    icon: Calendar,
    link: '/course/security-awareness',
    accentColor: 'bg-red-500'
  }
];

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(allNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const handleNotificationClick = (notification: any) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id 
          ? { ...n, isRead: true } 
          : n
      )
    );
    
    // Navigate to the link
    navigate(notification.link);
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast({
      title: "All notifications marked as read",
      description: "You've marked all your notifications as read."
    });
  };
  
  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been removed."
    });
  };
  
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notification.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });
  
  return (
    <>
      <Helmet>
        <title>Notifications | Learning Management System</title>
      </Helmet>
      <div className="container py-8 mb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {unreadCount} unread
            </Badge>
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4 mr-1" /> Clear all
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search notifications..."
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
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="unread">Unread Only</SelectItem>
                <SelectItem value="course_assigned">Course Assignments</SelectItem>
                <SelectItem value="course_due">Due Soon</SelectItem>
                <SelectItem value="badge_earned">Badge Earned</SelectItem>
                <SelectItem value="course_completed">Completed Courses</SelectItem>
                <SelectItem value="reward_available">Rewards</SelectItem>
                <SelectItem value="course_recommendation">Recommendations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;
                
                return (
                  <Card key={notification.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`} onClick={() => handleNotificationClick(notification)}>
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className={`rounded-full p-2 flex-shrink-0 ${notification.accentColor}`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="text-xs" onClick={(e) => {
                            e.stopPropagation();
                            handleNotificationClick(notification);
                          }}>
                            View Details <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-1">No notifications</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "No matching notifications found." : "You're all caught up!"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="courses">
            {/* Filter for course related notifications */}
            <div className="space-y-4">
              {filteredNotifications
                .filter(n => ['course_assigned', 'course_due', 'course_completed', 'course_recommendation', 'course_update'].includes(n.type))
                .map((notification) => {
                  const IconComponent = notification.icon;
                  
                  return (
                    <Card key={notification.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`} onClick={() => handleNotificationClick(notification)}>
                      <CardContent className="flex items-start gap-4 p-4">
                        <div className={`rounded-full p-2 flex-shrink-0 ${notification.accentColor}`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                              View Details <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
          
          <TabsContent value="rewards">
            {/* Filter for rewards related notifications */}
            <div className="space-y-4">
              {filteredNotifications
                .filter(n => ['reward_available', 'badge_earned'].includes(n.type))
                .map((notification) => {
                  const IconComponent = notification.icon;
                  
                  return (
                    <Card key={notification.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`} onClick={() => handleNotificationClick(notification)}>
                      <CardContent className="flex items-start gap-4 p-4">
                        <div className={`rounded-full p-2 flex-shrink-0 ${notification.accentColor}`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                              View Details <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
          
          <TabsContent value="system">
            {/* Filter for system related notifications */}
            <div className="space-y-4">
              {filteredNotifications
                .filter(n => ['deadline_approaching'].includes(n.type))
                .map((notification) => {
                  const IconComponent = notification.icon;
                  
                  return (
                    <Card key={notification.id} className={`cursor-pointer hover:shadow-md transition-shadow ${!notification.isRead ? 'border-l-4 border-l-primary' : ''}`} onClick={() => handleNotificationClick(notification)}>
                      <CardContent className="flex items-start gap-4 p-4">
                        <div className={`rounded-full p-2 flex-shrink-0 ${notification.accentColor}`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                              View Details <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
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

export default Notifications;
