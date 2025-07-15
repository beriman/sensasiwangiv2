'use client';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export default function AuthComponent() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Login</Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
            </DialogHeader>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={['google', 'github']}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
  );
}
