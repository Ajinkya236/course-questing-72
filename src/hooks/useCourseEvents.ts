
import { useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type CourseEventHandler = (courseId: string, title: string) => void;

// Simple event bus to replace direct DOM events
const eventHandlers: {
  [key: string]: CourseEventHandler[];
} = {
  'share': [],
  'assign': [],
  'bookmark': []
};

// Add event listener
export const addCourseEventListener = (event: string, handler: CourseEventHandler) => {
  if (!eventHandlers[event]) {
    eventHandlers[event] = [];
  }
  eventHandlers[event].push(handler);
  
  // Return function to remove listener
  return () => {
    eventHandlers[event] = eventHandlers[event].filter(h => h !== handler);
  };
};

// Trigger event
export const triggerCourseEvent = (event: string, courseId: string, title: string) => {
  if (eventHandlers[event]) {
    eventHandlers[event].forEach(handler => handler(courseId, title));
  }
};

/**
 * Custom hook for handling course card events
 */
export function useCourseEvents(courseId: string, title: string) {
  const { toast } = useToast();

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCourseEvent('share', courseId, title);
  }, [courseId, title]);

  const handleAssignClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCourseEvent('assign', courseId, title);
  }, [courseId, title]);

  const handleBookmarkToggle = useCallback((e: React.MouseEvent, isBookmarked: boolean) => {
    e.stopPropagation();
    const newBookmarked = !isBookmarked;
    
    // Show toast
    toast({
      title: newBookmarked ? "Course Saved" : "Course Removed",
      description: newBookmarked 
        ? `"${title}" has been added to your saved courses` 
        : `"${title}" has been removed from your saved courses`,
    });
    
    // Trigger event for other components to react
    triggerCourseEvent('bookmark', courseId, title);
    
    return newBookmarked;
  }, [courseId, title, toast]);

  return {
    handleShareClick,
    handleAssignClick,
    handleBookmarkToggle
  };
}

/**
 * Custom hook for listening to course events
 */
export function useCourseEventListener(
  courseId: string, 
  onShare?: () => void,
  onAssign?: () => void,
  onBookmark?: (newState: boolean) => void
) {
  useEffect(() => {
    const removeShareListener = addCourseEventListener('share', (id) => {
      if (id === courseId && onShare) {
        onShare();
      }
    });
    
    const removeAssignListener = addCourseEventListener('assign', (id) => {
      if (id === courseId && onAssign) {
        onAssign();
      }
    });
    
    const removeBookmarkListener = addCourseEventListener('bookmark', (id) => {
      if (id === courseId && onBookmark) {
        // The actual state will be managed in the component
        onBookmark(true);
      }
    });
    
    return () => {
      removeShareListener();
      removeAssignListener();
      removeBookmarkListener();
    };
  }, [courseId, onShare, onAssign, onBookmark]);
}
