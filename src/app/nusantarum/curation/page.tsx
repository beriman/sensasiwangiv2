// src/app/nusantarum/curation/page.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeCheck } from 'lucide-react';
import { AppHeader } from '@/components/header';

interface CurationLoginPageProps {
  onLogin?: () => void;
}

export default function CurationLoginPage({ onLogin }: CurationLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    // In a real app, you'd verify credentials. Here, we just need them to be filled.
    if (onLogin && email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <div className="flex items-center justify-center pt-20">
        <Card className="mx-auto max-w-sm w-full shadow-neumorphic border-none bg-transparent">
          <CardHeader className="text-center">
            <div className="inline-block bg-background p-3 rounded-full shadow-neumorphic-inset mb-4 mx-auto w-fit">
              <BadgeCheck className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground/90">Curator Login</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access the Nusantarum Curation Panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="curator@example.com" 
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
              Enter Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
