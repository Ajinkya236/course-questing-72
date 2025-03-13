
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.25.0'

// Set up CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mock courses data
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to JavaScript',
    description: 'Learn the basics of JavaScript programming',
    imageUrl: 'https://placehold.co/600x400?text=JavaScript',
    videoUrl: 'https://example.com/videos/js-intro.mp4',
    domain: 'Technology',
    skills: ['JavaScript', 'Web Development'],
    duration: '2h 30m',
    level: 'Beginner',
    author: 'John Smith',
    isHot: true,
    isNew: true,
    trainingCategory: 'Programming',
    progress: 0
  },
  {
    id: '2',
    title: 'Advanced React Patterns',
    description: 'Master advanced patterns in React development',
    imageUrl: 'https://placehold.co/600x400?text=React',
    videoUrl: 'https://example.com/videos/react-advanced.mp4',
    domain: 'Technology',
    skills: ['React', 'JavaScript', 'Web Development'],
    duration: '4h 15m',
    level: 'Advanced',
    author: 'Emma Johnson',
    isHot: false,
    isNew: true,
    trainingCategory: 'Programming',
    progress: 0
  },
  {
    id: '3',
    title: 'Business Leadership Essentials',
    description: 'Essential leadership skills for business management',
    imageUrl: 'https://placehold.co/600x400?text=Leadership',
    videoUrl: 'https://example.com/videos/leadership.mp4',
    domain: 'Business',
    skills: ['Leadership', 'Management'],
    duration: '3h 45m',
    level: 'Intermediate',
    author: 'Robert Chen',
    isHot: true,
    isNew: false,
    trainingCategory: 'Leadership',
    progress: 0
  },
  {
    id: '4',
    title: 'Data Science with Python',
    description: 'Learn data analysis and visualization with Python',
    imageUrl: 'https://placehold.co/600x400?text=DataScience',
    videoUrl: 'https://example.com/videos/data-science.mp4',
    domain: 'Data Science',
    skills: ['Python', 'Data Analysis', 'Statistics'],
    duration: '5h 30m',
    level: 'Intermediate',
    author: 'Sarah Williams',
    isHot: false,
    isNew: true,
    trainingCategory: 'Data',
    progress: 0
  },
  {
    id: '5',
    title: 'Effective Communication Skills',
    description: 'Improve your communication in professional settings',
    imageUrl: 'https://placehold.co/600x400?text=Communication',
    videoUrl: 'https://example.com/videos/communication.mp4',
    domain: 'Personal Development',
    skills: ['Communication', 'Public Speaking'],
    duration: '2h 15m',
    level: 'Beginner',
    author: 'Michael Davis',
    isHot: true,
    isNew: false,
    trainingCategory: 'Soft Skills',
    progress: 0
  },
  {
    id: '6',
    title: 'Cloud Computing with AWS',
    description: 'Master cloud infrastructure with Amazon Web Services',
    imageUrl: 'https://placehold.co/600x400?text=AWS',
    videoUrl: 'https://example.com/videos/aws.mp4',
    domain: 'Technology',
    skills: ['Cloud Computing', 'AWS', 'DevOps'],
    duration: '6h 45m',
    level: 'Advanced',
    author: 'David Wilson',
    isHot: false,
    isNew: false,
    trainingCategory: 'Cloud',
    progress: 0
  },
  {
    id: '7',
    title: 'Financial Planning Basics',
    description: 'Learn the fundamentals of personal financial planning',
    imageUrl: 'https://placehold.co/600x400?text=Finance',
    videoUrl: 'https://example.com/videos/finance.mp4',
    domain: 'Business',
    skills: ['Finance', 'Budgeting'],
    duration: '3h 00m',
    level: 'Beginner',
    author: 'Jennifer Lopez',
    isHot: false,
    isNew: true,
    trainingCategory: 'Finance',
    progress: 0
  },
  {
    id: '8',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning algorithms and applications',
    imageUrl: 'https://placehold.co/600x400?text=ML',
    videoUrl: 'https://example.com/videos/machine-learning.mp4',
    domain: 'Data Science',
    skills: ['Machine Learning', 'Python', 'Mathematics'],
    duration: '7h 30m',
    level: 'Intermediate',
    author: 'Alan Turing',
    isHot: true,
    isNew: false,
    trainingCategory: 'AI & Machine Learning',
    progress: 0
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
    
    console.log('Syncing courses data...');
    
    // Insert or update courses
    const { data: courses, error: coursesError } = await supabaseAdmin
      .from('courses')
      .upsert(mockCourses)
      .select('id, title')
    
    if (coursesError) {
      throw new Error(`Error syncing courses: ${coursesError.message}`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Courses data synchronized successfully',
        syncedCourses: courses
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
