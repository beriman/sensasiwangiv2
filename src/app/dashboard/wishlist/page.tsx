// src/app/dashboard/wishlist/page.tsx
'use client';

import { useWishlist } from '@/hooks/use-wishlist';
import { ProductGrid } from '@/components/product-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground/80">Wishlist Saya</CardTitle>
        <CardDescription>Koleksi produk yang Anda simpan untuk dibeli nanti.</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg bg-background shadow-neumorphic-inset">
            <Heart className="h-16 w-16 text-muted-foreground/30" />
            <h3 className="mt-4 text-xl font-semibold">Wishlist Anda kosong</h3>
            <p className="mt-2 text-muted-foreground">
              Tambahkan produk yang Anda sukai ke wishlist untuk melihatnya di sini.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
