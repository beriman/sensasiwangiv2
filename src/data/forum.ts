// src/data/forum.ts
import { products } from './products';
import { perfumers } from './perfumers';

export interface Post {
  author: string;
  content: string;
}

export interface Thread {
  id: string;
  categoryId: 'perfumer-corner' | 'ngobrolin-parfum';
  title: string;
  author: string;
  content: string;
  posts: Post[];
}

export interface ForumCategory {
  id: 'perfumer-corner' | 'ngobrolin-parfum';
  name: string;
  description: string;
}

export const forumCategories: ForumCategory[] = [
  {
    id: 'perfumer-corner',
    name: "Perfumer's Corner",
    description: 'Discuss techniques, materials, and the art of scent creation.',
  },
  {
    id: 'ngobrolin-parfum',
    name: 'Ngobrolin Parfum',
    description: 'Share your thoughts, reviews, and experiences with various perfumes.',
  },
];

// --- Automatic Thread Generation for Perfume Products ---
const productThreads: Thread[] = products
  .filter(p => p.category === 'Parfum')
  .map(product => {
    const perfumer = perfumers.find(perf => perf.slug === product.perfumerProfileSlug);
    const authorName = perfumer ? perfumer.name : 'System';

    return {
      id: `product-${product.id}`,
      categoryId: 'ngobrolin-parfum',
      title: `Diskusi: ${product.name}`,
      author: product.properties.Perfumer || 'Anonymous Perfumer',
      content: `Ini adalah thread diskusi resmi untuk ${product.name} oleh ${product.properties.Brand}. Bagikan pemikiran, ulasan, dan pengalaman aroma Anda di bawah ini!`,
      posts: [
        {
          author: 'Alex Doe',
          content: `Saya baru saja mencoba yang ini! Pembukaannya adalah ledakan melati yang indah. Adakah yang memperhatikan aroma hijau yang halus saat kering?

Saya menemukan ulasan yang bagus di sini: https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
        },
        {
            author: 'Antoine Leduc',
            content: `Sebagai pencipta wewangian yang bersebelahan, saya menghargai kompleksitas di sini. Keseimbangannya sangat indah.`,
        }
      ],
    };
  });

// --- Sample Manual Threads ---
const manualThreads: Thread[] = [
  {
    id: 'tech-1',
    categoryId: 'perfumer-corner',
    title: 'Tips untuk bekerja dengan absolut kental?',
    author: 'Alex Doe',
    content: "Saya kesulitan mendapatkan absolut melati saya ke viskositas yang bisa diterapkan tanpa memanaskannya terlalu banyak. Ada saran tentang teknik pemanasan lembut atau pelarut aman untuk digunakan untuk pengenceran? Terima kasih!",
    posts: [
      {
        author: 'Antoine Leduc',
        content: 'Water bath adalah teman terbaik Anda di sini. Panas yang sangat lembut dan merata. Saya juga terkadang mengencerkan absolut saya dalam alkohol parfum untuk membuat larutan 10% yang jauh lebih mudah untuk dikerjakan.',
      },
    ],
  },
  {
    id: 'tech-2',
    categoryId: 'perfumer-corner',
    title: 'Alternatif Cendana Favorit',
    author: 'Antoine Leduc',
    content: 'Dengan Cendana Mysore yang begitu berharga, apa alternatif pilihan Anda, baik alami maupun sintetis, yang memberikan profil kayu krem yang serupa?',
    posts: [],
  },
];

export const allThreads: Thread[] = [...manualThreads, ...productThreads];

// --- Helper Functions ---
export const getThreadsByCategory = (categoryId: string) => {
  return allThreads.filter(thread => thread.categoryId === categoryId);
};

export const getThreadById = (threadId: string) => {
  return allThreads.find(thread => thread.id === threadId);
};
