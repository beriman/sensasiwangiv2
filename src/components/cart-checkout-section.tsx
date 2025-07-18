import { PartyPopper, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { formatRupiah } from '@/lib/utils';
import { SheetFooter } from '@/components/ui/sheet';

interface CartCheckoutSectionProps {
  totalPrice: number;
  onCheckoutComplete: () => void;
}

export function CartCheckoutSection({ totalPrice, onCheckoutComplete }: CartCheckoutSectionProps) {
  const { toast } = useToast();
  const { clearCart } = useCart();

  const handleCheckout = () => {
    // In a real app, this would redirect to a payment gateway
    // For now, simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. Your order is on its way!",
      });
      clearCart();
      onCheckoutComplete(); // Notify parent to close/reset checkout view
    }, 2000);
  };

  return (
    <SheetFooter className="mt-auto flex flex-col gap-4 border-t pt-4">
      <div className="flex justify-between text-lg font-semibold">
        <span>Subtotal</span>
        <span>{formatRupiah(totalPrice)}</span>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xs text-muted-foreground text-center">Taxes and shipping calculated at checkout.</p>
        <Button onClick={handleCheckout} size="lg" className="h-14 w-full rounded-xl bg-accent-gradient text-lg text-accent-foreground shadow-neumorphic">
          <CreditCard className="mr-2 h-6 w-6" />
          Proceed to Checkout
        </Button>
      </div>
    </SheetFooter>
  );
}

export function OrderProcessingDisplay() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <PartyPopper className="h-24 w-24 text-accent" />
      <h2 className="text-2xl font-bold">Processing Your Order!</h2>
      <p className="text-muted-foreground">Please wait while we confirm your purchase. Thank you for shopping with us!</p>
    </div>
  );
}
