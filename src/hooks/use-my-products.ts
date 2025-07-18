import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const supabase = createClient();

interface UseMyProductsResult {
  products: Product[];
  loading: boolean;
  isFormOpen: boolean;
  editingProduct: Product | null;
  isDeleteDialogOpen: boolean;
  selectedProductId: string | null;
  handleAddClick: () => void;
  handleEditClick: (product: Product) => void;
  handleFormSave: (data: Omit<Product, 'id'>) => Promise<void>;
  handleDeleteClick: (productId: string) => void;
  handleDeleteConfirm: () => Promise<void>;
  setIsFormOpen: (isOpen: boolean) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

export const useMyProducts = (): UseMyProductsResult => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fetchProducts = useCallback(async () => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }, [user]);

  const { data: products, isLoading: loading, error, refetch } = useQuery({
    queryKey: ['myProducts', user?.id],
    queryFn: fetchProducts,
    enabled: !!user, // Only run query if user is logged in
  });

  const addProductMutation = useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id'>) => {
      if (!user) throw new Error('User not authenticated.');
      const { data, error } = await supabase
        .from('products')
        .insert([{ ...newProduct, created_by: user.id }])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts', user?.id] });
      toast({ title: "Produk Ditambahkan", description: "Produk baru telah berhasil ditambahkan." });
    },
    onError: (err: any) => {
      toast({ variant: 'destructive', title: 'Gagal menambahkan produk', description: err.message });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const { data, error } = await supabase
        .from('products')
        .update(updatedProduct)
        .eq('id', updatedProduct.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts', user?.id] });
      toast({ title: "Produk Diperbarui", description: "Produk telah berhasil diperbarui." });
    },
    onError: (err: any) => {
      toast({ variant: 'destructive', title: 'Gagal memperbarui produk', description: err.message });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts', user?.id] });
      toast({ title: "Produk Dihapus", description: "Produk telah dihapus secara permanen." });
    },
    onError: (err: any) => {
      toast({ variant: 'destructive', title: 'Gagal menghapus produk', description: err.message });
    },
  });

  const handleAddClick = useCallback(() => {
    setEditingProduct(null);
    setIsFormOpen(true);
  }, []);

  const handleEditClick = useCallback((product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  }, []);

  const handleFormSave = async (data: Omit<Product, 'id'>) => {
    if (editingProduct) {
      await updateProductMutation.mutateAsync({ ...data, id: editingProduct.id } as Product);
    } else {
      await addProductMutation.mutateAsync(data);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteClick = useCallback((productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = async () => {
    if (selectedProductId) {
      await deleteProductMutation.mutateAsync(selectedProductId);
      setIsDeleteDialogOpen(false);
      setSelectedProductId(null);
    }
  };

  return {
    products: products || [],
    loading,
    isFormOpen,
    editingProduct,
    isDeleteDialogOpen,
    selectedProductId,
    handleAddClick,
    handleEditClick,
    handleFormSave,
    handleDeleteClick,
    handleDeleteConfirm,
    setIsFormOpen,
    setIsDeleteDialogOpen,
    refetch,
  };
};

