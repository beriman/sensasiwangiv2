import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRupiah, cn } from '@/lib/utils';
import type { Order } from '@/lib/types';

interface PurchaseOrderTableRowProps {
  order: Order;
  setSelectedOrder: (order: Order | null) => void;
  handleOpenReviewDialog: (order: Order) => void;
  getStatusStyles: (status: Order['status']) => string;
  getDescriptiveStatus: (status: Order['status']) => string;
}

export function PurchaseOrderTableRow({
  order,
  setSelectedOrder,
  handleOpenReviewDialog,
  getStatusStyles,
  getDescriptiveStatus,
}: PurchaseOrderTableRowProps) {
  return (
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
  );
}
