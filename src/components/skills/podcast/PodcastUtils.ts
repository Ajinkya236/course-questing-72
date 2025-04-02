
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
    console.log("Generating podcast for:", skillName, proficiency);
    
    const { data, error } = await supabase.functions.invoke('generate-podcast', {
      body: {
        skillName,
        skillDescription,
        proficiency
      },
    });

    if (error) {
      console.error('Error generating podcast:', error);
      return { error: error.message || 'Failed to generate podcast' };
    }

    if (!data || !data.audioUrl) {
      console.error('Invalid response from generate-podcast function:', data);
      return { error: 'Invalid response from podcast generation service' };
    }

    console.log("Podcast generated successfully");
    return data as PodcastResponse;
  } catch (err: any) {
    console.error('Failed to generate podcast:', err);
    return { error: err.message || 'Failed to generate podcast' };
  }
};
