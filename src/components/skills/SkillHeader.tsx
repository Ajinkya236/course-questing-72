
import React from 'react';
import { 
  LightbulbIcon,
  CircleHelp,
  FlagIcon,
  ZapIcon,
  Share2Icon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Map skill categories to appropriate icons
const categoryIconMap: Record<string, React.ReactNode> = {
  'role': <LightbulbIcon className="h-5 w-5 mr-1" />,
  'technical': <ZapIcon className="h-5 w-5 mr-1" />,
  'soft': <CircleHelp className="h-5 w-5 mr-1" />,
  'domain': <FlagIcon className="h-5 w-5 mr-1" />
};

// Skill proficiency levels
const proficiencyLevels = [
  'Awareness',
  'Knowledge',
  'Skill',
  'Mastery',
  'Expert'
];

interface SkillHeaderProps {
  skill: any;
  onProficiencyChange?: (value: string) => void;
}

const SkillHeader: React.FC<SkillHeaderProps> = ({ 
  skill,
  onProficiencyChange
}) => {
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [employeeIds, setEmployeeIds] = useState("");

  const handleProficiencySelect = (level: string) => {
    if (onProficiencyChange) {
      onProficiencyChange(level);
    }
  };

  const handleShare = () => {
    if (!employeeIds.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one employee ID.",
        variant: "destructive"
      });
      return;
    }

    const ids = employeeIds.split(',').map(id => id.trim());
    
    toast({
      title: "Skill shared",
      description: `Shared "${skill.name}" with ${ids.length} employee(s).`,
    });
    
    setIsShareDialogOpen(false);
    setEmployeeIds("");
  };

  return (
    <div className="bg-card shadow-sm rounded-lg p-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary p-1 mr-2">
              {categoryIconMap[skill.category?.toLowerCase()] || <LightbulbIcon className="h-5 w-5" />}
            </span>
            <span className="text-muted-foreground text-sm font-medium">
              {skill.category?.charAt(0).toUpperCase() + skill.category?.slice(1) || "Skill"}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{skill.name}</h1>
          
          <p className="text-muted-foreground mb-4">
            {skill.description || "No description available"}
          </p>
        </div>
        
        <div className="lg:text-right">
          <div className="flex flex-wrap gap-2 mb-4">
            {proficiencyLevels.map((level) => (
              <button
                key={level}
                onClick={() => handleProficiencySelect(level)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  skill.proficiency === level
                    ? 'bg-[#333333] text-white'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2 justify-end">
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2Icon className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share with team members</DialogTitle>
                  <DialogDescription>
                    Enter the employee IDs of people you want to share this skill with.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="employee-ids">Employee IDs</Label>
                  <Input 
                    id="employee-ids" 
                    placeholder="e.g., E001, E002, E003" 
                    value={employeeIds}
                    onChange={(e) => setEmployeeIds(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate multiple IDs with commas
                  </p>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsShareDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleShare}>Share</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillHeader;
