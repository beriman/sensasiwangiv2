// src/app/dashboard/purchases/page.tsx
'use client';

import { usePurchases } from '@/hooks/use-purchases';

export default function MyPurchasesPage() {
    const { 
        orders, 
        selectedOrder, 
        isReviewDialogOpen, 
        orderToReview, 
        handleUpdateStatus, 
        handleReportProblem, 
        handleOpenReviewDialog, 
        setSelectedOrder, 
        setIsReviewDialogOpen, 
        getSellerNameForOrder, 
        getStatusStyles, 
        getDescriptiveStatus 
    } = usePurchases();

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
          import { PurchaseOrderTableRow } from '@/components/dashboard/purchase-order-table-row';
// ... other imports ...

export default function MyPurchasesPage() {
    const { 
        orders, 
        selectedOrder, 
        isReviewDialogOpen, 
        orderToReview, 
        handleUpdateStatus, 
        handleReportProblem, 
        handleOpenReviewDialog, 
        setSelectedOrder, 
        setIsReviewDialogOpen, 
        getSellerNameForOrder, 
        getStatusStyles, 
        getDescriptiveStatus 
    } = usePurchases();

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
              <PurchaseOrderTableRow
                key={order.id}
                order={order}
                setSelectedOrder={setSelectedOrder}
                handleOpenReviewDialog={handleOpenReviewDialog}
                getStatusStyles={getStatusStyles}
                getDescriptiveStatus={getDescriptiveStatus}
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
