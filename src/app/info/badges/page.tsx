// src/app/info/badges/page.tsx
'use client';

import { AppHeader } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, Award, BookCopy, Store, Group } from 'lucide-react';

type BadgeType = 'curated' | 'reviewer' | 'student' | 'collector' | 'sambatan';

const badgeInfo: Record<BadgeType, { icon: React.ElementType; title: string; description: string }> = {
  curated: {
    icon: BadgeCheck,
    title: 'Nusantarum Verified',
    description: 'Diberikan kepada perajin atau brand yang telah berhasil melewati proses kurasi ketat oleh tim Nusantarum, menandakan otentisitas dan kualitas.',
  },
  reviewer: {
    icon: Award,
    title: 'Ulasan Terpercaya',
    description: 'Diberikan kepada pengguna yang telah memberikan 10 atau lebih ulasan produk/penjual yang bermanfaat bagi komunitas.',
  },
  student: {
    icon: BookCopy,
    title: 'Murid Teladan',
    description: 'Diberikan kepada pengguna yang telah berhasil menyelesaikan setidaknya satu kursus di School of Scent.',
  },
  collector: {
    icon: Store,
    title: 'Kolektor Pemula',
    description: 'Diberikan kepada pengguna yang telah menambahkan 5 atau lebih parfum ke dalam koleksi "Lemari Parfum" virtual mereka.',
  },
  sambatan: {
    icon: Group,
    title: 'Partisipan Aktif',
    description: 'Diberikan kepada pengguna yang telah berpartisipasi dalam 3 atau lebih Sambatan (group buy) yang berhasil.',
  },
};

const badgeOrder: BadgeType[] = ['curated', 'reviewer', 'student', 'collector', 'sambatan'];

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Katalog Lencana</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Temukan semua pencapaian yang bisa Anda raih di sensasiwangi.id!
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {badgeOrder.map((badgeKey) => {
            const badge = badgeInfo[badgeKey];
            const Icon = badge.icon;
            const isCuratedBadge = badgeKey === 'curated';

            return (
              <Card key={badgeKey} className="flex flex-col rounded-2xl border-none bg-transparent text-center shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="items-center pb-4">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full shadow-neumorphic-inset ${isCuratedBadge ? 'bg-blue-100 text-blue-700' : 'bg-background'}`}>
                    <Icon className="h-10 w-10" />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-grow flex-col">
                  <CardTitle className="text-xl font-bold text-foreground/80">{badge.title}</CardTitle>
                  <p className="mt-2 flex-grow text-muted-foreground">{badge.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
