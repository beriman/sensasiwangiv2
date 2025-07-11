// src/app/admin/orders/page.tsx
'use client';

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
import { formatRupiah } from '@/lib/utils';

// Mock data for demonstration
const orders = [
  {
    order: '#3210',
    customer: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-02-01',
    total: 450000,
  },
  {
    order: '#3209',
    customer: 'Ava Johnson',
    email: 'ava.johnson@email.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-01-31',
    total: 350000,
  },
  {
    order: '#3204',
    customer: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    type: 'Refund',
    status: 'Declined',
    date: '2023-01-28',
    total: 250000,
  },
    {
    order: '#3203',
    customer: 'Liam Smith',
    email: 'liam.smith@email.com',
    type: 'Sale',
    status: 'Fulfilled',
    date: '2023-01-27',
    total: 550000,
  },
   {
    order: '#3202',
    customer: 'Emma Brown',
    email: 'emma.brown@email.com',
    type: 'Sale',
    status: 'Pending',
    date: '2023-01-26',
    total: 150000,
  },
];

export default function AdminOrdersPage() {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order}>
                <TableCell className="font-medium">{order.order}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer}</div>
                  <div className="text-sm text-muted-foreground">{order.email}</div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={order.status === 'Fulfilled' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive'}
                    className={order.status === 'Fulfilled' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{formatRupiah(order.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
