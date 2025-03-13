
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
    const { action, skillId, proficiency } = requestData
    
    let result = null
    
    switch (action) {
      case 'follow':
        // Follow a skill
        const { data: followData, error: followError } = await supabaseClient
          .from('user_followed_skills')
          .insert({
            user_id: user.id,
            skill_id: skillId
          })
          .select('*')
          .single()
        
        if (followError) {
          if (followError.code === '23505') { // Unique violation
            return new Response(
              JSON.stringify({ message: 'You are already following this skill' }),
              { 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400 
              }
            )
          }
          throw followError
        }
        
        result = { success: true, data: followData }
        break
      
      case 'unfollow':
        // Unfollow a skill
        const { data: unfollowData, error: unfollowError } = await supabaseClient
          .from('user_followed_skills')
          .delete()
          .eq('user_id', user.id)
          .eq('skill_id', skillId)
          .select()
        
        if (unfollowError) throw unfollowError
        
        result = { success: true, data: unfollowData }
        break
      
      case 'get-followed':
        // Get all skills user is following
        const { data: followedSkills, error: followedSkillsError } = await supabaseClient
          .from('user_followed_skills')
          .select('skill_id, skills(*)')
          .eq('user_id', user.id)
        
        if (followedSkillsError) throw followedSkillsError
        
        result = { success: true, data: followedSkills.map(item => item.skills) }
        break
      
      case 'update-proficiency':
        // Update proficiency for a skill
        if (typeof proficiency !== 'number' || proficiency < 0 || proficiency > 100) {
          return new Response(
            JSON.stringify({ error: 'Proficiency must be a number between 0 and 100' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        const { data: proficiencyData, error: proficiencyError } = await supabaseClient
          .from('user_skill_proficiencies')
          .upsert({
            user_id: user.id,
            skill_id: skillId,
            proficiency_percentage: proficiency
          })
          .select()
        
        if (proficiencyError) throw proficiencyError
        
        result = { success: true, data: proficiencyData }
        break
      
      case 'get-proficiencies':
        // Get all skill proficiencies for the user
        const { data: proficiencies, error: proficienciesError } = await supabaseClient
          .from('user_skill_proficiencies')
          .select('skill_id, proficiency_percentage, skills(*)')
          .eq('user_id', user.id)
        
        if (proficienciesError) throw proficienciesError
        
        result = { 
          success: true, 
          data: proficiencies.map(item => ({
            ...item.skills,
            proficiency: item.proficiency_percentage
          }))
        }
        break
      
      case 'get-skill-gaps':
        // Get skill gaps based on job role
        const { data: gaps, error: gapsError } = await supabaseClient
          .rpc('get_user_skill_gaps', { user_id: user.id })
        
        if (gapsError) throw gapsError
        
        result = { success: true, data: gaps }
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
