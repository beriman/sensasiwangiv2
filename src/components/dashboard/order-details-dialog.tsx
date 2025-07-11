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
import { AlertTriangle, Package, Truck, CheckCircle } from 'lucide-react';

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelivery?: () => void;
  onReportProblem?: () => void;
  isSellerView: boolean;
}

export function OrderDetailsDialog({ order, isOpen, onOpenChange, onConfirmDelivery, onReportProblem, isSellerView }: OrderDetailsDialogProps) {
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

  const getDescriptiveStatus = (status: OrderStatus, forSeller: boolean) => {
    switch (status) {
        case 'Pesanan Diterima': return 'Diterima oleh Penjual';
        case 'Dikirim': return forSeller ? 'Dikirim oleh Penjual' : 'Menunggu Konfirmasi Anda';
        case 'Selesai': return 'Pesanan Selesai';
        default: return status;
    }
  }

  const getDeadlineStyles = (deadline: string) => {
    const hoursLeft = differenceInHours(parseISO(deadline), new Date());
    if (hoursLeft < 0) return "text-destructive font-bold";
    if (hoursLeft < 24) return "text-orange-600 font-semibold";
    return "text-muted-foreground";
  };
  
  const canConfirmDelivery = !isSellerView && order.status === 'Dikirim' && onConfirmDelivery;
  const canReportProblem = !isSellerView && (order.status === 'Dikirim' || order.status === 'Pesanan Diterima') && onReportProblem;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl border-none bg-background shadow-neumorphic">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">Detail Pesanan: {order.id}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {isSellerView ? "Tinjau pesanan dan ambil tindakan." : "Rincian pembelian Anda."}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 pr-6">
            {/* Customer & Status */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-semibold text-foreground/70">{isSellerView ? 'Pembeli' : 'Detail Pengiriman'}</h3>
                    <p className="font-bold text-foreground/90">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">{order.customer.address}</p>
                </div>
                <div className="text-right">
                    <h3 className="font-semibold text-foreground/70">Status</h3>
                    <Badge className={cn("mt-1 font-semibold", getStatusStyles(order.status))}>
                        {getDescriptiveStatus(order.status, isSellerView)}
                    </Badge>
                    
                    {isSellerView && (
                        <>
                        <h3 className="font-semibold text-foreground/70 mt-3">Batas Waktu Pengiriman</h3>
                        <p className={cn("font-medium", getDeadlineStyles(order.shippingDeadline))}>
                            {new Date(order.shippingDeadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        </>
                    )}
                </div>
            </div>

            {order.shippingInfo && (
                <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="font-semibold text-foreground/80 flex items-center gap-2 mb-2"><Truck className="h-5 w-5"/>Info Pengiriman</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <p className="text-muted-foreground">Jasa Kirim:</p>
                        <p className="font-medium text-foreground/90">{order.shippingInfo.provider}</p>
                        <p className="text-muted-foreground">Nomor Resi:</p>
                        <p className="font-medium text-foreground/90">{order.shippingInfo.trackingNumber}</p>
                         <p className="text-muted-foreground">Dikirim Pada:</p>
                        <p className="font-medium text-foreground/90">{new Date(order.shippingInfo.shippedOn).toLocaleDateString()}</p>
                    </div>
                </div>
            )}

            <Separator />

            {/* Order Items */}
            <div>
                <h3 className="font-semibold text-foreground/70 mb-2 flex items-center gap-2"><Package className="h-5 w-5" />Produk Dipesan</h3>
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
            {order.status === 'Bermasalah' && (
                <div className="flex items-start gap-3 rounded-lg border border-orange-400 bg-orange-50 p-3 text-sm text-orange-800">
                    <AlertTriangle className="h-5 w-5 mt-0.5"/>
                    <div className="flex-1">
                        <p className="font-semibold">Pesanan ini sedang dalam sengketa.</p>
                        <p>Silakan berkomunikasi dengan penjual untuk menyelesaikan masalah atau hubungi admin untuk mediasi.</p>
                    </div>
                </div>
            )}
            </div>
        </ScrollArea>

        <DialogFooter className="pt-6 sm:justify-between">
            <div>
            {canConfirmDelivery && (
                <Button onClick={onConfirmDelivery} className="bg-green-600 hover:bg-green-700 text-white shadow-neumorphic">
                    <CheckCircle className="mr-2 h-5 w-5"/>
                    Konfirmasi Pesanan Diterima
                </Button>
            )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Tutup</Button>
                {canReportProblem && (
                    <Button variant="destructive" onClick={onReportProblem}>
                       <AlertTriangle className="mr-2 h-5 w-5" /> Laporkan Masalah
                    </Button>
                )}
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
