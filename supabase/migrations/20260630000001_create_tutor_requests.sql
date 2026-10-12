-- Create enum for tutor request status
DO $$ BEGIN
  CREATE TYPE tutor_request_status AS ENUM ('new', 'contacted', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create tutor_requests table
CREATE TABLE IF NOT EXISTS public.tutor_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Organisation legitimacy
    organisation_name TEXT NOT NULL,
    organisation_type TEXT NOT NULL,
    organisation_website TEXT,
    organisation_size INTEGER CHECK (organisation_size IS NULL OR organisation_size > 0),
    organisation_description TEXT NOT NULL,

    -- Cybersecurity posture
    has_it_team BOOLEAN NOT NULL DEFAULT false,
    it_team_size INTEGER CHECK (it_team_size IS NULL OR it_team_size > 0),
    it_team_expertise TEXT,
    security_tools TEXT[] NOT NULL DEFAULT '{}',
    security_tools_other TEXT,
    past_incidents BOOLEAN NOT NULL DEFAULT false,
    past_incidents_desc TEXT,
    current_certifications TEXT,
    security_maturity TEXT NOT NULL,

    -- Training need
    training_reason TEXT NOT NULL,
    num_learners INTEGER CHECK (num_learners IS NULL OR num_learners > 0),
    skill_level TEXT NOT NULL,
    training_topics TEXT[] NOT NULL DEFAULT '{}',
    training_topics_other TEXT,
    training_format TEXT NOT NULL,
    training_location TEXT,
    preferred_date DATE,
    budget_range TEXT,

    -- Contact / accountability
    contact_name TEXT NOT NULL,
    contact_role TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    referral_source TEXT NOT NULL,
    additional_notes TEXT,

    -- Consent
    consent BOOLEAN NOT NULL DEFAULT false,

    -- Admin tracking
    status tutor_request_status NOT NULL DEFAULT 'new'
);

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_tutor_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_tutor_requests_updated_at
    BEFORE UPDATE ON public.tutor_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_tutor_requests_updated_at();

-- Enable Row Level Security
ALTER TABLE public.tutor_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (INSERT)
CREATE POLICY "Enable insert for all users" ON public.tutor_requests
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users (Admins) to view (SELECT)
CREATE POLICY "Enable select for authenticated users" ON public.tutor_requests
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users (Admins) to update status (UPDATE)
CREATE POLICY "Enable update for authenticated users" ON public.tutor_requests
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users (Admins) to delete (DELETE)
CREATE POLICY "Enable delete for authenticated users" ON public.tutor_requests
    FOR DELETE USING (auth.role() = 'authenticated');
