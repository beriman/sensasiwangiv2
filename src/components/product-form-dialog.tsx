// src/components/product-form-dialog.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase';

import { productFormSchema } from '@/lib/product-form-schema';
import { useSupabaseImageUpload } from '@/hooks/use-supabase-image-upload';
import { ProductImageUpload } from '@/components/product-image-upload';
import { ProductFormField } from '@/components/form-fields/product-form-field';
import { useProductCrud } from '@/hooks/use-product-crud';

interface ProductFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Product) => void;
  productData?: Product | null;
}

export function ProductFormDialog({ isOpen, onOpenChange, onSave, productData }: ProductFormDialogProps) {
  const { toast } = useToast();
  const supabase = createClient();
  const { isUploading: isImageLoading, uploadImage } = useSupabaseImageUpload();
  const { isSubmitting: isProductSubmitting, createProduct, updateProduct } = useProductCrud();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'Parfum',
      image_url: '',
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (productData) {
        form.reset(productData);
      } else {
        form.reset({
          name: '',
          description: '',
          price: 0,
          stock: 10,
          category: 'Parfum',
          image_url: '',
        });
      }
    }
  }, [productData, form, isOpen]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) { // 4MB limit
      toast({ variant: 'destructive', title: 'File terlalu besar', description: 'Ukuran gambar maksimal 4MB.' });
      return;
    }

    const publicUrl = await uploadImage(file, 'product-images');
    if (publicUrl) {
      form.setValue('image_url', publicUrl, { shouldValidate: true });
    }
  };
  
  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'Anda harus login untuk membuat produk.' });
        return;
    }

    const productPayload = {
        ...values,
        seller_id: user.id,
    };

    let savedProduct: Product | null = null;

    if (productData) {
        savedProduct = await updateProduct(productData.id, productPayload);
    } else {
        savedProduct = await createProduct(productPayload);
    }

    if (savedProduct) {
        onSave(savedProduct);
    }
  };
  
  const dialogTitle = productData ? 'Ubah Produk' : 'Tambah Produk Baru';
  const dialogDescription = productData
    ? "Buat perubahan pada produk Anda di sini. Klik simpan setelah selesai."
    : 'Isi detail di bawah ini untuk menambahkan produk baru ke daftar Anda.';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <ProductImageUpload
                imageUrl={form.getValues('image_url')}
                isUploading={isImageLoading}
                onImageChange={handleImageUpload}
              />
              <ProductFormField
                control={form.control}
                name="name"
                label="Nama Produk"
                placeholder="Contoh: Eau de Lumière"
              />
              <ProductFormField
                control={form.control}
                name="description"
                label="Deskripsi"
                placeholder="Deskripsikan produk Anda..."
                type="textarea"
              />
              <div className="grid grid-cols-2 gap-4">
                <ProductFormField
                  control={form.control}
                  name="price"
                  label="Harga (Rp)"
                  placeholder="1200000"
                  type="number"
                />
                <ProductFormField
                  control={form.control}
                  name="stock"
                  label="Stok"
                  placeholder="10"
                  type="number"
                />
              </div>
              <ProductFormField
                control={form.control}
                name="category"
                label="Kategori"
                placeholder="Pilih kategori"
                type="select"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
              <Button type="submit" disabled={isProductSubmitting || isImageLoading} className="h-12 rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-neumorphic transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-accent-gradient-active">
                {(isProductSubmitting || isImageLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Produk
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}