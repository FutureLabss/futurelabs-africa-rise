"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Download, Loader2, Search, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Row = Tables<'product_downloads'>;

const csvCell = (v: unknown) => {
  const s = v === null || v === undefined ? '' : String(v);
  // Quote everything and neutralise spreadsheet formulas (=, +, -, @).
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};

/** Admin tab: who downloaded the free Studio products. */
export default function ProductDownloadsPanel() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('product_downloads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000);
      if (error) {
        toast({ title: 'Error loading downloads', description: error.message, variant: 'destructive' });
      } else {
        setRows(data || []);
      }
      setLoading(false);
    })();
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => [r.email, r.name, r.organisation, r.product].some((v) => v?.toLowerCase().includes(q)));
  }, [rows, query]);

  const people = useMemo(() => new Set(rows.map((r) => r.email.toLowerCase())).size, [rows]);
  const optedIn = useMemo(
    () => new Set(rows.filter((r) => r.marketing_opt_in).map((r) => r.email.toLowerCase())).size,
    [rows]
  );

  const exportCsv = () => {
    const header = ['Date', 'Email', 'Name', 'Organisation', 'Product', 'Version', 'Wants updates'];
    const lines = filtered.map((r) =>
      [r.created_at, r.email, r.name, r.organisation, r.product, r.version, r.marketing_opt_in ? 'yes' : 'no'].map(csvCell).join(',')
    );
    const blob = new Blob([[header.map(csvCell).join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `product-downloads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this download record? This cannot be undone.')) return;
    setDeleting(id);
    const { error } = await supabase.from('product_downloads').delete().eq('id', id);
    setDeleting(null);
    if (error) {
      toast({ title: 'Error deleting', description: error.message, variant: 'destructive' });
      return;
    }
    setRows((r) => r.filter((x) => x.id !== id));
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
            {rows.length} download{rows.length !== 1 ? 's' : ''} · {people} people · {optedIn} want updates
          </h2>
          <p className="text-sm text-muted-foreground">Emails collected before free downloads on the Studio page.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search email, name, organisation"
              aria-label="Search downloads"
              className="h-10 w-64 rounded-md border bg-background pl-9 pr-3 text-sm"
            />
          </div>
          <Button variant="outline" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              {rows.length ? 'No downloads match your search.' : 'No downloads yet.'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Updates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="whitespace-nowrap">{format(new Date(r.created_at), 'MMM d, yyyy · h:mm a')}</TableCell>
                    <TableCell className="max-w-[220px] truncate">
                      <a href={`mailto:${r.email}`} className="hover:underline">{r.email}</a>
                    </TableCell>
                    <TableCell className="max-w-[160px] truncate">{r.name || '—'}</TableCell>
                    <TableCell className="max-w-[180px] truncate">{r.organisation || '—'}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {r.product}
                      {r.version && <span className="text-muted-foreground"> {r.version}</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={r.marketing_opt_in ? 'default' : 'secondary'}>{r.marketing_opt_in ? 'Yes' : 'No'}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(r.id)}
                        disabled={deleting === r.id}
                        aria-label={`Delete download record for ${r.email}`}
                      >
                        {deleting === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </TableCell>
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
