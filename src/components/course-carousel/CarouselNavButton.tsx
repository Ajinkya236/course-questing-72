
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

const CarouselNavButton: React.FC<CarouselNavButtonProps> = ({ 
  direction, 
  onClick, 
  disabled 
}) => {
  const isLeft = direction === "left";
  
  return (
    <Button 
      variant="outline"
      size="icon"
      className={`absolute ${isLeft ? '-left-8' : '-right-8'} top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-background/90 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${disabled ? 'invisible' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLeft ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </Button>
  );
};

export default CarouselNavButton;
