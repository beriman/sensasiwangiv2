'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WandSparkles, Loader2 } from 'lucide-react';
import type { Product } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { products as allProducts } from '@/data/products';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ProductCard } from '@/components/product-card';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

interface PersonalizedRecommendationsProps {
  category: string;
  activeFilters: Record<string, string[]>;
}

const recommendationsFormSchema = z.object({
  preferences: z.string().min(10, {
    message: 'Please describe your preferences in at least 10 characters.',
  }),
});

export function PersonalizedRecommendations({ category, activeFilters }: PersonalizedRecommendationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recommendationsFormSchema>>({
    resolver: zodResolver(recommendationsFormSchema),
    defaultValues: {
      preferences: '',
    },
  });

  const handleReset = () => {
    setRecommendations(null);
    setError(null);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof recommendationsFormSchema>) => {
    setIsLoading(true);
    setRecommendations(null);
    setError(null);

    try {
      const browsingHistory = `The user is currently browsing the "${category}" category with the following filters applied: ${JSON.stringify(activeFilters)}.`;
      
      const result = await getPersonalizedRecommendations({
        browsingHistory,
        preferences: values.preferences,
      });

      if (result && result.recommendations) {
        const recommendedProducts = allProducts.filter(p => result.recommendations.includes(p.name));
        setRecommendations(recommendedProducts);
        if (recommendedProducts.length === 0) {
            toast({
                title: "No specific products found",
                description: "We couldn't find exact matches for our recommendations, but feel free to browse our collection!",
            });
        }
      } else {
        throw new Error('No recommendations returned from the AI.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError('Failed to get recommendations. Please try again later.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      handleReset();
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-20 h-16 w-16 rounded-full bg-accent shadow-neumorphic transition-all duration-300 ease-in-out hover:bg-accent/80 hover:shadow-lg"
        aria-label="Get Personalized Recommendations"
      >
        <WandSparkles className="h-8 w-8 text-accent-foreground" />
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-[825px] rounded-2xl border-none bg-background shadow-neumorphic">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground/80">Find Your Perfect Scent</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Tell us what you're looking for, and our AI will suggest products tailored just for you.
            </DialogDescription>
          </DialogHeader>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-3">
              <Skeleton className="h-[420px] w-full rounded-2xl" />
              <Skeleton className="h-[420px] w-full rounded-2xl" />
              <Skeleton className="h-[420px] w-full rounded-2xl" />
            </div>
          ) : error ? (
            <div className="py-4 text-center">
                <p className="mb-4 text-destructive">{error}</p>
                 <Button onClick={handleReset} variant="outline">Try Again</Button>
            </div>
          ) : recommendations ? (
            <div>
              <h3 className="mb-4 text-xl font-semibold text-foreground/80">Here are your recommendations:</h3>
              <div className="grid max-h-[60vh] grid-cols-1 gap-6 overflow-y-auto p-1 md:grid-cols-3">
                {recommendations.length > 0 ? (
                    recommendations.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full py-8 text-center text-muted-foreground">We couldn't find any products matching your preferences right now. Try describing something different!</p>
                )}
              </div>
               <DialogFooter className="pt-4">
                <Button onClick={handleReset} variant="outline">Start Over</Button>
              </DialogFooter>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-foreground/70">Your Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'I love fresh, citrusy scents for daytime wear, but something warm and spicy for the evening. I'm also looking for a good quality beaker for my DIY projects.'"
                          className="min-h-[120px] rounded-xl border-none bg-background text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                    <Button type="submit" disabled={isLoading} className="h-12 rounded-xl bg-accent px-6 font-bold text-accent-foreground shadow-neumorphic transition-all duration-300 ease-in-out hover:bg-accent/80 hover:shadow-lg">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <WandSparkles className="mr-2 h-5 w-5" />}
                    Get Recommendations
                    </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
