// src/app/info/faq/page.tsx

import { AppHeader } from '@/components/header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const faqItems = [
    {
        question: "Apa itu Sambatan?",
        answer: "Sambatan adalah fitur gotong royong (group buy) di mana beberapa anggota dapat bergabung untuk membeli produk dalam jumlah besar (seperti botol parfum utuh) dan membaginya menjadi ukuran lebih kecil (seperti vial atau decant) dengan harga yang lebih terjangkau per mililiter."
    },
    {
        question: "Bagaimana proses pengiriman dilakukan?",
        answer: "Pengiriman dilakukan langsung oleh penjual (perfumer atau brand) yang terdaftar di platform kami. Setiap penjual memiliki kebijakan dan estimasi waktu pengiriman yang mungkin berbeda. Informasi detail dapat dilihat pada halaman produk atau profil penjual."
    },
    {
        question: "Apakah produk di sini dijamin otentik?",
        answer: "Kami sangat serius dalam menjaga otentisitas. Produk yang dijual berasal langsung dari kreator atau brand resmi. Selain itu, carilah badge 'Terverifikasi oleh Nusantarum' pada profil penjual, yang menandakan bahwa mereka telah melalui proses kurasi ketat oleh tim ahli kami."
    },
    {
        question: "Bagaimana saya bisa mengembalikan produk?",
        answer: "Kebijakan pengembalian produk ditentukan oleh masing-masing penjual. Harap periksa kebijakan pengembalian di halaman profil penjual atau hubungi mereka langsung melalui sistem pesan kami sebelum melakukan pembelian. sensasiwangi.id dapat membantu mediasi jika terjadi perselisihan."
    }
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Frequently Asked Questions</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find answers to common questions about our platform and products.
          </p>
        </div>

        <Card className="mt-10 rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-8">
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                            <AccordionTrigger className="text-left text-lg font-semibold text-foreground/80 hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
