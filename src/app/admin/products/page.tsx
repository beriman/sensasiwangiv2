// src/app/admin/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@/lib/types';
import { createClient } from '@/lib/supabase';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { ProductFormDialog } from '@/components/product-form-dialog';

const allCategories: string[] = ['Parfum', 'Raw Material', 'Tools', 'Misc', 'Jasa'];

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase.from('products').select('*');

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (categoryFilter !== 'All') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data as Product[]);
      }
    };
    fetchProducts();
  }, [searchTerm, categoryFilter, supabase]);

  const handleDeleteProduct = async (productId: number) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleOpenDialog = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    if (editingProduct) {
      // Update existing product in the list
      setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
    } else {
      // Add new product to the top of the list
      setProducts([savedProduct, ...products]);
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </div>
            <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
              <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                      placeholder="Search by product name..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {allCategories.map(cat => (
                           <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    {product.image_url && (
                      <Image
                        alt={product.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={product.image_url}
                        width="64"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={'outline'}>
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatRupiah(product.price || 0)}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenDialog(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
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
                  No products found matching your criteria.
              </div>
          )}
        </CardContent>
      </Card>
      <ProductFormDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={handleSaveProduct} 
        productData={editingProduct} 
      />
    </>
  );
}
