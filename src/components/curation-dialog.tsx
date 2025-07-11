// src/components/curation-dialog.tsx
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
import { Loader2, Send, WandSparkles, CheckCircle } from 'lucide-react';
import {
  CurationScreenerOutput,
  screenCurationApplication,
} from '@/ai/flows/curation-screener';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

const curationFormSchema = z.object({
  statement: z.string().min(100, {
    message: 'Please provide a detailed statement of at least 100 characters.',
  }),
});

interface CurationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  profileName: string;
}

export function CurationDialog({ isOpen, onOpenChange, profileName }: CurationDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CurationScreenerOutput | null>(null);

  const form = useForm<z.infer<typeof curationFormSchema>>({
    resolver: zodResolver(curationFormSchema),
    defaultValues: {
      statement: '',
    },
  });
  
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      form.reset();
      setAnalysisResult(null);
      setIsSubmitting(false);
    }
    onOpenChange(open);
  }

  const onSubmit = async (values: z.infer<typeof curationFormSchema>) => {
    setIsSubmitting(true);
    setAnalysisResult(null);
    try {
      const result = await screenCurationApplication(values);
      setAnalysisResult(result);
      toast({
        title: 'Analisis Selesai',
        description: 'Pengajuan Anda telah dianalisis oleh asisten AI kami.',
      });
    } catch (error) {
      console.error('Curation screening failed:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal menganalisis pengajuan. Silakan coba lagi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderContent = () => {
    if (isSubmitting) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <WandSparkles className="h-12 w-12 animate-pulse text-accent" />
            <p className="text-lg font-semibold text-muted-foreground">AI sedang menganalisis pengajuan Anda...</p>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
      )
    }

    if (analysisResult) {
      const scoreColor = analysisResult.score >= 8 ? 'text-green-600' : analysisResult.score >= 5 ? 'text-yellow-600' : 'text-red-600';
      return (
        <div className="space-y-6 py-4">
           <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground/80 flex items-center gap-2"><CheckCircle className="h-7 w-7 text-green-500" /> Analisis Selesai</DialogTitle>
                <DialogDescription>
                    Berikut adalah hasil penilaian awal dari asisten AI Nusantarum. Tim kurator kami akan meninjau ini untuk keputusan akhir.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
                <div>
                    <FormLabel>Skor Penilaian Awal</FormLabel>
                    <div className="flex items-center gap-4">
                        <Progress value={analysisResult.score * 10} className="h-3" />
                        <span className={`text-2xl font-bold ${scoreColor}`}>{analysisResult.score}/10</span>
                    </div>
                </div>
                 <div>
                    <FormLabel>Kandidat</FormLabel>
                     <Badge variant={analysisResult.isStrongCandidate ? 'default' : 'destructive'} className={analysisResult.isStrongCandidate ? 'bg-green-100 text-green-800' : ''}>
                        {analysisResult.isStrongCandidate ? 'Kandidat Kuat' : 'Membutuhkan Informasi Lebih'}
                     </Badge>
                </div>
                <div>
                    <FormLabel>Ringkasan untuk Kurator</FormLabel>
                    <p className="text-sm p-3 bg-muted/50 rounded-lg">{analysisResult.summary}</p>
                </div>
                <div>
                    <FormLabel>Rekomendasi AI</FormLabel>
                    <p className="text-sm p-3 bg-muted/50 rounded-lg">{analysisResult.recommendation}</p>
                </div>
            </div>
             <DialogFooter>
                <Button onClick={() => handleDialogChange(false)}>Tutup</Button>
            </DialogFooter>
        </div>
      )
    }

    return (
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
            <DialogHeader>
                <DialogTitle className="text-xl font-bold text-foreground/80">Pengajuan Kurasi untuk {profileName}</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                    Jelaskan filosofi, proses kreasi, dan bahan yang Anda gunakan. AI kami akan melakukan penilaian awal.
                </DialogDescription>
            </DialogHeader>
          <FormField
            control={form.control}
            name="statement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statement Anda</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Contoh: 'Di brand kami, setiap formula lahir dari riset mendalam terhadap cerita rakyat, kami tidak menggunakan bibit parfum, melainkan meracik dari bahan baku absolut melati dan minyak cendana asli...' " 
                    className="min-h-[180px] rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
              Kirim untuk Dianalisis AI
            </Button>
          </DialogFooter>
        </form>
      </Form>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-[520px]">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
