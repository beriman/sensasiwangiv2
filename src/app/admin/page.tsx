// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Info, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@sensasiwangi.id');
  const [password, setPassword] = useState('password');
  const { login, loading } = useAuth();

  const handleLoginClick = async () => {
    if (!email || !password) return;
    await login(email, password);
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full mt-6 h-12 rounded-xl bg-accent-gradient text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active disabled:opacity-70"
            onClick={handleLoginClick}
            disabled={loading || !email || !password}
          >
            {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Login'}
          </Button>

            <Alert className="mt-6 text-left">
              <Info className="h-4 w-4" />
              <AlertTitle>Demo Credentials</AlertTitle>
              <AlertDescription>
                <p>Email: <span className="font-semibold text-accent">admin@sensasiwangi.id</span></p>
                <p>Password: <span className="font-semibold text-accent">password</span> (or any)</p>
              </AlertDescription>
            </Alert>

        </CardContent>
      </Card>
    </div>
  );
}
