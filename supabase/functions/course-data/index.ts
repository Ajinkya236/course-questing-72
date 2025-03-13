
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

    // Check if we're fetching a single course or multiple courses
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    // The last part after /functions/course-data/ would be the course ID if present
    const courseId = pathParts.length > 0 ? pathParts[pathParts.length - 1] : null;
    
    if (courseId && courseId !== 'course-data') {
      // Fetch a single course by ID
      const { data: course, error } = await supabaseClient
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
        
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Try to get the bookmark status if user is logged in
      const { data: authUser } = await supabaseClient.auth.getUser();
      let isBookmarked = false;
      
      if (authUser?.user) {
        const { data: bookmarkData } = await supabaseClient
          .from('bookmarks')
          .select('*')
          .eq('user_id', authUser.user.id)
          .eq('course_id', courseId)
          .single();
          
        isBookmarked = !!bookmarkData;
      }
      
      // Add the bookmark status to the course
      const courseWithBookmark = {
        ...course,
        isBookmarked
      };
      
      return new Response(
        JSON.stringify({ course: courseWithBookmark }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Fetch multiple courses with optional filters
      const { domain, skill, search, limit = '20' } = await req.json();
      
      let query = supabaseClient.from('courses').select('*');
      
      if (domain) {
        query = query.eq('domain', domain);
      }
      
      if (skill) {
        query = query.contains('skills', [skill]);
      }
      
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }
      
      const { data: courses, error } = await query.limit(parseInt(limit));
      
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Try to get bookmarks if user is logged in
      const { data: authUser } = await supabaseClient.auth.getUser();
      let bookmarks: Record<string, boolean> = {};
      
      if (authUser?.user) {
        const { data: bookmarkData } = await supabaseClient
          .from('bookmarks')
          .select('course_id')
          .eq('user_id', authUser.user.id);
          
        if (bookmarkData) {
          bookmarks = bookmarkData.reduce((acc: Record<string, boolean>, bookmark) => {
            acc[bookmark.course_id] = true;
            return acc;
          }, {});
        }
      }
      
      // Add the bookmark status to each course
      const coursesWithBookmarks = courses.map(course => ({
        ...course,
        isBookmarked: !!bookmarks[course.id]
      }));
      
      return new Response(
        JSON.stringify({ courses: coursesWithBookmarks }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
