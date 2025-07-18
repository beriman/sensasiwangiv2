import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/hooks/use-cart';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
}

export function CartItem({
  item,
  updateQuantity,
  removeItem,
}: CartItemProps) {
  return (
    <div key={item.variant.id} className="flex items-start gap-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm text-muted-foreground">{item.variant.name}</p>
        <p className="text-sm font-semibold mt-1">{formatRupiah(item.variant.price)}</p>
        {item.category !== 'Course' ? (
          <div className="mt-2 flex items-center">
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Input type="number" value={item.quantity} readOnly className="h-6 w-12 border-0 bg-transparent text-center shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Badge variant="secondary" className="mt-2">Akses Selamanya</Badge>
        )}
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.variant.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
