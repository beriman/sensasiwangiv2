// src/app/dashboard/my-products/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/header';
import { Product } from '@/lib/types';
import { Button, buttonVariants } from '@/components/ui/button';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ProductFormDialog } from '@/components/product-form-dialog';
import { useToast } from '@/hooks/use-toast';
import { formatRupiah } from '@/lib/utils';


// In a real app, you'd get this from user authentication
export default function MyProductsPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (session?.user?.id) {
      fetchProducts();
    }
  }, [session]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*)')
      .eq('created_by', session?.user?.id);

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data as Product[]);
    }
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  }
  
  const handleFormSave = async (data: Product) => {
    if (!session?.user?.id) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to perform this action.',
      });
      return;
    }

    try {
      const { product_variants, ...productData } = data;

      if (editingProduct) {
        // Edit logic
        const { error: productError } = await supabase
          .from('products')
          .update({ ...productData, is_listed: productData.is_listed })
          .eq('id', editingProduct.id);

        if (productError) throw productError;

        // Delete existing variants
        const { error: deleteVariantsError } = await supabase
          .from('product_variants')
          .delete()
          .eq('product_id', editingProduct.id);

        if (deleteVariantsError) throw deleteVariantsError;

        // Insert new/updated variants
        if (product_variants && product_variants.length > 0) {
          const variantsToInsert = product_variants.map((variant: ProductVariant) => ({
            ...variant,
            product_id: editingProduct.id,
          }));
          const { error: insertVariantsError } = await supabase
            .from('product_variants')
            .insert(variantsToInsert);

          if (insertVariantsError) throw insertVariantsError;
        }

        toast({ title: "Product Updated", description: `${data.name} has been successfully updated.` });
      } else {
        // Add logic
        const { data: newProduct, error: productError } = await supabase
          .from('products')
          .insert({ ...productData, created_by: session.user.id, is_listed: productData.is_listed })
          .select()
          .single();

        if (productError) throw productError;

        if (product_variants && product_variants.length > 0 && newProduct) {
          const variantsToInsert = product_variants.map((variant: ProductVariant) => ({
            ...variant,
            product_id: newProduct.id,
          }));
          const { error: insertVariantsError } = await supabase
            .from('product_variants')
            .insert(variantsToInsert);

          if (insertVariantsError) throw insertVariantsError;
        }

        toast({ title: "Product Added", description: `${data.name} has been successfully added.` });
      }
      fetchProducts(); // Refresh the list
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to save product: ${error.message || 'Unknown error'}`,
      });
    }
  }

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteDialogOpen(true);
  }

  const handleDeleteConfirm = async () => {
    if (selectedProductId) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', selectedProductId);

        if (error) throw error;

        toast({ title: "Product Deleted", description: "The product has been permanently deleted." });
        fetchProducts(); // Refresh the list
        setIsDeleteDialogOpen(false);
        setSelectedProductId(null);
      } catch (error: any) {
        console.error('Error deleting product:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: `Failed to delete product: ${error.message || 'Unknown error'}`,
        });
      }
    }
  }


  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground/90">My Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your creations and offerings.
            </p>
          </div>
          <Button 
            onClick={handleAddClick}
            className="rounded-xl bg-accent-gradient text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Product
          </Button>
        </div>

        <div className="rounded-2xl border-none bg-transparent shadow-neumorphic">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.imageUrl}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground/90">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium text-foreground/80">
                    {product.sambatan?.isActive ? (
                        <span className="text-accent">{formatRupiah(product.sambatan.sambatanPrice)}</span>
                    ) : (
                        formatRupiah(product.product_variants?.[0]?.price || 0)
                    )}
                  </TableCell>
                  <TableCell>
                    {product.sambatan?.isActive ? (
                        <Badge className="bg-accent-gradient text-accent-foreground">
                            <Users className="mr-1.5 h-3 w-3" />
                            Sambatan
                        </Badge>
                    ) : (
                        <Badge variant="outline">{product.is_listed ? 'Listed' : 'Unlisted'}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditClick(product)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {products.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                You haven't added any products yet.
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Product Dialog */}
      <ProductFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleFormSave}
        productData={editingProduct}
      />


      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedProductId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className={buttonVariants({ variant: "destructive" })}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
