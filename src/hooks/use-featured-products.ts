import { useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();

export const useFeaturedProducts = () => {
  const fetchProducts = useCallback(async () => {
    const { data, error: supabaseError } = await supabase
      .from('products')
      .select('*')
      .eq('is_listed', true)
      .limit(4);

    if (supabaseError) {
      throw new Error(supabaseError.message);
    }

    return data as Product[];
  }, []);

  const { data: featuredProducts, isLoading, error, refetch } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: fetchProducts,
  });

  return { featuredProducts: featuredProducts || [], loading: isLoading, error: error ? error.message : null, refetch };
};
