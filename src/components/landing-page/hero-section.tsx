import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from '@supabase/auth-helpers-react';
import AuthComponent from '@/components/auth';

export function HeroSection() {
  const session = useSession();

  return (
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
  );
}
