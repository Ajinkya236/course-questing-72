
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
  },
  {
    name: 'Design',
    description: 'User experience, graphic design, and visual communication',
    icon: 'Palette'
  },
  {
    name: 'Marketing',
    description: 'Digital marketing, branding, and customer engagement',
    icon: 'TrendingUp'
  },
  {
    name: 'Communication',
    description: 'Verbal, written, and interpersonal communication skills',
    icon: 'MessageCircle'
  }
];

// Expanded mock skills per domain
const mockSkillsByDomain = {
  'Technology': [
    'JavaScript',
    'Python',
    'React',
    'Cloud Computing',
    'DevOps',
    'Cybersecurity',
    'Mobile Development',
    'Node.js',
    'Artificial Intelligence',
    'Blockchain',
    'IoT',
    'Web Development',
    'Data Engineering'
  ],
  'Business': [
    'Project Management',
    'Marketing',
    'Finance',
    'Entrepreneurship',
    'Sales',
    'Business Strategy',
    'Operations Management',
    'Business Analysis',
    'Supply Chain Management',
    'Risk Management',
    'Business Intelligence',
    'Change Management'
  ],
  'Leadership': [
    'Team Management',
    'Effective Communication',
    'Decision Making',
    'Conflict Resolution',
    'Coaching',
    'Strategic Leadership',
    'Delegation',
    'Emotional Intelligence',
    'Motivation',
    'Performance Management',
    'Change Leadership',
    'Vision Setting'
  ],
  'Personal Development': [
    'Time Management',
    'Stress Management',
    'Critical Thinking',
    'Public Speaking',
    'Creativity',
    'Emotional Intelligence',
    'Mindfulness',
    'Goal Setting',
    'Personal Finance',
    'Productivity',
    'Work-Life Balance',
    'Resilience'
  ],
  'Data Science': [
    'SQL',
    'Data Visualization',
    'Machine Learning',
    'Statistical Analysis',
    'Big Data',
    'Pandas',
    'R',
    'TensorFlow',
    'Deep Learning',
    'NLP',
    'Data Cleaning',
    'Predictive Analytics',
    'A/B Testing'
  ],
  'Design': [
    'UI Design',
    'UX Design',
    'Graphic Design',
    'Web Design',
    'Design Thinking',
    'Visual Communication',
    'Wireframing',
    'Prototyping',
    'Adobe Creative Suite',
    'Typography',
    'Color Theory',
    'Responsive Design'
  ],
  'Marketing': [
    'Digital Marketing',
    'SEO',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Marketing Analytics',
    'Brand Management',
    'Market Research',
    'Advertising',
    'Growth Hacking',
    'Customer Acquisition',
    'Marketing Automation'
  ],
  'Communication': [
    'Business Writing',
    'Presentation Skills',
    'Interpersonal Communication',
    'Active Listening',
    'Public Speaking',
    'Negotiation',
    'Persuasion',
    'Cross-cultural Communication',
    'Storytelling',
    'Non-verbal Communication',
    'Media Communication',
    'Technical Writing'
  ]
};

// Expanded job roles
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
  },
  {
    code: 'JR008',
    name: 'UX Designer',
    description: 'User experience design role',
    next_level_role_code: 'JR009'
  },
  {
    code: 'JR009',
    name: 'Senior UX Designer',
    description: 'Senior user experience design role',
    next_level_role_code: 'JR010'
  },
  {
    code: 'JR010',
    name: 'UX Lead',
    description: 'User experience team lead',
    next_level_role_code: null
  },
  {
    code: 'JR011',
    name: 'Data Analyst',
    description: 'Data analysis role',
    next_level_role_code: 'JR012'
  },
  {
    code: 'JR012',
    name: 'Data Scientist',
    description: 'Data science specialist',
    next_level_role_code: 'JR013'
  },
  {
    code: 'JR013',
    name: 'Lead Data Scientist',
    description: 'Lead data science role',
    next_level_role_code: null
  },
  {
    code: 'JR014',
    name: 'Marketing Specialist',
    description: 'Marketing professional role',
    next_level_role_code: 'JR015'
  },
  {
    code: 'JR015',
    name: 'Marketing Manager',
    description: 'Marketing team management role',
    next_level_role_code: 'JR016'
  },
  {
    code: 'JR016',
    name: 'Marketing Director',
    description: 'Senior marketing leadership role',
    next_level_role_code: null
  }
];

// Expanded rewards list
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
    name: '1000 Points',
    description: 'Earn 1000 bonus points',
    type: 'points',
    value: 1000,
    probability: 0.02,
    image_url: 'https://placehold.co/200x200?text=1000+Points'
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
  },
  {
    name: 'Course Discount',
    description: 'Get 25% off on premium courses',
    type: 'discount',
    value: 25,
    probability: 0.08,
    image_url: 'https://placehold.co/200x200?text=Discount'
  },
  {
    name: 'Virtual Coffee with Expert',
    description: 'Win a virtual coffee meeting with an industry expert',
    type: 'experience',
    value: null,
    probability: 0.03,
    image_url: 'https://placehold.co/200x200?text=Coffee'
  },
  {
    name: 'Premium Course Access',
    description: 'Get free access to a premium course',
    type: 'course',
    value: null,
    probability: 0.04,
    image_url: 'https://placehold.co/200x200?text=Premium'
  }
];

// Expanded badges
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
  },
  {
    name: 'Data Wizard',
    description: 'Complete 3 data science courses',
    image_url: 'https://placehold.co/200x200?text=Data+Wizard',
    criteria: 'Complete 3 data science courses'
  },
  {
    name: 'Communication Pro',
    description: 'Complete 3 communication courses',
    image_url: 'https://placehold.co/200x200?text=Communication+Pro',
    criteria: 'Complete 3 communication courses'
  },
  {
    name: 'Design Thinker',
    description: 'Complete 3 design courses',
    image_url: 'https://placehold.co/200x200?text=Design+Thinker',
    criteria: 'Complete 3 design courses'
  },
  {
    name: 'Marketing Master',
    description: 'Complete 3 marketing courses',
    image_url: 'https://placehold.co/200x200?text=Marketing+Master',
    criteria: 'Complete 3 marketing courses'
  },
  {
    name: 'Streak Achieved',
    description: 'Learn for 7 consecutive days',
    image_url: 'https://placehold.co/200x200?text=Streak+Achieved',
    criteria: 'Learn for 7 consecutive days'
  },
  {
    name: 'Team Player',
    description: 'Share 10 courses with team members',
    image_url: 'https://placehold.co/200x200?text=Team+Player',
    criteria: 'Share 10 courses with team members'
  },
  {
    name: 'Knowledge Sharer',
    description: 'Post 5 course reviews',
    image_url: 'https://placehold.co/200x200?text=Knowledge+Sharer',
    criteria: 'Post 5 course reviews'
  },
  {
    name: 'Early Adopter',
    description: 'Complete a course within 7 days of its release',
    image_url: 'https://placehold.co/200x200?text=Early+Adopter',
    criteria: 'Complete a course within 7 days of its release'
  },
  {
    name: 'Skill Collector',
    description: 'Earn proficiency in 10 different skills',
    image_url: 'https://placehold.co/200x200?text=Skill+Collector',
    criteria: 'Earn proficiency in 10 different skills'
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
    
    // Get options from the request body
    const requestData = await req.json().catch(() => ({}));
    const { syncDomains, syncSkills, syncJobRoles, syncRewards, syncBadges, syncAll } = requestData;
    
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
