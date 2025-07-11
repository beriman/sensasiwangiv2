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
            Pengaturan Akun
          </CardTitle>
          <CardDescription>
            Kelola informasi pribadi dan keamanan Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {/* Content will be added here */}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
        <CardHeader>
          <CardTitle>Informasi Profil</CardTitle>
          <CardDescription>
            Perbarui detail pribadi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" defaultValue="Alex Doe" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input id="email" type="email" defaultValue="alex.doe@example.com" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
        <CardHeader>
          <CardTitle>Keamanan</CardTitle>
          <CardDescription>
            Ubah kata sandi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
            <Input id="current-password" type="password" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Kata Sandi Baru</Label>
            <Input id="new-password" type="password" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
          </div>
          <Button className="mt-4 rounded-xl shadow-neumorphic transition-all hover:shadow-neumorphic-active">Ubah Kata Sandi</Button>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button className="h-12 rounded-xl bg-accent-gradient px-6 text-lg font-bold text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">Simpan Perubahan</Button>
      </div>
    </div>
  );
}
