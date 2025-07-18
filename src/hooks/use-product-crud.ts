import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

interface UseProductCrudResult {
  isSubmitting: boolean;
  createProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<Product | null>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product | null>;
}

export const useProductCrud = (): UseProductCrudResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const createProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      toast({ title: 'Produk Dibuat', description: 'Produk baru telah berhasil ditambahkan.' });
      return data as Product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat produk.';
      toast({ variant: 'destructive', title: 'Gagal membuat produk', description: errorMessage });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      toast({ title: 'Produk Diperbarui', description: 'Produk telah berhasil diperbarui.' });
      return data as Product;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat memperbarui produk.';
      toast({ variant: 'destructive', title: 'Gagal memperbarui produk', description: errorMessage });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, createProduct, updateProduct };
};
