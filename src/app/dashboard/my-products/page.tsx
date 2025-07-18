// src/app/dashboard/my-products/page.tsx
'use client';

import { useMyProducts } from '@/hooks/use-my-products';
// ... other imports ...

export default function MyProductsPage() {
  const { 
    products,
    isFormOpen,
    editingProduct,
    isDeleteDialogOpen,
    selectedProductId,
    handleAddClick,
    handleEditClick,
    handleFormSave,
    handleDeleteClick,
    handleDeleteConfirm,
    setIsFormOpen,
    setIsDeleteDialogOpen,
  } = useMyProducts();

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
              {products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </TableBody>
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

