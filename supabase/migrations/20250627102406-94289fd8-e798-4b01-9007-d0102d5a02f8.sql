
-- Create table to track uploaded files
CREATE TABLE public.action_plan_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  question_number INTEGER NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.action_plan_uploads ENABLE ROW LEVEL SECURITY;

-- Create policies for file access
CREATE POLICY "Users can view their own uploads" 
  ON public.action_plan_uploads 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own uploads" 
  ON public.action_plan_uploads 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own uploads" 
  ON public.action_plan_uploads 
  FOR DELETE 
  USING (auth.uid() = user_id);
