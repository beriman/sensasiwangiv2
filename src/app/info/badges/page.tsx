// src/app/info/badges/page.tsx
'use client';

import { AppHeader } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { badgeData, BadgeInfo, BadgeLevel } from '@/data/badges';

const badgeOrder: (keyof typeof badgeData)[] = ['curated', 'reviewer', 'student', 'collector', 'sambatan'];

const BadgeLevelCard = ({ badge, level }: { badge: BadgeInfo, level: BadgeLevel }) => {
    const Icon = badge.icon;
    const isCuratedBadge = badge.category === 'curated';

    return (
        <Card className="flex flex-col rounded-2xl border-none bg-transparent text-center shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="items-center pb-4">
            <div className={`relative flex h-20 w-20 items-center justify-center rounded-full shadow-neumorphic-inset ${isCuratedBadge ? 'bg-blue-100 text-blue-700' : 'bg-background'}`}>
                <Icon className="h-10 w-10" />
                {!isCuratedBadge && (
                    <span className="absolute -bottom-1 -right-1 rounded-full bg-accent-gradient px-2 py-0.5 text-xs font-bold text-accent-foreground shadow-md">
                        Lv. {level.level}
                    </span>
                )}
            </div>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col">
            <CardTitle className="text-xl font-bold text-foreground/80">{level.title}</CardTitle>
            <p className="mt-2 flex-grow text-muted-foreground">{level.description}</p>
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

        {badgeOrder.map((badgeKey) => {
            const badge = badgeData[badgeKey];
            return (
                <div key={badgeKey} className="mt-12">
                    <h2 className="mb-6 text-center text-2xl font-bold text-foreground/80">{badge.categoryTitle}</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {badge.levels.map(level => (
                           <BadgeLevelCard key={level.level} badge={badge} level={level} />
                        ))}
                    </div>
                </div>
            )
        })}

      </main>
    </div>
  );
}
