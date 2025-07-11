
// src/app/dashboard/my-products/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/header';
import { products as initialProducts, Product } from '@/data/products';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
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
import { ProductFormDialog, ProductFormData } from '@/components/product-form-dialog';
import { useToast } from '@/hooks/use-toast';
import { formatRupiah } from '@/lib/utils';


// In a real app, you'd get this from user authentication
const MOCK_USER_ID = 'alex-doe';
const MOCK_PERFUMER_PROFILE_SLUG = 'alex-doe';


export default function MyProductsPage() {
  const [products, setProducts] = useState(() => initialProducts.filter(p => p.perfumerProfileSlug === MOCK_USER_ID));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  }
  
  const handleFormSave = (data: ProductFormData) => {
    if (editingProduct) {
      // Edit logic
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data, imageUrl: data.imageUrl || p.imageUrl } : p));
      toast({ title: "Product Updated", description: `${data.name} has been successfully updated.` });
    } else {
      // Add logic
      const newProduct: Product = {
        id: `prod-${Date.now()}`, // simple unique id
        ...data,
        imageUrl: data.imageUrl || 'https://placehold.co/600x600.png',
        imageHint: 'perfume bottle', // default hint
        perfumerProfileSlug: data.perfumerProfileSlug || MOCK_PERFUMER_PROFILE_SLUG,
      };
      setProducts([newProduct, ...products]);
      toast({ title: "Product Added", description: `${data.name} has been successfully added.` });
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteDialogOpen(true);
  }

  const handleDeleteConfirm = () => {
    if (selectedProductId) {
      setProducts(products.filter(p => p.id !== selectedProductId));
      toast({ title: "Product Deleted", description: "The product has been permanently deleted." });
      setIsDeleteDialogOpen(false);
      setSelectedProductId(null);
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
                  <TableCell className="font-medium text-foreground/80">{formatRupiah(product.price)}</TableCell>
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
