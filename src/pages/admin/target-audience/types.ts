
import { z } from 'zod';

// Define form schema
export const targetAudienceSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// Types for criteria
export type CriteriaItem = {
  id: string;
  type: 'jobRole' | 'employeeId' | 'joiningDate' | 'location';
  value: string;
  operator?: 'equals' | 'contains' | 'before' | 'after' | 'between';
};

export type TargetAudienceFormData = z.infer<typeof targetAudienceSchema>;
