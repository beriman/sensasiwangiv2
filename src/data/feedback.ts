// src/data/feedback.ts

export type FeedbackType = 'Saran' | 'Laporan Bug';
export type FeedbackStatus = 'Baru' | 'Dalam Peninjauan' | 'Selesai';

export interface FeedbackItem {
  id: number;
  type: FeedbackType;
  subject: string;
  description: string;
  user: string; // username or 'anonymous'
  date: string; // ISO 8601
  status: FeedbackStatus;
}

export const feedbackData: FeedbackItem[] = [
  {
    id: 1,
    type: 'Saran',
    subject: 'Integrasi dengan Kalender untuk Jadwal Workshop',
    description: 'Akan sangat membantu jika tiket workshop yang dibeli bisa langsung ditambahkan ke Google Calendar atau iCal.',
    user: 'Alex Doe',
    date: new Date('2024-05-20T10:00:00Z').toISOString(),
    status: 'Baru',
  },
  {
    id: 2,
    type: 'Laporan Bug',
    subject: 'Tombol "Add to Cart" tidak berfungsi di Firefox',
    description: 'Ketika saya mengklik tombol "Add to Cart" pada browser Firefox versi terbaru, tidak ada yang terjadi. Tidak ada item yang ditambahkan ke keranjang.',
    user: 'Jane Smith',
    date: new Date('2024-05-21T14:30:00Z').toISOString(),
    status: 'Baru',
  },
  {
    id: 3,
    type: 'Saran',
    subject: 'Filter berdasarkan bahan baku yang dimiliki',
    description: 'Bagaimana jika ada fitur di mana saya bisa memasukkan daftar bahan baku yang saya miliki, dan platform merekomendasikan formula parfum yang bisa saya buat?',
    user: 'Antoine Leduc',
    date: new Date('2024-05-22T09:00:00Z').toISOString(),
    status: 'Dalam Peninjauan',
  },
  {
    id: 4,
    type: 'Laporan Bug',
    subject: 'Gambar profil terbalik di halaman komunitas',
    description: 'Gambar profil saya dan beberapa pengguna lain tampak terbalik secara vertikal di postingan forum. Sepertinya ada masalah dengan CSS transform.',
    user: 'Michael Johnson',
    date: new Date('2024-05-22T11:00:00Z').toISOString(),
    status: 'Selesai',
  },
   {
    id: 5,
    type: 'Saran',
    subject: 'Mode Gelap (Dark Mode)',
    description: 'Tampilan akan lebih nyaman di mata pada malam hari jika ada opsi untuk beralih ke mode gelap. Ini juga terlihat lebih modern.',
    user: 'Alex Doe',
    date: new Date('2024-05-23T19:45:00Z').toISOString(),
    status: 'Dalam Peninjauan',
  },
];