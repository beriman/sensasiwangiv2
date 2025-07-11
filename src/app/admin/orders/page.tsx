// src/app/admin/orders/page.tsx
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
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const initialOrders = [
  {
    id: '#3210',
    customer: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    type: 'Sale',
    status: 'Fulfilled' as 'Fulfilled' | 'Pending' | 'Declined' | 'Disputed',
    date: '2023-02-01',
    total: 450000,
  },
  {
    id: '#3209',
    customer: 'Ava Johnson',
    email: 'ava.johnson@email.com',
    type: 'Sale',
    status: 'Fulfilled' as 'Fulfilled' | 'Pending' | 'Declined' | 'Disputed',
    date: '2023-01-31',
    total: 350000,
  },
  {
    id: '#3204',
    customer: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    type: 'Refund',
    status: 'Declined' as 'Fulfilled' | 'Pending' | 'Declined' | 'Disputed',
    date: '2023-01-28',
    total: 250000,
  },
    {
    id: '#3203',
    customer: 'Liam Smith',
    email: 'liam.smith@email.com',
    type: 'Sale',
    status: 'Fulfilled' as 'Fulfilled' | 'Pending' | 'Declined' | 'Disputed',
    date: '2023-01-27',
    total: 550000,
  },
   {
    id: '#3202',
    customer: 'Emma Brown',
    email: 'emma.brown@email.com',
    type: 'Sale',
    status: 'Pending' as 'Fulfilled' | 'Pending' | 'Declined' | 'Disputed',
    date: '2023-01-26',
    total: 150000,
  },
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);

    const handleMarkAsDisputed = (orderId: string) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Disputed' } : order
        ));
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Fulfilled': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Disputed': return 'bg-orange-200 text-orange-800 border-orange-400';
            case 'Declined': return 'bg-red-100 text-red-800';
            default: return '';
        }
    };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          A list of recent orders from your store.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={cn(order.status === 'Disputed' && 'bg-orange-50')}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-sm text-muted-foreground">{order.email}</div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={order.status === 'Fulfilled' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive'}
                    className={cn("font-semibold", getStatusStyles(order.status))}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{formatRupiah(order.total)}</TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Order</DropdownMenuItem>
                        <DropdownMenuItem>View Customer</DropdownMenuItem>
                        <DropdownMenuItem className="text-orange-600 focus:bg-orange-100 focus:text-orange-700" onClick={() => handleMarkAsDisputed(order.id)}>
                            Mark as Disputed
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
  );
}
