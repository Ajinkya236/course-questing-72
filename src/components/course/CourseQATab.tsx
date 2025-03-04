
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

// Mock data for Q&A
const mockComments: Comment[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://i.pravatar.cc/150?u=sarah',
    content: 'How does the delegation framework apply to remote teams? Are there specific adaptations needed?',
    timestamp: '2 days ago',
    replies: [
      {
        id: '1.1',
        userId: 'instructor1',
        userName: 'Alex Instructor',
        userAvatar: 'https://i.pravatar.cc/150?u=alex',
        content: 'Great question! Remote delegation requires more explicit communication and documentation. I recommend using the RACI matrix we discussed, with an additional layer of communication protocols.',
        timestamp: '1 day ago'
      }
    ]
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Mark Thompson',
    userAvatar: 'https://i.pravatar.cc/150?u=mark',
    content: 'Can you elaborate more on the conflict resolution techniques mentioned in Module 3?',
    timestamp: '3 days ago',
    replies: []
  }
];

interface CourseQATabProps {
  courseId: string;
}

const CourseQATab: React.FC<CourseQATabProps> = ({ courseId }) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newQuestion, setNewQuestion] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'You',
      content: newQuestion,
      timestamp: 'Just now',
      replies: []
    };
    
    setComments([newComment, ...comments]);
    setNewQuestion('');
    toast.success('Your question has been posted');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    const newReply: Comment = {
      id: `${commentId}.${Date.now()}`,
      userId: 'currentUser',
      userName: 'You',
      content: replyContent,
      timestamp: 'Just now'
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
    toast.success('Your reply has been posted');
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
        <Textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="min-h-[100px] mb-2"
        />
        <Button onClick={handleSubmitQuestion} disabled={!newQuestion.trim()}>
          Post Question
        </Button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Discussion ({comments.length})</h2>
        
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4 p-4 border rounded-lg">
              <Avatar>
                <AvatarImage src={comment.userAvatar} />
                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{comment.userName}</h3>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{comment.content}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-primary"
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </Button>
              </div>
            </div>
            
            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-12 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-4 p-4 border rounded-lg bg-muted/30">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.userAvatar} />
                      <AvatarFallback>{reply.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm">{reply.userName}</h3>
                        <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Reply textarea */}
            {replyingTo === comment.id && (
              <div className="pl-12">
                <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Type your reply..."
                  className="min-h-[80px] mb-2"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSubmitReply(comment.id)} disabled={!replyContent.trim()}>
                    Post Reply
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseQATab;
