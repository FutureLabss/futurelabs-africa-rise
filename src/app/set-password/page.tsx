"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, KeyRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Landing page for Supabase invite and password-reset links (they open this
// URL with a session in the address). Lives outside /admin because the admin
// layout redirects visitors who aren't signed in yet.
export default function SetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState<'checking' | 'yes' | 'no'>('checking');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // The client reads the session from the link; give it a moment, then check.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady('yes');
    });
    const timer = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      setReady(data.session ? 'yes' : 'no');
    }, 1200);
    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 10) return setError('Use at least 10 characters.');
    if (password !== confirm) return setError('The two passwords don’t match.');
    setError('');
    setSaving(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (err) return setError(err.message);
    router.replace('/admin');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Set your password</CardTitle>
          <CardDescription>Choose a password for your FutureLabs admin account.</CardDescription>
        </CardHeader>
        <CardContent>
          {ready === 'checking' && (
            <div className="flex justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          {ready === 'no' && (
            <p className="text-center text-sm text-muted-foreground">
              This link has expired or was already used. Ask an admin for a new invite, or use “Forgot password?” on the{' '}
              <a href="/admin/login" className="underline">login page</a>.
            </p>
          )}
          {ready === 'yes' && (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New password</Label>
                <Input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
              </div>
              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save password
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
