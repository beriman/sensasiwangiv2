// src/app/info/contact/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Loader2, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { feedbackData } from '@/data/feedback'; // We will "add" to this mock data

import { contactFormSchema } from '@/lib/contact-form-schema';


export default function ContactPage() {
    import { ContactForm } from '@/components/info/contact-form';
// ... other imports ...

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Contact Us</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            We'd love to hear from you. Reach out with any questions or feedback.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-none bg-transparent p-6 shadow-neumorphic">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-background p-3 shadow-neumorphic-inset">
                        <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground/80">Email Support</h3>
                        <p className="text-muted-foreground">support@sensasiwangi.id</p>
                    </div>
                </div>
            </Card>
             <Card className="rounded-2xl border-none bg-transparent p-6 shadow-neumorphic">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-background p-3 shadow-neumorphic-inset">
                        <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground/80">Phone Support</h3>
                        <p className="text-muted-foreground">+62 21 1234 5678</p>
                    </div>
                </div>
            </Card>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
