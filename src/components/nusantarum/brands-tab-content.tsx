import { PerfumerCard } from '@/components/nusantarum/perfumer-card';
import type { Profile } from '@/lib/types';

interface BrandsTabContentProps {
  brands: Profile[];
}

export function BrandsTabContent({ brands }: BrandsTabContentProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {brands.map(brand => (
        <PerfumerCard key={brand.slug} perfumer={brand} />
      ))}
      {brands.length === 0 && (
        <div className="text-center py-12 text-muted-foreground col-span-full">No brands found.</div>
      )}
    </div>
  );
}
