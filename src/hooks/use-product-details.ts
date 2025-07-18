import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { Product, ProductVariant } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();

interface UseProductDetailsResult {
  product: Product | null;
  selectedVariant: ProductVariant | undefined;
  setSelectedVariant: (variant: ProductVariant | undefined) => void;
  loading: boolean;
  error: string | null;
}

export const useProductDetails = (productId: string | string[] | undefined): UseProductDetailsResult => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);

  const fetchProduct = useCallback(async () => {
    if (!productId) {
      return null;
    }
    try {
      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .eq('id', productId)
        .single();

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      return data as Product;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch product details.');
    }
  }, [productId]);

  const { data: product, isLoading: loading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: fetchProduct,
    enabled: !!productId,
    onSuccess: (data) => {
      if (data && data.product_variants && data.product_variants.length > 0) {
        setSelectedVariant(data.product_variants[0]);
      }
    },
  });

  return { product: product || null, selectedVariant, setSelectedVariant, loading, error: error ? error.message : null };
};
