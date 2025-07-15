// src/data/badges.ts
import { Award, BookCopy, Group, Palette, BadgeCheck, type LucideIcon } from 'lucide-react';

export type BadgeCategory = 'curated' | 'reviewer' | 'student' | 'artisan' | 'sambatan';

export interface BadgeLevel {
  level: number;
  title: string;
  description: string;
  threshold: number; // e.g., 10 for 10 reviews
}

export interface BadgeInfo {
  category: BadgeCategory;
  categoryTitle: string;
  icon: LucideIcon;
  levels: BadgeLevel[];
}

export const badgeData: Record<BadgeCategory, BadgeInfo> = {
  curated: {
    category: 'curated',
    categoryTitle: 'Nusantarum Verified',
    icon: BadgeCheck,
    levels: [
      {
        level: 1,
        title: 'Nusantarum Verified',
        description: 'Diberikan kepada perajin atau brand yang telah berhasil melewati proses kurasi ketat oleh tim Nusantarum.',
        threshold: 1,
      },
    ],
  },
  reviewer: {
    category: 'reviewer',
    categoryTitle: 'Trusted Reviewer',
    icon: Award,
    levels: [
      {
        level: 1,
        title: 'Trusted Reviewer I',
        description: 'Berikan 10 ulasan produk/penjual yang bermanfaat.',
        threshold: 10,
      },
      {
        level: 2,
        title: 'Trusted Reviewer II',
        description: 'Berikan 50 ulasan produk/penjual yang bermanfaat.',
        threshold: 50,
      },
      {
        level: 3,
        title: 'Trusted Reviewer III',
        description: 'Berikan 100 ulasan produk/penjual yang bermanfaat.',
        threshold: 100,
      },
    ],
  },
  student: {
    category: 'student',
    categoryTitle: 'School of Scent Student',
    icon: BookCopy,
    levels: [
      {
        level: 1,
        title: 'Murid Teladan',
        description: 'Selesaikan 1/5/10 kursus di School of Scent.',
        threshold: 1,
      },
       {
        level: 2,
        title: 'Pencari Ilmu',
        description: 'Selesaikan 5 kursus di School of Scent.',
        threshold: 5,
      },
       {
        level: 3,
        title: 'Sarjana Aroma',
        description: 'Selesaikan 10 kursus di School of Scent.',
        threshold: 10,
      },
    ],
  },
  artisan: {
    category: 'artisan',
    categoryTitle: 'Artisan',
    icon: Palette,
    levels: [
      {
        level: 1,
        title: 'Artisan I',
        description: 'Daftarkan 1/5/10 produk di marketplace.',
        threshold: 1,
      },
       {
        level: 2,
        title: 'Artisan II',
        description: 'Daftarkan 5 produk di marketplace.',
        threshold: 5,
      },
       {
        level: 3,
        title: 'Artisan III',
        description: 'Daftarkan 10 produk di marketplace.',
        threshold: 10,
      },
    ],
  },
  sambatan: {
    category: 'sambatan',
    categoryTitle: 'Sambatan Participant',
    icon: Group,
    levels: [
      {
        level: 1,
        title: 'Partisipan Aktif',
        description: 'Berpartisipasi dalam 3 Sambatan (group buy) yang berhasil.',
        threshold: 3,
      },
      {
        level: 2,
        title: 'Inisiator Sambatan',
        description: 'Berhasil menginisiasi dan menyelesaikan 5 Sambatan.',
        threshold: 5,
      },
    ],
  },
};
