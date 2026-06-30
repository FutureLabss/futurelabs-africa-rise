-- Drop old table/type from previous iteration (safe re-run)
DROP TABLE IF EXISTS public.tutor_requests CASCADE;
DROP TYPE IF EXISTS public.tutor_request_status;

-- Create enum for tutor application status
DO $$ BEGIN
  CREATE TYPE tutor_application_status AS ENUM ('new', 'reviewing', 'accepted', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create tutor_applications table
CREATE TABLE IF NOT EXISTS public.tutor_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- Identity & contact
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    linkedin_url TEXT,

    -- Qualifications
    degree_field TEXT NOT NULL,
    certifications TEXT[] NOT NULL DEFAULT '{}',
    certifications_other TEXT,
    cyber_years INTEGER NOT NULL CHECK (cyber_years > 0),
    teaching_years INTEGER NOT NULL CHECK (teaching_years >= 0),

    -- Expertise
    specializations TEXT[] NOT NULL DEFAULT '{}',
    specializations_other TEXT,
    teaching_levels TEXT[] NOT NULL DEFAULT '{}',

    -- Credibility
    current_job_title TEXT NOT NULL,
    current_employer TEXT NOT NULL,
    resume_url TEXT NOT NULL,
    portfolio_url TEXT,
    reference_name TEXT NOT NULL,
    reference_contact TEXT NOT NULL,
    notable_work TEXT,

    -- Logistics
    availability TEXT NOT NULL,
    preferred_format TEXT NOT NULL,
    rate_expectations TEXT,

    -- Closing
    teaching_motivation TEXT NOT NULL,
    consent BOOLEAN NOT NULL DEFAULT false,

    -- Admin tracking
    status tutor_application_status NOT NULL DEFAULT 'new'
);

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION update_tutor_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_tutor_applications_updated_at
    BEFORE UPDATE ON public.tutor_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_tutor_applications_updated_at();

-- Enable Row Level Security
ALTER TABLE public.tutor_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (INSERT)
CREATE POLICY "Enable insert for all users" ON public.tutor_applications
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users (Admins) to view (SELECT)
CREATE POLICY "Enable select for authenticated users" ON public.tutor_applications
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users (Admins) to update status (UPDATE)
CREATE POLICY "Enable update for authenticated users" ON public.tutor_applications
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users (Admins) to delete (DELETE)
CREATE POLICY "Enable delete for authenticated users" ON public.tutor_applications
    FOR DELETE USING (auth.role() = 'authenticated');

-- ─── Storage bucket for uploaded files ───

INSERT INTO storage.buckets (id, name, public)
VALUES ('tutor-applications', 'tutor-applications', false)
ON CONFLICT (id) DO NOTHING;

-- Allow anon to upload files
CREATE POLICY "anon upload tutor-applications" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'tutor-applications' AND auth.role() = 'anon');

-- Allow authenticated users (Admins) to read files
CREATE POLICY "auth select tutor-applications" ON storage.objects
    FOR SELECT USING (bucket_id = 'tutor-applications' AND auth.role() = 'authenticated');

-- Allow authenticated users (Admins) to delete files
CREATE POLICY "auth delete tutor-applications" ON storage.objects
    FOR DELETE USING (bucket_id = 'tutor-applications' AND auth.role() = 'authenticated');
