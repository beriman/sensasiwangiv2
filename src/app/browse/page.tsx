// src/app/browse/page.tsx

'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppHeader } from '@/components/header';
import { ProductGrid } from '@/components/product-grid';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';

import { useBrowseProducts } from '@/hooks/use-browse-products';
import { BrowseFilters, SellerFilterDisplay } from '@/components/browse/browse-filters';

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const sellerQuery = searchParams.get('seller');

  const [category, setCategory] = useState<string>('Parfum');
  const [searchTerm, setSearchTerm] = useState('');
  const { products, loading, error } = useBrowseProducts({ category, searchTerm, sellerQuery });

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        {sellerQuery ? (
          <SellerFilterDisplay />
        ) : (
          <BrowseFilters
            category={category}
            setCategory={setCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sellerQuery={sellerQuery}
          />
        )}

        <div className="relative">
          <main>
            {loading ? (
                <div>Loading products...</div>
            ) : error ? (
                <div className="text-destructive">Error: {error}</div>
            ) : (
                <ProductGrid products={products} />
            )}
          </main>
          <PersonalizedRecommendations category={category} activeFilters={{}} />
        </div>
      </div>
    </div>
  );
}