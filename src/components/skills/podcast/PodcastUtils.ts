
import { supabase } from "@/integrations/supabase/client";

interface PodcastResponse {
  audioUrl?: string;
  transcript?: string;
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
      }
    });

    if (error) {
      console.error("Error generating podcast:", error);
      return { error: error.message || "Failed to generate podcast" };
    }

    if (data && data.audioUrl) {
      return { 
        audioUrl: data.audioUrl,
        transcript: data.transcript || null
      };
    }

    return { error: "No audio was generated" };
  } catch (err: any) {
    console.error("Unexpected error in podcast generation:", err);
    return { error: err.message || "An unexpected error occurred" };
  }
};
