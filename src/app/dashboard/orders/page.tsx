
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


type OrderStatus = 'Pending' | 'Fulfilled' | 'Disputed';

const initialOrders = [
  {
    id: '#3210',
    customer: 'Olivia Martin',
    status: 'Pending' as OrderStatus,
    date: '2023-02-01',
    total: 450000,
  },
    {
    id: '#3208',
    customer: 'Alex Doe', // This is actually the customer's name
    status: 'Pending' as OrderStatus,
    date: '2023-01-30',
    total: 1200000,
  },
  {
    id: '#3201',
    customer: 'Emma Brown',
    status: 'Fulfilled' as OrderStatus,
    date: '2023-01-25',
    total: 750000,
  },
   {
    id: '#3204',
    customer: 'Michael Johnson',
    status: 'Disputed' as OrderStatus,
    date: '2023-01-28',
    total: 250000,
  },
];

export default function SellerOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const { toast } = useToast();

    const handleMarkAsFulfilled = (orderId: string) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Fulfilled' } : order
        ));
        toast({
            title: "Order Fulfilled",
            description: `Order ${orderId} has been marked as fulfilled.`,
        });
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Fulfilled': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Disputed': return 'bg-orange-200 text-orange-800 border-orange-400';
            default: return '';
        }
    };


  return (
    <>
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle>Manage Incoming Orders</CardTitle>
        <CardDescription>
          Review and process orders for your products.
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
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={cn(order.status === 'Disputed' && 'bg-orange-50')}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge 
                    variant={order.status === 'Fulfilled' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive'}
                    className={cn("font-semibold", getStatusStyles(order.status))}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatRupiah(order.total)}</TableCell>
                <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            disabled={order.status !== 'Pending'}
                        >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem 
                            onClick={() => handleMarkAsFulfilled(order.id)}
                            disabled={order.status !== 'Pending'}
                        >
                            Mark as Fulfilled
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
    </>
  );
}

