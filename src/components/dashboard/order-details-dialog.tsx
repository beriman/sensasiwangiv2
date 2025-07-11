// src/components/dashboard/order-details-dialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, cn } from '@/lib/utils';
import type { Order, OrderStatus } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { differenceInHours, parseISO } from 'date-fns';

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export function OrderDetailsDialog({ order, isOpen, onOpenChange, onUpdateStatus }: OrderDetailsDialogProps) {
  if (!order) {
    return null;
  }
  
  const getStatusStyles = (status: OrderStatus) => {
     switch (status) {
        case 'Selesai': return 'bg-green-100 text-green-800';
        case 'Pesanan Diterima': return 'bg-yellow-100 text-yellow-800';
        case 'Dikirim': return 'bg-blue-100 text-blue-800';
        case 'Menunggu Konfirmasi': return 'bg-purple-100 text-purple-800';
        case 'Bermasalah': return 'bg-orange-200 text-orange-800 border-orange-400';
        case 'Dibatalkan': return 'bg-red-100 text-red-800';
        default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDeadlineStyles = (deadline: string) => {
    const hoursLeft = differenceInHours(parseISO(deadline), new Date());
    if (hoursLeft < 0) return "text-destructive font-bold";
    if (hoursLeft < 24) return "text-orange-600 font-semibold";
    return "text-muted-foreground";
  };
  
  const handleActionClick = () => {
    onUpdateStatus(order.id, 'Dikirim');
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl border-none bg-background shadow-neumorphic">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">Detail Pesanan: {order.id}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Tinjau pesanan dan ambil tindakan.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 pr-6">
            {/* Customer & Status */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-foreground/70">Pembeli</h3>
                    <p className="font-bold text-foreground/90">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">{order.customer.address}</p>
                </div>
                <div className="text-right">
                    <h3 className="font-semibold text-foreground/70">Status</h3>
                    <Badge className={cn("mt-1 font-semibold", getStatusStyles(order.status))}>{order.status}</Badge>
                    
                    <h3 className="font-semibold text-foreground/70 mt-3">Batas Waktu Pengiriman</h3>
                    <p className={cn("font-medium", getDeadlineStyles(order.shippingDeadline))}>
                        {new Date(order.shippingDeadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
                <h3 className="font-semibold text-foreground/70 mb-2">Produk Dipesan</h3>
                <div className="space-y-3">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <div>
                                <p className="font-medium text-foreground/90">{item.name}</p>
                                <p className="text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-foreground/90">{formatRupiah(item.price * item.quantity)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p className="font-medium">{formatRupiah(order.total)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-muted-foreground">Ongkos Kirim</p>
                    <p className="font-medium">{formatRupiah(25000)}</p>
                </div>
                <div className="flex justify-between text-base font-bold text-foreground/90">
                    <p>Grand Total</p>
                    <p>{formatRupiah(order.total + 25000)}</p>
                </div>
            </div>
            </div>
        </ScrollArea>

        <DialogFooter className="pt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Tutup</Button>
          <Button 
            onClick={handleActionClick}
            disabled={order.status !== 'Pesanan Diterima'}
            className="bg-accent-gradient text-accent-foreground shadow-neumorphic"
          >
            Tandai sebagai Telah Dikirim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
