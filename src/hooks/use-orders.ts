import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
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
    shippingDeadline: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), // Deadline has passed
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

interface UseOrdersResult {
  orders: Order[];
  selectedOrder: Order | null;
  isShippingDialogOpen: boolean;
  orderToShip: Order | null;
  handleUpdateStatus: (orderId: string, newStatus: OrderStatus, shippingInfo?: ShippingInfo) => void;
  handleOpenShippingDialog: (order: Order) => void;
  handleSaveShippingInfo: (shippingInfo: ShippingInfo) => void;
  setSelectedOrder: (order: Order | null) => void;
  setIsShippingDialogOpen: (isOpen: boolean) => void;
  getStatusStyles: (status: OrderStatus) => string;
  getDescriptiveStatus: (status: OrderStatus) => string;
  getDeadlineStyles: (deadline: string) => string;
}

export const useOrders = (): UseOrdersResult => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isShippingDialogOpen, setIsShippingDialogOpen] = useState(false);
  const [orderToShip, setOrderToShip] = useState<Order | null>(null);
  const { toast } = useToast();

  const handleUpdateStatus = useCallback((orderId: string, newStatus: OrderStatus, shippingInfo?: ShippingInfo) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus, shippingInfo: shippingInfo || order.shippingInfo } : order
    ));
    toast({
      title: "Status Pesanan Diperbarui",
      description: `Pesanan ${orderId} sekarang berstatus "${newStatus}".`,
    });
  }, [orders, toast]);

  const handleOpenShippingDialog = useCallback((order: Order) => {
    setOrderToShip(order);
    setIsShippingDialogOpen(true);
  }, []);

  const handleSaveShippingInfo = useCallback((shippingInfo: ShippingInfo) => {
    if (orderToShip) {
      handleUpdateStatus(orderToShip.id, 'Dikirim', shippingInfo);
    }
    setIsShippingDialogOpen(false);
    setOrderToShip(null);
  }, [orderToShip, handleUpdateStatus]);

  const getStatusStyles = useCallback((status: OrderStatus) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Pesanan Diterima': return 'bg-yellow-100 text-yellow-800';
      case 'Dikirim': return 'bg-blue-100 text-blue-800';
      case 'Menunggu Konfirmasi': return 'bg-purple-100 text-purple-800';
      case 'Bermasalah': return 'bg-orange-200 text-orange-800 border-orange-400';
      case 'Dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  }, []);

  const getDescriptiveStatus = useCallback((status: OrderStatus) => {
    switch (status) {
      case 'Pesanan Diterima': return 'Diterima oleh Penjual';
      case 'Dikirim': return 'Dikirim oleh Penjual';
      case 'Selesai': return 'Pesanan Selesai';
      default: return status;
    }
  }, []);
  
  const getDeadlineStyles = useCallback((deadline: string) => {
    const hoursLeft = differenceInHours(parseISO(deadline), new Date());
    if (hoursLeft < 0) return "text-destructive font-bold";
    if (hoursLeft < 24) return "text-orange-600 font-semibold";
    return "text-muted-foreground";
  }, []);

  return {
    orders,
    selectedOrder,
    isShippingDialogOpen,
    orderToShip,
    handleUpdateStatus,
    handleOpenShippingDialog,
    handleSaveShippingInfo,
    setSelectedOrder,
    setIsShippingDialogOpen,
    getStatusStyles,
    getDescriptiveStatus,
    getDeadlineStyles,
  };
};