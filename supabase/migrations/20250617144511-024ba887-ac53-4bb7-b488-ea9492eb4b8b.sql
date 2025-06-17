
-- Create user roles enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE app_role AS ENUM ('admin', 'evaluator', 'super_evaluator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create OJT activities table
CREATE TABLE public.ojt_activities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id text NOT NULL,
    module_id text NOT NULL,
    activity_name text NOT NULL,
    questions jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create OJT submissions table
CREATE TABLE public.ojt_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id uuid REFERENCES public.ojt_activities(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    employee_code text,
    submissions jsonb NOT NULL DEFAULT '[]'::jsonb,
    submitted_at timestamp with time zone DEFAULT now(),
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'under_evaluation', 'evaluated')),
    activity_score integer,
    module_status text CHECK (module_status IN ('pass', 'fail'))
);

-- Create evaluations table
CREATE TABLE public.evaluations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id uuid REFERENCES public.ojt_submissions(id) ON DELETE CASCADE,
    evaluator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    feedback jsonb NOT NULL DEFAULT '{}'::jsonb,
    activity_score integer,
    module_status text CHECK (module_status IN ('pass', 'fail')),
    evaluated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ojt_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ojt_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
    ON public.user_roles FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for ojt_activities
CREATE POLICY "Everyone can view OJT activities"
    ON public.ojt_activities FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage OJT activities"
    ON public.ojt_activities FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for ojt_submissions
CREATE POLICY "Users can view their own submissions"
    ON public.ojt_submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own submissions"
    ON public.ojt_submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Evaluators can view all submissions"
    ON public.ojt_submissions FOR SELECT
    USING (
        public.has_role(auth.uid(), 'evaluator') OR 
        public.has_role(auth.uid(), 'super_evaluator') OR 
        public.has_role(auth.uid(), 'admin')
    );

CREATE POLICY "Evaluators can update submissions"
    ON public.ojt_submissions FOR UPDATE
    USING (
        public.has_role(auth.uid(), 'evaluator') OR 
        public.has_role(auth.uid(), 'super_evaluator') OR 
        public.has_role(auth.uid(), 'admin')
    );

-- RLS policies for evaluations
CREATE POLICY "Evaluators can view evaluations"
    ON public.evaluations FOR SELECT
    USING (
        public.has_role(auth.uid(), 'evaluator') OR 
        public.has_role(auth.uid(), 'super_evaluator') OR 
        public.has_role(auth.uid(), 'admin')
    );

CREATE POLICY "Evaluators can create evaluations"
    ON public.evaluations FOR INSERT
    WITH CHECK (
        auth.uid() = evaluator_id AND (
            public.has_role(auth.uid(), 'evaluator') OR 
            public.has_role(auth.uid(), 'super_evaluator') OR 
            public.has_role(auth.uid(), 'admin')
        )
    );

CREATE POLICY "Evaluators can update their evaluations"
    ON public.evaluations FOR UPDATE
    USING (
        auth.uid() = evaluator_id AND (
            public.has_role(auth.uid(), 'evaluator') OR 
            public.has_role(auth.uid(), 'super_evaluator') OR 
            public.has_role(auth.uid(), 'admin')
        )
    );
