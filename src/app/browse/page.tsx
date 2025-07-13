// src/app/browse/page.tsx

'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { products as allProducts } from '@/data/products';
import { AppHeader } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
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

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const sellerQuery = searchParams.get('seller');

  const [category, setCategory] = useState<string>('Parfum');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // When a seller is queried, reset other filters
    if (sellerQuery) {
      setSearchTerm('');
    }
  }, [sellerQuery]);


  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Only show listed products in the marketplace
      if (!product.isListed) {
        return false;
      }
      
      // If a Sambatan is active, check if its deadline has passed.
      if (product.sambatan?.isActive) {
        const deadline = new Date(product.sambatan.deadline);
        if (deadline < new Date()) {
          return false; // Automatically unlist expired Sambatan
        }
      }
      
      // Handle seller filter first, as it's a primary view
      if (sellerQuery) {
        return product.perfumerProfileSlug === sellerQuery;
      }

      const categoryMatch = category === 'All' || product.category === category;
      
      const searchTermMatch =
        searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());


      return categoryMatch && searchTermMatch;
    });
  }, [category, searchTerm, sellerQuery]);
  

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        {sellerQuery ? (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground/90">Produk oleh {sellerQuery}</h1>
            <p className="mt-1 text-muted-foreground">Menjelajahi semua penawaran dari satu penjual.</p>
            <Button asChild variant="link" className="mt-2">
              <Link href="/browse">Hapus Filter Penjual</Link>
            </Button>
          </div>
        ) : (
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
        )}


        <div className="relative">
          <main>
            <ProductGrid products={filteredProducts} />
          </main>
          <PersonalizedRecommendations category={category} activeFilters={{}} />
        </div>
      </div>
    </div>
  );
}
