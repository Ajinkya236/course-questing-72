
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Function to seed courses data
export async function seedCoursesData() {
  try {
    // Check if courses already exist
    const { data: existingCourses, error: checkError } = await supabase
      .from('courses')
      .select('id')
      .limit(1);
    
    if (checkError) throw checkError;
    
    // If courses already exist, don't seed
    if (existingCourses && existingCourses.length > 0) {
      console.log('Courses data already exists. Skipping seed.');
      return;
    }
    
    // Sample course data
    const coursesData = [
      {
        title: 'Introduction to Leadership',
        description: 'Learn the fundamentals of leadership and management in this comprehensive course.',
        category: 'Leadership & Management',
        sub_category: 'Leadership',
        image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 120,
        level: 'Beginner',
        rating: 4.7,
        is_hot: true,
        is_new: false,
        skills: ['leadership', 'communication', 'decision-making']
      },
      {
        title: 'Data Science Fundamentals',
        description: 'Master the basics of data science, statistics, and machine learning.',
        category: 'Data & Analytics',
        sub_category: 'Data Science',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 180,
        level: 'Intermediate',
        rating: 4.9,
        is_hot: true,
        is_new: true,
        skills: ['python', 'statistics', 'data-analysis']
      },
      {
        title: 'Effective Communication Skills',
        description: 'Improve your verbal and written communication in professional settings.',
        category: 'Soft Skills',
        sub_category: 'Communication',
        image_url: 'https://images.unsplash.com/photo-1573497161237-306afcd7e7e0?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 90,
        level: 'Beginner',
        rating: 4.5,
        is_hot: false,
        is_new: true,
        skills: ['communication', 'presentation', 'negotiation']
      },
      {
        title: 'Project Management Professional',
        description: 'Prepare for the PMP certification with this comprehensive course.',
        category: 'Project Management',
        sub_category: 'Certification',
        image_url: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 240,
        level: 'Advanced',
        rating: 4.8,
        is_hot: false,
        is_new: false,
        skills: ['project-management', 'agile', 'risk-management']
      },
      {
        title: 'Digital Marketing Essentials',
        description: 'Learn modern digital marketing strategies, SEO, and social media marketing.',
        category: 'Marketing & Digital',
        sub_category: 'Digital Marketing',
        image_url: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 150,
        level: 'Intermediate',
        rating: 4.6,
        is_hot: true,
        is_new: false,
        skills: ['seo', 'social-media', 'content-marketing']
      },
      {
        title: 'UX Design Principles',
        description: 'Master user experience design principles and practices.',
        category: 'Design & Innovation',
        sub_category: 'UX Design',
        image_url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 135,
        level: 'Intermediate',
        rating: 4.7,
        is_hot: false,
        is_new: true,
        skills: ['ux-design', 'wireframing', 'prototyping']
      },
      {
        title: 'Cloud Computing Fundamentals',
        description: 'Learn the basics of cloud infrastructure and popular cloud platforms.',
        category: 'Technical Skills',
        sub_category: 'Cloud Computing',
        image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 200,
        level: 'Beginner',
        rating: 4.5,
        is_hot: true,
        is_new: false,
        skills: ['aws', 'azure', 'cloud-infrastructure']
      },
      {
        title: 'Financial Management',
        description: 'Understand financial statements, budgeting, and financial decision-making.',
        category: 'Finance',
        sub_category: 'Financial Management',
        image_url: 'https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?auto=format&fit=crop&w=1470&q=80',
        preview_url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        duration: 160,
        level: 'Intermediate',
        rating: 4.4,
        is_hot: false,
        is_new: false,
        skills: ['financial-analysis', 'budgeting', 'forecasting']
      }
    ];
    
    // Insert courses
    const { error: insertError } = await supabase
      .from('courses')
      .insert(coursesData);
    
    if (insertError) throw insertError;
    
    console.log('Courses data seeded successfully');
  } catch (error: any) {
    console.error('Error seeding courses data:', error);
    toast({
      title: 'Error seeding data',
      description: error.message || 'An error occurred while seeding data',
      variant: 'destructive'
    });
  }
}

// Function to seed domains data
export async function seedDomainsData() {
  try {
    // Check if domains already exist
    const { data: existingDomains, error: checkError } = await supabase
      .from('domains')
      .select('id')
      .limit(1);
    
    if (checkError) throw checkError;
    
    // If domains already exist, don't seed
    if (existingDomains && existingDomains.length > 0) {
      console.log('Domains data already exists. Skipping seed.');
      return;
    }
    
    // Sample domains data
    const domainsData = [
      {
        name: 'Leadership & Management',
        description: 'Develop essential leadership skills and management techniques',
        icon: 'Users',
        course_count: 24
      },
      {
        name: 'Technical Skills',
        description: 'Learn programming, data science, and other technical disciplines',
        icon: 'Code',
        course_count: 35
      },
      {
        name: 'Data & Analytics',
        description: 'Master data analysis, visualization, and business intelligence',
        icon: 'BarChart',
        course_count: 28
      },
      {
        name: 'Marketing & Digital',
        description: 'Discover modern marketing strategies and digital tools',
        icon: 'Globe',
        course_count: 19
      },
      {
        name: 'Product Management',
        description: 'Learn to build and manage successful products',
        icon: 'Box',
        course_count: 15
      },
      {
        name: 'Design & Innovation',
        description: 'Explore design thinking, UX, and creative problem-solving',
        icon: 'Lightbulb',
        course_count: 22
      }
    ];
    
    // Insert domains
    const { error: insertError } = await supabase
      .from('domains')
      .insert(domainsData);
    
    if (insertError) throw insertError;
    
    console.log('Domains data seeded successfully');
  } catch (error: any) {
    console.error('Error seeding domains data:', error);
    toast({
      title: 'Error seeding data',
      description: error.message || 'An error occurred while seeding data',
      variant: 'destructive'
    });
  }
}

// Main seed function to call all seed functions
export async function seedInitialData() {
  await seedCoursesData();
  await seedDomainsData();
}
