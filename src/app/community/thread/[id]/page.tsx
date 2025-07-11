// src/app/community/thread/[id]/page.tsx
'use client';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThreadPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground/90">Discussion Disabled</h1>
          <p className="mt-4 text-muted-foreground">
            Fitur ini sedang dalam perbaikan. Silakan kembali lagi nanti.
          </p>
        </div>
      </main>
    </div>
  );
}
