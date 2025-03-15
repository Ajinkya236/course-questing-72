
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const TargetAudienceEdit: React.FC = () => {
  const { audienceId } = useParams<{ audienceId: string }>();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Edit Target Audience</h1>
      </div>

      <Card className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Target Audience #{audienceId}</h2>
        <p className="text-muted-foreground">
          The full target audience editor is under development. Please check back soon!
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/admin/target-audience')}>
            Return to Target Audiences
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TargetAudienceEdit;
