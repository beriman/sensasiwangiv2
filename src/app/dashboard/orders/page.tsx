// src/app/dashboard/orders/page.tsx
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatRupiah, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import { OrderDetailsDialog } from '@/components/dashboard/order-details-dialog';
import { ShippingInfoDialog } from '@/components/dashboard/shipping-info-dialog';
import type { Order, OrderStatus, ShippingInfo } from '@/lib/types';
import { differenceInHours, parseISO } from 'date-fns';

// Mock data for demonstration purposes. In a real app, this would be fetched for the logged-in user (seller).
const initialOrders: Order[] = [
  {
    id: '#3210',
    customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com', address: 'Jl. Merdeka No. 10, Bandung' },
    status: 'Pesanan Diterima',
    date: new Date().toISOString(),
    shippingDeadline: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    total: 450000,
    items: [{ id: 'rm2', name: 'Iso E Super', quantity: 1, price: 450000 }],
  },
  {
    id: '#3209',
    customer: { name: 'Ava Johnson', email: 'ava.johnson@email.com', address: 'Jl. Sudirman No. 12, Surabaya' },
    status: 'Dikirim',
    date: '2023-01-31',
    shippingDeadline: '2023-02-02',
    total: 350000,
    items: [{ id: 't1', name: 'Glass Beaker Set', quantity: 1, price: 350000 }],
    shippingInfo: { provider: 'J&T', trackingNumber: 'JT987654321', shippedOn: '2023-02-01' }
  },
  {
    id: '#3204',
    customer: { name: 'Michael Johnson', email: 'michael.johnson@email.com', address: 'Jl. Gatot Subroto No. 5, Medan' },
    status: 'Bermasalah',
    date: '2023-01-28',
    shippingDeadline: '2023-01-30',
    total: 250000,
    items: [{ id: 'p4', name: 'Ambre Nuit', quantity: 1, price: 250000 }],
  },
  {
    id: '#3202',
    customer: { name: 'Emma Brown', email: 'emma.brown@email.com', address: 'Jl. Diponegoro No. 8, Semarang' },
    status: 'Pesanan Diterima',
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    shippingDeadline: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    total: 150000,
    items: [{ id: 't3', name: 'Perfume Testing Strips', quantity: 1, price: 150000 }],
  },
  {
    id: '#3205',
    customer: { name: 'Sophia Lee', email: 'sophia.lee@email.com', address: 'Jl. Imam Bonjol No. 15, Makassar' },
    status: 'Pesanan Diterima',
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    shippingDeadline: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // Deadline has passed
    total: 950000,
    items: [{ id: 'p3', name: 'Zeste d\'Agrumes', quantity: 1, price: 950000 }],
  },
];

export default function MyOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
    const [orderToShip, setOrderToShip] = useState<Order | null>(null);
    const { toast } = useToast();

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus, shippingInfo?: ShippingInfo) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus, shippingInfo: shippingInfo || order.shippingInfo } : order
        ));
        toast({
            title: "Status Pesanan Diperbarui",
            description: `Pesanan ${orderId} sekarang berstatus "${newStatus}".`,
        });
    };

    const handleOpenShippingDialog = (order: Order) => {
        setOrderToShip(order);
        setIsShippingDialogOpen(true);
    };

    const handleSaveShippingInfo = (shippingInfo: ShippingInfo) => {
        if (orderToShip) {
            handleUpdateStatus(orderToShip.id, 'Dikirim', shippingInfo);
        }
        setIsShippingDialogOpen(false);
        setOrderToShip(null);
    };
    
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

    const getDescriptiveStatus = (status: OrderStatus) => {
        switch (status) {
            case 'Pesanan Diterima': return 'Diterima oleh Penjual';
            case 'Dikirim': return 'Dikirim oleh Penjual';
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

  return (
    <>
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle>Kelola Pesanan Masuk</CardTitle>
        <CardDescription>
          Tinjau dan penuhi pesanan dari pelanggan Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pesanan</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Batas Kirim</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={cn(order.status === 'Bermasalah' && 'bg-orange-50/50')}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell className={cn("font-medium", getDeadlineStyles(order.shippingDeadline))}>
                  {differenceInHours(parseISO(order.shippingDeadline), new Date()) < 0 && (
                     <AlertCircle className="inline-block h-4 w-4 mr-1 text-destructive" />
                  )}
                  {new Date(order.shippingDeadline).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn("font-semibold", getStatusStyles(order.status))}
                  >
                    {getDescriptiveStatus(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatRupiah(order.total)}</TableCell>
                <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                Lihat Detail
                            </DropdownMenuItem>
                            {order.status === 'Pesanan Diterima' && (
                                <DropdownMenuItem onClick={() => handleOpenShippingDialog(order)}>
                                    Kirim Pesanan
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    
    <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedOrder(null);
        }}
        isSellerView={true}
    />

    <ShippingInfoDialog
        isOpen={isShippingDialogOpen}
        onOpenChange={setIsShippingDialogOpen}
        onSave={handleSaveShippingInfo}
    />
    </>
  );
}
