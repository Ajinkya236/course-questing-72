
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  skillName: string;
  showShareDialog: boolean;
  setShowShareDialog: (show: boolean) => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  skillName,
  showShareDialog,
  setShowShareDialog
}) => {
  const [employeeIds, setEmployeeIds] = React.useState('');
  const { toast } = useToast();
  
  const handleShareSkill = () => {
    toast({
      title: "Skill shared",
      description: `Skill ${skillName} has been shared with the specified employees.`,
      variant: "default",
    });
    setShowShareDialog(false);
    setEmployeeIds('');
  };
  
  return (
    <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share skill</DialogTitle>
          <DialogDescription>
            Share this skill with team members or colleagues.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="employee-ids">Employee IDs</Label>
            <Input
              id="employee-ids"
              placeholder="Enter employee IDs (comma separated)"
              value={employeeIds}
              onChange={(e) => setEmployeeIds(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={handleShareSkill}
            disabled={!employeeIds.trim()}
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
