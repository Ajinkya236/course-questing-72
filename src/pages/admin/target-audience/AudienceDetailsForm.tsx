
import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UseFormReturn } from 'react-hook-form';
import { TargetAudienceFormData } from './types';

interface AudienceDetailsFormProps {
  form: UseFormReturn<TargetAudienceFormData>;
}

const AudienceDetailsForm: React.FC<AudienceDetailsFormProps> = ({ form }) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Audience Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Audience Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter audience name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter audience description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </>
  );
};

export default AudienceDetailsForm;
