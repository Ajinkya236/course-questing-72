
import React from 'react';
import { CheckCircle, Clock, AlertTriangle, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ActionablesCard = () => {
  const navigate = useNavigate();
  
  // Mock data for actionables
  const actionables = [
    { id: 1, title: "Complete React Fundamentals", type: "course", priority: "high", dueDate: "2023-09-15" },
    { id: 2, title: "Submit Project Assessment", type: "assessment", priority: "medium", dueDate: "2023-09-20" },
    { id: 3, title: "Review Feedback", type: "feedback", priority: "low", dueDate: "2023-09-22" }
  ];
  
  const getIconByType = (type: string) => {
    switch(type) {
      case 'course':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'assessment':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'feedback':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-archivo-black">Actionables</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => navigate('/actionables')}
          >
            View All <MoveRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {actionables.map((action) => (
            <div key={action.id} className="flex items-start p-3 border rounded-lg hover:bg-secondary/20 cursor-pointer">
              <div className="mr-3 mt-1">
                {getIconByType(action.type)}
              </div>
              <div>
                <h4 className="font-medium text-sm">{action.title}</h4>
                <p className="text-xs text-muted-foreground">
                  Due {new Date(action.dueDate).toLocaleDateString()} • {action.priority} priority
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionablesCard;
