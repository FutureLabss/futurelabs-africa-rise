'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const format = (n: number) => `${n.toLocaleString('en-US')} view${n === 1 ? '' : 's'}`;

/**
 * View count for a blog post. With `record`, counts this visit first (once per
 * browser session, so refreshes don't inflate it). Renders nothing until the
 * count arrives, so a failed request just leaves the line without it.
 */
export default function PostViews({ postId, record = false, prefix = '' }: { postId: string; record?: boolean; prefix?: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const key = `fl-viewed:${postId}`;
    let seen = false;
    try {
      seen = sessionStorage.getItem(key) === '1';
    } catch {
      // Storage blocked: count the visit and carry on.
    }

    const show = (n: unknown) => {
      if (!cancelled && typeof n === 'number' && Number.isFinite(n)) setViews(n);
    };

    if (record && !seen) {
      supabase.rpc('record_blog_view', { p_post_id: postId }).then(({ data }) => {
        try {
          sessionStorage.setItem(key, '1');
        } catch {
          // Ignore: worst case a refresh counts again.
        }
        if (data != null) show(Number(data));
      });
    } else {
      supabase.rpc('get_blog_view_counts', { p_post_ids: [postId] }).then(({ data }) => {
        if (data) show(Number(data[0]?.views ?? 0));
      });
    }
    return () => {
      cancelled = true;
    };
  }, [postId, record]);

  if (views === null) return null;
  return (
    <span>
      {prefix}
      {format(views)}
    </span>
  );
}
