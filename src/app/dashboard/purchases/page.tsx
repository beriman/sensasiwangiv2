// src/app/dashboard/purchases/page.tsx
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
import { OrderDetailsDialog } from '@/components/dashboard/order-details-dialog';
import type { Order, OrderStatus } from '@/lib/types';
import { products } from '@/data/products';
import { profiles } from '@/data/profiles';
import { ReviewDialog } from '@/components/review-dialog';

// Mock data for demonstration purposes. In a real app, this would be fetched for the logged-in user.
const initialOrders: Order[] = [
  {
    id: '#3208',
    customer: {
      name: 'Alex Doe',
      address: 'Jl. Cendana No. 8, Menteng, Jakarta Pusat, DKI Jakarta',
      email: 'alex.doe@example.com',
    },
    status: 'Pesanan Diterima',
    date: new Date().toISOString(),
    shippingDeadline: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    total: 1200000,
    items: [
        { id: 'p1', name: 'Eau de Lumière', quantity: 1, price: 1200000 },
    ]
  },
   {
    id: '#3207',
    customer: {
        name: 'Alex Doe',
        address: 'Jl. Cendana No. 8, Menteng, Jakarta Pusat, DKI Jakarta',
        email: 'alex.doe@example.com',
    },
    status: 'Dikirim',
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    shippingDeadline: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    total: 800000,
    items: [
      { id: 'rm1', name: 'Sandalwood Oil', quantity: 1, price: 800000 },
    ],
    shippingInfo: { provider: 'SiCepat', trackingNumber: 'SC00987654321', shippedOn: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() }
  },
  {
    id: '#3201',
    customer: {
      name: 'Alex Doe',
      address: 'Jl. Cendana No. 8, Menteng, Jakarta Pusat, DKI Jakarta',
      email: 'alex.doe@example.com',
    },
    status: 'Selesai',
    date: new Date('2023-01-25').toISOString(),
    shippingDeadline: new Date('2023-01-27').toISOString(),
    total: 750000,
    items: [
      { id: 't2', name: 'Digital Perfumer\'s Scale', quantity: 1, price: 750000 },
    ],
    shippingInfo: { provider: 'JNE', trackingNumber: 'JN0012345678', shippedOn: '2023-01-26' }
  },
];

export default function MyPurchasesPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [orderToReview, setOrderToReview] = useState<Order | null>(null);

    const { toast } = useToast();

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        toast({
            title: "Status Pesanan Diperbarui",
            description: `Pesanan ${orderId} sekarang berstatus "${newStatus}".`,
        });
    };
    
    const handleReportProblem = (orderId: string) => {
        handleUpdateStatus(orderId, 'Bermasalah');
    }

    const handleOpenReviewDialog = (order: Order) => {
        setOrderToReview(order);
        setIsReviewDialogOpen(true);
    };

    const getSellerNameForOrder = (order: Order | null) => {
        if (!order || order.items.length === 0) return undefined;
        // Assumption: all items in an order are from the same seller.
        const firstItem = products.find(p => p.id === order.items[0].id);
        if (!firstItem?.perfumerProfileSlug) return 'Penjual';
        const sellerProfile = profiles.find(p => p.slug === firstItem.perfumerProfileSlug);
        return sellerProfile?.name;
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
            case 'Dikirim': return 'Menunggu Konfirmasi Anda';
            case 'Selesai': return 'Pesanan Selesai';
            default: return status;
        }
    }

  return (
    <>
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle>Riwayat Pembelian Saya</CardTitle>
        <CardDescription>
          Tinjau pesanan Anda sebelumnya dan lacak statusnya.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pesanan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={cn(order.status === 'Bermasalah' && 'bg-orange-50/50')}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge 
                    className={cn("font-semibold", getStatusStyles(order.status))}
                  >
                    {getDescriptiveStatus(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatRupiah(order.total)}</TableCell>
                <TableCell className="text-center space-x-2">
                    {order.status === 'Selesai' && (
                        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleOpenReviewDialog(order)}}>
                            Beri Ulasan
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedOrder(order)}}>
                        Lihat Detail
                    </Button>
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
        onConfirmDelivery={() => {
            if(selectedOrder) handleUpdateStatus(selectedOrder.id, 'Selesai');
            setSelectedOrder(null);
        }}
        onReportProblem={() => {
            if(selectedOrder) handleReportProblem(selectedOrder.id);
            setSelectedOrder(null);
        }}
        isSellerView={false}
    />

    <ReviewDialog
        isOpen={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        order={orderToReview}
        sellerName={getSellerNameForOrder(orderToReview)}
    />
    </>
  );
}
