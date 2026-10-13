"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Loader2, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { sitesLabel } from '@/data/products';

type License = Tables<'licenses'>;
type Order = Tables<'orders'>;
type Waitlist = Tables<'product_waitlist'>;

const GRACE_DAYS = 7; // keep in step with supabase/functions/_shared/licenses.ts
const isValid = (l: License) => l.status !== 'revoked' && new Date(l.period_end).getTime() + GRACE_DAYS * 86_400_000 > Date.now();
const money = (minor: number, currency: string) =>
  `${currency === 'USD' ? '$' : '₦'}${(minor / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
const day = (iso: string) => format(new Date(iso), 'MMM d, yyyy');

/** Admin tab: Pro subscriptions sold through Paystack, and the Pro waitlist. */
export default function OrdersLicensesPanel() {
  const { toast } = useToast();
  const [view, setView] = useState<'licenses' | 'orders' | 'waitlist'>('licenses');
  const [licenses, setLicenses] = useState<License[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [waitlist, setWaitlist] = useState<Waitlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [l, o, w] = await Promise.all([
        supabase.from('licenses').select('*').order('created_at', { ascending: false }).limit(5000),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5000),
        supabase.from('product_waitlist').select('*').order('created_at', { ascending: false }).limit(5000),
      ]);
      const error = l.error || o.error || w.error;
      if (error) toast({ title: 'Error loading sales', description: error.message, variant: 'destructive' });
      setLicenses(l.data || []);
      setOrders(o.data || []);
      setWaitlist(w.data || []);
      setLoading(false);
    })();
  }, [toast]);

  // Monthly recurring revenue per currency from subscriptions still renewing.
  const mrr = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const l of licenses) {
      if (!isValid(l) || !['active', 'past_due'].includes(l.status)) continue;
      totals[l.currency] = (totals[l.currency] || 0) + (l.interval === 'year' ? l.amount / 12 : l.amount);
    }
    return totals;
  }, [licenses]);
  const renewing = licenses.filter((l) => isValid(l) && ['active', 'past_due'].includes(l.status));

  const q = query.trim().toLowerCase();
  const match = (...values: (string | null)[]) => !q || values.some((v) => v?.toLowerCase().includes(q));

  const update = async (license: License, patch: Partial<License>, confirmText: string) => {
    if (!window.confirm(confirmText)) return;
    setBusy(license.id);
    const { data, error } = await supabase.from('licenses').update(patch).eq('id', license.id).select('*').single();
    setBusy(null);
    if (error) return toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    setLicenses((ls) => ls.map((l) => (l.id === license.id ? data : l)));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {renewing.length} active subscription{renewing.length !== 1 ? 's' : ''} · MRR{' '}
            {Object.keys(mrr).length ? Object.entries(mrr).map(([c, v]) => money(v, c)).join(' + ') : '—'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {renewing.filter((l) => l.interval === 'month').length} monthly · {renewing.filter((l) => l.interval === 'year').length} yearly ·{' '}
            {waitlist.length} on the Pro waitlist
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(['licenses', 'orders', 'waitlist'] as const).map((v) => (
            <Button key={v} variant={view === v ? 'default' : 'outline'} onClick={() => setView(v)} className="capitalize">
              {v}
            </Button>
          ))}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search email, key, product"
              aria-label="Search sales"
              className="h-10 w-64 rounded-md border bg-background pl-9 pr-3 text-sm"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {view === 'licenses' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Created</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Paid until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenses.filter((l) => match(l.email, l.key, l.product)).map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="whitespace-nowrap">{day(l.created_at)}</TableCell>
                    <TableCell className="max-w-[220px] truncate">
                      <a href={`mailto:${l.email}`} className="hover:underline">{l.email}</a>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{l.product}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {l.tier} · {sitesLabel(l.max_sites)} · {money(l.amount, l.currency)}/{l.interval === 'year' ? 'yr' : 'mo'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-mono text-xs">{l.key}</TableCell>
                    <TableCell className="whitespace-nowrap">{day(l.period_end)}</TableCell>
                    <TableCell>
                      <Badge variant={isValid(l) && l.status === 'active' ? 'default' : 'secondary'}>
                        {isValid(l) ? l.status.replace('_', ' ') : l.status === 'revoked' ? 'revoked' : 'expired'}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-1 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busy === l.id}
                        onClick={() => {
                          const from = Math.max(new Date(l.period_end).getTime(), Date.now());
                          update(l, { period_end: new Date(from + 30 * 86_400_000).toISOString() }, `Give ${l.email} 30 more days?`);
                        }}
                      >
                        +30 days
                      </Button>
                      {l.status !== 'revoked' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={busy === l.id}
                          onClick={() =>
                            update(l, { status: 'revoked' }, `Revoke ${l.key}? It stops working at once. This doesn't cancel the Paystack subscription; do that in Paystack.`)
                          }
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {view === 'orders' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.filter((o) => match(o.email, o.reference, o.product)).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(o.created_at), 'MMM d, yyyy · h:mm a')}</TableCell>
                    <TableCell className="max-w-[220px] truncate">{o.email}</TableCell>
                    <TableCell className="whitespace-nowrap">{o.product}</TableCell>
                    <TableCell className="whitespace-nowrap">{o.tier} · {o.interval}ly</TableCell>
                    <TableCell className="whitespace-nowrap">{money(o.amount, o.currency)}</TableCell>
                    <TableCell>{o.kind}</TableCell>
                    <TableCell>
                      <Badge variant={o.status === 'paid' ? 'default' : 'secondary'}>{o.status}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{o.reference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {view === 'waitlist' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitlist.filter((w) => match(w.email, w.name, w.product)).map((w) => (
                  <TableRow key={w.id}>
                    <TableCell className="whitespace-nowrap">{day(w.created_at)}</TableCell>
                    <TableCell className="max-w-[220px] truncate">
                      <a href={`mailto:${w.email}`} className="hover:underline">{w.email}</a>
                    </TableCell>
                    <TableCell>{w.name || '—'}</TableCell>
                    <TableCell>{w.product}</TableCell>
                    <TableCell>{w.tier || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
