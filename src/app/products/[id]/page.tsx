
// src/app/products/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { perfumers } from '@/data/perfumers';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, Star, Leaf, Trees, Citrus, Sparkles, Waves, Flame, Users, Clock, Plus, Minus, MessageSquare, Heart, PackageCheck, PackageX, Store } from 'lucide-react';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
import { useCart } from '@/hooks/use-cart';
import { formatRupiah, cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/hooks/use-wishlist';

const scentProfileIcons: { [key: string]: React.ElementType } = {
  Floral: Leaf,
  Woody: Trees,
  Citrus: Citrus,
  Oriental: Sparkles,
  Fresh: Waves,
  Spicy: Flame,
};

const CountdownTimer = ({ deadline }: { deadline: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(deadline) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents: any[] = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof typeof timeLeft]) {
            return;
        }
        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval as keyof typeof timeLeft]}
                {interval.substring(0,1)}
            </span>
        );
    });
    
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {timerComponents.length ? timerComponents.reduce((prev, curr) => [prev, ' ', curr]) : <span>Time's up!</span>}
        </div>
    );
};


export default function ProductDetailPage() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = products.find((p) => p.id === productId);
  const seller = perfumers.find(p => p.slug === product?.perfumerProfileSlug);
  
  const [slotQuantity, setSlotQuantity] = useState(1);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (product?.sambatan) {
      setSlotQuantity(product.sambatan.minOrder);
    }
  }, [product]);

  // Early exit if product not found or not listed
  if (!product || !product.isListed) {
    notFound();
  }

  const isSambatan = product.sambatan?.isActive;
  
  // If a Sambatan is active, check if its deadline has passed.
  if (isSambatan) {
    const deadline = new Date(product.sambatan.deadline);
    if (deadline < new Date()) {
      notFound(); // Treat expired Sambatan as not found
    }
  }

  const sambatanProgress = isSambatan ? (product.sambatan.currentParticipants / product.sambatan.targetParticipants) * 100 : 0;
  const inWishlist = isClient && isInWishlist(product.id);

  const handleJoinSambatan = () => {
    toast({
        title: "Bergabung dengan Sambatan!",
        description: `Anda telah dicatat sebagai peminat untuk ${slotQuantity} slot. Fitur pembayaran akan segera hadir.`
    })
  }
  
  const handleSlotChange = (change: number) => {
    if (!isSambatan) return;
    const newQuantity = slotQuantity + change;
    if (newQuantity >= product.sambatan.minOrder && newQuantity <= product.sambatan.maxOrder) {
      setSlotQuantity(newQuantity);
    }
  }


  const renderProductProperties = () => {
    const propertiesToShow = { ...product.properties };

    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
        {Object.entries(propertiesToShow).map(([key, value]) => {
            const Icon = key === 'Scent Profile' ? scentProfileIcons[value] : null;
            const isPerfumerLink = key === 'Perfumer' && product.perfumerProfileSlug;

            return(
                <div key={key}>
                  <p className="font-semibold text-muted-foreground">{key}</p>
                  {isPerfumerLink ? (
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
  
  const renderPriceSection = () => {
    if (isSambatan) {
      return (
        <div className="mt-4">
            <p className="text-3xl font-bold text-accent">{formatRupiah(product.sambatan.sambatanPrice)} <span className="text-lg font-normal text-muted-foreground">/ slot</span></p>
            <Badge variant="secondary" className="mt-2 bg-accent/20 text-accent">Harga Sambatan</Badge>
        </div>
      )
    }
    return <p className="mt-4 text-3xl font-bold text-foreground/80">{formatRupiah(product.price)}</p>
  }
  
  const renderStockInfo = () => {
    if (isSambatan) return null; // Stock info not shown for Sambatan
    if (product.stock > 10) {
        return <div className="flex items-center gap-2 text-sm text-green-600"><PackageCheck className="h-4 w-4" /> In Stock</div>
    }
    if (product.stock > 0) {
        return <div className="flex items-center gap-2 text-sm text-yellow-600"><PackageCheck className="h-4 w-4" /> {product.stock} items left</div>
    }
    return <div className="flex items-center gap-2 text-sm text-destructive"><PackageX className="h-4 w-4" /> Out of Stock</div>
  }

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
                    <Link href={`/?seller=${seller.slug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
                        <Store className="h-4 w-4" />
                        <span>Sold by {seller.name}</span>
                    </Link>
                </div>
            )}
            
            {renderPriceSection()}
            
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-muted-foreground/50'}`} fill="currentColor" />
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(123 reviews)</span>
                </div>
                {renderStockInfo()}
            </div>

            <p className="mt-6 text-base text-foreground/80">{product.description}</p>
            
            <Separator className="my-6" />

            {isSambatan ? (
                <Card className="rounded-2xl border-none bg-background shadow-neumorphic-inset p-6">
                    <CardTitle className="text-xl text-foreground/80 mb-4">Detail Sambatan</CardTitle>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                <span>Partisipan Terkumpul</span>
                                <span>{product.sambatan.currentParticipants} / {product.sambatan.targetParticipants}</span>
                            </div>
                            <Progress value={sambatanProgress} className="mt-2 h-3" />
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
                        {renderProductProperties()}
                    </div>
                </>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {isSambatan ? (
                <>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl shadow-neumorphic" onClick={() => handleSlotChange(-1)}>
                            <Minus />
                        </Button>
                        <Input
                            type="number"
                            readOnly
                            value={slotQuantity}
                            className="h-14 w-20 rounded-xl border-none bg-background text-center text-lg font-bold shadow-neumorphic-inset"
                        />
                         <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl shadow-neumorphic" onClick={() => handleSlotChange(1)}>
                            <Plus />
                        </Button>
                    </div>
                    <Button size="lg" className="h-14 flex-1 rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={handleJoinSambatan}>
                        <Users className="mr-2 h-6 w-6" />
                        Gabung Sambatan
                    </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="h-14 flex-1 rounded-xl bg-accent-gradient px-8 text-lg text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active" onClick={() => addItem(product)} disabled={product.stock === 0}>
                      {product.stock === 0 ? (
                        <>
                           <PackageX className="mr-2 h-6 w-6" />
                           Out of Stock
                        </>
                      ) : (
                        <>
                            <ShoppingCart className="mr-2 h-6 w-6" />
                            Add to Cart
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
                        Product Discussion
                    </Link>
                </Button>
            )}
            {!isSambatan && <Separator className="my-6" />}
          </div>
        </div>
        <PersonalizedRecommendations category={product.category} activeFilters={{}} />
      </main>
    </div>
  );
}
