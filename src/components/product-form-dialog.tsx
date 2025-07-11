// src/components/product-form-dialog.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm, useWatch } from 'react-hook-form';
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
import { Loader2, WandSparkles } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/types';
import { generateProductImage } from '@/ai/flows/generate-product-image';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

const productCategories: ProductCategory[] = ['Parfum', 'Raw Material', 'Tools'];

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  category: z.enum(productCategories, {
    required_error: "You need to select a product category.",
  }),
  imageUrl: z.string().optional(),
  properties: z.record(z.string()).optional().default({}),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ProductFormData) => void;
  productData?: Product | null;
}

export function ProductFormDialog({ isOpen, onOpenChange, onSave, productData }: ProductFormDialogProps) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
        name: '',
        description: '',
        price: 0,
        category: 'Parfum',
        imageUrl: '',
        properties: {}
    }
  });

  const watchedImageUrl = useWatch({ control: form.control, name: 'imageUrl' });
  const watchedName = useWatch({ control: form.control, name: 'name' });
  const watchedDescription = useWatch({ control: form.control, name: 'description' });

  useEffect(() => {
    if (productData) {
      form.reset({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        imageUrl: productData.imageUrl,
        properties: productData.properties,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        price: 0,
        category: 'Parfum',
        imageUrl: '',
        properties: {},
      });
    }
  }, [productData, form, isOpen]);

  const handleGenerateImage = async () => {
    if (!watchedName || !watchedDescription) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide a product name and description before generating an image.',
      });
      return;
    }
    setIsGeneratingImage(true);
    try {
      const result = await generateProductImage({
        name: watchedName,
        description: watchedDescription,
      });
      if (result.imageUrl) {
        form.setValue('imageUrl', result.imageUrl, { shouldValidate: true });
        toast({
          title: 'Image Generated!',
          description: 'A new image for your product has been created.',
        });
      }
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Image Generation Failed',
        description: 'Could not generate an image. Please try again.',
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const onSubmit = (values: ProductFormData) => {
    onSave(values);
  };
  
  const dialogTitle = productData ? 'Edit Product' : 'Add New Product';
  const dialogDescription = productData
    ? "Make changes to your product here. Click save when you're done."
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
            <div className="space-y-4">
              <div className="relative mx-auto h-48 w-48 shrink-0">
                {isGeneratingImage ? (
                  <Skeleton className="h-full w-full rounded-xl" />
                ) : (
                  <Image
                    src={watchedImageUrl || 'https://placehold.co/600x600.png'}
                    alt="Product image preview"
                    fill
                    className="rounded-xl object-cover shadow-neumorphic-inset"
                  />
                )}
              </div>

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

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl shadow-neumorphic transition-all hover:shadow-neumorphic-active"
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
              >
                {isGeneratingImage ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <WandSparkles className="mr-2 h-5 w-5" />}
                {isGeneratingImage ? 'Generating...' : 'Generate Image with AI'}
              </Button>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Rp)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1200000" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
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
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting || isGeneratingImage} className="h-12 rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-neumorphic transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-accent-gradient-active">
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
