
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MarkSessionCompleteButtonProps {
  sessionId: string;
  onComplete?: () => void;
}

const MarkSessionCompleteButton: React.FC<MarkSessionCompleteButtonProps> = ({ 
  sessionId, 
  onComplete 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleMarkComplete = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Session marked as complete",
        description: "The mentor has been notified about the completion status."
      });
      
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1"
      disabled={isLoading}
      onClick={handleMarkComplete}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
      ) : (
        <Check className="h-4 w-4 mr-1" />
      )}
      Mark as Complete
    </Button>
  );
};

export default MarkSessionCompleteButton;
