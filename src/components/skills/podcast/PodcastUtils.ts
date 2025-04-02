
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PodcastResponse {
  audioUrl?: string;
  transcript?: string;
  error?: string;
}

// Track if a podcast generation is in progress
let isGeneratingPodcast = false;

export const generatePodcast = async (
  skillName: string,
  skillDescription: string,
  proficiency: string
): Promise<PodcastResponse> => {
  // If already generating, prevent duplicate requests
  if (isGeneratingPodcast) {
    toast({
      title: "Podcast generation in progress",
      description: "Please wait for the current podcast to finish generating.",
      variant: "default",
    });
    return { error: "A podcast is already being generated. Please wait." };
  }

  try {
    isGeneratingPodcast = true;
    
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
  } finally {
    isGeneratingPodcast = false;
  }
};
