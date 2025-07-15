// src/app/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { products } from '@/data/products';
import { courses } from '@/data/courses';
import { allThreads } from '@/data/forum';
import { profiles } from '@/data/profiles';
import { useSession } from '@supabase/auth-helpers-react';
import AuthComponent from '@/components/auth';

export default function LandingPage() {
  const session = useSession();
  const featuredProducts = products.filter(p => p.isListed).slice(0, 4);
  const featuredCourse = courses[0];
  const recentThreads = allThreads.slice(0, 3);
  const featuredPerfumers = profiles.filter(p => p.type === 'Perfumer').slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] text-center flex flex-col items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
             <video
                src="https://videos.pexels.com/video-files/4379155/4379155-hd_1920_1080_25fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
            ></video>
            <div className="relative z-20 p-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Temukan Esensi Sejati Anda</h1>
                <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
                    Platform komunitas untuk para pecinta, perajin, dan penjelajah dunia wewangian di Indonesia.
                </p>
                {!session ? (
                  <AuthComponent />
                ) : (
                  <Button asChild size="lg" className="mt-8 h-14 rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                      <Link href="/browse">Mulai Menjelajah</Link>
                  </Button>
                )}
            </div>
        </section>

        <div className="container mx-auto px-4 py-16 space-y-20">
            {/* Featured Products */}
            <section>
                <h2 className="text-3xl font-bold text-foreground/90 mb-2">Kreasi Unggulan</h2>
                <div className="flex justify-between items-center mb-6">
                    <p className="text-muted-foreground">Temukan wewangian yang sedang tren dan dicintai oleh komunitas.</p>
                     <Button asChild variant="link" className="text-accent">
                        <Link href="/browse">Lihat Semua <ArrowRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Featured Course */}
            <section>
                 <Card className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl border-none bg-transparent shadow-neumorphic">
                    <div className="relative w-full h-64 md:w-1/3 md:h-auto md:aspect-square shrink-0">
                       <Image
                            src={featuredCourse.imageUrl}
                            alt={featuredCourse.title}
                            fill
                            className="rounded-xl object-cover"
                            data-ai-hint={featuredCourse.imageHint}
                        />
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold text-accent mb-2">Kursus Pilihan</p>
                        <h3 className="text-3xl font-bold text-foreground/90">{featuredCourse.title}</h3>
                        <p className="text-muted-foreground mt-2">oleh {featuredCourse.instructor}</p>
                        <p className="mt-4 text-lg text-foreground/80">{featuredCourse.description}</p>
                        <Button asChild size="lg" className="mt-6 rounded-xl shadow-neumorphic">
                            <Link href={`/school/course/${featuredCourse.slug}`}>
                                <BookOpen className="mr-2"/>
                                Pelajari Selengkapnya
                            </Link>
                        </Button>
                    </div>
                </Card>
            </section>
            
            {/* Community & Perfumers */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Community Highlights */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-foreground/90 mb-2">Dari Forum Komunitas</h2>
                    <p className="text-muted-foreground mb-6">Lihat apa yang sedang ramai dibicarakan.</p>
                    <div className="space-y-4">
                       {recentThreads.map(thread => (
                         <Link key={thread.id} href={`/community/thread/${thread.id}`} className="block p-4 rounded-xl shadow-neumorphic transition-all hover:bg-muted/30 hover:shadow-neumorphic-active">
                            <h4 className="font-bold text-foreground/80">{thread.title}</h4>
                            <p className="text-sm text-muted-foreground">oleh {thread.author} di kategori {thread.categoryId}</p>
                        </Link>
                       ))}
                    </div>
                </div>

                {/* Featured Perfumers */}
                <div>
                    <h2 className="text-3xl font-bold text-foreground/90 mb-2">Kreator Pilihan</h2>
                    <p className="text-muted-foreground mb-6">Kenali para perajin di balik karya-karya luar biasa.</p>
                     <div className="space-y-4">
                       {featuredPerfumers.map(perfumer => (
                         <Link key={perfumer.slug} href={`/profile/${perfumer.slug}`} className="flex items-center gap-4 p-3 rounded-xl shadow-neumorphic transition-all hover:bg-muted/30 hover:shadow-neumorphic-active">
                           <Image src={perfumer.profilePicture || 'https://placehold.co/64x64.png'} alt={perfumer.name} width={64} height={64} className="rounded-full" />
                           <div>
                               <h4 className="font-bold text-foreground/80">{perfumer.name}</h4>
                               <p className="text-sm text-muted-foreground">{perfumer.username}</p>
                           </div>
                        </Link>
                       ))}
                    </div>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
}
