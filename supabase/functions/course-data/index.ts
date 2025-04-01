
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

    // Parse request parameters
    const { courseId, domain, skill, search, limit = 20, status } = await req.json();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    // Handle specific course request
    if (courseId) {
      console.log(`Fetching course with ID: ${courseId}`);
      
      const { data: courseData, error: courseError } = await supabaseClient
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (courseError) {
        console.error('Error fetching course:', courseError);
        throw new Error(`Failed to fetch course: ${courseError.message}`);
      }
      
      // Check if the user is authenticated to get progress data
      let progressData = null;
      if (user) {
        const { data: progress, error: progressError } = await supabaseClient
          .from('course_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single();
        
        if (!progressError && progress) {
          progressData = progress;
        }
      }
      
      // Format the course for the frontend
      const formattedCourse = {
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        imageUrl: courseData.imageurl,
        videoUrl: courseData.videourl,
        category: courseData.trainingcategory || courseData.domain,
        duration: courseData.duration || '1h',
        rating: 4.5, // Default rating
        level: courseData.level || 'All Levels',
        skills: courseData.skills,
        progress: progressData?.progress || 0,
        isCompleted: progressData?.completed_at ? true : false,
        instructor: courseData.author || {
          name: 'Instructor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80'
        }
      };
      
      return new Response(
        JSON.stringify({ course: formattedCourse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Handle multiple courses request
    console.log('Fetching courses with filters:', { domain, skill, search, limit, status });
    
    let query = supabaseClient.from('courses').select('*');
    
    // Apply filters
    if (domain) {
      query = query.eq('domain', domain);
    }
    
    if (skill && Array.isArray(skill)) {
      query = query.contains('skills', skill);
    } else if (skill) {
      query = query.contains('skills', [skill]);
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }
    
    // Limit the number of results
    query = query.limit(limit);
    
    const { data: coursesData, error: coursesError } = await query;
    
    if (coursesError) {
      console.error('Error fetching courses:', coursesError);
      throw new Error(`Failed to fetch courses: ${coursesError.message}`);
    }
    
    let courses = coursesData || [];
    
    // Get user progress data if authenticated
    if (user && courses.length > 0) {
      const { data: progressData, error: progressError } = await supabaseClient
        .from('course_progress')
        .select('*')
        .eq('user_id', user.id)
        .in('course_id', courses.map(course => course.id));
        
      if (!progressError && progressData) {
        // Create a map for quick lookup
        const progressMap = progressData.reduce((acc, item) => {
          acc[item.course_id] = item;
          return acc;
        }, {});
        
        // Filter courses by status if specified
        if (status) {
          courses = courses.filter(course => {
            const progress = progressMap[course.id];
            
            switch(status) {
              case 'completed':
                return progress && progress.completed_at;
              case 'in-progress':
                return progress && progress.progress > 0 && !progress.completed_at;
              case 'saved':
                // Check bookmarks table
                return false; // We'll handle bookmarks in a separate query
              case 'assigned':
                // This would require an assignments table
                return false;
              default:
                return true;
            }
          });
        }
        
        // Attach progress data to courses
        courses = courses.map(course => {
          const progress = progressMap[course.id];
          return {
            ...course,
            progress: progress?.progress || 0,
            isCompleted: progress?.completed_at ? true : false
          };
        });
      }
      
      // If status is 'saved', fetch bookmarks
      if (status === 'saved') {
        const { data: bookmarkData, error: bookmarkError } = await supabaseClient
          .from('bookmarks')
          .select('course_id')
          .eq('user_id', user.id);
          
        if (!bookmarkError && bookmarkData) {
          const bookmarkedIds = bookmarkData.map(b => b.course_id);
          
          // Fetch bookmarked courses
          const { data: bookmarkedCourses, error: bookmarkedCoursesError } = await supabaseClient
            .from('courses')
            .select('*')
            .in('id', bookmarkedIds);
            
          if (!bookmarkedCoursesError && bookmarkedCourses) {
            courses = bookmarkedCourses;
          }
        }
      }
    }
    
    // Format courses for the frontend
    const formattedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      imageUrl: course.imageurl,
      videoUrl: course.videourl,
      category: course.trainingcategory || course.domain,
      duration: course.duration || '1h',
      rating: 4.5, // Default rating
      level: course.level || 'All Levels',
      skills: course.skills,
      progress: course.progress || 0,
      isCompleted: course.isCompleted || false,
      instructor: course.author || {
        name: 'Instructor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80'
      },
      isBookmarked: status === 'saved' // If we're showing saved courses, they're bookmarked
    }));
    
    return new Response(
      JSON.stringify({ courses: formattedCourses }),
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
