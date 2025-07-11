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
import { Loader2, Send, WandSparkles, CheckCircle, FileUp, Package, Home } from 'lucide-react';
import {
  screenCurationApplication,
} from '@/ai/flows/curation-screener';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';


const CurationScreenerOutputSchema = z.object({
  isStrongCandidate: z.boolean(),
  summary: z.string(),
  recommendation: z.string(),
  score: z.number(),
});

type CurationScreenerOutput = z.infer<typeof CurationScreenerOutputSchema>;

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

type DialogStep = 'form' | 'loading' | 'analysis' | 'next_steps' | 'completed';

export function CurationDialog({ isOpen, onOpenChange, profileName }: CurationDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<DialogStep>('form');
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
      setStep('form');
    }
    onOpenChange(open);
  }

  const onSubmit = async (values: z.infer<typeof curationFormSchema>) => {
    setStep('loading');
    setAnalysisResult(null);
    try {
      const result = await screenCurationApplication(values);
      setAnalysisResult(result);
      setStep('analysis');
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
      setStep('form'); // Go back to form on error
    }
  };

  const handleProceedToNextStep = () => {
    if (analysisResult?.isStrongCandidate) {
      setStep('next_steps');
    } else {
      // Not a strong candidate, just close the dialog
      handleDialogChange(false);
    }
  }
  
  const handleFinalSubmission = () => {
    // Simulate final submission
    setStep('loading');
    setTimeout(() => {
        toast({
            title: 'Pengajuan Terkirim!',
            description: "Tim kurator akan meninjau informasi dan sampel Anda. Terima kasih!",
        });
        setStep('completed');
    }, 1500);
  }

  const renderContent = () => {
    switch(step) {
      case 'loading':
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-8 min-h-[300px]">
                <WandSparkles className="h-12 w-12 animate-pulse text-accent" />
                <p className="text-lg font-semibold text-muted-foreground">AI sedang menganalisis pengajuan Anda...</p>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        );
      
      case 'analysis':
        if (!analysisResult) return null;
        const scoreColor = analysisResult.score >= 8 ? 'text-green-600' : analysisResult.score >= 5 ? 'text-yellow-600' : 'text-red-600';
        return (
            <div className="space-y-6 py-4">
               <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground/80 flex items-center gap-2"><CheckCircle className="h-7 w-7 text-green-500" /> Analisis Awal Selesai</DialogTitle>
                    <DialogDescription>
                        Berikut adalah hasil penilaian awal dari asisten AI Nusantarum.
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
                        <FormLabel>Status Kandidat</FormLabel>
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
                    <Button onClick={handleProceedToNextStep} className="w-full">
                        {analysisResult.isStrongCandidate ? 'Lanjut ke Langkah Berikutnya' : 'Tutup'}
                    </Button>
                </DialogFooter>
            </div>
        );

      case 'next_steps':
        return (
            <div className="space-y-6 py-4">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground/80">Langkah Berikutnya</DialogTitle>
                    <DialogDescription>
                        Selesaikan dua langkah terakhir ini untuk melengkapi pengajuan kurasi Anda.
                    </DialogDescription>
                </DialogHeader>

                <Alert>
                    <Package className="h-4 w-4" />
                    <AlertTitle>1. Kirim Sampel Produk</AlertTitle>
                    <AlertDescription>
                        <p className="mb-2">Kirim 3-5 sampel produk unggulan Anda (masing-masing 2ml) ke alamat berikut untuk peninjauan fisik oleh tim kurator kami:</p>
                        <div className="text-sm font-semibold p-2 bg-background rounded-md">
                            <p>Up: Tim Kurasi Nusantarum</p>
                            <p>Jl. Wangi Sejahtera No. 42</p>
                            <p>Jakarta Selatan, 12345, Indonesia</p>
                        </div>
                    </AlertDescription>
                </Alert>

                <div className="space-y-2">
                    <h3 className="font-semibold text-foreground/90 flex items-center gap-2"><FileUp className="h-4 w-4" /> 2. Unggah Foto Pendukung</h3>
                    <p className="text-sm text-muted-foreground">Unggah foto laboratorium/area kerja Anda dan beberapa bahan baku utama yang Anda gunakan. (Placeholder)</p>
                     <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk mengunggah</span> atau seret file</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, atau WEBP (MAX. 5MB)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" multiple disabled />
                        </label>
                    </div> 
                </div>

                <DialogFooter>
                    <Button onClick={handleFinalSubmission} className="w-full h-12 bg-accent-gradient text-accent-foreground shadow-neumorphic">
                       <Send className="mr-2 h-5 w-5" /> Kirim Pengajuan Final
                    </Button>
                </DialogFooter>
            </div>
        );

      case 'completed':
          return (
            <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center min-h-[300px]">
                <Home className="h-16 w-16 text-green-500" />
                <h2 className="text-2xl font-bold">Pengajuan Anda Telah Diterima!</h2>
                <p className="text-muted-foreground">Terima kasih telah mengajukan diri untuk kurasi Nusantarum. Tim kami akan meninjau informasi dan sampel Anda dalam beberapa minggu ke depan. Kami akan menghubungi Anda melalui email.</p>
                <DialogFooter className="pt-4">
                    <Button onClick={() => handleDialogChange(false)} className="w-full">Tutup</Button>
                </DialogFooter>
            </div>
          );

      case 'form':
      default:
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
                        placeholder="Contoh: 'Di brand kami, setiap formula lahir dari riset mendalam terhadap cerita rakyat. Kami tidak menggunakan bibit parfum, melainkan meracik sendiri dari bahan baku seperti absolut melati dan minyak cendana asli dari petani lokal...' " 
                        className="min-h-[180px] rounded-xl border-none bg-background shadow-neumorphic-inset focus:ring-2 focus:ring-ring" {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={form.formState.isSubmitting} className="h-12 w-full rounded-xl bg-accent-gradient px-6 font-bold text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                  {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                  Kirim untuk Dianalisis AI
                </Button>
              </DialogFooter>
            </form>
          </Form>
        );
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="rounded-2xl border-none bg-background shadow-neumorphic sm:max-w-[520px]">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
