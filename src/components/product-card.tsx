'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Badge variant="secondary" className="mb-2 rounded-md bg-accent/50 text-accent-foreground">
          {product.category}
        </Badge>
        <CardTitle className="text-lg font-bold text-foreground/90">{product.name}</CardTitle>
        <CardDescription className="mt-1 text-sm text-muted-foreground">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-lg font-bold text-foreground/80">${product.price.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
}
