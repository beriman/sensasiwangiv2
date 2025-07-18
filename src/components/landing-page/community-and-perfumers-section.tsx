import Link from 'next/link';
import Image from 'next/image';
import { allThreads } from '@/data/forum';
import { profiles } from '@/data/profiles';

export function CommunityAndPerfumersSection() {
  const recentThreads = allThreads.slice(0, 3);
  const featuredPerfumers = profiles.filter(p => p.type === 'Perfumer').slice(0, 3);

  return (
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
  );
}
