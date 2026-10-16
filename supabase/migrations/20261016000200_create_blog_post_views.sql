-- View counts for the static blog posts in src/data/blogPosts.ts (keyed by post id).
-- The table is only reachable through the two functions below: anyone can record a
-- view or read the counts, nobody can set a number directly.

CREATE TABLE IF NOT EXISTS public.blog_post_views (
    post_id TEXT PRIMARY KEY CHECK (post_id ~ '^[a-z0-9-]{1,120}$'),
    views BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.blog_post_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view blog post views" ON public.blog_post_views FOR SELECT USING (public.is_admin());

-- Adds one view and returns the new total. The page calls it once per browser session.
CREATE OR REPLACE FUNCTION public.record_blog_view(p_post_id TEXT)
RETURNS BIGINT
LANGUAGE sql
VOLATILE
SECURITY DEFINER
SET search_path = ''
AS $$
    INSERT INTO public.blog_post_views AS v (post_id, views)
    VALUES (p_post_id, 1)
    ON CONFLICT (post_id) DO UPDATE SET views = v.views + 1, updated_at = now()
    RETURNING v.views;
$$;

CREATE OR REPLACE FUNCTION public.get_blog_view_counts(p_post_ids TEXT[])
RETURNS TABLE (post_id TEXT, views BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT v.post_id, v.views FROM public.blog_post_views v WHERE v.post_id = ANY (p_post_ids[1:100]);
$$;

REVOKE ALL ON FUNCTION public.record_blog_view(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_blog_view_counts(TEXT[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_blog_view(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_blog_view_counts(TEXT[]) TO anon, authenticated;
