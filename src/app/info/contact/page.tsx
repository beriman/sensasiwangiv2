// src/app/info/contact/page.tsx

import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone } from 'lucide-react';

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
          <div>
            <Card className="rounded-2xl border-none bg-transparent p-6 shadow-neumorphic">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-bold text-foreground/80">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="mt-6 p-0">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="rounded-xl border-none bg-background shadow-neumorphic-inset"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[120px] rounded-xl border-none bg-background shadow-neumorphic-inset"/>
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl bg-accent-gradient text-lg text-accent-foreground shadow-neumorphic">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
