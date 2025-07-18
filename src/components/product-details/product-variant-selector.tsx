import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { ProductVariant } from '@/lib/types';

interface ProductVariantSelectorProps {
  isSambatan: boolean;
  productVariants: ProductVariant[];
  selectedVariant?: ProductVariant;
  setSelectedVariant: (variant: ProductVariant | undefined) => void;
}

export function ProductVariantSelector({
  isSambatan,
  productVariants,
  selectedVariant,
  setSelectedVariant,
}: ProductVariantSelectorProps) {
  if (isSambatan || productVariants.length <= 1) return null;

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-foreground/80">Pilih Varian:</h3>
      <RadioGroup
        value={selectedVariant?.id}
        onValueChange={(variantId) => {
          setSelectedVariant(productVariants.find(v => v.id === variantId));
        }}
        className="mt-2 flex flex-wrap gap-3"
      >
        {productVariants.map((variant) => (
          <div key={variant.id} className="flex items-center">
            <RadioGroupItem value={variant.id} id={variant.id} className="sr-only" />
            <Label
              htmlFor={variant.id}
              className={cn(
                "cursor-pointer rounded-lg border px-4 py-2 text-center transition-all",
                "shadow-neumorphic-inset data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[state=checked]:shadow-neumorphic-active",
                selectedVariant?.id === variant.id ? 'bg-accent text-accent-foreground shadow-neumorphic-active' : 'bg-background'
              )}
            >
              {variant.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
