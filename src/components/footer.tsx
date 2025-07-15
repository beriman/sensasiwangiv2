// src/components/footer.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Flame, Twitter, Instagram, MessageSquare, Bug } from 'lucide-react';
import { FeedbackDialog } from './feedback-dialog';
import { Button } from './ui/button';

const footerLinks = {
  platform: [
    { href: '/browse', label: 'Marketplace' },
    { href: '/school', label: 'School' },
    { href: '/community', label: 'Community' },
    { href: '/info/badges', label: 'Katalog Lencana' },
  ],
  support: [
    { href: '/info/faq', label: 'FAQ' },
    { href: '/info/contact', label: 'Contact Us' },
    { href: '/info/privacy', label: 'Privacy Policy' },
    { href: '/info/terms', label: 'Terms of Service' },
  ],
};

export function AppFooter() {
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  return (
    <>
    <footer className="border-t bg-background/80 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground/80">
              <Flame className="h-7 w-7 text-accent" />
              sensasiwangi.id
            </Link>
            <p className="max-w-md text-muted-foreground">
              A community-driven platform for scent enthusiasts to discover, learn, and share the art of perfumery.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground/90">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground/90">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* Feedback */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground/90">Feedback</h3>
            <ul className="space-y-2">
               <li>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-accent" onClick={() => setIsFeedbackDialogOpen(true)}>
                  Saran &amp; Kritik
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} sensasiwangi.id. All Rights Reserved.
          </p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
    <FeedbackDialog isOpen={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen} />
    </>
  );
}
