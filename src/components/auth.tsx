'use client';

import { createClient } from '@/lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const supabase = createClient();

export default function AuthComponent() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
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
    <Button onClick={signOut}>Logout</Button>
  );
}
