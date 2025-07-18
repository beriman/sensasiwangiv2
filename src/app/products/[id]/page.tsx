// src/app/products/[id]/page.tsx
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
const supabase = createClient();
import { profiles } from '@/data/profiles';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, Star, Users, MessageSquare, Heart, Handshake } from 'lucide-react';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-wishlist';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useProductDetails } from '@/hooks/use-product-details';
import { CountdownTimer } from '@/components/countdown-timer';
import { ProductProperties } from '@/components/product-details/product-properties';
import { ProductPriceSection } from '@/components/product-details/product-price-section';
import { ProductStockInfo } from '@/components/product-details/product-stock-info';
import { ProductVariantSelector } from '@/components/product-details/product-variant-selector';
import { SambatanDiscussion } from '@/components/product-details/sambatan-discussion';

export default function ProductDetailPage() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { product, selectedVariant, setSelectedVariant, loading, error } = useProductDetails(productId);
  const seller = profiles.find(p => p.slug === product?.perfumerProfileSlug);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading product...</div>; // Or a skeleton loader
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-destructive">Error: {error}</div>;
  }

  if (!product || !product.is_listed) {
    notFound();
  }

  const isSambatan = product.sambatan?.isActive;
  const isService = product.category === 'Jasa';
  
  if (isSambatan) {
    const deadline = new Date(product.sambatan.deadline);
    if (deadline < new Date()) {
      notFound();
    }
  }
  
  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem(product, selectedVariant);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a variant before adding to cart.',
      });
    }
  };

  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="w-full">
            <Card className="aspect-square w-full overflow-hidden rounded-2xl border-none shadow-neumorphic">
                <div className="relative h-full w-full">
                    <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={product.imageHint}
                    />
                </div>
            </Card>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
                <Badge variant="secondary" className="w-fit rounded-md bg-accent/50 text-accent-foreground">
                {product.category}
                </Badge>
                {isSambatan && (
                    <Badge className="bg-accent-gradient text-accent-foreground">
                        <Users className="mr-1.5 h-4 w-4" />
                        Sambatan Aktif
                    </Badge>
                )}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground/90 md:text-4xl">
              {product.name}
            </h1>
             {seller && (
                <div className="mt-2">
                    <Link href={`/browse?seller=${seller.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
                        <Store className="h-4 w-4" />
                        <span>Sold by {seller.name}</span>
                    </Link>
                </div>
            )}
            
            <ProductPriceSection isSambatan={isSambatan} product={product} selectedVariant={selectedVariant} />
            
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-muted-foreground/50'}`} fill="currentColor" />
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(123 reviews)</span>
                </div>
                <ProductStockInfo isSambatan={isSambatan} isService={isService} selectedVariant={selectedVariant} />
            </div>
            
            <ProductVariantSelector isSambatan={isSambatan} productVariants={product.product_variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />

            <p className="mt-6 text-base text-foreground/80">{product.description}</p>
            
            <Separator className="my-6" />

            {isService && (
              <Alert className="mb-6">
                <Handshake className="h-4 w-4" />
                <AlertTitle>Ini adalah Produk Jasa</AlertTitle>
                <AlertDescription>
                  Alur pembelian untuk jasa berbeda. Setelah pembayaran, Anda perlu mengirimkan barang Anda ke penyedia jasa sesuai alamat yang akan diberikan.
                </AlertDescription>
              </Alert>
            )}

            {isSambatan ? (
                <Card className="rounded-2xl border-none bg-background shadow-neumorphic-inset p-6">
                    <CardTitle className="text-xl text-foreground/80 mb-4">Detail Sambatan</CardTitle>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                <span>Partisipan Terkumpul</span>
                                <span>{product.sambatan.currentParticipants} / {product.sambatan.targetParticipants}</span>
                            </div>
                            <Progress value={product.sambatan.currentParticipants / product.sambatan.targetParticipants * 100} className="mt-2 h-3" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-muted-foreground">Batas Waktu:</span>
                            <CountdownTimer deadline={product.sambatan.deadline} />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-muted-foreground">Order per Pembeli:</span>
                            <span className="text-foreground/90">{product.sambatan.minOrder} - {product.sambatan.maxOrder} slot</span>
                        </div>
                    </div>
                </Card>
            ) : (
                <>
                    <h3 className="text-lg font-semibold text-foreground/80">Details</h3>
                    <div className="mt-4">
                        <ProductProperties properties={product.properties} perfumerProfileSlug={product.perfumerProfileSlug} />
                    </div>
                </>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {isSambatan ? (
                <>
                    <Button size="lg" className="h-14 flex-1 rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                        <Users className="mr-2 h-6 w-6" />
                        Gabung Sambatan
                    </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="h-14 flex-1 rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={handleAddToCart} disabled={!selectedVariant || selectedVariant.stock === 0}>
                      {isService ? (
                        <>
                           <Handshake className="mr-2 h-6 w-6" />
                           Pesan Jasa
                        </>
                      ) : !selectedVariant || selectedVariant.stock === 0 ? (
                        <>
                           <PackageX className="mr-2 h-6 w-6" />
                           Stok Habis
                        </>
                      ) : (
                        <>
                            <ShoppingCart className="mr-2 h-6 w-6" />
                            Tambah ke Keranjang
                        </>
                      )}
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 w-14 rounded-xl p-0 shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={() => toggleWishlist(product)}>
                      <Heart className={cn("h-6 w-6", inWishlist && "fill-destructive text-destructive")} />
                  </Button>
                </>
              )}
            </div>
            {!isSambatan && product.category === 'Parfum' && (
                <Button variant="outline" asChild className="mt-4 h-14 rounded-xl shadow-neumorphic">
                    <Link href={`/community/thread/product-${product.id}`}>
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Diskusi Produk
                    </Link>
                </Button>
            )}
          </div>
        </div>
        
        {isSambatan && (
            <SambatanDiscussion />
        )}
        
        <PersonalizedRecommendations category={product.category} activeFilters={{}} />
      </main>
    </div>
  );
}