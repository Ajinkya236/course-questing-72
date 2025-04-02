
import { supabase } from '@/integrations/supabase/client';

export interface PodcastResponse {
  audioUrl?: string;
  error?: string;
}

export const generatePodcast = async (
  skillName: string,
  skillDescription: string,
  proficiency: string
): Promise<PodcastResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-podcast', {
      body: {
        skillName,
        skillDescription,
        proficiency
      },
    });

    if (error) {
      console.error('Error generating podcast:', error);
      return { error: error.message };
    }

    return data as PodcastResponse;
  } catch (err: any) {
    console.error('Failed to generate podcast:', err);
    return { error: err.message || 'Failed to generate podcast' };
  }
};
