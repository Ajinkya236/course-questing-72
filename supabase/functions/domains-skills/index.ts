
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
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )
    
    // Get query parameters
    const url = new URL(req.url)
    const action = url.searchParams.get('action') || 'get-domains'
    const domainId = url.searchParams.get('domainId')
    const skillId = url.searchParams.get('skillId')
    
    let result = null
    
    switch (action) {
      case 'get-domains':
        // Get all domains
        const { data: domains, error: domainsError } = await supabaseClient
          .from('domains')
          .select('*')
          .order('name', { ascending: true })
        
        if (domainsError) throw domainsError
        
        result = { success: true, data: domains }
        break
      
      case 'get-domain':
        // Get a specific domain
        if (!domainId) {
          return new Response(
            JSON.stringify({ error: 'Domain ID is required' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        const { data: domain, error: domainError } = await supabaseClient
          .from('domains')
          .select('*')
          .eq('id', domainId)
          .single()
        
        if (domainError) throw domainError
        
        result = { success: true, data: domain }
        break
      
      case 'get-skills':
        // Get all skills or skills for a specific domain
        let query = supabaseClient
          .from('skills')
          .select('*')
          .order('name', { ascending: true })
        
        if (domainId) {
          query = query.eq('domain_id', domainId)
        }
        
        const { data: skills, error: skillsError } = await query
        
        if (skillsError) throw skillsError
        
        result = { success: true, data: skills }
        break
      
      case 'get-skill':
        // Get a specific skill
        if (!skillId) {
          return new Response(
            JSON.stringify({ error: 'Skill ID is required' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        const { data: skill, error: skillError } = await supabaseClient
          .from('skills')
          .select('*')
          .eq('id', skillId)
          .single()
        
        if (skillError) throw skillError
        
        result = { success: true, data: skill }
        break
      
      case 'get-domain-with-skills':
        // Get a domain with all its skills
        if (!domainId) {
          return new Response(
            JSON.stringify({ error: 'Domain ID is required' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        const { data: domainWithSkills, error: domainWithSkillsError } = await supabaseClient
          .from('domains')
          .select(`
            *,
            skills(*)
          `)
          .eq('id', domainId)
          .single()
        
        if (domainWithSkillsError) throw domainWithSkillsError
        
        result = { success: true, data: domainWithSkills }
        break
      
      case 'get-skill-with-courses':
        // Get a skill with all its courses
        if (!skillId) {
          return new Response(
            JSON.stringify({ error: 'Skill ID is required' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        const { data: skillWithCourses, error: skillWithCoursesError } = await supabaseClient
          .from('skills')
          .select(`
            *,
            course_skills(
              courses(*)
            )
          `)
          .eq('id', skillId)
          .single()
        
        if (skillWithCoursesError) throw skillWithCoursesError
        
        // Transform the result to a more usable format
        const courses = skillWithCourses.course_skills.map(cs => cs.courses)
        
        result = { 
          success: true, 
          data: {
            ...skillWithCourses,
            course_skills: undefined, // Remove the original course_skills property
            courses
          }
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
