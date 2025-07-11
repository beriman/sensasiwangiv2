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
import { AlertCircle } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from '@/components/ui/button';


const initialOrders = [
  {
    id: '#3208',
    status: 'Pending' as 'Fulfilled' | 'Pending' | 'Declined' | 'Disputed',
    date: '2023-01-30',
    total: 1200000,
    isReported: false,
  },
  {
    id: '#3201',
    status: 'Fulfilled' as 'Fulfilled' | 'Pending' | 'Declined' | 'Disputed',
    date: '2023-01-25',
    total: 750000,
    isReported: false,
  },
];

export default function MyOrdersPage() {
    const [orders, setOrders] = useState(initialOrders);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const { toast } = useToast();

    const handleReportClick = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsConfirmOpen(true);
    };

    const handleConfirmReport = () => {
        if (!selectedOrderId) return;
        
        // In a real app, this would also update the admin's view via an API call.
        // For now, we'll just update our local state to reflect the action.
        setOrders(orders.map(order => 
            order.id === selectedOrderId ? { ...order, isReported: true, status: 'Disputed' } : order
        ));
        
        toast({
            title: "Masalah Dilaporkan",
            description: `Admin telah diberitahu mengenai masalah dengan pesanan ${selectedOrderId}.`,
        });

        setIsConfirmOpen(false);
        setSelectedOrderId(null);
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
    <>
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>
          View your order history and report any issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
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
                    {order.status !== 'Fulfilled' ? (
                        <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleReportClick(order.id)}
                            disabled={order.isReported}
                        >
                            <AlertCircle className="mr-2 h-4 w-4" />
                            {order.isReported ? 'Reported' : 'Report Issue'}
                        </Button>
                    ) : (
                        <Button variant="ghost" size="sm">View Details</Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Laporkan Masalah dengan Pesanan?</AlertDialogTitle>
                <AlertDialogDescription>
                    Tindakan ini akan memberi tahu admin bahwa ada masalah dengan pesanan Anda. Admin akan meninjau dan mungkin menghubungi Anda dan penjual untuk mediasi. Lanjutkan?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmReport} className={buttonVariants({ variant: "destructive" })}>
                    Ya, Laporkan
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
