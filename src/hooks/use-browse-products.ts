import { useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();

interface UseBrowseProductsProps {
  category: string;
  searchTerm: string;
  sellerQuery: string | null;
}

export const useBrowseProducts = ({
  category,
  searchTerm,
  sellerQuery,
}: UseBrowseProductsProps) => {
  const fetchProducts = useCallback(async () => {
    let query = supabase.from('products').select('*');

    if (sellerQuery) {
      query = query.eq('seller_id', sellerQuery);
    } else {
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
    }

    const { data, error: supabaseError } = await query;

    if (supabaseError) {
      throw new Error(supabaseError.message);
    }

    return data as Product[];
  }, [searchTerm, sellerQuery, category]);

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['browseProducts', category, searchTerm, sellerQuery],
    queryFn: fetchProducts,
  });

  return { products: products || [], loading: isLoading, error: error ? error.message : null, refetch };
};
