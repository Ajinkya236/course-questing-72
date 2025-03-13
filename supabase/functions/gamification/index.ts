
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
    const { action, points, reason, referenceType, referenceId } = requestData
    
    let result = null
    
    switch (action) {
      case 'get-points':
        // Get user's current points
        const { data: profile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('points')
          .eq('id', user.id)
          .single()
        
        if (profileError) throw profileError
        
        result = { success: true, data: { points: profile.points } }
        break
      
      case 'get-points-history':
        // Get user's points history
        const { data: history, error: historyError } = await supabaseClient
          .from('user_points_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50)
        
        if (historyError) throw historyError
        
        result = { success: true, data: history }
        break
      
      case 'award-points':
        // Manually award points (for testing or admin purposes)
        if (typeof points !== 'number' || points <= 0) {
          return new Response(
            JSON.stringify({ error: 'Points must be a positive number' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        if (!reason) {
          return new Response(
            JSON.stringify({ error: 'Reason is required for awarding points' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          )
        }
        
        const { data: awardResult, error: awardError } = await supabaseClient
          .rpc('award_user_points', {
            user_id: user.id,
            points_amount: points,
            reason,
            ref_type: referenceType || null,
            ref_id: referenceId || null
          })
        
        if (awardError) throw awardError
        
        result = { success: true, data: { pointsId: awardResult } }
        break
      
      case 'open-mystery-box':
        // Open a mystery box to get a random reward
        const { data: mysteryBoxReward, error: mysteryBoxError } = await supabaseClient
          .rpc('award_random_reward', {
            user_id: user.id,
            source: 'mystery_box'
          })
        
        if (mysteryBoxError) throw mysteryBoxError
        
        result = { success: true, data: mysteryBoxReward }
        break
      
      case 'spin-wheel':
        // Spin the wheel to get a random reward
        const { data: spinWheelReward, error: spinWheelError } = await supabaseClient
          .rpc('award_random_reward', {
            user_id: user.id,
            source: 'spin_wheel'
          })
        
        if (spinWheelError) throw spinWheelError
        
        result = { success: true, data: spinWheelReward }
        break
      
      case 'get-badges':
        // Get user's earned badges
        const { data: badges, error: badgesError } = await supabaseClient
          .from('user_badges')
          .select('badge_id, awarded_at, badges(*)')
          .eq('user_id', user.id)
          .order('awarded_at', { ascending: false })
        
        if (badgesError) throw badgesError
        
        result = { 
          success: true, 
          data: badges.map(item => ({
            ...item.badges,
            awarded_at: item.awarded_at
          }))
        }
        break
      
      case 'get-rewards-history':
        // Get user's rewards history
        const { data: rewards, error: rewardsError } = await supabaseClient
          .from('user_rewards_history')
          .select('source, created_at, rewards(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50)
        
        if (rewardsError) throw rewardsError
        
        result = { 
          success: true, 
          data: rewards.map(item => ({
            ...item.rewards,
            source: item.source,
            received_at: item.created_at
          }))
        }
        break
      
      case 'get-leaderboard':
        // Get current leaderboard
        const { data: leaderboard, error: leaderboardError } = await supabaseClient
          .from('leaderboard')
          .select('position, position_change, points, user_id, profiles(first_name, last_name, avatar_url)')
          .order('position', { ascending: true })
          .limit(100)
        
        if (leaderboardError) throw leaderboardError
        
        result = { success: true, data: leaderboard }
        break
      
      case 'get-user-rank':
        // Get user's rank in the leaderboard
        const { data: userRank, error: userRankError } = await supabaseClient
          .from('leaderboard')
          .select('position, position_change, points')
          .eq('user_id', user.id)
          .single()
        
        if (userRankError) {
          if (userRankError.code === 'PGRST116') { // No rows returned
            result = { 
              success: true, 
              data: {
                position: null,
                position_change: 0,
                points: 0
              }
            }
          } else {
            throw userRankError
          }
        } else {
          result = { success: true, data: userRank }
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
