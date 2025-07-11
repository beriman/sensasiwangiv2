// src/components/cart.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Minus, Plus, CreditCard, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatRupiah } from '@/lib/utils';

export function Cart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const { toast } = useToast();

  const handleCheckout = () => {
    // In a real app, this would redirect to a payment gateway
    setIsCheckout(true);
    // Simulate order processing
    setTimeout(() => {
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. Your order is on its way!",
        });
        clearCart();
        //setIsCheckout(false); // Can be removed if sheet is closed on completion
    }, 2000);
  };
  
  const onOpenChange = (open: boolean) => {
    if(!open) {
      setIsCheckout(false);
    }
  }

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
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <PartyPopper className="h-24 w-24 text-accent" />
                <h2 className="text-2xl font-bold">Processing Your Order!</h2>
                <p className="text-muted-foreground">Please wait while we confirm your purchase. Thank you for shopping with us!</p>
            </div>
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
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{formatRupiah(item.price)}</p>
                      <div className="mt-2 flex items-center">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input type="number" value={item.quantity} readOnly className="h-6 w-12 border-0 bg-transparent text-center shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto flex-col space-y-4 border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>{formatRupiah(totalPrice)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
                <Button onClick={handleCheckout} size="lg" className="h-14 w-full rounded-xl bg-accent-gradient text-lg text-accent-foreground shadow-neumorphic">
                    <CreditCard className="mr-2 h-6 w-6" />
                    Proceed to Checkout
                </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
