// src/app/info/badges/page.tsx
'use client';

import { AppHeader } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { badgeData, BadgeInfo } from '@/data/badges';

import { BadgeCategoryCard } from '@/components/info/badge-category-card';
// ... other imports ...

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Katalog Lencana</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Temukan semua pencapaian yang bisa Anda raih di sensasiwangi.id!
          </p>
        </div>

        <div className="mt-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.values(badgeData).map(badge => (
                   <BadgeCategoryCard key={badge.category} badge={badge} />
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}


export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Katalog Lencana</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Temukan semua pencapaian yang bisa Anda raih di sensasiwangi.id!
          </p>
        </div>

        <div className="mt-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.values(badgeData).map(badge => (
                   <BadgeCategoryCard key={badge.category} badge={badge} />
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
