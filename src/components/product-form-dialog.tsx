// src/components/product-form-dialog.tsx
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/types';

const productCategories: ProductCategory[] = ['Parfum', 'Raw Material', 'Tools'];

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  category: z.enum(productCategories, {
    required_error: "You need to select a product category.",
  }),
  properties: z.record(z.string()).optional().default({}), // Simplified for now
});

export type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ProductFormData) => void;
  productData?: Product | null;
}

export function ProductFormDialog({ isOpen, onOpenChange, onSave, productData }: ProductFormDialogProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
        name: '',
        description: '',
        price: 0,
        category: 'Parfum',
        properties: {}
    }
  });
  
  useEffect(() => {
    if (productData) {
      form.reset({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        properties: productData.properties,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        category: 'Parfum',
        properties: {},
      });
    }
  }, [productData, form, isOpen]);


  const onSubmit = (values: ProductFormData) => {
    onSave(values);
  };
  
  const dialogTitle = productData ? 'Edit Product' : 'Add New Product';
  const dialogDescription = productData
    ? 'Make changes to your product here. Click save when you\'re done.'
    : 'Fill in the details below to add a new product to your listings.';


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2 max-h-[70vh] overflow-y-auto pr-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Eau de Lumière" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your product..." className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="99.99" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring">
                        <SelectValue placeholder="Select a category" />
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
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="h-12 rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-neumorphic transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-accent-gradient-active">
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
