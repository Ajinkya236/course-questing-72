
/**
 * Extracts the content from a source based on its type
 * @param source - The source to process
 * @returns Processed source content
 */
export const processSource = (source: string): string => {
  // Check if it's a URL
  if (source.startsWith('http://') || source.startsWith('https://')) {
    // YouTube URL detection
    if (
      source.includes('youtube.com') || 
      source.includes('youtu.be')
    ) {
      return `YouTube Video: ${source}`;
    }
    
    // PDF detection
    if (source.endsWith('.pdf')) {
      return `PDF Document: ${source}`;
    }
    
    // Document detection
    if (
      source.endsWith('.doc') || 
      source.endsWith('.docx') || 
      source.endsWith('.ppt') || 
      source.endsWith('.pptx')
    ) {
      return `Office Document: ${source}`;
    }
    
    // Image detection
    if (
      source.endsWith('.jpg') || 
      source.endsWith('.jpeg') || 
      source.endsWith('.png') || 
      source.endsWith('.gif')
    ) {
      return `Image: ${source}`;
    }
    
    // Video detection
    if (
      source.endsWith('.mp4') || 
      source.endsWith('.mov') || 
      source.endsWith('.avi')
    ) {
      return `Video File: ${source}`;
    }
    
    // Default URL
    return `Web Resource: ${source}`;
  }
  
  // Plain text
  return `Text content: ${source}`;
};

// Set up CORS headers for browser requests
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
