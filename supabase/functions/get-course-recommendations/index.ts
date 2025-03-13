
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

    const { type = 'top_courses', limit = 10, skillIds } = await req.json();
    let query = supabaseClient.from('courses').select('*');

    // Different query logic based on recommendation type
    switch (type) {
      case 'continue_learning':
        // Get courses the user has started but not completed
        const { data: authUser } = await supabaseClient.auth.getUser();
        if (authUser?.user) {
          const { data: progressData } = await supabaseClient
            .from('course_progress')
            .select('course_id')
            .eq('user_id', authUser.user.id)
            .lt('progress', 100)
            .gt('progress', 0);

          if (progressData && progressData.length > 0) {
            const courseIds = progressData.map(progress => progress.course_id);
            query = query.in('id', courseIds);
          } else {
            // No courses in progress, return empty array
            return new Response(
              JSON.stringify([]),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
        break;

      case 'for_your_role':
        // Courses related to a specific role (using tags or categories)
        query = query.eq('trainingCategory', 'Leadership');
        break;

      case 'followed_skills':
        // If skillIds provided, filter by those skills
        if (skillIds && skillIds.length > 0) {
          // Using overlap operator to find courses with any of these skills
          query = query.overlaps('skills', skillIds);
        } else {
          // Default to popular skills if none provided
          query = query.order('created_at', { ascending: false });
        }
        break;

      case 'similar_learners':
        // Courses popular among users with similar learning patterns
        query = query.eq('isHot', true);
        break;

      case 'top_courses':
      default:
        // Default recommendation (newest/featured courses)
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Apply limit
    const { data: courses, error } = await query.limit(limit);

    if (error) {
      console.error("Error fetching courses:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(courses),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Server error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
