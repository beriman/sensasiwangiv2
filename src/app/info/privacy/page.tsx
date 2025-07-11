// src/app/info/privacy/page.tsx

import { AppHeader } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Kebijakan Privasi</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <Card className="mt-10 rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-8">
            <CardContent className="prose prose-lg max-w-none text-foreground/80">
                <h2>1. Pendahuluan</h2>
                <p>Selamat datang di sensasiwangi.id. Kami berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi Anda saat Anda mengunjungi situs web kami.</p>
                
                <h2>2. Informasi yang Kami Kumpulkan</h2>
                <p>Kami dapat mengumpulkan informasi tentang Anda dengan berbagai cara. Informasi yang dapat kami kumpulkan di Situs termasuk:</p>
                <ul>
                    <li><strong>Data Pribadi:</strong> Informasi yang dapat diidentifikasi secara pribadi, seperti nama, alamat pengiriman, alamat email, dan nomor telepon, yang Anda berikan secara sukarela kepada kami saat Anda mendaftar di Situs atau saat Anda memilih untuk berpartisipasi dalam berbagai aktivitas yang terkait dengan Situs, seperti obrolan online dan papan pesan.</li>
                    <li><strong>Data Turunan:</strong> Informasi yang dikumpulkan server kami secara otomatis saat Anda mengakses Situs, seperti alamat IP Anda, jenis browser Anda, sistem operasi Anda, waktu akses Anda, dan halaman yang telah Anda lihat secara langsung sebelum dan sesudah mengakses Situs.</li>
                </ul>

                <h2>3. Penggunaan Informasi Anda</h2>
                <p>Memiliki informasi yang akurat tentang Anda memungkinkan kami untuk memberikan Anda pengalaman yang lancar, efisien, dan disesuaikan. Secara khusus, kami dapat menggunakan informasi yang dikumpulkan tentang Anda melalui Situs untuk:</p>
                <ul>
                    <li>Membuat dan mengelola akun Anda.</li>
                    <li>Memproses transaksi Anda dan mengirimi Anda informasi terkait, termasuk konfirmasi pembelian dan faktur.</li>
                    <li>Mengirimi Anda email mengenai akun atau pesanan Anda.</li>
                    <li>Memungkinkan komunikasi antar pengguna.</li>
                    <li>Memantau dan menganalisis penggunaan dan tren untuk meningkatkan pengalaman Anda dengan Situs.</li>
                </ul>

                <h2>4. Keamanan Informasi Anda</h2>
                <p>Kami menggunakan langkah-langkah keamanan administratif, teknis, dan fisik untuk membantu melindungi informasi pribadi Anda. Meskipun kami telah mengambil langkah-langkah yang wajar untuk mengamankan informasi pribadi yang Anda berikan kepada kami, perlu diketahui bahwa terlepas dari upaya kami, tidak ada langkah-langkah keamanan yang sempurna atau tidak dapat ditembus, dan tidak ada metode transmisi data yang dapat dijamin terhadap penyadapan atau jenis penyalahgunaan lainnya.</p>
                
                <h2>5. Hubungi Kami</h2>
                <p>Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi ini, silakan hubungi kami di support@sensasiwangi.id.</p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
