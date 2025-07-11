
// src/app/dashboard/my-products/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


// In a real app, you'd get this from user authentication
const MOCK_USER_ID = 'alex-doe';
const MOCK_PERFUMER_PROFILE_SLUG = 'alex-doe';


export default function MyProductsPage() {
  const [products, setProducts] = useState(() => initialProducts.filter(p => p.perfumerProfileSlug === MOCK_USER_ID || p.properties.Perfumer === 'Alex Doe'));
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
  
  const handleFormSave = (data: Product) => {
    if (editingProduct) {
      // Edit logic
      setProducts(products.map(p => p.id === editingProduct.id ? data : p));
      toast({ title: "Product Updated", description: `${data.name} has been successfully updated.` });
    } else {
      // Add logic
      const newProduct: Product = {
        ...data,
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
    <>
      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground/80">My Products</CardTitle>
            <CardDescription>Manage your creations and offerings.</CardDescription>
          </div>
          <Button 
            onClick={handleAddClick}
            className="rounded-xl bg-accent-gradient text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Product
          </Button>
        </CardHeader>
        <CardContent>
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
                        formatRupiah(product.price)
                    )}
                  </TableCell>
                  <TableCell>
                    {product.sambatan?.isActive ? (
                        <Badge className="bg-accent-gradient text-accent-foreground">
                            <Users className="mr-1.5 h-3 w-3" />
                            {product.category === 'Parfum' ? 'Bagi Sambatan' : 'Sambatan'}
                        </Badge>
                    ) : (
                        <Badge variant="outline">Listed</Badge>
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
        </CardContent>
      </Card>

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
    </>
  );
}
