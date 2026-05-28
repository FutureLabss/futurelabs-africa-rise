-- Add DELETE policy for hackathon_submissions
CREATE POLICY "Enable delete for authenticated users" ON public.hackathon_submissions
    FOR DELETE USING (auth.role() = 'authenticated');

-- Ensure events and registrations also have delete policies if RLS is enabled
-- These are often created via the dashboard, but adding them here ensures they work
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'events') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Enable delete for authenticated users') THEN
            CREATE POLICY "Enable delete for authenticated users" ON public.events
                FOR DELETE USING (auth.role() = 'authenticated');
        END IF;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'registrations') THEN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'registrations' AND policyname = 'Enable delete for authenticated users') THEN
            CREATE POLICY "Enable delete for authenticated users" ON public.registrations
                FOR DELETE USING (auth.role() = 'authenticated');
        END IF;
    END IF;
END $$;
