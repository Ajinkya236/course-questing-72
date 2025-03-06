
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Request {
  id: number;
  mentorName: string;
  mentorTitle: string;
  topic: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
  imageUrl: string;
  reason?: string;
}

interface RequestCardProps {
  request: Request;
}

const RequestCard: React.FC<RequestCardProps> = ({ request }) => {
  const { toast } = useToast();
  
  const handleWithdrawRequest = () => {
    toast({
      title: "Request Withdrawn",
      description: "Your mentorship request has been withdrawn."
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'accepted':
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex p-4">
        <div className="mr-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={request.imageUrl} alt={request.mentorName} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{request.mentorName}</h4>
              <p className="text-sm text-muted-foreground">{request.mentorTitle}</p>
            </div>
            <div>{getStatusBadge(request.status)}</div>
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="mr-2">{request.topic}</Badge>
            <span className="text-xs text-muted-foreground">Requested on {new Date(request.date).toLocaleDateString()}</span>
          </div>
          
          {request.reason && (
            <div className="mt-2 p-2 bg-muted rounded-md flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">{request.reason}</p>
            </div>
          )}
          
          {request.status === 'pending' && (
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-destructive hover:text-destructive"
                onClick={handleWithdrawRequest}
              >
                Withdraw Request
              </Button>
            </div>
          )}
          
          {request.status === 'accepted' && (
            <div className="mt-4 flex justify-end">
              <Button 
                variant="default" 
                size="sm"
              >
                Set Goals
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RequestCard;
