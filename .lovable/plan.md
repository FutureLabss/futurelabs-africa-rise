

# Implementation Plan

## 1. Database Migration: Add `phone` column to `registrations`

Add a nullable `phone` text column to the `registrations` table. Nullable so existing records aren't broken, but validated as required in the form/edge function.

```sql
ALTER TABLE public.registrations ADD COLUMN phone text;
```

## 2. Registration Form: Add Phone Number Field

**Files: `src/hooks/use-registrations.ts`, `src/components/EventRegistrationModal.tsx`, `supabase/functions/register-event/index.ts`**

- Add `phone` to the Zod `registrationSchema` with basic validation (min 7 chars, max 20, digits/spaces/dashes/plus only)
- Add phone state + input field (type `tel`) in the modal between email and submit button
- Pass `phone` to `registerForEvent` and through to the edge function
- Update edge function to accept, validate, and insert `phone`

## 3. Dynamic Gravatar Avatars in Attendees Section

**File: `src/pages/EventDetails.tsx`**

- Create a new RPC function `get_event_attendee_avatars` that returns `email` (or just an MD5 hash of email for privacy) and `full_name` initials for registered attendees, limited to 8
- On the event details page, use Gravatar URLs (`https://www.gravatar.com/avatar/{md5hash}?d=mp&s=80`) for attendee avatars instead of colored circles
- The RPC function will hash emails server-side so raw emails are never exposed

**Migration:**
```sql
CREATE OR REPLACE FUNCTION public.get_event_attendee_avatars(p_event_id uuid)
RETURNS TABLE(email_hash text, initials text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT 
    md5(lower(trim(r.email))) as email_hash,
    upper(left(r.full_name, 1)) as initials
  FROM public.registrations r
  WHERE r.event_id = p_event_id AND r.status = 'registered'
  ORDER BY r.created_at DESC
  LIMIT 8
$$;
```

Replace placeholder avatar circles with `<img>` tags using Gravatar URLs, falling back to initials.

## 4. New Page: FutureLabs AI Fellowship (`/ai-fellowship`)

**File: `src/pages/AIFellowship.tsx`** (new)

A full marketing page matching the site aesthetic with:
- **Hero section** with PageHero component
- **Overview** section describing the fellowship
- **Curriculum** section with module cards (AI/ML fundamentals, NLP, Computer Vision, Ethics, Capstone)
- **Mentors** section with placeholder mentor cards (avatar, name, role)
- **Application** section with a CTA to apply
- Wrapped with Navbar and Footer

**File: `src/App.tsx`** — Add route `<Route path="/ai-fellowship" element={<AIFellowship />} />`

## 5. Navbar: Replace "Explore Programs" with "AI Fellowship"

**File: `src/components/Navbar.tsx`**

- Change the CTA button text from "Explore Programs" to "AI Fellowship"
- Change the Link `to` from `/programs` to `/ai-fellowship`
- Update both desktop and mobile instances

---

### Summary of Changes

| Area | Files |
|------|-------|
| DB migration | Add `phone` column + `get_event_attendee_avatars` RPC |
| Registration form | `EventRegistrationModal.tsx`, `use-registrations.ts`, `register-event/index.ts` |
| Attendee avatars | `EventDetails.tsx` |
| AI Fellowship page | New `AIFellowship.tsx`, `App.tsx` route |
| Navbar CTA | `Navbar.tsx` |

