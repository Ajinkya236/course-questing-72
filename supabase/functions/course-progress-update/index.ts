
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
    // Extract the JWT token from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Authorization header is required')
    }
    
    // Expecting format "Bearer <token>"
    const token = authHeader.split(' ')[1]
    if (!token) {
      throw new Error('Bearer token is required')
    }
    
    // Create a Supabase client with admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    
    // Verify the token and get user info
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError || !user) {
      throw new Error('Invalid user token')
    }
    
    const userId = user.id
    
    // Parse the request body
    const { courseId, progress, completedAt = null } = await req.json()
    
    if (!courseId || progress === undefined) {
      throw new Error('Course ID and progress are required')
    }
    
    // Check if a progress record already exists
    const { data: existingProgress, error: findError } = await supabaseAdmin
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()
      
    if (findError && findError.code !== 'PGRST116') {
      // An actual error occurred (not just "no rows returned")
      throw findError
    }
    
    let result
    
    if (existingProgress) {
      // Update existing progress
      const { data, error: updateError } = await supabaseAdmin
        .from('course_progress')
        .update({ 
          progress, 
          completed_at: completedAt,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id)
        .select()
      
      if (updateError) throw updateError
      result = data
    } else {
      // Insert new progress record
      const { data, error: insertError } = await supabaseAdmin
        .from('course_progress')
        .insert({
          user_id: userId,
          course_id: courseId,
          progress,
          completed_at: completedAt,
        })
        .select()
      
      if (insertError) throw insertError
      result = data
    }
    
    return new Response(
      JSON.stringify({ success: true, progress: result }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
