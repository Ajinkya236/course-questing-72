
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ClipboardList, Eye, Edit } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Submission {
  id: string;
  employee_code: string;
  user_id: string;
  activity_id: string;
  submitted_at: string;
  status: string;
  activity_score: number | null;
  module_status: 'pass' | 'fail' | null;
  activity: {
    activity_name: string;
    course_id: string;
    module_id: string;
  };
  evaluations: Array<{
    id: string;
    evaluator_id: string;
    evaluated_at: string;
  }>;
  profiles: {
    first_name: string;
    last_name: string;
  } | null;
}

const EvaluatorDashboard: React.FC = () => {
  const { isEvaluator, isSuperEvaluator, loading: roleLoading } = useUserRole();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('evaluator');
  const navigate = useNavigate();

  useEffect(() => {
    if (roleLoading) return;
    
    if (!isEvaluator) {
      navigate('/');
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      return;
    }

    fetchSubmissions();
  }, [isEvaluator, roleLoading, navigate]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('ojt_submissions')
        .select(`
          *,
          ojt_activities!inner (
            activity_name,
            course_id,
            module_id
          ),
          evaluations (
            id,
            evaluator_id,
            evaluated_at
          )
        `)
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles separately to avoid the relation error
      const userIds = data?.map(submission => submission.user_id).filter(Boolean) || [];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', userIds);

      const formattedSubmissions: Submission[] = data?.map(submission => {
        const profile = profilesData?.find(p => p.id === submission.user_id);
        return {
          id: submission.id,
          employee_code: submission.employee_code || '',
          user_id: submission.user_id,
          activity_id: submission.activity_id,
          submitted_at: submission.submitted_at,
          status: submission.status,
          activity_score: submission.activity_score,
          module_status: submission.module_status as 'pass' | 'fail' | null,
          activity: submission.ojt_activities,
          evaluations: submission.evaluations || [],
          profiles: profile ? {
            first_name: profile.first_name || '',
            last_name: profile.last_name || ''
          } : null
        };
      }) || [];

      setSubmissions(formattedSubmissions);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      under_evaluation: 'default',
      evaluated: 'default',
    };
    return <Badge variant={variants[status] || 'default'}>{status.replace('_', ' ')}</Badge>;
  };

  const getModuleStatusBadge = (status: 'pass' | 'fail' | null) => {
    if (!status) return <Badge variant="secondary">Pending</Badge>;
    return (
      <Badge variant={status === 'pass' ? 'default' : 'destructive'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const isEvaluated = (submission: Submission) => {
    return submission.evaluations && submission.evaluations.length > 0;
  };

  const handleEvaluate = (submissionId: string) => {
    navigate(`/evaluator/evaluate/${submissionId}`);
  };

  const handleView = (submissionId: string) => {
    navigate(`/evaluator/view/${submissionId}`);
  };

  const renderEvaluatorTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Code</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Module</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Submitted At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Activity Score</TableHead>
          <TableHead>Module Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.employee_code}</TableCell>
            <TableCell>
              {submission.profiles 
                ? `${submission.profiles.first_name} ${submission.profiles.last_name}`
                : 'Unknown'
              }
            </TableCell>
            <TableCell>{submission.activity.course_id}</TableCell>
            <TableCell>{submission.activity.module_id}</TableCell>
            <TableCell>{submission.activity.activity_name}</TableCell>
            <TableCell>{new Date(submission.submitted_at).toLocaleDateString()}</TableCell>
            <TableCell>{getStatusBadge(submission.status)}</TableCell>
            <TableCell>{submission.activity_score || '-'}</TableCell>
            <TableCell>{getModuleStatusBadge(submission.module_status)}</TableCell>
            <TableCell>
              {isEvaluated(submission) ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(submission.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleEvaluate(submission.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Evaluate
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderSuperEvaluatorTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Code</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Submitted At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Module Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow key={submission.id}>
            <TableCell>{submission.employee_code}</TableCell>
            <TableCell>{submission.activity.course_id}</TableCell>
            <TableCell>{submission.activity.activity_name}</TableCell>
            <TableCell>{new Date(submission.submitted_at).toLocaleDateString()}</TableCell>
            <TableCell>{getStatusBadge(submission.status)}</TableCell>
            <TableCell>{getModuleStatusBadge(submission.module_status)}</TableCell>
            <TableCell>
              {isEvaluated(submission) ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(submission.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleEvaluate(submission.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Evaluate
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (roleLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3 text-primary">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Evaluator Dashboard | Learning Management System</title>
      </Helmet>
      
      <div className="container mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <ClipboardList className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Evaluator Dashboard</h1>
            <p className="text-muted-foreground">
              Review and evaluate OJT submissions
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>OJT Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="evaluator">Evaluator View</TabsTrigger>
                {isSuperEvaluator && (
                  <TabsTrigger value="super_evaluator">Super Evaluator View</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="evaluator">
                {renderEvaluatorTable()}
              </TabsContent>
              
              {isSuperEvaluator && (
                <TabsContent value="super_evaluator">
                  {renderSuperEvaluatorTable()}
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EvaluatorDashboard;
