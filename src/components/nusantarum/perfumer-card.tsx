import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface PerfumerCardProps {
  perfumer: Profile;
}

export function PerfumerCard({ perfumer }: PerfumerCardProps) {
  return (
    <Card className="flex flex-col rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={perfumer.profilePicture} alt={perfumer.name} data-ai-hint={perfumer.imageHint}/>
          <AvatarFallback>{perfumer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-bold text-foreground/80">{perfumer.name}</CardTitle>
          <CardDescription>{perfumer.username}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{perfumer.bio}</p>
      </CardContent>
      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
            {perfumer.followers ? 
              `${perfumer.followers.toLocaleString()} Followers` :
              perfumer.curation?.isCurated ? (
                 <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800">
                    <BadgeCheck className="h-4 w-4" />
                    Terverifikasi
                </div>
              ) : ''
            }
        </div>
        <Link href={`/profile/${perfumer.slug}`} className="flex items-center text-sm font-semibold text-accent hover:underline">
          View Profile
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
