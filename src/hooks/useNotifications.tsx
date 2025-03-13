
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface Notification {
  id: string;
  type: string;
  title: string;
  description: string;
  link: string;
  icon: string;
  accentColor: string;
  isRead: boolean;
  createdAt: string;
  category: 'course' | 'reward' | 'system';
}

export function useNotifications() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Fetch notifications
  const fetchNotifications = async (limit?: number) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        const formattedNotifications: Notification[] = data.map(item => ({
          id: item.id,
          type: item.type,
          title: item.title,
          description: item.description || '',
          link: item.link || '#',
          icon: item.icon || 'Bell',
          accentColor: item.accent_color || 'bg-primary',
          isRead: item.is_read,
          createdAt: item.created_at,
          category: mapTypeToCategory(item.type)
        }));
        
        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.filter(n => !n.isRead).length);
      }
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
      
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
      
      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      
      setUnreadCount(0);
      
      toast({
        title: 'All notifications marked as read',
        description: 'Your notifications have been marked as read'
      });
      
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Action failed',
        description: error.message || 'An error occurred',
        variant: 'destructive'
      });
    }
  };
  
  // Helper function to map notification type to category
  const mapTypeToCategory = (type: string): 'course' | 'reward' | 'system' => {
    const courseTypes = ['course_assigned', 'course_due', 'course_completed', 'new_course_available'];
    const rewardTypes = ['badge_earned', 'reward_available', 'points_earned'];
    
    if (courseTypes.includes(type)) return 'course';
    if (rewardTypes.includes(type)) return 'reward';
    return 'system';
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead
  };
}
