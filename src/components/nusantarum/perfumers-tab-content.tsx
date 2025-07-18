import { PerfumerCard } from '@/components/nusantarum/perfumer-card';
import type { Profile } from '@/lib/types';

interface PerfumersTabContentProps {
  perfumers: Profile[];
}

export function PerfumersTabContent({ perfumers }: PerfumersTabContentProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {perfumers.map(perfumer => (
        <PerfumerCard key={perfumer.slug} perfumer={perfumer} />
      ))}
      {perfumers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground col-span-full">No perfumers found.</div>
      )}
    </div>
  );
}
