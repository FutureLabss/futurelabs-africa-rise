// Mailing-list contacts in Resend (https://resend.com/docs/api-reference/contacts).
// A contact is created or updated by email, tagged with custom properties and
// added to a segment (the list). Create the properties in the Resend dashboard
// (Audience → Properties) before the first sign-up.
const API = 'https://api.resend.com';

export class ProviderError extends Error {}

async function resend(path: string, method: string, body?: unknown) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: res.status, ok: res.ok, text: await res.text() };
}

/** True when contacts can be synced (key and segment both set). */
export const contactsConfigured = () => !!Deno.env.get('RESEND_API_KEY') && !!Deno.env.get('RESEND_SEGMENT_ID');

/** Adds or re-subscribes a contact and puts it in RESEND_SEGMENT_ID. Throws ProviderError on failure. */
export async function upsertContact(email: string, properties: Record<string, string>) {
  const segment = Deno.env.get('RESEND_SEGMENT_ID')!;
  const path = `/contacts/${encodeURIComponent(email)}`;

  const updated = await resend(path, 'PATCH', { unsubscribed: false, properties });
  if (updated.ok) {
    const joined = await resend(`${path}/segments/${encodeURIComponent(segment)}`, 'POST');
    // Already in the segment is fine.
    if (!joined.ok && joined.status !== 409 && joined.status !== 422) {
      throw new ProviderError(`segment add failed (${joined.status}): ${joined.text}`);
    }
    return;
  }
  if (updated.status !== 404) throw new ProviderError(`contact update failed (${updated.status}): ${updated.text}`);

  const created = await resend('/contacts', 'POST', { email, unsubscribed: false, properties, segments: [{ id: segment }] });
  if (!created.ok) throw new ProviderError(`contact create failed (${created.status}): ${created.text}`);
}

/** Marks a contact unsubscribed from all broadcasts. Throws ProviderError on failure (404 counts as done). */
export async function unsubscribeContact(email: string) {
  const res = await resend(`/contacts/${encodeURIComponent(email)}`, 'PATCH', { unsubscribed: true });
  if (!res.ok && res.status !== 404) throw new ProviderError(`unsubscribe failed (${res.status}): ${res.text}`);
}
