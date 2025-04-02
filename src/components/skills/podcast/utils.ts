
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

/**
 * Converts a base64 string to a Blob object
 * @param base64 Base64 encoded string
 * @param mimeType MIME type of the resulting blob
 * @returns Blob object
 */
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  return new Blob(byteArrays, { type: mimeType });
};

/**
 * Formats time in seconds to MM:SS format
 * @param time Time in seconds
 * @returns Formatted time string
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

/**
 * Generates a podcast transcript and audio using the Supabase edge functions
 * @param skillName The name of the skill
 * @param proficiency The proficiency level
 * @returns A promise that resolves to the audio URL
 */
export const generatePodcast = async (
  skillName: string,
  proficiency: string
): Promise<string | null> => {
  try {
    // Generate a conversation script first
    const scriptResponse = await supabase.functions.invoke('gemini-generate-transcript', {
      body: {
        skillName,
        proficiency
      }
    });

    if (scriptResponse.error) {
      throw new Error(`Script generation failed: ${scriptResponse.error.message}`);
    }

    const script = scriptResponse.data.generatedText;
    
    // Now generate the audio from the script
    const audioResponse = await supabase.functions.invoke('text-to-speech', {
      body: { script }
    });

    if (audioResponse.error) {
      throw new Error(`Audio generation failed: ${audioResponse.error.message}`);
    }

    // Convert base64 audio to URL
    const base64Audio = audioResponse.data.audioContent;
    const audioBlob = base64ToBlob(base64Audio, 'audio/mp3');
    const url = URL.createObjectURL(audioBlob);
    
    toast({
      title: "Podcast Generated",
      description: "Your microlearning podcast is ready to play!",
    });
    
    return url;
  } catch (error) {
    console.error("Error generating podcast:", error);
    toast({
      title: "Generation Failed",
      description: error instanceof Error ? error.message : "Failed to generate podcast",
      variant: "destructive",
    });
    return null;
  }
};
