// src/components/review-dialog.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Order } from '@/lib/types';

const reviewFormSchema = z.object({
  rating: z.number().min(1, 'Rating is required.').max(5),
  comment: z.string().min(10, {
    message: 'Comment must be at least 10 characters.',
  }),
});

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  sellerName: string | undefined;
}

export function ReviewDialog({ isOpen, onOpenChange, order, sellerName }: ReviewDialogProps) {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const onSubmit = (values: z.infer<typeof reviewFormSchema>) => {
    console.log('New review:', { ...values, orderId: order?.id, sellerName });
    toast({
      title: 'Ulasan Terkirim!',
      description: `Terima kasih telah memberikan ulasan untuk ${sellerName}.`,
    });
    form.reset();
    setRating(0);
    onOpenChange(false);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    form.setValue('rating', newRating, { shouldValidate: true });
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      setRating(0);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground/80">Berikan Ulasan untuk {sellerName}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Bagikan pengalaman Anda untuk membantu pembeli lain.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating Keseluruhan</FormLabel>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <Star
                          key={starValue}
                          className={cn(
                            'h-8 w-8 cursor-pointer transition-colors',
                            starValue <= rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted-foreground/30'
                          )}
                          onClick={() => handleRatingChange(starValue)}
                        />
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Komentar Anda</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Bagaimana pengalaman Anda dengan penjual ini? Apakah produk sesuai deskripsi? Apakah pengiriman tepat waktu?"
                      className="min-h-[120px] rounded-xl border-none bg-background shadow-neumorphic-inset"
                      {...field}
                    />
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
                Kirim Ulasan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
