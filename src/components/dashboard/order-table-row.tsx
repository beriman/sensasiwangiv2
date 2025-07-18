import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertCircle, MoreHorizontal } from 'lucide-react';
import { formatRupiah, cn } from '@/lib/utils';
import type { Order } from '@/lib/types';

interface OrderTableRowProps {
  order: Order;
  setSelectedOrder: (order: Order | null) => void;
  handleOpenShippingDialog: (order: Order) => void;
  getStatusStyles: (status: Order['status']) => string;
  getDescriptiveStatus: (status: Order['status']) => string;
  getDeadlineStyles: (deadline: string) => string;
}

export function OrderTableRow({
  order,
  setSelectedOrder,
  handleOpenShippingDialog,
  getStatusStyles,
  getDescriptiveStatus,
  getDeadlineStyles,
}: OrderTableRowProps) {
  return (
    <TableRow key={order.id} className={cn(order.status === 'Bermasalah' && 'bg-orange-50/50')}>
      <TableCell className="font-medium">{order.id}</TableCell>
      <TableCell>{order.customer.name}</TableCell>
      <TableCell className={cn("font-medium", getDeadlineStyles(order.shippingDeadline))}>
        {getDeadlineStyles(order.shippingDeadline).includes("destructive") && (
          <AlertCircle className="inline-block h-4 w-4 mr-1 text-destructive" />
        )}
        {new Date(order.shippingDeadline).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Badge 
          className={cn("font-semibold", getStatusStyles(order.status))}
        >
          {getDescriptiveStatus(order.status)}
        </Badge>
      </TableCell>
      <TableCell className="text-right">{formatRupiah(order.total)}</TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
              Lihat Detail
            </DropdownMenuItem>
            {order.status === 'Pesanan Diterima' && (
              <DropdownMenuItem onClick={() => handleOpenShippingDialog(order)}>
                Kirim Pesanan
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
