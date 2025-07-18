// src/components/cart.tsx
'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

import { CartItem } from '@/components/cart-item';
import { CartCheckoutSection, OrderProcessingDisplay } from '@/components/cart-checkout-section';

export function Cart() {
  const { items, totalItems, totalPrice } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);

  const onOpenChange = (open: boolean) => {
    if(!open) {
      setIsCheckout(false);
    }
  }

  const handleCheckoutComplete = () => {
    setIsCheckout(false); // Reset checkout state when complete
  };

  return (
    <Sheet onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0 text-xs">
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-foreground/80">{isCheckout ? 'Checkout' : 'Your Cart'}</SheetTitle>
        </SheetHeader>
        {isCheckout ? (
            <OrderProcessingDisplay />
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground/30" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <CartItem key={item.variant.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
                ))}
              </div>
            </ScrollArea>
            <CartCheckoutSection totalPrice={totalPrice} onCheckoutComplete={handleCheckoutComplete} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}