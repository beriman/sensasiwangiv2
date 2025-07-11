// src/data/forum.ts
import { products } from './products';
import { perfumers } from './perfumers';

export interface Post {
  author: string;
  content: string;
}

export interface Thread {
  id: string;
  categoryId: 'perfumer-corner' | 'ngobrolin-parfum' | 'jurnal-platform' | 'arena-komunitas';
  title: string;
  author: string;
  content: string;
  posts: Post[];
}

export interface ForumCategory {
  id: 'perfumer-corner' | 'ngobrolin-parfum' | 'jurnal-platform' | 'arena-komunitas';
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
  {
    id: 'jurnal-platform',
    name: 'Jurnal Platform',
    description: 'Ikuti perkembangan terbaru, pembaruan fitur, dan catatan patch dari tim sensasiwangi.id.',
  },
  {
    id: 'arena-komunitas',
    name: 'Arena Komunitas',
    description: 'Informasi tentang acara, gathering, bazaar, dan workshop. Ayo bertemu dan berbagi cerita!',
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
  {
    id: 'patch-1',
    categoryId: 'jurnal-platform',
    title: 'Pembaruan Fitur: Wishlist untuk School & Sistem Umpan Balik!',
    author: 'Admin',
    content: 'Halo semua!\n\nKami baru saja meluncurkan beberapa fitur baru berdasarkan masukan Anda:\n\n1. **Wishlist untuk School**: Anda sekarang dapat menambahkan kursus ke wishlist Anda, sama seperti produk!\n2. **Sistem Saran & Kritik**: Kami telah menambahkan fitur umpan balik baru di footer. Masukan Anda akan langsung masuk ke kanban board tim kami.\n\nTerima kasih atas dukungan Anda!',
    posts: [
        {
            author: 'Alex Doe',
            content: 'Fitur wishlist untuk kursus sangat berguna! Terima kasih!'
        }
    ],
  },
  {
    id: 'event-1',
    categoryId: 'arena-komunitas',
    title: 'Acara Kumpul Komunitas & Bazaar Parfum Lokal - Jakarta, Agustus 2024',
    author: 'Admin',
    content: 'Mari bergabung dengan kami untuk acara kumpul komunitas pertama sensasiwangi.id!\n\n**Tanggal**: 17 Agustus 2024\n**Lokasi**: Community Hall, Senayan\n\nAkan ada bazaar dari para perfumer lokal, sesi sharing, dan tentu saja, banyak aroma untuk dijelajahi. Informasi lebih lanjut dan pendaftaran akan segera diumumkan.',
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
