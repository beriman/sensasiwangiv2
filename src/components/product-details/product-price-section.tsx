import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Product, ProductVariant } from '@/lib/types';

interface ProductPriceSectionProps {
  isSambatan: boolean;
  product: Product;
  selectedVariant?: ProductVariant;
}

export function ProductPriceSection({
  isSambatan,
  product,
  selectedVariant,
}: ProductPriceSectionProps) {
  if (isSambatan) {
    return (
      <div className="mt-4">
        <p className="text-3xl font-bold text-accent">
          {formatRupiah(product.sambatan.sambatanPrice)}{' '}
          <span className="text-lg font-normal text-muted-foreground">/ slot</span>
        </p>
        <Badge variant="secondary" className="mt-2 bg-accent/20 text-accent">
          Harga Sambatan
        </Badge>
      </div>
    );
  }
  return (
    <p className="mt-4 text-3xl font-bold text-foreground/80">
      {formatRupiah(selectedVariant?.price ?? 0)}
    </p>
  );
}
