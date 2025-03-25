
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NotificationButtonProps {
  count?: number;
  onClick: () => void;
  variant?: "default" | "ghost" | "outline";
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ 
  count, 
  onClick,
  variant = "ghost"
}) => {
  return (
    <Button 
      variant={variant} 
      size="icon" 
      className="relative hover:scale-110 transition-transform duration-200" 
      onClick={onClick}
    >
      <Bell className="h-5 w-5" />
      {count && count > 0 && (
        <Badge className={cn(
          "absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]",
          "animate-pulse"
        )}>
          {count}
        </Badge>
      )}
    </Button>
  );
};

export default NotificationButton;
