INSERT INTO public.events (id, title, slug, start_time, location_type, location_details, description, featured)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'FutureLabs AI Fellowship',
  'ai-fellowship',
  '2026-03-19T10:00:00+01:00',
  'in-person',
  'FutureLabs Hub, Ikot Ekpene',
  'Weekly AI Fellowship gathering — Discussion and Enlightenment every Thursday.',
  true
)
ON CONFLICT (id) DO NOTHING;