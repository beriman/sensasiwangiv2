// src/app/info/terms/page.tsx

import { AppHeader } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Ketentuan Layanan</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <Card className="mt-10 rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-8">
          <CardContent className="prose prose-lg max-w-none text-foreground/80">
            <h2>1. Persetujuan terhadap Ketentuan</h2>
            <p>Dengan menggunakan layanan kami, Anda setuju untuk terikat oleh Ketentuan ini. Jika Anda tidak menyetujui Ketentuan ini, jangan gunakan layanan kami. Kami dapat mengubah Ketentuan ini kapan saja, dan modifikasi tersebut akan berlaku efektif segera setelah diposting.</p>
            
            <h2>2. Akun</h2>
            <p>Saat Anda membuat akun dengan kami, Anda harus memberikan informasi yang akurat, lengkap, dan terkini setiap saat. Kegagalan untuk melakukannya merupakan pelanggaran terhadap Ketentuan, yang dapat mengakibatkan penghentian segera akun Anda di layanan kami.</p>
            
            <h2>3. Transaksi Marketplace</h2>
            <p>sensasiwangi.id menyediakan platform bagi pembeli dan penjual untuk menyelesaikan transaksi. Kami bukan pihak dalam transaksi antara Anda dan penjual. Kami tidak memiliki kendali atas dan tidak menjamin kualitas, keamanan, atau legalitas barang yang diiklankan, kebenaran atau keakuratan konten atau daftar penjual, kemampuan penjual untuk menjual barang, atau kemampuan pembeli untuk membayar barang.</p>
            
            <h2>4. Konten</h2>
            <p>Layanan kami memungkinkan Anda untuk memposting, menautkan, menyimpan, membagikan, dan menyediakan informasi, teks, grafik, video, atau materi lain tertentu ("Konten"). Anda bertanggung jawab atas Konten yang Anda posting ke Layanan, termasuk legalitas, keandalan, dan kepantasannya.</p>

            <h2>5. Penghentian</h2>
            <p>Kami dapat menghentikan atau menangguhkan akun Anda dengan segera, tanpa pemberitahuan atau kewajiban sebelumnya, untuk alasan apa pun, termasuk tanpa batasan jika Anda melanggar Ketentuan.</p>
            
            <h2>6. Hukum yang Mengatur</h2>
            <p>Ketentuan ini akan diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia, tanpa memperhatikan pertentangan ketentuan hukum.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
