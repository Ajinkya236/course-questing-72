
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PodcastResponse {
  audioUrl?: string;
  transcript?: string;
  mockMode?: boolean;
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
    
    console.log("Calling generate-podcast function with:", { skillName, skillDescription, proficiency });
    
    // Call the Supabase edge function with timeout handling
    const timeoutPromise = new Promise<{ data: null, error: Error }>((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out after 30 seconds")), 30000);
    });
    
    const functionPromise = supabase.functions.invoke('generate-podcast', {
      body: {
        skillName,
        skillDescription,
        proficiency
      }
    });
    
    // Race the function call against the timeout
    const { data, error } = await Promise.race([
      functionPromise,
      timeoutPromise
    ]);

    if (error) {
      console.error("Error generating podcast:", error);
      toast({
        title: "Failed to generate podcast",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error: error.message || "Failed to generate podcast" };
    }

    console.log("Received podcast data:", data);

    if (data) {
      const responseMessage = data.mockMode 
        ? "Podcast transcript generated successfully" 
        : "Podcast generated successfully";
        
      toast({
        title: responseMessage,
        description: data.mockMode 
          ? "Your podcast transcript is ready to read" 
          : "Your learning podcast is ready to play",
        variant: "default",
      });
      
      return {
        audioUrl: data.audioUrl || null,
        transcript: data.transcript || null,
        mockMode: data.mockMode || false
      };
    }

    toast({
      title: "Error generating podcast",
      description: "No content was generated. Please try again later.",
      variant: "destructive",
    });
    return { error: "No content was generated" };
  } catch (err: any) {
    console.error("Unexpected error in podcast generation:", err);
    toast({
      title: "Error generating podcast",
      description: err.message || "An unexpected error occurred",
      variant: "destructive",
    });
    return { error: err.message || "An unexpected error occurred" };
  } finally {
    isGeneratingPodcast = false;
  }
};
