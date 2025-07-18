import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, FlaskConical, Wrench, Search, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const categories = [
  { name: 'Parfum', icon: Leaf },
  { name: 'Raw Material', icon: FlaskConical },
  { name: 'Tools', icon: Wrench },
  { name: 'Misc', icon: ShoppingBag },
];

interface BrowseFiltersProps {
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  sellerQuery: string | null;
}

export function BrowseFilters({
  category,
  setCategory,
  searchTerm,
  setSearchTerm,
  sellerQuery,
}: BrowseFiltersProps) {
  return (
    <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
      <Tabs value={category} onValueChange={setCategory} className="w-full md:w-auto">
        <TabsList className="h-12 w-full rounded-xl bg-transparent p-1 shadow-neumorphic-inset md:w-auto">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.name}
              value={cat.name}
              className={cn(
                'h-full flex-1 rounded-lg px-4 py-2 text-foreground/70 transition-all duration-300 data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active',
                'data-[state=active]:bg-accent-gradient',
                'hover:bg-background/50 hover:shadow-neumorphic-active'
              )}
            >
              <cat.icon className="mr-2 h-5 w-5 text-current/80" />
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 w-full rounded-xl border-none bg-background pl-10 text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}

export function SellerFilterDisplay() {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-foreground/90">Produk oleh Penjual</h1>
      <p className="mt-1 text-muted-foreground">Menjelajahi semua penawaran dari satu penjual.</p>
      <Button asChild variant="link" className="mt-2">
        <Link href="/browse">Hapus Filter Penjual</Link>
      </Button>
    </div>
  );
}
