
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.25.0'

// Set up CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mock domains
const mockDomains = [
  {
    name: 'Technology',
    description: 'Computing, programming, and digital technologies',
    icon: 'Code'
  },
  {
    name: 'Business',
    description: 'Management, finance, and business operations',
    icon: 'Briefcase'
  },
  {
    name: 'Leadership',
    description: 'Leadership skills and management',
    icon: 'Users'
  },
  {
    name: 'Personal Development',
    description: 'Skills for personal growth and well-being',
    icon: 'Heart'
  },
  {
    name: 'Data Science',
    description: 'Data analysis, machine learning, and statistics',
    icon: 'BarChart'
  }
];

// Mock skills per domain
const mockSkillsByDomain = {
  'Technology': [
    'JavaScript',
    'Python',
    'React',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Mobile Development'
  ],
  'Business': [
    'Project Management',
    'Marketing',
    'Finance',
    'Entrepreneurship',
    'Sales',
    'Business Strategy'
  ],
  'Leadership': [
    'Team Management',
    'Effective Communication',
    'Decision Making',
    'Conflict Resolution',
    'Coaching',
    'Strategic Leadership'
  ],
  'Personal Development': [
    'Time Management',
    'Stress Management',
    'Critical Thinking',
    'Public Speaking',
    'Creativity',
    'Emotional Intelligence'
  ],
  'Data Science': [
    'SQL',
    'Data Visualization',
    'Machine Learning',
    'Statistical Analysis',
    'Big Data',
    'Pandas',
    'R'
  ]
};

// Mock job roles
const mockJobRoles = [
  {
    code: 'JR001',
    name: 'Junior Developer',
    description: 'Entry-level developer position',
    next_level_role_code: 'JR002'
  },
  {
    code: 'JR002',
    name: 'Mid-level Developer',
    description: 'Developer with 2-4 years experience',
    next_level_role_code: 'JR003'
  },
  {
    code: 'JR003',
    name: 'Senior Developer',
    description: 'Developer with 5+ years experience',
    next_level_role_code: 'JR004'
  },
  {
    code: 'JR004',
    name: 'Team Lead',
    description: 'Technical team lead',
    next_level_role_code: 'JR005'
  },
  {
    code: 'JR005',
    name: 'Engineering Manager',
    description: 'Manager of engineering teams',
    next_level_role_code: null
  },
  {
    code: 'JR006',
    name: 'Product Manager',
    description: 'Product management role',
    next_level_role_code: 'JR007'
  },
  {
    code: 'JR007',
    name: 'Senior Product Manager',
    description: 'Senior product management role',
    next_level_role_code: null
  }
];

// Mock rewards
const mockRewards = [
  {
    name: '50 Points',
    description: 'Earn 50 bonus points',
    type: 'points',
    value: 50,
    probability: 0.3,
    image_url: 'https://placehold.co/200x200?text=50+Points'
  },
  {
    name: '100 Points',
    description: 'Earn 100 bonus points',
    type: 'points',
    value: 100,
    probability: 0.2,
    image_url: 'https://placehold.co/200x200?text=100+Points'
  },
  {
    name: '200 Points',
    description: 'Earn 200 bonus points',
    type: 'points',
    value: 200,
    probability: 0.1,
    image_url: 'https://placehold.co/200x200?text=200+Points'
  },
  {
    name: '500 Points',
    description: 'Earn 500 bonus points',
    type: 'points',
    value: 500,
    probability: 0.05,
    image_url: 'https://placehold.co/200x200?text=500+Points'
  },
  {
    name: 'Completion Badge',
    description: 'Earn a special completion badge',
    type: 'badge',
    value: null, // Will be set to a real badge ID
    probability: 0.2,
    image_url: 'https://placehold.co/200x200?text=Badge'
  },
  {
    name: 'Certificate',
    description: 'Earn a special certificate',
    type: 'certificate',
    value: null,
    probability: 0.1,
    image_url: 'https://placehold.co/200x200?text=Certificate'
  },
  {
    name: 'Special Reward',
    description: 'Unlock a special reward',
    type: 'special',
    value: null,
    probability: 0.05,
    image_url: 'https://placehold.co/200x200?text=Special'
  }
];

// Mock badges
const mockBadges = [
  {
    name: 'Fast Learner',
    description: 'Complete 5 courses',
    image_url: 'https://placehold.co/200x200?text=Fast+Learner',
    criteria: 'Complete 5 courses'
  },
  {
    name: 'Tech Guru',
    description: 'Complete 3 technology courses',
    image_url: 'https://placehold.co/200x200?text=Tech+Guru',
    criteria: 'Complete 3 technology courses'
  },
  {
    name: 'Business Expert',
    description: 'Complete 3 business courses',
    image_url: 'https://placehold.co/200x200?text=Business+Expert',
    criteria: 'Complete 3 business courses'
  },
  {
    name: 'Leadership Star',
    description: 'Complete 3 leadership courses',
    image_url: 'https://placehold.co/200x200?text=Leadership+Star',
    criteria: 'Complete 3 leadership courses'
  },
  {
    name: 'Perfect Score',
    description: 'Get 100% on a course assessment',
    image_url: 'https://placehold.co/200x200?text=Perfect+Score',
    criteria: 'Get 100% on a course assessment'
  }
];

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
    
    // Get query parameters to control what we sync
    const url = new URL(req.url)
    const syncDomains = url.searchParams.get('domains') === 'true'
    const syncSkills = url.searchParams.get('skills') === 'true'
    const syncJobRoles = url.searchParams.get('job_roles') === 'true'
    const syncRewards = url.searchParams.get('rewards') === 'true'
    const syncBadges = url.searchParams.get('badges') === 'true'
    const syncAll = url.searchParams.get('all') === 'true'
    
    const results = {}
    
    // Sync domains
    if (syncAll || syncDomains) {
      const { data: domains, error: domainsError } = await supabaseAdmin
        .from('domains')
        .upsert(mockDomains.map(domain => ({
          name: domain.name,
          description: domain.description,
          icon: domain.icon
        })))
        .select('id, name')
      
      if (domainsError) throw domainsError
      results['domains'] = domains
      
      // Get all domains for reference
      const { data: allDomains, error: allDomainsError } = await supabaseAdmin
        .from('domains')
        .select('id, name')
      
      if (allDomainsError) throw allDomainsError
      
      // Sync skills if domains were synced
      if (syncAll || syncSkills) {
        const domainMap = {}
        allDomains.forEach(domain => {
          domainMap[domain.name] = domain.id
        })
        
        // Prepare skills data
        const skillsToInsert = []
        Object.keys(mockSkillsByDomain).forEach(domainName => {
          const domainId = domainMap[domainName]
          if (domainId) {
            mockSkillsByDomain[domainName].forEach(skillName => {
              skillsToInsert.push({
                name: skillName,
                description: `Skills related to ${skillName}`,
                domain_id: domainId,
                icon: null
              })
            })
          }
        })
        
        // Insert skills
        const { data: skills, error: skillsError } = await supabaseAdmin
          .from('skills')
          .upsert(skillsToInsert)
          .select('id, name, domain_id')
        
        if (skillsError) throw skillsError
        results['skills'] = skills
      }
    }
    
    // Sync job roles
    if (syncAll || syncJobRoles) {
      // First, insert without references
      const rolesWithoutReferences = mockJobRoles.map(role => ({
        code: role.code,
        name: role.name,
        description: role.description,
        next_level_role_code: null
      }))
      
      const { error: rolesInitialError } = await supabaseAdmin
        .from('job_roles')
        .upsert(rolesWithoutReferences)
      
      if (rolesInitialError) throw rolesInitialError
      
      // Then update with correct references
      for (const role of mockJobRoles) {
        if (role.next_level_role_code) {
          const { error: roleUpdateError } = await supabaseAdmin
            .from('job_roles')
            .update({ next_level_role_code: role.next_level_role_code })
            .eq('code', role.code)
          
          if (roleUpdateError) throw roleUpdateError
        }
      }
      
      // Get inserted roles
      const { data: roles, error: rolesError } = await supabaseAdmin
        .from('job_roles')
        .select('*')
      
      if (rolesError) throw rolesError
      results['job_roles'] = roles
    }
    
    // Sync badges
    if (syncAll || syncBadges) {
      const { data: badges, error: badgesError } = await supabaseAdmin
        .from('badges')
        .upsert(mockBadges)
        .select('*')
      
      if (badgesError) throw badgesError
      results['badges'] = badges
    }
    
    // Sync rewards
    if (syncAll || syncRewards) {
      // Get the first badge to use for badge rewards
      const { data: firstBadge, error: firstBadgeError } = await supabaseAdmin
        .from('badges')
        .select('id')
        .limit(1)
        .single()
      
      if (firstBadgeError) throw firstBadgeError
      
      // Set the badge ID for badge rewards
      const rewardsToInsert = mockRewards.map(reward => {
        if (reward.type === 'badge' && firstBadge) {
          return { ...reward, value: firstBadge.id }
        }
        return reward
      })
      
      const { data: rewards, error: rewardsError } = await supabaseAdmin
        .from('rewards')
        .upsert(rewardsToInsert)
        .select('*')
      
      if (rewardsError) throw rewardsError
      results['rewards'] = rewards
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mock data synchronized successfully',
        results
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
