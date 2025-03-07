
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  BookOpen, 
  Award, 
  Calendar, 
  Gift, 
  Star, 
  ChevronRight, 
  UserPlus,
  Clock,
  CheckCircle2
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

interface NotificationsPanelProps {
  onClose: () => void;
}

// Sample notification data
const notifications = [
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
  }
];

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ onClose }) => {
  const navigate = useNavigate();
  
  const handleNotificationClick = (link: string) => {
    navigate(link);
    onClose();
  };
  
  const handleViewAll = () => {
    navigate('/notifications');
    onClose();
  };
  
  return (
    <div className="flex flex-col h-[450px]">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Notifications</h3>
        </div>
        <Badge variant="secondary" className="rounded-full px-2.5">
          {notifications.filter(n => !n.isRead).length} new
        </Badge>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            
            return (
              <div 
                key={notification.id}
                className={`p-4 flex gap-3 cursor-pointer hover:bg-secondary/50 ${!notification.isRead ? 'bg-secondary/30' : ''}`}
                onClick={() => handleNotificationClick(notification.link)}
              >
                <div className={`rounded-full p-2 h-10 w-10 flex items-center justify-center ${notification.accentColor}`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-1"
          onClick={handleViewAll}
        >
          View All Notifications
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
