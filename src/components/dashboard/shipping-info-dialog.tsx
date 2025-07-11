// src/components/dashboard/shipping-info-dialog.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import type { ShippingInfo } from '@/lib/types';

const shippingInfoSchema = z.object({
  provider: z.string().min(2, { message: 'Nama jasa pengiriman diperlukan.' }),
  trackingNumber: z.string().min(5, { message: 'Nomor resi tidak valid.' }),
});

interface ShippingInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (shippingInfo: ShippingInfo) => void;
}

export function ShippingInfoDialog({ isOpen, onOpenChange, onSave }: ShippingInfoDialogProps) {
  const form = useForm<z.infer<typeof shippingInfoSchema>>({
    resolver: zodResolver(shippingInfoSchema),
    defaultValues: {
      provider: '',
      trackingNumber: '',
    },
  });

  const onSubmit = (values: z.infer<typeof shippingInfoSchema>) => {
    const shippingData: ShippingInfo = {
      ...values,
      shippedOn: new Date().toISOString(),
    };
    onSave(shippingData);
    form.reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
        form.reset();
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">Masukkan Info Pengiriman</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Lengkapi detail berikut untuk mengubah status pesanan menjadi "Dikirim".
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jasa Pengiriman</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., JNE, SiCepat, Anteraja" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trackingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Resi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nomor resi pengiriman" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Batal</Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-accent-gradient text-accent-foreground shadow-neumorphic">
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-5 w-5" />
                )}
                Simpan & Kirim
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
