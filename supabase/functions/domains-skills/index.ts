import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.25.0'

// Set up CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to create a Supabase client with the auth header
function getSupabaseClient(authHeader: string) {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: authHeader },
      },
    }
  )
}

// Helper function to create a standard response
function createResponse(data: any, status = 200) {
  return new Response(
    JSON.stringify(data),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status 
    }
  )
}

// Helper function to handle errors
function handleError(error: Error) {
  console.error('Error:', error.message)
  return createResponse({ error: error.message }, 500)
}

// Helper function to validate required parameters
function validateRequiredParam(param: string | null, paramName: string) {
  if (!param) {
    return createResponse(
      { error: `${paramName} is required` },
      400
    )
  }
  return null
}

// Action handlers for each operation
async function handleGetDomains(supabaseClient: any) {
  const { data: domains, error: domainsError } = await supabaseClient
    .from('domains')
    .select('*')
    .order('name', { ascending: true })
  
  if (domainsError) throw domainsError
  
  return { success: true, data: domains }
}

async function handleGetDomain(supabaseClient: any, domainId: string | null) {
  const validationError = validateRequiredParam(domainId, 'Domain ID')
  if (validationError) return validationError
  
  const { data: domain, error: domainError } = await supabaseClient
    .from('domains')
    .select('*')
    .eq('id', domainId)
    .single()
  
  if (domainError) throw domainError
  
  return { success: true, data: domain }
}

async function handleGetSkills(supabaseClient: any, domainId: string | null) {
  let query = supabaseClient
    .from('skills')
    .select('*')
    .order('name', { ascending: true })
  
  if (domainId) {
    query = query.eq('domain_id', domainId)
  }
  
  const { data: skills, error: skillsError } = await query
  
  if (skillsError) throw skillsError
  
  return { success: true, data: skills }
}

async function handleGetSkill(supabaseClient: any, skillId: string | null) {
  const validationError = validateRequiredParam(skillId, 'Skill ID')
  if (validationError) return validationError
  
  const { data: skill, error: skillError } = await supabaseClient
    .from('skills')
    .select('*')
    .eq('id', skillId)
    .single()
  
  if (skillError) throw skillError
  
  return { success: true, data: skill }
}

async function handleGetDomainWithSkills(supabaseClient: any, domainId: string | null) {
  const validationError = validateRequiredParam(domainId, 'Domain ID')
  if (validationError) return validationError
  
  const { data: domainWithSkills, error: domainWithSkillsError } = await supabaseClient
    .from('domains')
    .select(`
      *,
      skills(*)
    `)
    .eq('id', domainId)
    .single()
  
  if (domainWithSkillsError) throw domainWithSkillsError
  
  return { success: true, data: domainWithSkills }
}

async function handleGetSkillWithCourses(supabaseClient: any, skillId: string | null) {
  const validationError = validateRequiredParam(skillId, 'Skill ID')
  if (validationError) return validationError
  
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
  
  return { 
    success: true, 
    data: {
      ...skillWithCourses,
      course_skills: undefined, // Remove the original course_skills property
      courses
    }
  }
}

// Main request handler
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  
  try {
    // Create a Supabase client
    const supabaseClient = getSupabaseClient(req.headers.get('Authorization')!)
    
    // Get query parameters
    const url = new URL(req.url)
    const action = url.searchParams.get('action') || 'get-domains'
    const domainId = url.searchParams.get('domainId')
    const skillId = url.searchParams.get('skillId')
    
    let result = null
    
    // Route to the appropriate handler based on the action
    switch (action) {
      case 'get-domains':
        result = await handleGetDomains(supabaseClient)
        break
      
      case 'get-domain':
        result = await handleGetDomain(supabaseClient, domainId)
        break
      
      case 'get-skills':
        result = await handleGetSkills(supabaseClient, domainId)
        break
      
      case 'get-skill':
        result = await handleGetSkill(supabaseClient, skillId)
        break
      
      case 'get-domain-with-skills':
        result = await handleGetDomainWithSkills(supabaseClient, domainId)
        break
      
      case 'get-skill-with-courses':
        result = await handleGetSkillWithCourses(supabaseClient, skillId)
        break
      
      default:
        return createResponse({ error: 'Invalid action' }, 400)
    }
    
    // If the result is already a Response (error case), just return it
    if (result instanceof Response) {
      return result
    }
    
    // Otherwise, create a standard response
    return createResponse(result)
  } catch (error) {
    return handleError(error)
  }
})
