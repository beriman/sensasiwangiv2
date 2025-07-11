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
import type { Order, OrderStatus } from '@/lib/types';
import { differenceInHours, parseISO } from 'date-fns';

const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const initialOrders: Order[] = [
  {
    id: '#3210',
    customer: {
      name: 'Olivia Martin',
      address: 'Jl. Merdeka No. 17, Jakarta Pusat, DKI Jakarta',
      email: 'olivia.martin@email.com',
    },
    status: 'Pesanan Diterima',
    date: new Date('2023-02-01').toISOString(),
    shippingDeadline: addDays(new Date('2023-02-01'), 2).toISOString(),
    total: 450000,
    items: [
        { id: 'p3', name: 'Zeste d\'Agrumes', quantity: 1, price: 950000/2 },
        { id: 't3', name: 'Perfume Testing Strips', quantity: 1, price: 150000/2 },
    ]
  },
  {
    id: '#3208',
    customer: {
      name: 'Alex Doe',
      address: 'Jl. Cendana No. 8, Menteng, Jakarta Pusat, DKI Jakarta',
      email: 'alex.doe@example.com',
    },
    status: 'Pesanan Diterima',
    date: new Date().toISOString(), // Today's order
    shippingDeadline: addDays(new Date(), 1).toISOString(), // Deadline is tomorrow
    total: 1200000,
    items: [
        { id: 'p1', name: 'Eau de Lumière', quantity: 1, price: 1200000 },
    ]
  },
  {
    id: '#3201',
    customer: {
      name: 'Emma Brown',
      address: 'Jl. Gajah Mada No. 101, Semarang, Jawa Tengah',
      email: 'emma.brown@email.com',
    },
    status: 'Selesai',
    date: new Date('2023-01-25').toISOString(),
    shippingDeadline: addDays(new Date('2023-01-25'), 2).toISOString(),
    total: 750000,
    items: [
      { id: 't2', name: 'Digital Perfumer\'s Scale', quantity: 1, price: 750000 },
    ]
  },
  {
    id: '#3204',
    customer: {
      name: 'Michael Johnson',
      address: 'Jl. Pahlawan No. 45, Surabaya, Jawa Timur',
      email: 'michael.johnson@email.com',
    },
    status: 'Bermasalah',
    date: new Date('2023-01-28').toISOString(),
    shippingDeadline: addDays(new Date('2023-01-28'), 2).toISOString(),
    total: 250000,
    items: [
      { id: 'rm3', name: 'Bulgarian Rose Absolute (5g)', quantity: 1, price: 250000 },
    ]
  },
];

export default function SellerOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const { toast } = useToast();

    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                const updatedOrder = { ...order, status: newStatus };
                if (newStatus === 'Dikirim') {
                    // Set buyer confirmation deadline, e.g., 7 days from now
                    updatedOrder.buyerConfirmationDeadline = addDays(new Date(), 7).toISOString();
                }
                return updatedOrder;
            }
            return order;
        }));
        toast({
            title: "Status Pesanan Diperbarui",
            description: `Pesanan ${orderId} sekarang berstatus "${newStatus}".`,
        });
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
        <CardTitle>Manage Incoming Orders</CardTitle>
        <CardDescription>
          Review and process orders for your products. Fulfill them before the deadline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Batas Kirim</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={cn(order.status === 'Bermasalah' && 'bg-orange-50/50')}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge 
                    className={cn("font-semibold", getStatusStyles(order.status))}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className={cn("flex items-center gap-2", getDeadlineStyles(order.shippingDeadline))}>
                    {differenceInHours(parseISO(order.shippingDeadline), new Date()) < 24 && (
                        <AlertCircle className="h-4 w-4" />
                    )}
                    {new Date(order.shippingDeadline).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">{formatRupiah(order.total)}</TableCell>
                <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={() => handleUpdateStatus(order.id, 'Dikirim')}
                            disabled={order.status !== 'Pesanan Diterima'}
                        >
                            Kirim Pesanan
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Contact Customer
                        </DropdownMenuItem>
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
            if (!isOpen) {
                setSelectedOrder(null);
            }
        }}
        onUpdateStatus={handleUpdateStatus}
    />
    </>
  );
}
