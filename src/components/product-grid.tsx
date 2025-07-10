'use client';

import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex h-full min-h-[40vh] items-center justify-center rounded-2xl bg-transparent shadow-neumorphic-inset">
        <p className="text-xl text-muted-foreground">No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
