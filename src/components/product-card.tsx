
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';
import { profiles } from '@/data/profiles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRupiah, cn } from '@/lib/utils';
import { Users, Heart, BadgeCheck, Store } from 'lucide-react';
import { useWishlist } from '@/hooks/use-wishlist';


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const isSambatan = product.sambatan?.isActive;
  const { toggleWishlist, isInWishlist } = useWishlist();
  const sellerProfile = profiles.find(p => p.slug === product.perfumerProfileSlug);
  const isCurated = sellerProfile?.curation?.isCurated;

  // Client-side check to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const inWishlist = isClient && isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  const handleSellerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the main card link from firing
    router.push(`/browse?seller=${sellerProfile?.slug}`);
  }

  const priceDisplay = () => {
    if (isSambatan) {
      return formatRupiah(product.sambatan.sambatanPrice);
    }
    if (product.variants.length > 1) {
      const minPrice = Math.min(...product.variants.map(v => v.price));
      return `${formatRupiah(minPrice)}+`;
    }
    return formatRupiah(product.variants[0]?.price || 0);
  };

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group relative flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="relative p-0">
          <div className="relative h-48 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
             {isSambatan && (
                <Badge className="absolute top-2 right-2 bg-accent-gradient text-accent-foreground">
                  <Users className="mr-1.5 h-3 w-3" />
                  Sambatan
                </Badge>
            )}
            {!isSambatan && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-9 w-9 rounded-full bg-background/70 shadow-neumorphic backdrop-blur-sm transition-all hover:bg-background"
                onClick={handleWishlistClick}
              >
                  <Heart className={cn("h-5 w-5 text-muted-foreground", inWishlist && "fill-destructive text-destructive")} />
              </Button>
            )}
             {isCurated && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-blue-100/80 px-2 py-1 text-xs font-semibold text-blue-800 backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4" />
                Terverifikasi
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2 rounded-md bg-accent/50 text-accent-foreground">
            {product.category}
          </Badge>
          <CardTitle className="text-lg font-bold text-foreground/90">{product.name}</CardTitle>
          {sellerProfile && (
            <div 
              role="button"
              tabIndex={0}
              onClick={handleSellerClick}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSellerClick(e as any); }}
              className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent hover:underline"
            >
              <Store className="h-3.5 w-3.5" />
              {sellerProfile.name}
            </div>
          )}
          <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <p className={cn("text-lg font-bold", isSambatan ? "text-accent" : "text-foreground/80")}>
            {priceDisplay()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
