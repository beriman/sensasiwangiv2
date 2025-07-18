import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { useFeaturedProducts } from '@/hooks/use-featured-products';
import type { Product } from '@/lib/types';

export function FeaturedProductsSection() {
  const { featuredProducts, loading: productsLoading, error: productsError } = useFeaturedProducts();

  return (
    <section>
      <h2 className="text-3xl font-bold text-foreground/90 mb-2">Kreasi Unggulan</h2>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Temukan wewangian yang sedang tren dan dicintai oleh komunitas.</p>
        <Button asChild variant="link" className="text-accent">
          <Link href="/browse">Lihat Semua <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
      {productsLoading ? (
        <div>Loading featured products...</div>
      ) : productsError ? (
        <div className="text-destructive">Error: {productsError}</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
