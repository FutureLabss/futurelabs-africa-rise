const ENDPOINT = 'https://formsubmit.co/ajax/hello@futurelabs.africa';

/** Sends a form to the FutureLabs inbox through FormSubmit (same channel as the original contact form). */
export async function sendForm(subject: string, fields: Record<string, string>) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _subject: subject, _template: 'table', ...fields }),
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}
