
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Target,
  Download,
  Award,
  X
} from 'lucide-react';

interface MentorshipActionsProps {
  menteeGoals: string;
  setMenteeGoals: React.Dispatch<React.SetStateAction<string>>;
  menteeName: string;
}

const MentorshipActions: React.FC<MentorshipActionsProps> = ({ menteeGoals, setMenteeGoals, menteeName }) => {
  const { toast } = useToast();
  const [showEditGoalsDialog, setShowEditGoalsDialog] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  
  // Handle editing mentee goals
  const handleEditGoals = () => {
    if (!menteeGoals.trim()) {
      toast({
        title: "Goals Required",
        description: "Please provide goals for the mentee.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Goals Updated",
      description: "The mentee's goals have been updated successfully."
    });
    
    setShowEditGoalsDialog(false);
  };
  
  // Handle withdrawing from engagement
  const handleWithdraw = () => {
    toast({
      title: "Engagement Withdrawn",
      description: "You have successfully withdrawn from this mentoring engagement."
    });
    
    setShowWithdrawDialog(false);
  };
  
  // Handle completing engagement
  const handleComplete = () => {
    toast({
      title: "Engagement Completed",
      description: "You have successfully completed this mentoring engagement."
    });
    
    setShowCompleteDialog(false);
  };
  
  // Handle downloading materials
  const handleDownloadMaterials = () => {
    toast({
      title: "Download Started",
      description: "The engagement materials are being prepared for download."
    });
  };
  
  return (
    <div className="mt-6 pt-4 border-t space-y-2">
      <Dialog open={showEditGoalsDialog} onOpenChange={setShowEditGoalsDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Target className="h-4 w-4" />
            Edit Mentee Goals
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Mentee Goals</DialogTitle>
            <DialogDescription>
              Help your mentee refine their learning objectives
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              value={menteeGoals}
              onChange={(e) => setMenteeGoals(e.target.value)}
              className="resize-none"
              rows={6}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditGoalsDialog(false)}>Cancel</Button>
            <Button onClick={handleEditGoals}>Save Goals</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full gap-2"
        onClick={handleDownloadMaterials}
      >
        <Download className="h-4 w-4" />
        Download Materials
      </Button>
      
      <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Award className="h-4 w-4" />
            Preview Certificate
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="border p-8 rounded-md text-center space-y-4">
              <Award className="h-12 w-12 mx-auto text-primary" />
              <h3 className="text-xl font-bold">Certificate of Achievement</h3>
              <p className="text-muted-foreground">This certifies that</p>
              <p className="text-xl">{menteeName}</p>
              <p className="text-muted-foreground">has successfully completed</p>
              <p className="text-lg font-medium">Software Development Mentorship</p>
              <p className="text-muted-foreground">under the guidance of</p>
              <p className="text-lg">Your Name</p>
              <div className="pt-4 text-sm text-muted-foreground">
                <p>This certificate will be available for download after</p>
                <p>you complete this engagement</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full text-destructive">
            Withdraw from Engagement
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw from Engagement</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw from your mentoring engagement with {menteeName}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-2">
              This action cannot be undone. Your mentee will be notified of your withdrawal.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleWithdraw}>Withdraw</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogTrigger asChild>
          <Button variant="default" size="sm" className="w-full">
            Complete Engagement
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Engagement</DialogTitle>
            <DialogDescription>
              Please confirm that you have completed your mentoring engagement with {menteeName}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm mb-4">
              By completing this engagement, you confirm that:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>The mentee has set learning goals</li>
              <li>You have completed at least one session</li>
              <li>All assigned tasks have been reviewed</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>Cancel</Button>
            <Button onClick={handleComplete}>Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorshipActions;
