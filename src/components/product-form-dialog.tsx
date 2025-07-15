// src/components/product-form-dialog.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useForm, useWatch, useFieldArray } from 'react-hook-form';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Loader2, Upload, CalendarIcon, Trash2, PlusCircle, Star } from 'lucide-react';
import type { Product, ProductCategory, SambatanDetails, ProductVariant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import supabase from '@/lib/supabase';

const productCategories: ProductCategory[] = ['Parfum', 'Raw Material', 'Tools', 'Misc', 'Jasa'];

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus minimal 3 karakter.' }),
  description: z.string().min(10, { message: 'Deskripsi harus minimal 10 karakter.' }),
  price: z.coerce.number().min(0, 'Harga harus positif.'),
  stock: z.coerce.number().int().min(0, 'Stok harus angka bulat positif.'),
  category: z.enum(productCategories, {
    required_error: "Anda harus memilih kategori produk.",
  }),
  image_url: z.string().optional(),
});


import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Upload } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase';

const productCategories: string[] = ['Parfum', 'Raw Material', 'Tools', 'Misc'];

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus minimal 3 karakter.' }),
  description: z.string().min(10, { message: 'Deskripsi harus minimal 10 karakter.' }),
  price: z.coerce.number().min(0, 'Harga harus positif.'),
  stock: z.coerce.number().int().min(0, 'Stok harus angka bulat positif.'),
  category: z.enum(productCategories as [string, ...string[]], {
    required_error: "Anda harus memilih kategori produk.",
  }),
  image_url: z.string().optional(),
});

interface ProductFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Product) => void;
  productData?: Product | null;
}

export function ProductFormDialog({ isOpen, onOpenChange, onSave, productData }: ProductFormDialogProps) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const supabase = createClient();

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

    setIsImageLoading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('product-images').upload(fileName, file);

    if (error) {
      toast({ variant: 'destructive', title: 'Gagal mengunggah gambar', description: error.message });
      setIsImageLoading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(data.path);
    form.setValue('image_url', publicUrl, { shouldValidate: true });
    setIsImageLoading(false);
    toast({ title: 'Gambar Terunggah', description: 'Gambar produk telah berhasil diunggah.' });
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

    if (productData) {
        // Update existing product
        const { data, error } = await supabase
            .from('products')
            .update(productPayload)
            .eq('id', productData.id)
            .select()
            .single();
        if (error) {
            toast({ variant: 'destructive', title: 'Gagal memperbarui produk', description: error.message });
        } else {
            toast({ title: 'Produk Diperbarui', description: 'Produk telah berhasil diperbarui.' });
            onSave(data as Product);
        }
    } else {
        // Create new product
        const { data, error } = await supabase
            .from('products')
            .insert(productPayload)
            .select()
            .single();
        if (error) {
            toast({ variant: 'destructive', title: 'Gagal membuat produk', description: error.message });
        } else {
            toast({ title: 'Produk Dibuat', description: 'Produk baru telah berhasil ditambahkan.' });
            onSave(data as Product);
        }
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
              <div className="relative mx-auto h-48 w-48 shrink-0">
                {isImageLoading ? (
                  <div className="h-full w-full rounded-xl bg-muted animate-pulse" />
                ) : (
                  <Image
                    src={form.getValues('image_url') || 'https://placehold.co/600x600.png'}
                    alt="Pratinjau gambar produk"
                    fill
                    className="rounded-xl object-cover shadow-neumorphic-inset"
                  />
                )}
              </div>
              <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
              />
              <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl shadow-neumorphic transition-all hover:shadow-neumorphic-active"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImageLoading}
              >
                  <Upload className="mr-2 h-5 w-5" />
                  {isImageLoading ? 'Mengunggah...' : 'Ubah Gambar'}
              </Button>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: Eau de Lumière" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Deskripsikan produk Anda..." className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga (Rp)</FormLabel>
                      <FormControl><Input type="number" placeholder="1200000" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset"/></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stok</FormLabel>
                      <FormControl><Input type="number" placeholder="10" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset"/></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productCategories.map(cat => (
                           <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Batal</Button>
              <Button type="submit" disabled={form.formState.isSubmitting || isImageLoading} className="h-12 rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-neumorphic transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-accent-gradient-active">
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Produk
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
