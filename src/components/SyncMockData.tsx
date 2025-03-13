
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

export const SyncMockData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [syncOptions, setSyncOptions] = useState({
    domains: true,
    skills: true,
    job_roles: true,
    rewards: true,
    badges: true,
  });

  const handleSync = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(syncOptions).forEach(([key, value]) => {
        if (value) queryParams.append(key, 'true');
      });

      const { data, error } = await supabase.functions.invoke('sync-mock-data', {
        query: queryParams,
      });

      if (error) {
        throw error;
      }

      console.log('Sync results:', data);
      toast.success('Mock data synchronized successfully');
    } catch (error) {
      console.error('Error syncing mock data:', error);
      toast.error('Failed to sync mock data');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOption = (option: keyof typeof syncOptions) => {
    setSyncOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sync Mock Data</CardTitle>
        <CardDescription>
          Populate the database with mock data for testing purposes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {Object.entries(syncOptions).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox 
                id={key}
                checked={value}
                onCheckedChange={() => toggleOption(key as keyof typeof syncOptions)}
              />
              <Label htmlFor={key} className="capitalize">{key.replace('_', ' ')}</Label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSync} 
          className="w-full"
          disabled={isLoading || !Object.values(syncOptions).some(v => v)}
        >
          {isLoading ? 'Syncing...' : 'Sync Mock Data'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SyncMockData;
