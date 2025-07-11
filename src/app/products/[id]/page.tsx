
// src/app/products/[id]/page.tsx
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, Leaf, Trees, Citrus, Sparkles, Waves, Flame, MessageSquare } from 'lucide-react';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
import { useCart } from '@/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';

const scentProfileIcons: { [key: string]: React.ElementType } = {
  Floral: Leaf,
  Woody: Trees,
  Citrus: Citrus,
  Oriental: Sparkles,
  Fresh: Waves,
  Spicy: Flame,
};

export default function ProductDetailPage() {
  const { addItem } = useCart();
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const renderProductProperties = () => {
    const propertiesToShow = { ...product.properties };

    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
        {Object.entries(propertiesToShow).map(([key, value]) => {
            const Icon = key === 'Scent Profile' ? scentProfileIcons[value] : null;
            return(
                <div key={key}>
                  <p className="font-semibold text-muted-foreground">{key}</p>
                  {key === 'Perfumer' && product.perfumerProfileSlug ? (
                    <Link href={`/profile/${product.perfumerProfileSlug}`} className="flex items-center gap-2 text-foreground/90 underline hover:text-accent">
                      {value}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 text-foreground/90">
                      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                      <span>{value}</span>
                    </div>
                  )}
                </div>
            )
        })}
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="relative min-h-[300px] md:min-h-[500px]">
            <Card className="h-full w-full overflow-hidden rounded-2xl border-none shadow-neumorphic">
                <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.imageHint}
                />
            </Card>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Badge variant="secondary" className="mb-2 w-fit rounded-md bg-accent/50 text-accent-foreground">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground/90 md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-bold text-foreground/80">{formatRupiah(product.price)}</p>
            
            <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-muted-foreground/50'}`} fill="currentColor" />
                    ))}
                </div>
                <span className="text-sm text-muted-foreground">(123 reviews)</span>
            </div>

            <p className="mt-6 text-base text-foreground/80">{product.description}</p>
            
            <Separator className="my-6" />

            <h3 className="text-lg font-semibold text-foreground/80">Details</h3>
            <div className="mt-4">
                {renderProductProperties()}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="h-14 flex-1 rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={() => addItem(product)}>
                <ShoppingCart className="mr-2 h-6 w-6" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <PersonalizedRecommendations category={product.category} activeFilters={{}} />
      </main>
    </div>
  );
}
