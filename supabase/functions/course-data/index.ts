
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { mockCourses } from "./mockData.ts";

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

    const bodyText = await req.text();
    let requestParams = {};
    
    if (bodyText) {
      try {
        requestParams = JSON.parse(bodyText);
      } catch (e) {
        console.error("Failed to parse request body as JSON:", e);
      }
    }
    
    // Extract parameters from the body
    const { 
      courseId, 
      domain, 
      skill, 
      search, 
      limit = 20,
      status
    } = requestParams;
    
    if (courseId) {
      // Fetch a single course by ID
      const { data: courseData, error: courseError } = await supabaseClient
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
        
      if (courseError) {
        console.error("Database error fetching course:", courseError);
        
        // Fallback to mock data if course not found in database
        const mockCourse = mockCourses.find(c => c.id === courseId);
        if (mockCourse) {
          console.log("Course not found in database, using mock data");
          return new Response(
            JSON.stringify({ course: mockCourse }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        return new Response(
          JSON.stringify({ error: "Course not found" }),
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
      
      // Check for course progress if user is logged in
      let progress = 0;
      if (authUser?.user) {
        const { data: progressData } = await supabaseClient
          .from('course_progress')
          .select('progress')
          .eq('user_id', authUser.user.id)
          .eq('course_id', courseId)
          .single();
          
        if (progressData) {
          progress = progressData.progress;
        }
      }
      
      // Add the bookmark status and progress to the course
      const courseWithUserData = {
        ...courseData,
        isBookmarked,
        progress
      };
      
      return new Response(
        JSON.stringify({ course: courseWithUserData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Fetch multiple courses with optional filters
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
      
      // Handle status filter for My Learning page
      let statusFilteredCourses: any[] = [];
      const { data: authUser } = await supabaseClient.auth.getUser();
      
      if (status && authUser?.user) {
        // Get courses with progress for status filtering
        const { data: coursesWithProgress } = await supabaseClient
          .from('course_progress')
          .select('course_id, progress, completed_at')
          .eq('user_id', authUser.user.id);
          
        if (coursesWithProgress) {
          const courseIds = coursesWithProgress.map(cp => {
            // Categorize by status
            let courseStatus = 'not_started';
            if (cp.completed_at) courseStatus = 'completed';
            else if (cp.progress > 0) courseStatus = 'in_progress';
            
            return {
              id: cp.course_id,
              status: courseStatus,
              progress: cp.progress
            };
          }).filter(c => {
            if (status === 'in-progress') return c.status === 'in_progress';
            if (status === 'completed') return c.status === 'completed';
            return true;
          }).map(c => c.id);
          
          if (courseIds.length > 0) {
            query = query.in('id', courseIds);
          } else {
            // If no courses match the status, return empty array
            return new Response(
              JSON.stringify({ courses: [] }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
      }
      
      // If status is 'saved' and user is logged in, get bookmarked courses
      if (status === 'saved' && authUser?.user) {
        const { data: bookmarks } = await supabaseClient
          .from('bookmarks')
          .select('course_id')
          .eq('user_id', authUser.user.id);
          
        if (bookmarks && bookmarks.length > 0) {
          const bookmarkedCourseIds = bookmarks.map(b => b.course_id);
          query = query.in('id', bookmarkedCourseIds);
        } else {
          // If no bookmarked courses, return empty array
          return new Response(
            JSON.stringify({ courses: [] }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }
      
      // Apply limit if provided
      if (limit) {
        query = query.limit(parseInt(limit.toString()));
      }
      
      const { data: courses, error: coursesError } = await query;
      
      if (coursesError) {
        console.error("Database error fetching courses:", coursesError);
        
        // Fallback to mock data on error
        console.log("Error fetching courses from database, using mock data");
        
        let filteredMockCourses = [...mockCourses];
        
        // Apply mock filtering
        if (domain) {
          filteredMockCourses = filteredMockCourses.filter(c => 
            c.domain?.toLowerCase() === domain.toLowerCase());
        }
        
        if (skill) {
          filteredMockCourses = filteredMockCourses.filter(c => 
            c.skills?.some(s => s.toLowerCase().includes(skill.toLowerCase())));
        }
        
        if (search) {
          filteredMockCourses = filteredMockCourses.filter(c => 
            c.title.toLowerCase().includes(search.toLowerCase()) || 
            c.description.toLowerCase().includes(search.toLowerCase()));
        }
        
        if (status) {
          filteredMockCourses = filteredMockCourses.filter(c => c.status === status);
        }
        
        // Limit results
        filteredMockCourses = filteredMockCourses.slice(0, parseInt(limit.toString()));
        
        return new Response(
          JSON.stringify({ courses: filteredMockCourses }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Try to get bookmarks if user is logged in
      let bookmarks: Record<string, boolean> = {};
      let progress: Record<string, number> = {};
      
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
        
        // Get progress for all courses
        const { data: progressData } = await supabaseClient
          .from('course_progress')
          .select('course_id, progress')
          .eq('user_id', authUser.user.id);
          
        if (progressData) {
          progress = progressData.reduce((acc: Record<string, number>, item) => {
            acc[item.course_id] = item.progress;
            return acc;
          }, {});
        }
      }
      
      // Add the bookmark status and progress to each course
      const coursesWithUserData = courses?.map(course => ({
        ...course,
        isBookmarked: !!bookmarks[course.id],
        progress: progress[course.id] || 0
      })) || [];
      
      return new Response(
        JSON.stringify({ courses: coursesWithUserData }),
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
