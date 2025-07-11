// src/app/dashboard/settings/page.tsx
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AccountSettingsPage() {
  return (
    <div className="space-y-8">
      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground/80">
            Account Settings
          </CardTitle>
          <CardDescription>
            Manage your personal and security information.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {/* Content will be added here */}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Alex Doe" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="alex.doe@example.com" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Change your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
          <Button className="mt-4 rounded-xl shadow-neumorphic transition-all hover:shadow-neumorphic-active">Change Password</Button>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button className="h-12 rounded-xl bg-accent-gradient px-6 text-lg font-bold text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">Save Changes</Button>
      </div>
    </div>
  );
}
