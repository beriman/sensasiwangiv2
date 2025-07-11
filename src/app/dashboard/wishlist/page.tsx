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
        <CardTitle className="text-xl font-bold text-foreground/80">My Wishlist</CardTitle>
        <CardDescription>Your collection of saved products for future purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <ProductGrid products={items} />
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg bg-background shadow-neumorphic-inset">
            <Heart className="h-16 w-16 text-muted-foreground/30" />
            <h3 className="mt-4 text-xl font-semibold">Your wishlist is empty</h3>
            <p className="mt-2 text-muted-foreground">
              Add products you love to your wishlist to see them here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
