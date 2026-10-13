// Minimal Paystack REST client. Docs: https://paystack.com/docs/api/
const BASE = 'https://api.paystack.co';

function secret() {
  const key = Deno.env.get('PAYSTACK_SECRET_KEY');
  if (!key) throw new Error('PAYSTACK_SECRET_KEY is not set');
  return key;
}

export async function paystack<T = any>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: init.method ?? 'GET',
    headers: { Authorization: `Bearer ${secret()}`, 'Content-Type': 'application/json' },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || payload.status === false) {
    throw new Error(`Paystack ${init.method ?? 'GET'} ${path} failed (${res.status}): ${payload.message ?? 'no message'}`);
  }
  return payload.data as T;
}

/** Paystack signs each webhook with HMAC-SHA512 of the raw body, keyed with the secret key. */
export async function verifySignature(rawBody: string, signature: string | null): Promise<boolean> {
  if (!signature) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret()),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  );
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody)));
  const expected = Array.from(mac, (b) => b.toString(16).padStart(2, '0')).join('');
  // Constant-time comparison.
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}

/** Transactions carry the plan as a code string or as an object, depending on the endpoint. */
export function planCodeOf(data: any): string | null {
  if (typeof data?.plan === 'string' && data.plan) return data.plan;
  return data?.plan?.plan_code ?? data?.plan_object?.plan_code ?? null;
}
