-- Create hackathon_submissions table
CREATE TABLE IF NOT EXISTS public.hackathon_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    demo_url TEXT,
    github_url TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE public.hackathon_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (INSERT)
CREATE POLICY "Enable insert for all users" ON public.hackathon_submissions
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users (Admins) to view (SELECT)
-- Note: In a production environment, you should restrict this to specifically admin users
CREATE POLICY "Enable select for authenticated users" ON public.hackathon_submissions
    FOR SELECT USING (auth.role() = 'authenticated');
