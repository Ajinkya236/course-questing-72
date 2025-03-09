
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
  
  // Check if handler already exists to prevent duplicates
  if (!eventHandlers[event].includes(handler)) {
    eventHandlers[event].push(handler);
  }
  
  // Return function to remove listener
  return () => {
    eventHandlers[event] = eventHandlers[event].filter(h => h !== handler);
  };
};

// Trigger event with improved error handling
export const triggerCourseEvent = (event: string, courseId: string, title: string) => {
  try {
    if (eventHandlers[event]) {
      console.log(`Triggering ${event} event for course: ${courseId} - ${title}`);
      eventHandlers[event].forEach(handler => handler(courseId, title));
    } else {
      console.warn(`No handlers registered for event: ${event}`);
    }
  } catch (error) {
    console.error(`Error triggering ${event} event:`, error);
  }
};

/**
 * Custom hook for handling course card events
 */
export function useCourseEvents(courseId: string, title: string) {
  const { toast } = useToast();

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Show toast for feedback
    toast({
      title: "Sharing Course",
      description: `Preparing to share "${title}"`,
    });
    
    triggerCourseEvent('share', courseId, title);
  }, [courseId, title, toast]);

  const handleAssignClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Show toast for feedback
    toast({
      title: "Assigning Course",
      description: `Preparing to assign "${title}"`,
    });
    
    triggerCourseEvent('assign', courseId, title);
  }, [courseId, title, toast]);

  const handleBookmarkToggle = useCallback((e: React.MouseEvent, isBookmarked: boolean) => {
    e.stopPropagation();
    e.preventDefault();
    
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
 * Custom hook for listening to course events with improved handling
 */
export function useCourseEventListener(
  courseId: string, 
  onShare?: () => void,
  onAssign?: () => void,
  onBookmark?: () => void
) {
  useEffect(() => {
    // Share event listener
    const shareHandler = (id: string) => {
      if (id === courseId && onShare) {
        console.log(`Share event received for course: ${id}`);
        onShare();
      }
    };
    
    // Assign event listener
    const assignHandler = (id: string) => {
      if (id === courseId && onAssign) {
        console.log(`Assign event received for course: ${id}`);
        onAssign();
      }
    };
    
    // Bookmark event listener
    const bookmarkHandler = (id: string) => {
      if (id === courseId && onBookmark) {
        console.log(`Bookmark event received for course: ${id}`);
        onBookmark();
      }
    };
    
    // Register all event handlers
    const removeShareListener = addCourseEventListener('share', shareHandler);
    const removeAssignListener = addCourseEventListener('assign', assignHandler);
    const removeBookmarkListener = addCourseEventListener('bookmark', bookmarkHandler);
    
    // Clean up all listeners on unmount
    return () => {
      removeShareListener();
      removeAssignListener();
      removeBookmarkListener();
    };
  }, [courseId, onShare, onAssign, onBookmark]);
}
