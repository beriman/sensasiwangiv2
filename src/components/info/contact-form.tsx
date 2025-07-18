import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { feedbackData } from '@/data/feedback'; // We will "add" to this mock data
import { contactFormSchema } from '@/lib/contact-form-schema';

interface ContactFormProps {
  // No props needed for now, as logic is internal
}

export function ContactForm(props: ContactFormProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
          name: '',
          email: '',
          message: '',
        },
    });

    const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
        // In a real app, you would send this to an API endpoint.
        // For this demo, we'll simulate adding it to our feedback data.
        console.log('New contact message:', values);
        
        const newFeedback = {
            id: feedbackData.length + 1,
            type: 'Saran' as const,
            subject: `Pesan dari Halaman Kontak: ${values.name}`,
            description: values.message,
            user: values.email,
            date: new Date().toISOString(),
            status: 'Baru' as const,
        };
        feedbackData.unshift(newFeedback); // Add to the top of the list

        toast({
            title: "Pesan Terkirim!",
            description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
        });
        form.reset();
    }

  return (
    <Card className="rounded-2xl border-none bg-transparent p-6 shadow-neumorphic">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold text-foreground/80">Send a Message</CardTitle>
        <CardDescription>Your message will be directed to our admin team.</CardDescription>
      </CardHeader>
      <CardContent className="mt-6 p-0">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Name</Label>
                            <FormControl>
                                <Input placeholder="Your Name" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Email</Label>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Message</Label>
                            <FormControl>
                                <Textarea placeholder="Your message..." {...field} className="min-h-[120px] rounded-xl border-none bg-background shadow-neumorphic-inset"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full h-12 rounded-xl bg-accent-gradient text-lg text-accent-foreground shadow-neumorphic" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <Send className="mr-2 h-5 w-5" />
                    )}
                    Send Message
                </Button>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}
