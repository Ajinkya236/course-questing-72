
-- Add evaluator and super_evaluator roles to all existing users
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'evaluator'
FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'super_evaluator'
FROM auth.users
ON CONFLICT (user_id, role) DO NOTHING;

-- Insert mock OJT activities for existing courses
INSERT INTO public.ojt_activities (course_id, module_id, activity_name, questions)
SELECT 
  id as course_id,
  'module-1' as module_id,
  title || ' - OJT Assessment' as activity_name,
  jsonb_build_array(
    jsonb_build_object(
      'id', 'q1-' || id,
      'question', 'Based on the course content about ' || title || ', please record a 3-5 minute video demonstrating your understanding of the key concepts. Explain how you would apply these concepts in a real-world scenario.',
      'type', 'video'
    ),
    jsonb_build_object(
      'id', 'q2-' || id,
      'question', 'Create a detailed project plan or case study document (PDF or Word) that shows how you would implement the ' || title || ' concepts in your workplace. Include objectives, timeline, and expected outcomes.',
      'type', 'file'
    )
  ) as questions
FROM public.courses
WHERE NOT EXISTS (
  SELECT 1 FROM public.ojt_activities 
  WHERE ojt_activities.course_id = courses.id
);
