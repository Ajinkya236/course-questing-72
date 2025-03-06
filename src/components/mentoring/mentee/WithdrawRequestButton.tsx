
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

interface WithdrawRequestButtonProps {
  requestId: string;
  onWithdraw?: () => void;
}

const WithdrawRequestButton: React.FC<WithdrawRequestButtonProps> = ({ 
  requestId, 
  onWithdraw 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleWithdraw = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Request withdrawn",
        description: "Your mentorship request has been withdrawn successfully."
      });
      
      if (onWithdraw) {
        onWithdraw();
      }
    }, 1500);
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          Withdraw Request
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Withdraw Mentorship Request</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to withdraw this mentorship request? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleWithdraw}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Withdrawing...
              </>
            ) : (
              'Withdraw Request'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawRequestButton;
