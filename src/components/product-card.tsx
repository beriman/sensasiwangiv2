'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';
import { Users } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isSambatan = product.sambatan?.isActive;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
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
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2 rounded-md bg-accent/50 text-accent-foreground">
            {product.category}
          </Badge>
          <CardTitle className="text-lg font-bold text-foreground/90">{product.name}</CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {isSambatan ? (
             <div className="flex w-full flex-col">
              <p className="text-lg font-bold text-accent">{formatRupiah(product.sambatan.sambatanPrice)}</p>
            </div>
          ) : (
             <p className="text-lg font-bold text-foreground/80">{formatRupiah(product.price)}</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
