import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/** Service-role client: bypasses RLS, so only use it in edge functions. */
export const db = () => createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
