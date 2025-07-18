import { z } from 'zod';
import type { ProductCategory } from '@/lib/types';

export const productCategories: ProductCategory[] = ['Parfum', 'Raw Material', 'Tools', 'Misc', 'Jasa'];

export const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus minimal 3 karakter.' }),
  description: z.string().min(10, { message: 'Deskripsi harus minimal 10 karakter.' }),
  price: z.coerce.number().min(0, 'Harga harus positif.'),
  stock: z.coerce.number().int().min(0, 'Stok harus angka bulat positif.'),
  category: z.enum(productCategories, {
    required_error: "Anda harus memilih kategori produk.",
  }),
  image_url: z.string().optional(),
});
