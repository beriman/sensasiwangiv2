// src/app/dashboard/orders/page.tsx
'use client';

import { useOrders } from '@/hooks/use-orders';

export default function MyOrdersPage() {
    const { 
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
        getDeadlineStyles 
    } = useOrders();

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
          import { OrderTableRow } from '@/components/dashboard/order-table-row';
// ... other imports ...

export default function MyOrdersPage() {
    const { 
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
        getDeadlineStyles 
    } = useOrders();

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
              <OrderTableRow
                key={order.id}
                order={order}
                setSelectedOrder={setSelectedOrder}
                handleOpenShippingDialog={handleOpenShippingDialog}
                getStatusStyles={getStatusStyles}
                getDescriptiveStatus={getDescriptiveStatus}
                getDeadlineStyles={getDeadlineStyles}
              />
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
