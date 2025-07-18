import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from '@/components/product-grid';
import { ReviewCard } from '@/components/review-card';
import { type Product, type Review } from '@/lib/types';
import { Store, Palette } from 'lucide-react';

interface ProfileTabsProps {
  products: Product[];
  reviews: Review[];
}

export function ProfileTabs({ products, reviews }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="products" className="mt-10 mx-auto max-w-4xl">
      <TabsList className="grid w-full grid-cols-2 rounded-xl bg-transparent p-1 shadow-neumorphic-inset">
        <TabsTrigger value="products" className="h-full rounded-lg text-lg text-foreground/70 transition-all duration-300 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
          <Store className="mr-2 h-5 w-5" /> Produk
        </TabsTrigger>
        <TabsTrigger value="reviews" className="h-full rounded-lg text-lg text-foreground/70 transition-all duration-300 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
          <Palette className="mr-2 h-5 w-5" /> Ulasan ({reviews.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="products" className="mt-6">
        <ProductGrid products={products} />
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {reviews.length === 0 && (
            <div className="text-center py-16 text-muted-foreground rounded-xl shadow-neumorphic-inset">
              <p className="text-lg">Belum ada ulasan.</p>
              <p>Penjual ini belum menerima ulasan apa pun.</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
