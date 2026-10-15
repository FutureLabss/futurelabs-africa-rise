"use client";

import React, { useState } from 'react';
import { Gift, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { PRODUCTS } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type License = Tables<'licenses'>;

const SELLABLE = PRODUCTS.filter((p) => p.pricing);

/**
 * Create a complimentary licence (unlimited sites, no payment, runs until 2099) for
 * FutureLabs' own sites, partners or reviewers. The database function
 * `create_comp_license` checks the caller is an admin.
 */
export default function CompLicenseDialog({ onCreated }: { onCreated: (license: License) => void }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState(SELLABLE[0]?.id ?? '');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState<License | null>(null);

  const reset = () => {
    setEmail('');
    setNote('');
    setError('');
    setCreated(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { data, error: rpcError } = await supabase.rpc('create_comp_license', {
      p_email: email,
      p_product: product,
      p_note: note || undefined,
    });
    setBusy(false);
    if (rpcError || !data) {
      setError(rpcError?.message || 'Could not create the licence.');
      return;
    }
    setCreated(data);
    onCreated(data);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        <Gift className="mr-2 h-4 w-4" />
        Complimentary licence
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complimentary licence</DialogTitle>
            <DialogDescription>
              Free Pro for our own sites, partners or reviewers: unlimited sites, no payment, runs until 2099. Revoke it any time
              from the licences list.
            </DialogDescription>
          </DialogHeader>
          {created ? (
            <div className="space-y-3">
              <p className="text-sm">
                Licence for <strong>{created.email}</strong>:
              </p>
              <p className="select-all rounded-md bg-muted px-3 py-2 font-mono text-base">{created.key}</p>
              <p className="text-sm text-muted-foreground">
                No email is sent. Share the key with them, or paste it on the site&apos;s FutureLabs AI SEO → Settings → Pro licence
                screen yourself.
              </p>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Done</Button>
              </DialogFooter>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comp-email">Email</Label>
                <Input id="comp-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="webmaster@opportunitylab.net" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comp-product">Product</Label>
                <select
                  id="comp-product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                >
                  {SELLABLE.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} Pro
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comp-note">Who it&apos;s for (optional)</Label>
                <Input id="comp-note" value={note} maxLength={120} onChange={(e) => setNote(e.target.value)} placeholder="opportunitylab.net (live + staging)" />
              </div>
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={busy || !email}>
                  {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create licence
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
