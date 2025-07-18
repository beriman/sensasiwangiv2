import Image from 'next/image';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Users, CheckCircle, XCircle } from 'lucide-react';
import { formatRupiah, cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductTableRowProps {
  product: Product;
  handleEditClick: (product: Product) => void;
  handleDeleteClick: (productId: string) => void;
}

export function ProductTableRow({
  product,
  handleEditClick,
  handleDeleteClick,
}: ProductTableRowProps) {
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
  );
}
