import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.25.0'

// Set up CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )
    
    // Check if user is authenticated
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      )
    }
    
    // Get query parameters
    const url = new URL(req.url)
    const recommendationType = url.searchParams.get('type') || 'top_courses'
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const skillIds = url.searchParams.get('skillIds')?.split(',') || []
    
    let courses = []
    
    // Get recommendations based on type
    switch (recommendationType) {
      case 'continue_learning':
        // Get in-progress courses
        const { data: inProgressCourses, error: inProgressError } = await supabaseClient
          .from('user_course_progress')
          .select('course_id, progress_percentage, updated_at, courses(*)')
          .eq('user_id', user.id)
          .eq('status', 'in_progress')
          .order('updated_at', { ascending: false })
          .limit(limit)
        
        if (inProgressError) throw inProgressError
        courses = inProgressCourses.map(item => item.courses)
        break
      
      case 'for_your_role':
        // Get courses based on user's job role
        const { data: profile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('job_role_code')
          .eq('id', user.id)
          .single()
        
        if (profileError) throw profileError
        
        if (profile.job_role_code) {
          const { data: roleCourses, error: roleError } = await supabaseClient
            .from('courses')
            .select('*, course_skills!inner(skill_id), job_role_skills!inner(expected_proficiency)')
            .eq('job_role_skills.job_role_code', profile.job_role_code)
            .eq('course_skills.skill_id', 'job_role_skills.skill_id')
            .order('job_role_skills.expected_proficiency', { ascending: false })
            .limit(limit)
          
          if (roleError) throw roleError
          courses = roleCourses
        }
        break
      
      case 'followed_skills':
        // Get courses for skills the user follows
        if (skillIds.length > 0) {
          // If specific skills are requested, use those
          const { data: skillCourses, error: skillCoursesError } = await supabaseClient
            .from('courses')
            .select('*, course_skills!inner(skill_id)')
            .in('course_skills.skill_id', skillIds)
            .limit(limit)
          
          if (skillCoursesError) throw skillCoursesError
          courses = skillCourses
        } else {
          // Otherwise get all skills the user follows
          const { data: followedSkills, error: followedSkillsError } = await supabaseClient
            .from('user_followed_skills')
            .select('skill_id')
            .eq('user_id', user.id)
          
          if (followedSkillsError) throw followedSkillsError
          
          if (followedSkills.length > 0) {
            const followedSkillIds = followedSkills.map(item => item.skill_id)
            
            const { data: skillCourses, error: skillCoursesError } = await supabaseClient
              .from('courses')
              .select('*, course_skills!inner(skill_id)')
              .in('course_skills.skill_id', followedSkillIds)
              .limit(limit)
            
            if (skillCoursesError) throw skillCoursesError
            courses = skillCourses
          }
        }
        break
      
      case 'similar_learners':
        // Get courses popular with users who have the same job role
        const { data: userProfile, error: userProfileError } = await supabaseClient
          .from('profiles')
          .select('job_role_code')
          .eq('id', user.id)
          .single()
        
        if (userProfileError) throw userProfileError
        
        if (userProfile.job_role_code) {
          // Find users with same job role
          const { data: similarUsers, error: similarUsersError } = await supabaseClient
            .from('profiles')
            .select('id')
            .eq('job_role_code', userProfile.job_role_code)
            .neq('id', user.id)
            .limit(50)
          
          if (similarUsersError) throw similarUsersError
          
          if (similarUsers.length > 0) {
            const similarUserIds = similarUsers.map(u => u.id)
            
            // Find popular courses among similar users
            const { data: popularCourses, error: popularCoursesError } = await supabaseClient
              .from('user_course_progress')
              .select('course_id, count')
              .in('user_id', similarUserIds)
              .in('status', ['in_progress', 'completed'])
              .group('course_id')
              .order('count', { ascending: false })
              .limit(limit)
            
            if (popularCoursesError) throw popularCoursesError
            
            if (popularCourses.length > 0) {
              const courseIds = popularCourses.map(item => item.course_id)
              
              const { data: coursesData, error: coursesError } = await supabaseClient
                .from('courses')
                .select('*')
                .in('id', courseIds)
                .limit(limit)
              
              if (coursesError) throw coursesError
              courses = coursesData
            }
          }
        }
        break
      
      case 'top_courses':
      default:
        // Get top courses with basic recommendation logic
        // First, get user skills and job role
        const { data: userFullProfile, error: userFullProfileError } = await supabaseClient
          .from('profiles')
          .select('job_role_code')
          .eq('id', user.id)
          .single()
        
        if (userFullProfileError) throw userFullProfileError
        
        // Get skills user is following
        const { data: userSkills, error: userSkillsError } = await supabaseClient
          .from('user_followed_skills')
          .select('skill_id')
          .eq('user_id', user.id)
        
        if (userSkillsError) throw userSkillsError
        
        // Get courses already in progress or completed
        const { data: userProgress, error: userProgressError } = await supabaseClient
          .from('user_course_progress')
          .select('course_id, status')
          .eq('user_id', user.id)
        
        if (userProgressError) throw userProgressError
        
        // Exclude completed courses
        const completedCourseIds = userProgress
          .filter(item => item.status === 'completed')
          .map(item => item.course_id)
        
        // Priority for in-progress courses
        const inProgressCourseIds = userProgress
          .filter(item => item.status === 'in_progress')
          .map(item => item.course_id)
        
        // Get all available courses
        const { data: allCourses, error: allCoursesError } = await supabaseClient
          .from('courses')
          .select('*, course_skills(skill_id)')
          .not('id', 'in', completedCourseIds)
          .limit(50)  // Get more courses than needed for scoring
        
        if (allCoursesError) throw allCoursesError
        
        // Score courses based on relevance
        if (allCourses.length > 0) {
          const userSkillIds = userSkills.map(item => item.skill_id)
          
          // Create a scoring system for courses
          const scoredCourses = allCourses.map(course => {
            let score = 0
            const courseSkillIds = course.course_skills.map(cs => cs.skill_id)
            
            // Boost score for courses matching user skills
            userSkillIds.forEach(skillId => {
              if (courseSkillIds.includes(skillId)) {
                score += 20  // 20 points for each skill match
              }
            })
            
            // Boost score for in-progress courses
            if (inProgressCourseIds.includes(course.id)) {
              score += 50
            }
            
            // Small boost for newer courses
            const publishedDate = new Date(course.published_at).getTime()
            const now = new Date().getTime()
            const daysSincePublished = (now - publishedDate) / (1000 * 60 * 60 * 24)
            if (daysSincePublished < 30) {
              score += 10  // Boost for courses less than 30 days old
            }
            
            return {
              ...course,
              score
            }
          })
          
          // Sort by score and limit to requested number
          courses = scoredCourses
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
            .map(course => {
              const { score, course_skills, ...rest } = course
              return rest
            })
        }
        break
    }
    
    return new Response(
      JSON.stringify({ data: courses }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
