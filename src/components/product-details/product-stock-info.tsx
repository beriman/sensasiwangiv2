import { PackageCheck, PackageX } from 'lucide-react';
import type { ProductVariant } from '@/lib/types';

interface ProductStockInfoProps {
  isSambatan: boolean;
  isService: boolean;
  selectedVariant?: ProductVariant;
}

export function ProductStockInfo({
  isSambatan,
  isService,
  selectedVariant,
}: ProductStockInfoProps) {
  if (isSambatan || isService) return null; // Stock info not shown for Sambatan or Service
  const stock = selectedVariant?.stock ?? 0;
  if (stock > 10) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <PackageCheck className="h-4 w-4" /> In Stock
      </div>
    );
  }
  if (stock > 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-yellow-600">
        <PackageCheck className="h-4 w-4" /> {stock} items left
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 text-sm text-destructive">
      <PackageX className="h-4 w-4" /> Out of Stock
    </div>
  );
}
