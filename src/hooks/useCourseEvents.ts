
import { useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type CourseEventHandler = (courseId: string, title: string) => void;

// Simple event bus to replace direct DOM events
const eventHandlers: {
  [key: string]: CourseEventHandler[];
} = {
  'share': [],
  'assign': [],
  'bookmark': [],
  'watch': []
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

  const handleWatchClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCourseEvent('watch', courseId, title);
    // Redirect to course player happens in the CourseCard component
  }, [courseId, title]);

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCourseEvent('share', courseId, title);
    
    toast({
      title: "Sharing Course",
      description: `Opening sharing options for "${title}"`,
    });
  }, [courseId, title, toast]);

  const handleAssignClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCourseEvent('assign', courseId, title);
    
    toast({
      title: "Assigning Course",
      description: `Opening assignment options for "${title}"`,
    });
  }, [courseId, title, toast]);

  const handleBookmarkToggle = useCallback((e: React.MouseEvent, isBookmarked: boolean) => {
    e.stopPropagation();
    const newBookmarked = !isBookmarked;
    
    // Trigger event for other components to react
    triggerCourseEvent('bookmark', courseId, title);
    
    return newBookmarked;
  }, [courseId, title]);

  return {
    handleWatchClick,
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
  onWatch?: () => void,
  onShare?: () => void,
  onAssign?: () => void,
  onBookmark?: (newState: boolean) => void
) {
  useEffect(() => {
    const removeWatchListener = addCourseEventListener('watch', (id) => {
      if (id === courseId && onWatch) {
        onWatch();
      }
    });
  
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
      removeWatchListener();
      removeShareListener();
      removeAssignListener();
      removeBookmarkListener();
    };
  }, [courseId, onWatch, onShare, onAssign, onBookmark]);
}
