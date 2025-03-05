
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Search, Bell, Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

// Sample notification data (reusing from NotificationsPanel)
const mockNotifications = [
  {
    id: '1',
    type: 'course_assigned',
    title: 'New Course Assigned',
    description: 'Leadership Fundamentals has been assigned to you',
    time: '2 hours ago',
    isRead: false,
    icon: 'UserPlus',
    link: '/course/leadership-101',
    accentColor: 'bg-blue-500',
    category: 'course'
  },
  {
    id: '2',
    type: 'course_due',
    title: 'Course Due Soon',
    description: 'Complete "Compliance Training" by end of week',
    time: '1 day ago',
    isRead: false,
    icon: 'Clock',
    link: '/course/compliance-2023',
    accentColor: 'bg-orange-500',
    category: 'course'
  },
  {
    id: '3',
    type: 'badge_earned',
    title: 'New Badge Earned',
    description: 'You earned the "Fast Learner" badge',
    time: '3 days ago',
    isRead: true,
    icon: 'Award',
    link: '/my-learning/badges',
    accentColor: 'bg-purple-500',
    category: 'reward'
  },
  {
    id: '4',
    type: 'course_completed',
    title: 'Course Completed',
    description: "You've completed \"Data Analysis Basics\"",
    time: '1 week ago',
    isRead: true,
    icon: 'CheckCircle2',
    link: '/course/data-analysis-basics',
    accentColor: 'bg-green-500',
    category: 'course'
  },
  {
    id: '5',
    type: 'reward_available',
    title: 'Redeem Your Points',
    description: 'You have 5000 points ready to redeem',
    time: '1 week ago',
    isRead: true,
    icon: 'Gift',
    link: '/my-learning/rewards',
    accentColor: 'bg-pink-500',
    category: 'reward'
  },
  {
    id: '6',
    type: 'system_maintenance',
    title: 'System Maintenance',
    description: 'Platform will be down for maintenance on Sunday 2AM-4AM',
    time: '2 weeks ago',
    isRead: true,
    icon: 'AlertCircle',
    link: '#',
    accentColor: 'bg-gray-500',
    category: 'system'
  },
  {
    id: '7',
    type: 'new_course_available',
    title: 'New Course Available',
    description: '"Advanced Data Science" is now available based on your interests',
    time: '2 weeks ago',
    isRead: true,
    icon: 'BookOpen',
    link: '/course/advanced-data-science',
    accentColor: 'bg-indigo-500',
    category: 'course'
  },
  {
    id: '8',
    type: 'learning_path_update',
    title: 'Learning Path Updated',
    description: 'Your leadership path has new recommended courses',
    time: '3 weeks ago',
    isRead: true,
    icon: 'Map',
    link: '/learning-paths/leadership',
    accentColor: 'bg-emerald-500',
    category: 'system'
  }
];

const Notifications = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || notification.category === activeTab;
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };
  
  // Mark single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };
  
  // Handle notification click
  const handleNotificationClick = (id: string, link: string) => {
    markAsRead(id);
    navigate(link);
  };
  
  // Get icon component by name (simplified version)
  const getIconComponent = (iconName: string) => {
    return <div className="flex items-center justify-center h-10 w-10"></div>;
  };

  // Count unread by category
  const getUnreadCount = (category: string) => {
    return notifications.filter(n => !n.isRead && (category === 'all' || n.category === category)).length;
  };

  return (
    <>
      <Helmet>
        <title>Notifications | Learning Management System</title>
      </Helmet>
      
      <div className="container py-8 mb-20">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notifications..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-4 max-w-md">
            <TabsTrigger value="all" className="relative">
              All
              {getUnreadCount('all') > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {getUnreadCount('all')}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="course" className="relative">
              Courses
              {getUnreadCount('course') > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {getUnreadCount('course')}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reward" className="relative">
              Rewards
              {getUnreadCount('reward') > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {getUnreadCount('reward')}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="system" className="relative">
              System
              {getUnreadCount('system') > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {getUnreadCount('system')}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Notifications list */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="divide-y">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 flex gap-4 cursor-pointer hover:bg-secondary/50 ${!notification.isRead ? 'bg-secondary/30' : ''}`}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                >
                  <div className={`rounded-full p-2 h-10 w-10 flex items-center justify-center ${notification.accentColor}`}>
                    {/* We'll use a placeholder for the icon since we don't have dynamic icon loading */}
                    <div className="h-5 w-5 bg-white/80 rounded-sm"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Notifications;
