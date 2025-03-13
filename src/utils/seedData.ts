
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { mockCourses } from '@/utils/mockData';

// Function to seed courses data
export async function seedCoursesData() {
  try {
    // Check if courses already exist by checking if the table exists
    try {
      const { data: existingCourses, error: checkError } = await supabase
        .from('courses' as any)
        .select('id')
        .limit(1);
      
      if (checkError) {
        console.log('Courses table may not exist yet:', checkError.message);
        return;
      }
      
      // If courses already exist, don't seed
      if (existingCourses && existingCourses.length > 0) {
        console.log('Courses data already exists. Skipping seed.');
        return;
      }
      
      // Sample course data
      const coursesData = mockCourses.map(course => ({
        title: course.title,
        description: course.description,
        category: course.category,
        sub_category: course.category.split(' & ')[0],
        image_url: course.imageUrl,
        preview_url: course.previewUrl,
        duration: parseInt(course.duration) || 120,
        level: course.level,
        rating: course.rating,
        is_hot: course.isHot,
        is_new: course.isNew,
        skills: ['leadership', 'communication', 'decision-making']
      }));
      
      // Insert courses
      const { error: insertError } = await supabase
        .from('courses' as any)
        .insert(coursesData as any);
      
      if (insertError) throw insertError;
      
      console.log('Courses data seeded successfully');
    } catch (error: any) {
      console.error('Error in courses check/insert:', error);
    }
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
    try {
      const { data: existingDomains, error: checkError } = await supabase
        .from('domains' as any)
        .select('id')
        .limit(1);
      
      if (checkError) {
        console.log('Domains table may not exist yet:', checkError.message);
        return;
      }
      
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
        .from('domains' as any)
        .insert(domainsData as any);
      
      if (insertError) throw insertError;
      
      console.log('Domains data seeded successfully');
    } catch (error: any) {
      console.error('Error in domains check/insert:', error);
    }
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
