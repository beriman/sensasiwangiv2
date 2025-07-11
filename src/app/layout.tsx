import type {Metadata} from 'next';
import './globals.css';
import { PT_Sans } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { AppFooter } from '@/components/footer';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export const metadata: Metadata = {
  title: 'sensasiwangi.id',
  description: 'Discover your signature scent.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${ptSans.variable} font-body flex flex-col min-h-screen`}>
        <div className="flex-grow">
          {children}
        </div>
        <Toaster />
        <AppFooter />
      </body>
    </html>
  );
}
