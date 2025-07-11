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
import { MoreHorizontal, PlusCircle, Users, CheckCircle, XCircle } from 'lucide-react';
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
import { formatRupiah, cn } from '@/lib/utils';
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
      toast({ title: "Produk Diperbarui", description: `${data.name} telah berhasil diperbarui.` });
    } else {
      // Add logic
      const newProduct: Product = {
        ...data,
        id: `prod-${Date.now()}`, // Ensure new products get a unique ID
        perfumerProfileSlug: data.perfumerProfileSlug || MOCK_PERFUMER_PROFILE_SLUG,
      };
      setProducts([newProduct, ...products]);
      toast({ title: "Produk Ditambahkan", description: `${data.name} telah berhasil ditambahkan.` });
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
      toast({ title: "Produk Dihapus", description: "Produk telah dihapus secara permanen." });
      setIsDeleteDialogOpen(false);
      setSelectedProductId(null);
    }
  }


  return (
    <>
      <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground/80">Produk Saya</CardTitle>
            <CardDescription>Kelola kreasi dan penawaran Anda.</CardDescription>
          </div>
          <Button 
            onClick={handleAddClick}
            className="w-full sm:w-auto rounded-xl bg-accent-gradient text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Tambah Produk Baru
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Gambar
                </TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>
                  <span className="sr-only">Aksi</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                return (
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
                    {product.sambatan?.isActive ? (
                        <Badge className="bg-accent-gradient text-accent-foreground">
                            <Users className="mr-1.5 h-3 w-3" />
                            Sambatan
                        </Badge>
                    ) : product.isListed ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                           <CheckCircle className="mr-1.5 h-3 w-3" />
                           Terdaftar
                        </Badge>
                    ) : (
                        <Badge variant="outline">
                           <XCircle className="mr-1.5 h-3 w-3" />
                           Tidak Terdaftar
                        </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-foreground/80">
                    {product.sambatan?.isActive ? (
                        <span className="text-accent">{formatRupiah(product.sambatan.sambatanPrice)}</span>
                    ) : (
                        product.variants.length > 1 ? `${formatRupiah(product.variants[0].price)} ...` : formatRupiah(product.variants[0].price)
                    )}
                  </TableCell>
                  <TableCell>
                    {totalStock > 0 ? (
                        <span className={cn(totalStock < 5 && "text-destructive font-bold")}>{totalStock}</span>
                    ) : (
                        <Badge variant="destructive">Stok Habis</Badge>
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
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditClick(product)}>
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
          {products.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                Anda belum menambahkan produk apa pun.
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
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Ini akan menghapus produk Anda secara permanen
              dari server kami.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedProductId(null)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className={buttonVariants({ variant: "destructive" })}>Lanjutkan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
