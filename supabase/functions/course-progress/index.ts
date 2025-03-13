
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "User not authenticated" }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, courseId, progress, position, status, content } = await req.json();

    switch (action) {
      case 'update-progress': {
        // Check if progress record exists
        const { data: existingProgress } = await supabaseClient
          .from('course_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();

        let result;
        
        if (existingProgress) {
          // Update existing record
          const updateData: any = { 
            progress,
            updated_at: new Date().toISOString()
          };
          
          if (position !== undefined) {
            updateData.last_position_seconds = position;
          }
          
          if (status) {
            if (status === 'completed') {
              updateData.completed_at = new Date().toISOString();
            }
          }
          
          if (progress === 100 && !existingProgress.completed_at) {
            updateData.completed_at = new Date().toISOString();
          }
          
          result = await supabaseClient
            .from('course_progress')
            .update(updateData)
            .eq('id', existingProgress.id)
            .select()
            .single();
        } else {
          // Create new record
          const insertData: any = {
            user_id: user.id,
            course_id: courseId,
            progress: progress || 0,
          };
          
          if (position !== undefined) {
            insertData.last_position_seconds = position;
          }
          
          if (progress === 100) {
            insertData.completed_at = new Date().toISOString();
          }
          
          result = await supabaseClient
            .from('course_progress')
            .insert(insertData)
            .select()
            .single();
        }
        
        return new Response(
          JSON.stringify(result.data),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'get-progress': {
        const { data, error } = await supabaseClient
          .from('course_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();
          
        if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        return new Response(
          JSON.stringify({ progress: data || { progress: 0 } }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'get-all-progress': {
        const { data, error } = await supabaseClient
          .from('course_progress')
          .select('*, courses(*)')
          .eq('user_id', user.id);
          
        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        return new Response(
          JSON.stringify({ progress: data || [] }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'bookmark': {
        const { data: existingBookmark } = await supabaseClient
          .from('bookmarks')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();
          
        if (!existingBookmark) {
          const { data, error } = await supabaseClient
            .from('bookmarks')
            .insert({
              user_id: user.id,
              course_id: courseId
            })
            .select()
            .single();
            
          if (error) {
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          
          return new Response(
            JSON.stringify({ bookmark: data, isBookmarked: true }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        return new Response(
          JSON.stringify({ bookmark: existingBookmark, isBookmarked: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'unbookmark': {
        const { error } = await supabaseClient
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', courseId);
          
        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        return new Response(
          JSON.stringify({ isBookmarked: false }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'get-bookmarks': {
        const { data, error } = await supabaseClient
          .from('bookmarks')
          .select('*, courses(*)')
          .eq('user_id', user.id);
          
        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        // Transform into the format expected by the frontend
        const bookmarkedCourses = data.map(bookmark => ({
          ...bookmark.courses,
          isBookmarked: true
        }));
        
        return new Response(
          JSON.stringify({ bookmarks: bookmarkedCourses }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'save-note': {
        // Save a note for a course
        // Note: In a real system, we'd need a notes table
        return new Response(
          JSON.stringify({ success: true, message: "Notes saving not implemented yet" }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'get-note': {
        // Get a note for a course
        // Note: In a real system, we'd need a notes table
        return new Response(
          JSON.stringify({ note: "" }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error("Server error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
