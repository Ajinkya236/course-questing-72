
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

interface AdaptiveModeToggleProps {
  adaptiveMode: boolean;
  setAdaptiveMode: (value: boolean) => void;
  disabled?: boolean;
}

const AdaptiveModeToggle: React.FC<AdaptiveModeToggleProps> = ({ 
  adaptiveMode, 
  setAdaptiveMode, 
  disabled = false 
}) => {
  const { toast } = useToast();

  const toggleAdaptiveMode = () => {
    setAdaptiveMode(!adaptiveMode);
    
    toast({
      title: `${!adaptiveMode ? 'Adaptive' : 'Standard'} Assessment Mode Enabled`,
      description: !adaptiveMode 
        ? "Questions will now adapt to your performance level." 
        : "All questions will be presented at a standard difficulty level.",
    });
  };

  return (
    <div className="mb-4 flex items-center justify-end space-x-2">
      <Switch 
        id="adaptive-mode" 
        checked={adaptiveMode}
        onCheckedChange={toggleAdaptiveMode}
        disabled={disabled}
      />
      <Label htmlFor="adaptive-mode">Adaptive Assessment</Label>
    </div>
  );
};

export default AdaptiveModeToggle;
