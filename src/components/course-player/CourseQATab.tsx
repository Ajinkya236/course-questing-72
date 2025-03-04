
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { User, SendHorizontal, ThumbsUp, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

// Mock data for comments
const mockComments: Comment[] = [
  {
    id: "comment-1",
    user: {
      name: "Ananya Sharma",
      role: "Student"
    },
    content: "Can someone explain the difference between transformational and transactional leadership styles in more detail?",
    timestamp: "2 days ago",
    likes: 5,
    replies: [
      {
        id: "reply-1",
        user: {
          name: "Dr. Rajiv Kumar",
          role: "Instructor"
        },
        content: "Great question! Transformational leadership focuses on inspiring and motivating teams through a compelling vision and personal example. Transactional leadership is more focused on supervision, organization, and performance through rewards and penalties. We'll cover this in more depth in Module 3!",
        timestamp: "1 day ago",
        likes: 8
      }
    ]
  },
  {
    id: "comment-2",
    user: {
      name: "Vikram Desai",
      role: "Manager"
    },
    content: "The team management section doesn't seem to address virtual teams. Is there additional content on leading remote teams?",
    timestamp: "3 days ago",
    likes: 7,
    replies: [
      {
        id: "reply-2",
        user: {
          name: "Priya Shah",
          role: "L&D Specialist"
        },
        content: "I believe there's a supplementary module on remote leadership in the resources section. It covers virtual team management quite well!",
        timestamp: "2 days ago",
        likes: 3
      },
      {
        id: "reply-3",
        user: {
          name: "Dr. Rajiv Kumar",
          role: "Instructor"
        },
        content: "Yes, there is additional content on managing virtual teams in the resources section. We also have a dedicated course on remote leadership if you're interested in diving deeper into this topic.",
        timestamp: "1 day ago",
        likes: 6
      }
    ]
  }
];

interface CourseQATabProps {
  courseId: string;
}

const CourseQATab = ({ courseId }: CourseQATabProps) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();
  
  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) return;
    
    // Add new question to the comments
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        name: "You",
        role: "Student"
      },
      content: newQuestion,
      timestamp: "Just now",
      likes: 0,
      replies: []
    };
    
    setComments([newComment, ...comments]);
    setNewQuestion('');
    
    toast({
      title: "Question posted",
      description: "Your question has been posted successfully.",
    });
  };
  
  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return;
    
    // Add reply to the specific comment
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: `reply-${Date.now()}`,
              user: {
                name: "You",
                role: "Student"
              },
              content: replyContent,
              timestamp: "Just now",
              likes: 0
            }
          ]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyTo(null);
    setReplyContent('');
    
    toast({
      title: "Reply posted",
      description: "Your reply has been posted successfully.",
    });
  };
  
  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  const handleLikeReply = (commentId: string, replyId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  return (
    <div className="space-y-8">
      {/* Ask a question */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Ask a Question</h3>
        <Textarea 
          placeholder="Type your question here..." 
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          className="min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitQuestion} disabled={!newQuestion.trim()}>
            Post Question <SendHorizontal className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Q&A thread */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Discussion ({comments.length})</h3>
        
        {comments.map(comment => (
          <div key={comment.id} className="space-y-4 border-b pb-4">
            {/* Comment */}
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                {comment.user.avatar ? (
                  <img src={comment.user.avatar} alt={comment.user.name} />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{comment.user.name}</h4>
                    <p className="text-xs text-muted-foreground">{comment.user.role}</p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {comment.timestamp}
                  </div>
                </div>
                
                <p>{comment.content}</p>
                
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs" 
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className="h-3 w-3 mr-1" /> {comment.likes}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs" 
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" /> Reply
                  </Button>
                </div>
                
                {/* Reply form */}
                {replyTo === comment.id && (
                  <div className="space-y-2 mt-2">
                    <Textarea 
                      placeholder="Write your reply..." 
                      value={replyContent}
                      onChange={e => setReplyContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        Post Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="pl-14 space-y-4">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      {reply.user.avatar ? (
                        <img src={reply.user.avatar} alt={reply.user.name} />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">{reply.user.name}</h4>
                          <p className="text-xs text-muted-foreground">{reply.user.role}</p>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {reply.timestamp}
                        </div>
                      </div>
                      
                      <p className="text-sm">{reply.content}</p>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs" 
                        onClick={() => handleLikeReply(comment.id, reply.id)}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" /> {reply.likes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseQATab;
