// src/app/admin/orders/page.tsx
'use client';

import { useState, useMemo } from 'react';
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
import { MoreHorizontal, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Order, OrderStatus } from '@/lib/types';

// Mock data for demonstration
const initialOrders: Order[] = [
  {
    id: '#3210',
    customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com', address: '' },
    status: 'Selesai',
    date: '2023-02-01',
    shippingDeadline: '2023-02-03',
    total: 450000,
    items: [],
  },
  {
    id: '#3209',
    customer: { name: 'Ava Johnson', email: 'ava.johnson@email.com', address: '' },
    status: 'Selesai',
    date: '2023-01-31',
    shippingDeadline: '2023-02-02',
    total: 350000,
    items: [],
  },
    {
    id: '#3208',
    customer: { name: 'Alex Doe', email: 'alex.doe@example.com', address: '' },
    status: 'Pesanan Diterima',
    date: '2023-01-30',
    shippingDeadline: '2023-02-01',
    total: 1200000,
    items: [],
  },
  {
    id: '#3204',
    customer: { name: 'Michael Johnson', email: 'michael.johnson@email.com', address: '' },
    status: 'Dibatalkan',
    date: '2023-01-28',
    shippingDeadline: '2023-01-30',
    total: 250000,
    items: [],
  },
    {
    id: '#3203',
    customer: { name: 'Liam Smith', email: 'liam.smith@email.com', address: '' },
    status: 'Selesai',
    date: '2023-01-27',
    shippingDeadline: '2023-01-29',
    total: 550000,
    items: [],
  },
   {
    id: '#3202',
    customer: { name: 'Emma Brown', email: 'emma.brown@email.com', address: '' },
    status: 'Pesanan Diterima',
    date: '2023-01-26',
    shippingDeadline: '2023-01-28',
    total: 150000,
    items: [],
  },
    {
    id: '#3201',
    customer: { name: 'Alex Doe', email: 'alex.doe@example.com', address: '' },
    status: 'Selesai',
    date: '2023-01-25',
    shippingDeadline: '2023-01-27',
    total: 750000,
    items: [],
  },
];

const allStatuses: OrderStatus[] = ['Pesanan Diterima', 'Dikirim', 'Selesai', 'Bermasalah', 'Dibatalkan'];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');


    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const searchMatch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                order.id.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'All' || order.status === statusFilter;
            return searchMatch && statusMatch;
        });
    }, [orders, searchTerm, statusFilter]);


    const handleMarkAsDisputed = (orderId: string) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Bermasalah' } : order
        ));
    };

    const getStatusStyles = (status: OrderStatus) => {
        switch (status) {
            case 'Selesai': return 'bg-green-100 text-green-800';
            case 'Pesanan Diterima': return 'bg-yellow-100 text-yellow-800';
            case 'Dikirim': return 'bg-blue-100 text-blue-800';
            case 'Menunggu Konfirmasi': return 'bg-purple-100 text-purple-800';
            case 'Bermasalah': return 'bg-orange-200 text-orange-800 border-orange-400';
            case 'Dibatalkan': return 'bg-red-100 text-red-800';
            default: return '';
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


  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          A list of recent orders from your store.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by customer, email, or order ID..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    {allStatuses.map(status => (
                         <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
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
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className={cn(order.status === 'Bermasalah' && 'bg-orange-50')}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={cn("font-semibold", getStatusStyles(order.status))}
                  >
                    {getDescriptiveStatus(order.status)}
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
         {filteredOrders.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                No orders found matching your criteria.
            </div>
          )}
      </CardContent>
    </Card>
  );
}
