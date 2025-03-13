
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
    
    // Parse request body
    const requestData = await req.json()
    const { action, courseId, progress, position, status, content } = requestData
    
    let result = null
    
    switch (action) {
      case 'bookmark':
        // Bookmark a course
        const { data: bookmarkData, error: bookmarkError } = await supabaseClient
          .from('user_bookmarks')
          .insert({
            user_id: user.id,
            course_id: courseId
          })
          .select()
        
        if (bookmarkError) {
          if (bookmarkError.code === '23505') { // Unique violation
            return new Response(
              JSON.stringify({ message: 'Course already bookmarked' }),
              { 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400 
              }
            )
          }
          throw bookmarkError
        }
        
        result = { success: true, data: bookmarkData }
        break
      
      case 'unbookmark':
        // Remove a bookmark
        const { data: unbookmarkData, error: unbookmarkError } = await supabaseClient
          .from('user_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .select()
        
        if (unbookmarkError) throw unbookmarkError
        
        result = { success: true, data: unbookmarkData }
        break
      
      case 'get-bookmarks':
        // Get all bookmarked courses
        const { data: bookmarks, error: bookmarksError } = await supabaseClient
          .from('user_bookmarks')
          .select('course_id, created_at, courses(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        
        if (bookmarksError) throw bookmarksError
        
        result = { 
          success: true, 
          data: bookmarks.map(item => ({
            ...item.courses,
            bookmarked_at: item.created_at
          }))
        }
        break
      
      case 'update-progress':
        // Update course progress
        if (typeof progress !== 'number' || progress < 0 || progress > 100) {
          return new Response(
            JSON.stringify({ error: 'Progress must be a number between 0 and 100' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        let updateData = {
          user_id: user.id,
          course_id: courseId,
          progress_percentage: progress,
          last_position: position || null,
          updated_at: new Date().toISOString()
        }
        
        // If status is provided, update it
        if (status && ['not_started', 'in_progress', 'completed', 'saved'].includes(status)) {
          updateData = { ...updateData, status }
          
          // If completing the course, set completed_at
          if (status === 'completed') {
            updateData = { 
              ...updateData, 
              completed_at: new Date().toISOString(),
              progress_percentage: 100
            }
            
            // Award points for completion
            await supabaseClient.rpc('award_user_points', {
              user_id: user.id,
              points_amount: 50,
              reason: 'Completed course',
              ref_type: 'course',
              ref_id: courseId
            })
          }
        }
        
        const { data: progressData, error: progressError } = await supabaseClient
          .from('user_course_progress')
          .upsert(updateData)
          .select()
        
        if (progressError) throw progressError
        
        result = { success: true, data: progressData }
        break
      
      case 'get-progress':
        // Get progress for a specific course
        const { data: courseProgress, error: courseProgressError } = await supabaseClient
          .from('user_course_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single()
        
        if (courseProgressError) {
          if (courseProgressError.code === 'PGRST116') { // No rows returned
            result = { 
              success: true, 
              data: {
                user_id: user.id,
                course_id: courseId,
                progress_percentage: 0,
                status: 'not_started',
                last_position: null
              }
            }
          } else {
            throw courseProgressError
          }
        } else {
          result = { success: true, data: courseProgress }
        }
        break
      
      case 'get-all-progress':
        // Get progress for all courses
        const { data: allProgress, error: allProgressError } = await supabaseClient
          .from('user_course_progress')
          .select('*, courses(*)')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
        
        if (allProgressError) throw allProgressError
        
        result = { 
          success: true, 
          data: allProgress.map(item => ({
            ...item.courses,
            progress: item.progress_percentage,
            status: item.status,
            last_position: item.last_position,
            started_at: item.started_at,
            completed_at: item.completed_at,
            updated_at: item.updated_at
          }))
        }
        break
      
      case 'save-note':
        // Save a note for a course
        if (!content) {
          return new Response(
            JSON.stringify({ error: 'Note content is required' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        const { data: noteData, error: noteError } = await supabaseClient
          .from('user_course_notes')
          .upsert({
            user_id: user.id,
            course_id: courseId,
            content,
            updated_at: new Date().toISOString()
          })
          .select()
        
        if (noteError) throw noteError
        
        result = { success: true, data: noteData }
        break
      
      case 'get-note':
        // Get note for a course
        const { data: noteContent, error: noteContentError } = await supabaseClient
          .from('user_course_notes')
          .select('content, created_at, updated_at')
          .eq('user_id', user.id)
          .eq('course_id', courseId)
          .single()
        
        if (noteContentError) {
          if (noteContentError.code === 'PGRST116') { // No rows returned
            result = { success: true, data: null }
          } else {
            throw noteContentError
          }
        } else {
          result = { success: true, data: noteContent }
        }
        break
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400 
          }
        )
    }
    
    return new Response(
      JSON.stringify(result),
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
