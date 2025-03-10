
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Plus,
  Video,
  Pencil,
  Trash,
  CheckCircle
} from 'lucide-react';

export interface Session {
  id: number;
  title: string;
  date: string;
  status: string;
  notes?: string;
}

interface SessionsTabProps {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

const SessionsTab: React.FC<SessionsTabProps> = ({ sessions, setSessions }) => {
  const { toast } = useToast();
  const [showScheduleSessionDialog, setShowScheduleSessionDialog] = useState(false);
  const [showCreateMeetingDialog, setShowCreateMeetingDialog] = useState(false);
  
  // Session state
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [sessionDuration, setSessionDuration] = useState('60');
  
  // Meeting state
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  
  // Handle scheduling a session
  const handleScheduleSession = () => {
    if (!sessionTitle || !sessionDate || !sessionTime) {
      toast({
        title: "Missing Information",
        description: "Please provide all session details.",
        variant: "destructive"
      });
      return;
    }
    
    const dateTime = new Date(`${sessionDate}T${sessionTime}`);
    
    const newSession = {
      id: sessions.length + 1,
      title: sessionTitle,
      date: dateTime.toISOString(),
      status: "upcoming"
    };
    
    setSessions([...sessions, newSession]);
    
    toast({
      title: "Session Scheduled",
      description: "The session has been scheduled and the mentee has been notified."
    });
    
    // Reset form
    setSessionTitle('');
    setSessionDate('');
    setSessionTime('');
    setSessionDuration('60');
    setShowScheduleSessionDialog(false);
  };
  
  // Handle creating a meeting
  const handleCreateMeeting = () => {
    if (!meetingTitle) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for the meeting.",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a mock meeting link if not provided
    const generatedLink = meetingLink || `https://meet.example.com/${Math.random().toString(36).substring(2, 10)}`;
    setMeetingLink(generatedLink);
    
    toast({
      title: "Meeting Created",
      description: "Your meeting has been created. Share the link with your mentee."
    });
    
    // Copy link to clipboard
    navigator.clipboard.writeText(generatedLink).then(() => {
      toast({
        title: "Link Copied",
        description: "Meeting link copied to clipboard."
      });
    });
    
    setShowCreateMeetingDialog(false);
  };
  
  // Handle deleting a session
  const handleDeleteSession = (sessionId: number) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
    
    toast({
      title: "Session Deleted",
      description: "The session has been cancelled and the mentee has been notified."
    });
  };
  
  // Handle editing a session
  const handleEditSession = (session: Session) => {
    setSessionTitle(session.title);
    const date = new Date(session.date);
    setSessionDate(date.toISOString().split('T')[0]);
    setSessionTime(date.toTimeString().split(' ')[0].substring(0, 5));
    setSessionDuration('60');
    setShowScheduleSessionDialog(true);
    
    // Remove the old session and add the updated one in handleScheduleSession
    setSessions(sessions.filter(s => s.id !== session.id));
  };
  
  return (
    <div className="space-y-3">
      {sessions.map(session => (
        <div key={session.id} className="p-3 border rounded-md flex items-center justify-between">
          <div>
            <h4 className="font-medium text-sm">{session.title}</h4>
            <p className="text-xs text-muted-foreground">
              {new Date(session.date).toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            {session.notes && (
              <p className="text-xs italic mt-1">Notes: {session.notes}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {session.status === 'upcoming' ? (
              <>
                <Button 
                  onClick={() => handleEditSession(session)} 
                  size="sm" 
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteSession(session.id)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-destructive"
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <Dialog open={showCreateMeetingDialog} onOpenChange={setShowCreateMeetingDialog}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Video className="h-4 w-4" />
                      Join
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Video Meeting</DialogTitle>
                      <DialogDescription>
                        Set up a virtual meeting with your mentee
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Meeting Title</label>
                        <Input
                          value={meetingTitle}
                          onChange={(e) => setMeetingTitle(e.target.value)}
                          placeholder="Weekly Check-in"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Meeting Link (Optional)</label>
                        <Input
                          value={meetingLink}
                          onChange={(e) => setMeetingLink(e.target.value)}
                          placeholder="https://meet.example.com/your-meeting-id"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Leave blank to generate a link automatically
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCreateMeetingDialog(false)}>Cancel</Button>
                      <Button onClick={handleCreateMeeting}>Create Meeting</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Badge variant="outline" className="gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      ))}
      
      <Dialog open={showScheduleSessionDialog} onOpenChange={setShowScheduleSessionDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
            <Plus className="h-4 w-4" />
            Schedule Session
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Session</DialogTitle>
            <DialogDescription>
              Set up a mentoring session with your mentee
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Session Title</label>
              <Input
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                placeholder="Career Planning"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Time</label>
              <Input
                type="time"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Duration (minutes)</label>
              <Input
                type="number"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                min="15"
                step="15"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleSessionDialog(false)}>Cancel</Button>
            <Button onClick={handleScheduleSession}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SessionsTab;
