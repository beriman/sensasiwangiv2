// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { rateLimiter } from '@/lib/rate-limiter';
import type { Profile } from '@/lib/types';
import { profiles } from '@/data/profiles';

interface AdminLoginPageProps {
  onLogin?: (user: Profile) => void;
}

export default function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLoginClick = () => {
    const limiterKey = 'admin-login';
    if (!rateLimiter(limiterKey)) {
        toast({
            variant: 'destructive',
            title: 'Terlalu banyak percobaan',
            description: 'Silakan coba lagi dalam beberapa saat.',
        });
        return;
    }

    // In a real app, this would be a proper auth check.
    // For this demo, we'll find a user with the given email who has moderator roles.
    const user = profiles.find(p => p.email === email && p.moderatorRoles && p.moderatorRoles.length > 0);
    
    if (onLogin && user && password) { // Simple password check for demo
      onLogin(user);
    } else {
        toast({
            variant: 'destructive',
            title: 'Login Gagal',
            description: 'Kredensial tidak valid atau Anda tidak memiliki hak akses moderator.',
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full shadow-neumorphic border-none bg-transparent">
        <CardHeader className="text-center">
          <div className="inline-block bg-background p-3 rounded-full shadow-neumorphic-inset mb-4 mx-auto w-fit">
            <Flame className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground/90">Moderator/Admin Login</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access the panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="moderator@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full mt-6 h-12 rounded-xl bg-accent-gradient text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
            onClick={handleLoginClick}
            disabled={!email || !password}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
