
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, FileText, Video, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useUserRole } from '@/hooks/useUserRole';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

interface Question {
  id: string;
  question: string;
  type: 'file' | 'video' | 'text';
}

interface Submission {
  questionId: string;
  answer: string;
  fileUrl?: string;
}

interface SubmissionData {
  id: string;
  employee_code: string;
  user_id: string;
  activity_id: string;
  submitted_at: string;
  status: string;
  activity_score: number | null;
  module_status: 'pass' | 'fail' | null;
  submissions: Submission[];
  ojt_activities: {
    activity_name: string;
    course_id: string;
    module_id: string;
    questions: Question[];
  };
  profiles: {
    first_name: string;
    last_name: string;
  } | null;
}

interface EvaluationData {
  id: string;
  evaluator_id: string;
  activity_score: number;
  module_status: 'pass' | 'fail';
  evaluated_at: string;
  profiles: {
    first_name: string;
    last_name: string;
  } | null;
}

const EvaluationForm: React.FC = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { isEvaluator } = useUserRole();
  const [submission, setSubmission] = useState<SubmissionData | null>(null);
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  
  // Form state
  const [activityScore, setActivityScore] = useState<number>(0);
  const [moduleStatus, setModuleStatus] = useState<'pass' | 'fail'>('pass');
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!submissionId || !isEvaluator) {
      navigate('/');
      return;
    }

    fetchSubmissionData();
  }, [submissionId, isEvaluator]);

  const fetchSubmissionData = async () => {
    try {
      setLoading(true);

      // Fetch submission data
      const { data: submissionData, error: submissionError } = await supabase
        .from('ojt_submissions')
        .select(`
          *,
          ojt_activities (
            activity_name,
            course_id,
            module_id,
            questions
          )
        `)
        .eq('id', submissionId)
        .single();

      if (submissionError) throw submissionError;

      // Fetch profile separately
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', submissionData.user_id)
        .single();

      // Fetch evaluations for this submission
      const { data: evaluationsData, error: evaluationsError } = await supabase
        .from('evaluations')
        .select('*')
        .eq('submission_id', submissionId);

      if (evaluationsError) throw evaluationsError;

      // Fetch evaluator profiles
      const evaluatorIds = evaluationsData?.map(e => e.evaluator_id).filter(Boolean) || [];
      const { data: evaluatorProfiles } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', evaluatorIds);

      const formattedSubmissionData: SubmissionData = {
        ...submissionData,
        module_status: submissionData.module_status as 'pass' | 'fail' | null,
        submissions: Array.isArray(submissionData.submissions) 
          ? submissionData.submissions as Submission[]
          : [],
        profiles: profileData ? {
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || ''
        } : null
      };

      const formattedEvaluations: EvaluationData[] = evaluationsData?.map(evaluation => {
        const evaluatorProfile = evaluatorProfiles?.find(p => p.id === evaluation.evaluator_id);
        return {
          ...evaluation,
          module_status: evaluation.module_status as 'pass' | 'fail',
          profiles: evaluatorProfile ? {
            first_name: evaluatorProfile.first_name || '',
            last_name: evaluatorProfile.last_name || ''
          } : null
        };
      }) || [];

      setSubmission(formattedSubmissionData);
      setEvaluations(formattedEvaluations);
      
      // Check if already evaluated
      const hasEvaluation = formattedEvaluations && formattedEvaluations.length > 0;
      setIsViewMode(hasEvaluation);
      
      if (hasEvaluation) {
        const latestEvaluation = formattedEvaluations[0];
        setActivityScore(latestEvaluation.activity_score);
        setModuleStatus(latestEvaluation.module_status);
      }

    } catch (error: any) {
      console.error('Error fetching submission:', error);
      toast({
        title: "Error",
        description: "Failed to load submission data",
        variant: "destructive",
      });
      navigate('/evaluator');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEvaluation = async () => {
    if (!submission || !user) return;

    try {
      setSaving(true);

      const { error } = await supabase
        .from('evaluations')
        .insert({
          submission_id: submissionId,
          evaluator_id: user.id,
          feedback: feedback,
          activity_score: activityScore,
          module_status: moduleStatus,
        });

      if (error) throw error;

      // Update submission status
      await supabase
        .from('ojt_submissions')
        .update({
          status: 'evaluated',
          activity_score: activityScore,
          module_status: moduleStatus,
        })
        .eq('id', submissionId);

      toast({
        title: "Success",
        description: "Evaluation submitted successfully",
      });

      navigate('/evaluator');
    } catch (error: any) {
      console.error('Error submitting evaluation:', error);
      toast({
        title: "Error",
        description: "Failed to submit evaluation",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getModuleStatusBadge = (status: 'pass' | 'fail' | null) => {
    if (!status) return <Badge variant="secondary">Pending</Badge>;
    return (
      <Badge variant={status === 'pass' ? 'default' : 'destructive'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-primary">Loading...</span>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Submission not found</p>
            <Button onClick={() => navigate('/evaluator')} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {isViewMode ? 'View Evaluation' : 'Evaluate Submission'} | Learning Management System
        </title>
      </Helmet>
      
      <div className="container mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/evaluator')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Submission Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isViewMode ? 'Evaluation Details' : 'Evaluation Form'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Employee Code
                </Label>
                <p className="font-medium">{submission.employee_code}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Employee Name
                </Label>
                <p className="font-medium">
                  {submission.profiles 
                    ? `${submission.profiles.first_name} ${submission.profiles.last_name}`
                    : 'Unknown'
                  }
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Course Name
                </Label>
                <p className="font-medium">{submission.ojt_activities.course_id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Module Name
                </Label>
                <p className="font-medium">{submission.ojt_activities.module_id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Activity Name
                </Label>
                <p className="font-medium">{submission.ojt_activities.activity_name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Activity Score
                </Label>
                <p className="font-medium">{submission.activity_score || 'Not scored'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Module Status
                </Label>
                <div>{getModuleStatusBadge(submission.module_status)}</div>
              </div>
              {isViewMode && evaluations.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Evaluated By
                  </Label>
                  <p className="font-medium">
                    {evaluations[0].profiles 
                      ? `${evaluations[0].profiles.first_name} ${evaluations[0].profiles.last_name}`
                      : 'Unknown'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Questions and Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Questions and Submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {submission.ojt_activities.questions?.map((question: Question, index: number) => {
              const userSubmission = submission.submissions.find(
                sub => sub.questionId === question.id
              );

              return (
                <div key={question.id} className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        Type: {question.type}
                      </p>
                    </div>
                  </div>

                  {userSubmission && (
                    <div className="ml-8 space-y-2">
                      <Label className="text-sm font-medium">User Submission:</Label>
                      {question.type === 'text' ? (
                        <div className="p-3 bg-muted rounded-md">
                          <p>{userSubmission.answer}</p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                          {getFileIcon(question.type)}
                          <span className="text-sm">{userSubmission.answer}</span>
                          {userSubmission.fileUrl && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={userSubmission.fileUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      )}

                      {!isViewMode && (
                        <div className="space-y-2">
                          <Label htmlFor={`feedback-${question.id}`}>Feedback</Label>
                          <Textarea
                            id={`feedback-${question.id}`}
                            placeholder="Enter your feedback for this question..."
                            value={feedback[question.id] || ''}
                            onChange={(e) => 
                              setFeedback(prev => ({ ...prev, [question.id]: e.target.value }))
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {index < submission.ojt_activities.questions.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Evaluation Form */}
        {!isViewMode && (
          <Card>
            <CardHeader>
              <CardTitle>Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activity-score">Activity Score</Label>
                  <Input
                    id="activity-score"
                    type="number"
                    min="0"
                    max="100"
                    value={activityScore}
                    onChange={(e) => setActivityScore(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="module-status">Module Status</Label>
                  <Select value={moduleStatus} onValueChange={(value: 'pass' | 'fail') => setModuleStatus(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => navigate('/evaluator')}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitEvaluation} disabled={saving}>
                  {saving ? 'Submitting...' : 'Submit Evaluation'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Evaluation History */}
        {evaluations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Evaluation History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attempt ID</TableHead>
                    <TableHead>Evaluator Name</TableHead>
                    <TableHead>Activity Score</TableHead>
                    <TableHead>Evaluated At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evaluations.map((evaluation) => (
                    <TableRow key={evaluation.id}>
                      <TableCell className="font-mono">{evaluation.id.slice(0, 8)}...</TableCell>
                      <TableCell>
                        {evaluation.profiles 
                          ? `${evaluation.profiles.first_name} ${evaluation.profiles.last_name}`
                          : 'Unknown'
                        }
                      </TableCell>
                      <TableCell>{evaluation.activity_score}</TableCell>
                      <TableCell>{new Date(evaluation.evaluated_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`/evaluator/view/${submissionId}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default EvaluationForm;
