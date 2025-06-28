
-- Create table to store multiple personalized content generations
CREATE TABLE public.user_content_generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  day INTEGER NOT NULL,
  generation_level INTEGER NOT NULL DEFAULT 1,
  content_card JSONB NOT NULL,
  strategic_analysis TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT false
);

-- Add indexes for efficient querying
CREATE INDEX idx_user_content_generations_user_day ON public.user_content_generations(user_id, day);
CREATE INDEX idx_user_content_generations_active ON public.user_content_generations(user_id, day, is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE public.user_content_generations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own content generations" 
  ON public.user_content_generations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own content generations" 
  ON public.user_content_generations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content generations" 
  ON public.user_content_generations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content generations" 
  ON public.user_content_generations 
  FOR DELETE 
  USING (auth.uid() = user_id);
