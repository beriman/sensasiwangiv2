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
import { Loader2, Upload, CalendarIcon, Trash2, PlusCircle } from 'lucide-react';
import type { Product, ProductCategory, SambatanDetails, ProductVariant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { profiles } from '@/data/profiles';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const productCategories: ProductCategory[] = ['Parfum', 'Raw Material', 'Tools', 'Misc'];

const variantSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Nama varian tidak boleh kosong.'),
    price: z.coerce.number().min(0, 'Harga harus positif.'),
    stock: z.coerce.number().int().min(0, 'Stok harus angka bulat positif.'),
});

const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Nama harus minimal 3 karakter.' }),
  description: z.string().min(10, { message: 'Deskripsi harus minimal 10 karakter.' }),
  isListed: z.boolean().default(true),
  category: z.enum(productCategories, {
    required_error: "Anda harus memilih kategori produk.",
  }),
  imageUrl: z.string().optional(),
  properties: z.record(z.string()).optional().default({}),
  perfumerProfileSlug: z.string().optional(),
  isSambatan: z.boolean().default(false),
  sambatanDetails: z.object({
    targetParticipants: z.coerce.number().optional(),
    sambatanPrice: z.coerce.number().optional(),
    deadline: z.date().optional(),
  }).optional(),
  variants: z.array(variantSchema).min(1, "Produk harus memiliki setidaknya satu varian."),
}).superRefine((data, ctx) => {
    if (data.category === 'Parfum') {
        if (!data.properties?.Brand) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Brand wajib diisi untuk kategori Parfum.',
                path: ['properties.Brand'],
            });
        }
        if (!data.perfumerProfileSlug) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Perfumer wajib diisi untuk kategori Parfum.',
                path: ['perfumerProfileSlug'],
            });
        }
    }
    if (data.isSambatan) {
        if (!data.sambatanDetails?.targetParticipants || data.sambatanDetails.targetParticipants <= 0) {
            ctx.addIssue({ code: 'custom', message: 'Target partisipan harus angka positif.', path: ['sambatanDetails.targetParticipants']});
        }
        if (!data.sambatanDetails?.sambatanPrice || data.sambatanDetails.sambatanPrice <= 0) {
            ctx.addIssue({ code: 'custom', message: 'Harga sambatan harus angka positif.', path: ['sambatanDetails.sambatanPrice']});
        }
        if (!data.sambatanDetails?.deadline) {
            ctx.addIssue({ code: 'custom', message: 'Batas waktu wajib diisi untuk Sambatan.', path: ['sambatanDetails.deadline']});
        }
    }
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
  
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
        name: '',
        description: '',
        isListed: true,
        category: 'Parfum',
        imageUrl: '',
        properties: {},
        perfumerProfileSlug: '',
        isSambatan: false,
        sambatanDetails: {
            targetParticipants: 10,
            sambatanPrice: 0,
            deadline: undefined,
        },
        variants: [{ id: 'default-variant', name: 'Default', price: 0, stock: 0 }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants"
  });

  const watchedImageUrl = useWatch({ control: form.control, name: 'imageUrl' });
  const watchedCategory = useWatch({ control: form.control, name: 'category' });
  const watchedIsSambatan = useWatch({ control: form.control, name: 'isSambatan' });

  useEffect(() => {
    if (isOpen) {
        if (productData) {
            form.reset({
                name: productData.name,
                description: productData.description,
                isListed: productData.isListed,
                category: productData.category,
                imageUrl: productData.imageUrl,
                properties: productData.properties,
                perfumerProfileSlug: productData.perfumerProfileSlug,
                isSambatan: productData.sambatan?.isActive ?? false,
                sambatanDetails: {
                    targetParticipants: productData.sambatan?.targetParticipants,
                    sambatanPrice: productData.sambatan?.sambatanPrice,
                    deadline: productData.sambatan?.deadline ? new Date(productData.sambatan.deadline) : undefined,
                },
                variants: productData.variants,
            });
        } else {
            form.reset({
                name: '',
                description: '',
                isListed: true,
                category: 'Parfum',
                imageUrl: '',
                properties: {},
                perfumerProfileSlug: '',
                isSambatan: false,
                sambatanDetails: {
                    targetParticipants: 10,
                    sambatanPrice: 0,
                    deadline: undefined
                },
                variants: [{ id: `new-${Date.now()}`, name: 'Default', price: 0, stock: 10 }],
            });
        }
    }
  }, [productData, form, isOpen]);
  
  // Effect to manage stock and price when isSambatan changes
  useEffect(() => {
    if (watchedIsSambatan) {
      if (fields.length > 1) {
        // Keep only the first variant for Sambatan
        const firstVariant = form.getValues('variants')[0];
        form.setValue('variants', [{...firstVariant, stock: 1}]);
      } else if (fields.length === 1) {
        // Set stock of the single variant to 1
        form.setValue('variants.0.stock', 1);
      }
    }
  }, [watchedIsSambatan, form, fields.length]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File terlalu besar',
          description: 'Mohon unggah gambar berukuran kurang dari 4MB.',
        });
        return;
      }
      setIsImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('imageUrl', reader.result as string, { shouldValidate: true });
        setIsImageLoading(false);
        toast({
          title: 'Gambar Terunggah',
          description: 'Gambar produk baru Anda telah diatur.',
        });
      };
      reader.onerror = () => {
        setIsImageLoading(false);
        toast({
          variant: 'destructive',
          title: 'Error membaca file',
          description: 'Tidak dapat membaca gambar yang dipilih. Mohon coba lagi.',
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    const perfumer = profiles.find(p => p.slug === values.perfumerProfileSlug);
    if(perfumer) {
        values.properties.Perfumer = perfumer.name;
    }

    const finalProductData: Product = {
        id: productData?.id || `prod-${Date.now()}`,
        name: values.name,
        description: values.description,
        isListed: values.isListed,
        category: values.category,
        imageUrl: values.imageUrl || 'https://placehold.co/600x600.png',
        imageHint: 'perfume bottle', // default hint
        properties: values.properties || {},
        perfumerProfileSlug: values.perfumerProfileSlug,
        variants: values.variants,
        sambatan: values.isSambatan && values.sambatanDetails?.deadline && values.sambatanDetails.sambatanPrice && values.sambatanDetails.targetParticipants ? {
            isActive: true,
            currentParticipants: productData?.sambatan?.currentParticipants ?? 0,
            deadline: values.sambatanDetails.deadline.toISOString(),
            sambatanPrice: values.sambatanDetails.sambatanPrice,
            targetParticipants: values.sambatanDetails.targetParticipants,
            minOrder: 1, // Default, can be customized later
            maxOrder: 10, // Default, can be customized later
        } : undefined,
    }

    onSave(finalProductData);
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
            <div className="space-y-4">
              <div className="relative mx-auto h-48 w-48 shrink-0">
                {isImageLoading ? (
                  <Skeleton className="h-full w-full rounded-xl" />
                ) : (
                  <Image
                    src={watchedImageUrl || 'https://placehold.co/600x600.png'}
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
                    Ubah Gambar
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

              {/* Dynamic Variant Section */}
              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-foreground/80">Varian Produk</h4>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => append({ id: `new-${Date.now()}`, name: '', price: 0, stock: 0 })}
                        disabled={watchedIsSambatan}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah Varian
                    </Button>
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border rounded-lg relative">
                        <FormField
                            control={form.control}
                            name={`variants.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                    <FormLabel>Nama Varian</FormLabel>
                                    <FormControl><Input placeholder="e.g., 50ml" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset"/></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`variants.${index}.price`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                    <FormLabel>Harga (Rp)</FormLabel>
                                    <FormControl><Input type="number" placeholder="1200000" {...field} disabled={watchedIsSambatan} className="rounded-xl border-none bg-background shadow-neumorphic-inset"/></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`variants.${index}.stock`}
                            render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                    <FormLabel>Stok</FormLabel>
                                    <FormControl><Input type="number" placeholder="10" {...field} disabled={watchedIsSambatan} className="rounded-xl border-none bg-background shadow-neumorphic-inset"/></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="md:col-span-1 flex items-end">
                            {fields.length > 1 && !watchedIsSambatan && (
                                <Button type="button" variant="destructive" size="icon" className="h-9 w-9" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                <FormMessage>{form.formState.errors.variants?.message}</FormMessage>
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
              {watchedCategory === 'Parfum' && (
                <>
                    <FormField
                        control={form.control}
                        name="properties.Brand"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                            <Input placeholder="Contoh: Maison de Rêve" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="perfumerProfileSlug"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perfumer</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring">
                                    <SelectValue placeholder="Pilih perfumer" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {profiles.filter(p => p.type === 'Perfumer').map(p => (
                                    <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </>
              )}

                <FormField
                    control={form.control}
                    name="isListed"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-neumorphic-inset">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Tampilkan Produk</FormLabel>
                            <DialogDescription>
                                Jadikan produk ini terlihat di marketplace.
                            </DialogDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                />
              
                <FormField
                    control={form.control}
                    name="isSambatan"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-neumorphic-inset">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Buat Sambatan (Group Buy)</FormLabel>
                            <DialogDescription>
                                Tawarkan harga spesial untuk pembelian kolektif.
                            </DialogDescription>
                        </div>
                        <FormControl>
                            <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        </FormItem>
                    )}
                />

                {watchedIsSambatan && (
                    <div className="space-y-4 rounded-lg border p-4">
                        <h4 className="font-semibold">Parameter Sambatan</h4>
                        <FormField
                            control={form.control}
                            name="sambatanDetails.targetParticipants"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Partisipan</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="20" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="sambatanDetails.sambatanPrice"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Harga Sambatan (Rp)</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="999000" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sambatanDetails.deadline"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Batas Waktu</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pilih tanggal</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}


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
