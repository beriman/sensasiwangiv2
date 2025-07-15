// src/app/info/badges/page.tsx
'use client';

import { AppHeader } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { badgeData, BadgeInfo } from '@/data/badges';
import { Award, BookCopy, Group, Store, BadgeCheck, type LucideIcon } from 'lucide-react';


const getThresholdString = (badge: BadgeInfo) => {
    if (badge.levels.length === 1) {
        return badge.levels[0].threshold;
    }
    return badge.levels.map(l => l.threshold).join('/');
};

const BadgeCategoryCard = ({ badge }: { badge: BadgeInfo }) => {
    const Icon = badge.icon;
    const isCuratedBadge = badge.category === 'curated';
    const descriptionTemplate = badge.levels[0].description;
    const thresholdString = getThresholdString(badge);
    const finalDescription = descriptionTemplate.replace(/(\d+)/, thresholdString.toString());


    return (
        <Card className="flex flex-col rounded-2xl border-none bg-transparent text-center shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="items-center pb-4">
            <div className={`relative flex h-24 w-24 items-center justify-center rounded-full shadow-neumorphic-inset ${isCuratedBadge ? 'bg-blue-100 text-blue-700' : 'bg-background'}`}>
                <Icon className="h-12 w-12" />
            </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col">
            <CardTitle className="text-xl font-bold text-foreground/80">{badge.categoryTitle}</CardTitle>
            <p className="mt-2 flex-grow text-muted-foreground">{finalDescription}</p>
            </CardContent>
        </Card>
    )
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
