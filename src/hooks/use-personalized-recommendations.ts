import { useState, useCallback } from 'react';
import type { Product } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { products as allProducts } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface UsePersonalizedRecommendationsProps {
  category: string;
  activeFilters: Record<string, string[]>;
}

interface UsePersonalizedRecommendationsResult {
  isLoading: boolean;
  recommendations: Product[] | null;
  error: string | null;
  getRecommendations: (preferences: string) => Promise<void>;
  resetRecommendations: () => void;
}

export const usePersonalizedRecommendations = ({
  category,
  activeFilters,
}: UsePersonalizedRecommendationsProps): UsePersonalizedRecommendationsResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const resetRecommendations = useCallback(() => {
    setRecommendations(null);
    setError(null);
  }, []);

  const getRecommendations = useCallback(async (preferences: string) => {
    setIsLoading(true);
    setRecommendations(null);
    setError(null);

    try {
      const browsingHistory = `The user is currently browsing the "${category}" category with the following filters applied: ${JSON.stringify(activeFilters)}.`;
      
      const result = await getPersonalizedRecommendations({
        browsingHistory,
        preferences,
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
  }, [category, activeFilters, toast]);

  return { isLoading, recommendations, error, getRecommendations, resetRecommendations };
};
