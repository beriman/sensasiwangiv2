// src/app/community/page.tsx
'use client';
import { AppHeader } from '@/components/header';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Community Forum</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Fitur ini sedang dalam perbaikan. Silakan kembali lagi nanti.
          </p>
        </div>
      </main>
    </div>
  );
}
