
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

    // Parse the request URL to extract any path parameters or query params
    const url = new URL(req.url)
    const path = url.pathname.split('/').pop() || ''
    
    // If a course ID is provided, return that specific course
    if (path && path !== 'course-data') {
      console.log(`Fetching course with ID: ${path}`)
      const { data: course, error } = await supabaseAdmin
        .from('courses')
        .select('*')
        .eq('id', path)
        .single()
      
      if (error) throw new Error(`Error fetching course: ${error.message}`)
      
      return new Response(
        JSON.stringify({ course }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }
    
    // Handle query parameters for filtering courses
    const domain = url.searchParams.get('domain')
    const skill = url.searchParams.get('skill')
    const search = url.searchParams.get('search')
    const limit = parseInt(url.searchParams.get('limit') || '20')
    
    // Build the database query based on filters
    let query = supabaseAdmin.from('courses').select('*')
    
    if (domain) {
      query = query.eq('domain', domain)
    }
    
    if (skill) {
      query = query.contains('skills', [skill])
    }
    
    if (search) {
      query = query.ilike('title', `%${search}%`)
    }
    
    // Execute the query with a limit
    const { data: courses, error } = await query.limit(limit)
    
    if (error) throw new Error(`Error fetching courses: ${error.message}`)
    
    return new Response(
      JSON.stringify({ 
        courses,
        count: courses.length,
        filters: { domain, skill, search }
      }),
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
