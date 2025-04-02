
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
    // Check if there's a pending request in localStorage
    const pendingRequest = localStorage.getItem('pendingPodcastRequest');
    if (pendingRequest) {
      const { timestamp } = JSON.parse(pendingRequest);
      // If the request is less than 30 seconds old, prevent duplicate requests
      if (Date.now() - timestamp < 30000) {
        toast({
          title: "Request in progress",
          description: "Please wait for the current podcast generation to complete.",
          variant: "warning",
        });
        return { error: "A podcast generation is already in progress. Please wait." };
      } else {
        // Clear outdated request
        localStorage.removeItem('pendingPodcastRequest');
      }
    }

    // Set pending request
    localStorage.setItem('pendingPodcastRequest', JSON.stringify({ 
      timestamp: Date.now(),
      skillName,
      proficiency
    }));

    const { data, error } = await supabase.functions.invoke('generate-podcast', {
      body: {
        skillName,
        skillDescription,
        proficiency,
        duration: "15-25 minutes", // Specify target duration range
        transcriptLength: "15-20 minutes reading time" // Specify target transcript reading time
      }
    });

    // Clear pending request flag
    localStorage.removeItem('pendingPodcastRequest');

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
    // Clear pending request flag on error
    localStorage.removeItem('pendingPodcastRequest');
    console.error("Unexpected error in podcast generation:", err);
    return { error: err.message || "An unexpected error occurred" };
  }
};
